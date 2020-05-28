import React from 'react';
import onClickOutside from 'react-onclickoutside';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUser, faSignOutAlt } from '@fortawesome/fontawesome-free-solid';
import { withRouter } from 'react-router';
import { LOGIN } from 'global/routes';
import Cookies from 'universal-cookie';
import './style.scss';

class Profile extends React.PureComponent {
  state = {
    isClickProfile: false,
  };
  cookies = new Cookies();

	handleOnClick = () => {
	  this.setState({ isClickProfile: !this.state.isClickProfile });
	}

	handleClickOutside = () => {
	  this.setState({ isClickProfile: false });
  }
  
  goToProfileInfo = () => {
    // this.props.history.push(INFO);
  }

  logOut = () => {
    this.cookies.set('access_token', undefined);
    this.props.history.push(LOGIN);
  }

	render() {
    const { isClickProfile } = this.state;

	  return (
      <div className="profile" onClick={this.handleOnClick}>
        <FontAwesomeIcon
          color="#fff"
          size="3x"
          className="pointer"
          icon={faUserCircle}
        />
        <div className="profile__menu">
          {isClickProfile &&
            <ul>
              <li className="profile__menu-item" onClick={this.goToProfileInfo}>
                <FontAwesomeIcon
                  color="#385898"
                  className="profile__menu-icon"
                  icon={faUser}
                />
                <span>Cá nhân</span>
              </li>

              <li className="profile__menu-item" onClick={this.logOut}>
                <FontAwesomeIcon
                  color="#385898"
                  className="profile__menu-icon"
                  icon={faSignOutAlt}
                />
                <span>Đăng xuất</span>
              </li>
            </ul>
          }
        </div>
      </div>
	  );
	}
}

export default withRouter(onClickOutside(Profile));
