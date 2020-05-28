import React from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faKey } from '@fortawesome/fontawesome-free-solid';
import { HOME_PAGE } from 'global/routes';
import { withRouter } from 'react-router';
import logo_VNPT from 'assets/icons/vnpt-logo.png';
import { KCSModal } from 'components';
import { connect } from 'react-redux';
import { ProgressAction } from 'services/users/user/actions';
import { AdminService } from 'services/AdminService/AdminService';
import Cookies from 'universal-cookie';

class Login extends React.PureComponent {
  state = {
    userName: '',
    password: '',
    content: '',
    isOpenModal: false
  }

  handleUserName = (e) => {
    const { value } = e.target;
    this.setState({ userName: value });
  } 

  handlePassword = (e) => {
    const { value } = e.target;
    this.setState({ password: value });
  }

  handleLogin = () => {
    const { userName, password } = this.state;

    let errMsg = null;
    if (!userName || !password) {
      errMsg = 'Tên tài khoản hoặc mật khẩu không được để trống!';
    }

    if (errMsg) {
      this.setState({ errMsg });
      return;
    }

    const params = {
      username: userName,
      password
    };

    this.props.showProgressTurn();
    AdminService.login(params, res => {
      this.props.hideProgressTurn();
      if (res && res.errorCode === '0') {
        const cookies = new Cookies();
        const d = new Date();
        d.setTime(d.getTime() + parseInt(res.expireTime));
        cookies.set(
          'access_token',
          res.token,
          { path: '/', expires: d }
        );
        this.props.history.push(HOME_PAGE);
      } else {
        this.setState({
          isOpenModal: true,
          content: 'Tên tài khoản hoặc mật khẩu không đúng, vui lòng thử lại!'
        });
      }
    }, () => {
      this.props.hideProgressTurn();
      this.setState({
        isOpenModal: true,
        content: 'Tên tài khoản hoặc mật khẩu không đúng, vui lòng thử lại!'
      });
    });
  }

  closeModal = () => {
    this.setState({ isOpenModal: false });
  }

  handleRegister = () => {
    this.setState({
      isOpenModal: true,
      content: 'Tính năng này hiện chưa có, vui lòng thử lại!'
    });
  }

  render() {
    const { userName, password, isOpenModal, content, errMsg } = this.state;
    return (
      <div className="container login">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
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
                <div className="row align-items-center remember">
                  <input type="checkbox" />Ghi nhớ
                </div>
                <div className="login__error-text mt-1">
                  {errMsg}
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

            {/* FAKE DATA */}
            <div className="card-footer" onClick={this.handleRegister}>
              <div className="d-flex justify-content-center">
                {/* Chưa có tài khoản?<a href={SIGNUP}>Đăng ký</a> */}
                <span className="color-white mr-2">Chưa có tài khoản?</span>
                <span className="links"> Đăng ký</span>
              </div>
              <div className="d-flex justify-content-center links">
                Quên mật khẩu?
              </div>
            </div>
          </div>
        </div>
        <KCSModal
          isOpenModal={isOpenModal}
          title="Có lỗi xảy ra"
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

export default connect(null, mapDispatchToProps)(withRouter(Login));
