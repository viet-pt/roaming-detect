import React from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignOutAlt, faUserCircle } from '@fortawesome/fontawesome-free-solid';
import { InputText } from 'components';
import { Button } from 'antd';
import { Link, withRouter } from 'react-router-dom';

class HomeHeader extends React.PureComponent {
  state = {
    phoneNumber: '',
    startTime: '',
    finishTime: '',
    logged: true,
  }

  handlePhoneNumber = (value) => {
    this.setState({ phoneNumber: value });
  }

  handleStartTime = (value) => {
    this.setState({ startTime: value });
  }

  handleFinishTime = (value) => {
    this.setState({ finishTime: value });
  }

  handleFind = () => {
    
  }

  render() {
    const { phoneNumber, startTime, finishTime, logged } = this.state;
    return (
      <div className="home-header">
        <div className="pointer home-header__left">
          <Link to="/">
            <FontAwesomeIcon
              color="#fff"
              icon={faHome}
              size="2x"
            />
          </Link>
          <span className="home-header__tile">HOME</span>
        </div>
        <div className="home-header__input-wrapper">
          <InputText
            title="SỐ ĐT"
            placeholder="Nhập số điện thoại"
            value={startTime}
            handleOnChange={this.handlePhoneNumber}
          />
          <InputText
            title="BẮT ĐẨU"
            value={finishTime}
            handleOnChange={this.handlePhoneNumber}
          />
          <InputText
            title="KẾT THÚC"
            customClass="mr-1"
            value={phoneNumber}
            handleOnChange={this.handlePhoneNumber}
          />
          <Button
            type="primary"
            onClick={this.handleFind}
          >Tìm kiếm
          </Button>       
        </div>
        <div>
          {logged
            && (
            <Link to="./login">
              <FontAwesomeIcon
                color="#fff"
                icon={faUserCircle}
                size="2x"
              />
            </Link>
            )}
          {!logged
            && (
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
