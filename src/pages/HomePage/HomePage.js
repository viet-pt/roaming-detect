import React from 'react';
import './style.scss';
import { connect } from 'react-redux';
import { ProgressAction } from 'services/users/user/actions';
import { AdminService } from 'services/AdminService/AdminService';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { KCSModal } from 'components';
import { withRouter } from 'react-router';
import Cookies from 'universal-cookie';
import HomeHeader from './Component/HomeHeader';
import SimpleMap from './Component/SimpleMap';
import { LOGIN } from 'global/routes';
class HomePage extends React.PureComponent {
  state = {
    isMarkerShown: true,
    isDisabledExport: true,
    isLogIn: true,
    locationList: [],
    isOpenModal: false,
    title: '',
    content: '',
    authorized: false
  }

  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get('access_token');
    if (!token || token === "undefined") {
      this.props.history.push(LOGIN);
    } else {
      this.setState({ authorized: true });
    }
  }

  closeModal = () => {
    this.setState({ isOpenModal: false });
  }

  handleExportCSV = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const fileName = 'data_export';

    const ws = XLSX.utils.json_to_sheet(this.state.locationList);
    const wb = {
      Sheets: { data: ws },
      SheetNames: ['data'],
    };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }

  handleOk = (data) => {
    this.props.showProgressTurn();
    AdminService.getLocation(data, res => {
      this.props.hideProgressTurn();
      if (res.errorCode === "0") {
        if (res.data && res.data.length === 0) {
          this.setState({
            isOpenModal: true,
            isDisabledExport: true,
            title: "Thông báo",
            content: "Không có dữ liệu!"
          });
        }
        this.setState({
          locationList: res.data,
          isDisabledExport: false,
        });
      }
    }, () => {
      this.props.hideProgressTurn();
      this.setState({
        isOpenModal: true,
        isDisabledExport: true,
        title: "Có lỗi xảy ra",
        content: "Có lỗi xảy ra, vui lòng thử lại!"
      });
    });
  }

  render() {
    const { locationList, isDisabledExport, isOpenModal, title, content, authorized } = this.state;
    if (!authorized) {
      return null;
    }
    return (
      <div className="home-page">
        <HomeHeader
          handleOk={this.handleOk}
          isDisabledExport={isDisabledExport}
          handleExportCSV={this.handleExportCSV}
        />
        <SimpleMap locationList={locationList} />
        <KCSModal
          isOpenModal={isOpenModal}
          title={title}
          content={content}
          closeModal={this.closeModal}
          confirmAction={this.closeModal}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  showProgressTurn: () => dispatch({ type: ProgressAction.SHOW_PROGRESS }),
  hideProgressTurn: () => dispatch({ type: ProgressAction.HIDE_PROGRESS }),
});

export default connect(null, mapDispatchToProps)(withRouter(HomePage));
