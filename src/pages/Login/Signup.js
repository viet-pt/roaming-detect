import React from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUserCircle, faKey } from '@fortawesome/fontawesome-free-solid';
import { KCSModal } from 'components';
import { LOGIN } from 'global/routes';
import { withRouter } from 'react-router';
import logo_VNPT from 'assets/icons/vnpt-logo.png';

const regexUserName = /^[a-zA-Z0-9_]+$/;
const regexPassword = /^[a-zA-Z0-9_]+$/;

class Signup extends React.PureComponent {
  state = {
    userName: '',
    password: '',
    newPassword: '',
    errMsg: null,
    isOpenModal: false,
  }

  onBack = () => {
    this.props.history.push(LOGIN);
  }

  handleUserName = (e) => {
    const { value } = e.target;
    this.setState({ userName: value });
  }
  
  handlePassword = (e) => {
    const { value } = e.target;
    this.setState({ password: value });
  }

  handleNewPassword = (e) => {
    const { value } = e.target;
    this.setState({ newPassword: value });
  }

  closeModal = () => {
    this.setState({ isOpenModal: false });
  }

  handleLogin = () => {
    this.props.history.push(LOGIN);

  }

  handleRegister = () => {
    const { userName, password, newPassword } = this.state;
    const testName = regexUserName.test(userName);
    const testPassword = regexPassword.test(password);

    let errMsg = null;
    if (!userName || !password) {
      errMsg = 'Tên tài khoản hoặc mật khẩu không được để trống!';
    } else if (password !== newPassword) {
      errMsg = 'Mật khẩu nhập lại không đúng!';
    } else if (!testName) {
      errMsg = 'Tên tài khoản chỉ được chứa số, chữ hoặc dấu gạch dưới!';
    } else if (password.length < 6 || password.length > 18) {
      errMsg = 'Mật khẩu phải dài từ 6 - 18 kí tự';
    } else if (!testPassword) {
      errMsg = 'Mật khẩu chỉ được chứa số, chữ hoặc dấu gạch dưới!';
    }
    if (errMsg) {
      this.setState({ errMsg });
      return;
    }
    // call API
    // FAKE DATA
    this.setState({ isOpenModal:true });

  }

  render() {
    const { userName, password, newPassword, isOpenModal, errMsg } = this.state;
    return (
      <div className="container login">
        <div className="d-flex justify-content-center h-100">
          <div className="card">

            <div className="card-header">
              <FontAwesomeIcon
                color="white"
                onClick={this.onBack}
                className="login__back-icon"
                icon={faArrowLeft}
              />
              
              <h3>Tạo tài khoản</h3>
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
                    value={userName}
                    onChange={this.handleUserName}
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

                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><FontAwesomeIcon icon={faKey} /></span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Nhập lại mật khẩu"
                    value={newPassword}
                    onChange={this.handleNewPassword}
                  />
                </div>

                <div className="error-text">
                  {errMsg}
                </div>

                <div className="form-group">
                  <div
                    type="submit"
                    className="login_btn"
                    onClick={this.handleRegister}
                  >Đăng ký
                  </div>  
                </div>
              </form>
            </div>
          
            <KCSModal
              isOpenModal={isOpenModal}
              title="Chúc mừng"
              content="Bạn đã đăng ký tài khoản thành công!"
              confirmButton="Đăng nhập"
              closeModal={this.closeModal}
              confirmAction={this.handleLogin}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);

