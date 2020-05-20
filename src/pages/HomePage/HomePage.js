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
import GoogleMap from './Component/GoogleMap';
import HomeHeader from './Component/HomeHeader';
// import { LOGIN } from 'global/routes';
class HomePage extends React.PureComponent {
  state = {
    isMarkerShown: true,
    isDisabledExport: true,
    isOpenModal: false,
    isLogIn: true,
    locationList: [
      {
        lat: 21.019051,
        lng: 105.809652,
        DST_DEST: '70A Thái Hà, Hà Nội',
        time: '19-02-2020 6:10:23',
      },
      {
        lat: 21.026081,
        lng: 105.812581,
        DST_DEST: '11 Nguyễn Công Hoan, Hà Nội',
        time: '19-02-2020 10:10:23',
      },
      {
        lat: 21.026001,
        lng: 105.821765,
        DST_DEST: '31 Giảng Võ, Hà Nội',
        time: '19-02-2020 15:00:23',
      },
      {
        lat: 21.013302, 
        lng: 105.819426,
        DST_DEST: '21 Thái Hà, Hà Nội',
        time: '19-02-2020 19:30:23',
      },
      {
        lat: 21.026081,
        lng: 105.812581,
        DST_DEST: '11 Nguyễn Công Hoan, Hà Nội',
        time: '19-02-2020 20:10:23',
      },
    ],
  }

  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get('access_token');
    if (!token) {
      // this.props.history.push(LOGIN);  // NEED TO UPDATE
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

  handleOk = (params) => {
    this.props.showProgressTurn();
    AdminService.getLocation({ params }, res => {
      this.props.hideProgressTurn();
      // NEED TO UPDATE
      this.setState({
        locationList: res.data,
        isDisabledExport: false,
      });
    }, () => {
      this.props.hideProgressTurn();
      this.setState({
        isOpenModal: true,
        isDisabledExport: true,
      });
    });
  }

  render() {
    const { locationList, isDisabledExport, isOpenModal } = this.state;
    return (
      <div className="home-page">
        <HomeHeader
          handleOk={this.handleOk}
          isDisabledExport={isDisabledExport}
          handleExportCSV={this.handleExportCSV}
        />
        <GoogleMap locationList={locationList} />
        <KCSModal
          isOpenModal={isOpenModal}
          title="Có lỗi xảy ra"
          content="Có lỗi xảy ra, vui lòng thử lại!"
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
