import React from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/fontawesome-free-solid';
import { withRouter } from 'react-router-dom';
import BadgeName from 'pages/Header/Component/BadgeName';
import { NewsService } from 'services/AdminService/AdminService';
import { ProgressAction } from 'services/users/user/actions';
import { connect } from 'react-redux';
import { BoxNews } from 'pages/HomePage/Component';
import icon_file from 'assets/icons/icon_file.svg';
import icon_title from 'assets/icons/icon_title.svg';
import { KCSModal } from 'components';

// FAKE DATA
const profile ={
  name: 'Donald Trump',
  image: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Donald_Trump_official_portrait.jpg'
};

class ProfileDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isRecentNews: true,
      listRecent: [],
      listSave: [],
      isOpenModal: false,
      content: '',
      itemDelete: null
    };
  }

  componentDidMount() {
    this.getListRecent();
    this.getListSave();
  }

  getListRecent = () => {
    const params = {
      filterType: 3
    }
    this.props.showProgressTurn();
    NewsService.getNewsList({ params }, response => {
      this.props.hideProgressTurn();
      this.setState({ listRecent: response.data });
    }, this.props.hideProgressTurn);
  }

  getListSave = () => {
    const params = {
      filterType: 2
    }

    this.props.showProgressTurn();
    NewsService.getNewsList({ params }, response => {
      this.props.hideProgressTurn();
      this.setState({ listSave: response.data });
    }, this.props.hideProgressTurn);
  }

  unSaveNews = (params) => {
    this.props.showProgressTurn();
    NewsService.unSaveNews({ params }, response => {
      this.props.hideProgressTurn();
      this.setState({
        isOpenModal: true,
        content: 'Xóa tin thành công!'
      });
      this.getListSave();
    }, this.props.hideProgressTurn);
  }
  
  changeNews = (value) => {
    this.setState({ isRecentNews: value });
  }

  handleDeleteAll = (isRecentNews) => {
    const content = isRecentNews ? 'Xóa toàn bộ tin đã đọc gần đây, bạn có muốn thao tác ?' :
      'Xóa toàn bộ tin đã lưu, bạn có muốn thao tác ?';
    this.setState({
      isOpenModal: true,
      content
    });
  }

  handleDeleteItem = (dataItem) => {
    this.setState({
      isOpenModal: true,
      itemDelete: dataItem,
      content: `Bài viết, "${dataItem.title}" sẽ được xóa khỏi danh sách bài đã đọc gần đây, bạn có muốn thao tác ?`
    });
  }

  confirmAction = () => {
    const { isRecentNews, itemDelete } = this.state;

     // tin da luu
    if (!isRecentNews) {
      const params = {
        msisdn: '012345678', // FAKE DATA
        id: itemDelete ? itemDelete._id : 'All'
      }
      this.unSaveNews(params);
    }
    this.closeModal();
  }

  closeModal = () => {
    this.setState({
      isOpenModal: false,
      itemDelete: null
    });
  }

  showListNew = () => {
    const { isRecentNews, listRecent, listSave } = this.state;
    const list = isRecentNews ? listRecent : listSave;
    const title = isRecentNews ? 'Tin xem gần đây' : 'Tin đã lưu';
    const description = isRecentNews ? 'Bạn chưa xem tin nào gần đây' : 'Không có tin đã lưu';
    return (
      <div className="profile-detail__content">
        {list.length === 0 &&
          <div className="profile-detail__empty">
            <div className="profile-detail__empty-wrapper">
              <img src={icon_file} alt="empty" />
              <div className="profile-detail__description">{description}</div>
            </div>
          </div>
        }
        {list.length > 0 &&
          <>
            <div className="profile-detail__sub-wrapper">
              <div>
                <img src={icon_title} alt="icon-title" className="profile-detail__sub-icon mr-2" />
                <span className="profile-detail__sub-title">{title}</span>
              </div>
              <div className="profile-detail__sub-right" onClick={() => this.handleDeleteAll(isRecentNews)}>
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className="mr-2"
                />
                <span>Xóa toàn bộ</span>
              </div>
            </div>
            <div className="profile-detail__list">
              {list.map((item, index) => (
                <BoxNews
                  dataItem={item}
                  key={index}
                  showDeleteButton
                  handleDelete={this.handleDeleteItem}
                  customClass="profile-detail__item"
                  colImage="col-lg-4 col-sm-6 profile-detail__list-img"
                  colTitle="col-lg-8 col-sm-6 profile-detail__list-title"
                />
              ))}
            </div>
          </>
        }
      </div>
    );
  }

	render() {
    const { isRecentNews, isOpenModal, content } = this.state;
    return (
      <div className="profile-detail container">
        <div className="profile-detail__badge-wrapper">
          <BadgeName
            customImg="profile-detail__menu-image"
            customName="profile-detail__menu-name"
            customBadge="profile-detail__menu-badge"
            image={profile.image}
            name={profile.name}
          />
        </div>
        <div className="profile-detail__news-wrapper">
          <div className="d-flex">
            <div className={`profile-detail__news mr-1 ${isRecentNews ? 'tab-active' : ''}`}
              onClick={() => this.changeNews(true)}>
              Tin xem gần đây
            </div>
            <div className={`profile-detail__news ${!isRecentNews ? 'tab-active' : ''}`}
              onClick={() => this.changeNews(false)}>
              Tin đã lưu
            </div>
          </div>
          {this.showListNew()}
        </div>
        <KCSModal
          isOpenModal={isOpenModal}
          title="Xóa tin đã đọc gần đây"
          closeButton="Hủy"
          confirmButton="Xóa"
          content={content}
          closeModal={this.closeModal}
          confirmAction={this.confirmAction}
        />
      </div>
    )
	}
}

const mapDispatchToProps = dispatch => ({
  showProgressTurn: () => dispatch({ type: ProgressAction.SHOW_PROGRESS }),
  hideProgressTurn: () => dispatch({ type: ProgressAction.HIDE_PROGRESS }),
});

export default connect(null, mapDispatchToProps)(withRouter(ProfileDetail));
