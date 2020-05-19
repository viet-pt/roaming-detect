import React from 'react';
import './style.scss';
import BadgeName from 'pages/Header/Component/BadgeName';
import { ProgressAction } from 'services/users/user/actions';
import { connect } from 'react-redux';
import { KCSModal } from 'components';

// FAKE DATA
const profile = {
  name: 'Donald Trump',
  image: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Donald_Trump_official_portrait.jpg',
};

class ProfileDetail extends React.PureComponent {

  render() {
    return (
      <div className="profile-detail">
        <img
          alt="profile"
          src={profile.image}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  showProgressTurn: () => dispatch({ type: ProgressAction.SHOW_PROGRESS }),
  hideProgressTurn: () => dispatch({ type: ProgressAction.HIDE_PROGRESS }),
});

export default connect(null, mapDispatchToProps)(ProfileDetail);
