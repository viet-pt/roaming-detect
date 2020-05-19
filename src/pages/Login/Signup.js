import React from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';
import { KCSModal } from 'components';
import { LOGIN } from 'global/routes';
import { withRouter } from 'react-router';
import logo_VNPT from 'assets/icons/vnpt-logo.png';
import flag from 'assets/icons/vietnam.svg';

class Signup extends React.PureComponent {
  state = {
    currentStep: 0,
    numberUser: '',
    verifyCode: '',
    isOpenModal: false,
  }

  onChangeCurrentStep = step => {
    this.setState({ currentStep: step });
    if (step < 0) {
      this.props.history.push(LOGIN);
    }
  }

  handleInputChange = (e) => {
    const { value } = e.target;
    this.setState({ numberUser: value });
  }

  handleVerifyCodeChange = (e) => {
    const { value } = e.target;
    this.setState({ verifyCode: value });
  }

  sendOTPAgain = () => {
    //call API
  }

  onCLickSendOTP = () => {
    this.setState({ currentStep: 1 });
    //call API
  }

  onVerifyCode = () => {
    this.setState({ currentStep: 2 });
    //call API
  }

  onEnterPass = () => {
    this.setState({ isOpenModal: true });
    //call API
  }

  closeModal = () => {
    this.setState({ isOpenModal: false });
  }

  handleRegister = () => {
    this.props.history.push(LOGIN);
  }

  render() {
    const { currentStep, numberUser, verifyCode, password, newPassword, isOpenModal } = this.state;
    return (
      <div className="container login">
        <div className="d-flex justify-content-center h-100">
          <div className="card">

            <div className="card-header">
              <FontAwesomeIcon
                color="white"
                onClick={() => this.onChangeCurrentStep(currentStep - 1)}
                className="login__back-icon"
                icon={faArrowLeft}
              />
              
              {currentStep === 0 && <h3>Tạo tài khoản</h3>}
              {currentStep === 1 && <h3>Mã xác thực OTP</h3>}
              {currentStep === 2 && <h3>Tạo mật khẩu</h3>}
              <img
                alt="logo"
                src={logo_VNPT}
                className="login__logo"
              />
            </div>

            <div className="text-description">
              {(currentStep === 1 || currentStep === 2)
                && (
                <>
                  {currentStep === 1 && <div>Mời bạn nhập mã xác thực vừa gửi đến số điện thoại:</div>}
                  {currentStep === 2 && <div>Mời bạn tạo mật khẩu cho tài khoản có số điện thoại:</div>}
                  <div>(+84){numberUser}</div>
                </>
                )}
            </div>

            <div className="card-body">
              <form>
                <div className="input-group form-group">
                  {currentStep === 0 
                    && (
                    <>
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <img
                            alt="logo"
                            src={flag}
                            className="login__flag"
                          />
                        </span>
                      </div>
                      <span className="login__phone-code">+84</span>
                      <input
                        className="form-control"
                        placeholder="888 888 8888"
                        value={numberUser}
                        onChange={this.handleInputChange}
                      />
                      <div
                        onClick={this.onCLickSendOTP}
                        className="sign-up-btn btn-common"
                      >Gửi mã OTP
                      </div>
                    </>
                    )}
                </div>

                {currentStep === 1
                  && (
                  <>
                    <input
                      className="form-control"
                      placeholder="888 888"
                      value={verifyCode}
                      onChange={this.handleVerifyCodeChange}
                    />
                    <div className="text-step-1">
                      <span onClick={() => this.onChangeCurrentStep(0)}>Đổi số điện thoại</span>
                      <span onClick={this.sendOTPAgain}>Gửi lại OTP</span>
                    </div>
                    <div
                      onClick={this.onVerifyCode}
                      className="next-btn btn-common"
                    >Tiếp tục
                    </div>
                  </>
                  )}

                {currentStep === 2
                  && (
                  <>
                    <input
                      className="form-control"
                      placeholder="Mật khẩu có ít nhất 8 kí tự"
                      value={password}
                      onChange={this.handleVerifyCodeChange}
                    />
                    <br />
                    <input
                      className="form-control"
                      placeholder="Nhập lại mật khẩu vừa tạo"
                      value={newPassword}
                      onChange={this.handleVerifyCodeChange}
                    />
                    <div
                      onClick={this.onEnterPass}
                      className="end-btn btn-common"
                    >Tiếp tục
                    </div>
                  </>
                  )}
              </form>
            </div>
            <KCSModal
              isOpenModal={isOpenModal}
              title="Chúc mừng"
              content="Bạn đã đăng ký tài khoản thành công!"
              confirmButton="Đăng nhập"
              closeModal={this.closeModal}
              confirmAction={this.handleRegister}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);

