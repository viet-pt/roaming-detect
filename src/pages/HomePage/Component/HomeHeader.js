import React from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/fontawesome-free-solid';
import { InputText, InputTime } from 'components';
import { Button } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import Profile from 'pages/Profile/Profile';

class HomeHeader extends React.PureComponent {
  state = {
    phoneNumber: '',
    startTime: '00:00:00',
    startDate: null,
    finishTime: '23:59:59',
    finishDate: null
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
    const { phoneNumber, startDate, finishDate } = this.state;
    return !(phoneNumber && startDate && finishDate);
  }

  handleOk = () => {
    const { phoneNumber, startTime, startDate, finishTime, finishDate } = this.state;
    const start = `${startDate} ${startTime}`;
    const finish = `${finishDate} ${finishTime}`;
    
    const data = {
      startTime: start,
      endTime: finish,
      msisdn: phoneNumber
      // msisdn: '84944064466',
    };
    this.props.handleOk(data);
  }

  render() {
    const { phoneNumber } = this.state;
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
            defaultTime="23:59:59"
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
        <Profile />
      </div>
    );
  }
}

export default withRouter(HomeHeader);
