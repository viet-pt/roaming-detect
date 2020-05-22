import React from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faKey } from '@fortawesome/fontawesome-free-solid';
import { SIGNUP, HOME_PAGE } from 'global/routes';
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
    const params = {
      userName,
      password
    };

    this.props.showProgressTurn();
    AdminService.login({ params }, (res) => {
      this.props.hideProgressTurn();
      const cookies = new Cookies();
      // NEED TO UPATE
      cookies.set(
        'access_token',
        res.access_token,
        { path: '/', expires: res.expires_in }
      );
    }, () => {
      this.props.hideProgressTurn();
      this.setState({ isOpenModal: true });
    });
    this.props.history.push(HOME_PAGE); // NEED TO UPDATE
  }

  closeModal = () => {
    this.setState({ isOpenModal: false });
  }

  render() {
    const { userName, password, isOpenModal } = this.state;
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
                <div className="form-group">
                  <div
                    type="submit"
                    className="login_btn"
                    // onClick={this.handleLogin} // FAKE DATA
                    onClick={() => this.setState({ isOpenModal: true })}
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
        <KCSModal
          isOpenModal={isOpenModal}
          title="Có lỗi xảy ra"
          content="Tên tài khoản hoặc mật khẩu không đúng, vui lòng thử lại!"
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
