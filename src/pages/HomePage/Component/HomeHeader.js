import React from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignOutAlt } from '@fortawesome/fontawesome-free-solid';
import { InputText, InputTime } from 'components';
import { Button } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import Profile from 'pages/Profile/Profile';
class HomeHeader extends React.PureComponent {
  state = {
    phoneNumber: '',
    startTime: null,
    startDate: null,
    finishTime: null,
    finishDate: null,
    logged: true,
  }

  handlePhoneNumber = (value) => {
    this.setState({ phoneNumber: value });
  }

  onChangeDateStart = (value) => {
    this.setState({ startDate: value });
  }

  onChangeTimeStart = (value) => {
    this.setState({ startTime: value });
  }

  onChangeDateFinish = (value) => {
    this.setState({ finishDate: value });
  }

  onChangeTimeFinish = (value) => {
    this.setState({ finishTime: value });
  }

  disabledButton = () => {
    const { phoneNumber, startTime, startDate, finishTime, finishDate } = this.state;
    return !(phoneNumber && startTime && finishTime && startDate && finishDate);
  }

  handleOk = () => {
    const { phoneNumber, startTime, startDate, finishTime, finishDate } = this.state;
    const start = startDate + ' ' + startTime;
    const finish = finishDate + ' ' + finishTime;
    
    const params = {
      start,
      finish,
      phoneNumber
    }
    this.props.handleOk(params);
  }

  render() {
    const { phoneNumber, logged } = this.state;
    return (
      <div className="home-header">
        <div className="pointer home-header__left">
          <Link to="/">
            <FontAwesomeIcon
              color="#fff"
              icon={faHome}
              size="3x"
            />
          </Link>
          <span className="home-header__tile">HOME</span>
        </div>
        <div className="home-header__input-wrapper">
          <InputText
            title="SỐ ĐT"
            placeholder="Nhập số điện thoại"
            customClass="mr-3"
            value={phoneNumber}
            isNumber
            handleOnChange={this.handlePhoneNumber}
          />
          <InputTime
            title="BẮT ĐẦU"
            customClass="mr-3"
            onChangeDate={this.onChangeDateStart}
            onChangeTime={this.onChangeTimeStart}
          />
          <InputTime
            title="KẾT THÚC"
            customClass="mr-2"
            onChangeDate={this.onChangeDateFinish}
            onChangeTime={this.onChangeTimeFinish}
          />
          <Button
            type="primary"
            disabled={this.disabledButton()}
            onClick={this.handleOk}
          >Tìm kiếm
          </Button>      
          <Button
            disabled={this.props.isDisabledExport}
            onClick={this.props.handleExportCSV}
            className="btn-export ml-2"
          >Export to Excel
          </Button>      
        </div>

        <div>
          {logged && <Profile />}
          {!logged && (
            <Link to="./login">
              <FontAwesomeIcon
                color="#fff"
                icon={faSignOutAlt}
                size="lg"
              />
            </Link>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(HomeHeader);
