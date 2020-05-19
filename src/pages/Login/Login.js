import React from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faKey, faArrowLeft } from '@fortawesome/fontawesome-free-solid';
import { SIGNUP, HOME_PAGE } from 'global/routes';
import { withRouter } from 'react-router';
import logo_VNPT from 'assets/icons/vnpt-logo.png';
import UserService from 'services/userService/UserService';

class Login extends React.PureComponent {

  state = {
    phoneNumber: '',
    password: '',
  }

  handlePhoneNumber = (e) => {
    const { value } = e.target;
    this.setState({ phoneNumber: value });
  } 

  handlePassword = (e) => {
    const { value } = e.target;
    this.setState({ password: value });
  }

  handleBack = () => {
    this.props.history.push(HOME_PAGE);
  }

  handleLogin = () => {
    const params = {
      header: {
        Channel: 'ios',
      },
      deviceId: 'G6TXMTFZKPHF',
      deviceType: 'IphoneXSMax',
      deviceOS: 'IOS',
    };
    // UserService.login(params, response => {
      // console.log(response);
    // }, err => {
      // console.log(err);
    // });
    this.props.history.push(HOME_PAGE);
  }

  render() {
    const { phoneNumber, password } = this.state;
    return (
      <div className="container login">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <FontAwesomeIcon
                color="white"
                onClick={this.handleBack}
                className="login__back-icon"
                icon={faArrowLeft}
              />
              <h3>Đăng nhập</h3>
              <img
                alt="logo"
                src={logo_VNPT}
                className="login__logo"
              />
            </div>
            <div className="card-body">
              <form>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><FontAwesomeIcon icon={faUserCircle} /></span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tài khoản"
                    value={phoneNumber}
                    onChange={this.handlePhoneNumber}
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><FontAwesomeIcon icon={faKey} /></span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={this.handlePassword}
                  />
                </div>
                <div className="row align-items-center remember">
                  <input type="checkbox" />Ghi nhớ
                </div>
                <div className="form-group">
                  <div
                    type="submit"
                    className="login_btn"
                    onClick={this.handleLogin}
                  >Đăng nhập
                  </div>  
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Chưa có tài khoản?<a href={SIGNUP}>Đăng ký</a>
              </div>
              <div className="d-flex justify-content-center">
                <a href="/.">Quên mật khẩu?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
