import React from 'react';
import './style.scss';
import { connect } from 'react-redux';
import { ProgressAction } from 'services/users/user/actions';
import { AdminService } from 'services/AdminService/AdminService';

class HomePage extends React.PureComponent {
  componentDidMount() {
    this.getCateList();
  }

  getCateList = () => {
    this.props.showProgressTurn();
    AdminService.getCateList({}, res => {
      this.props.hideProgressTurn();
      console.log(res);
    }, this.props.hideProgressTurn);
  }

  render() {
    return (
      <div className="home-page">
        <h1>HOME PAGE</h1>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  showProgressTurn: () => dispatch({ type: ProgressAction.SHOW_PROGRESS }),
  hideProgressTurn: () => dispatch({ type: ProgressAction.HIDE_PROGRESS }),
});

export default connect(null, mapDispatchToProps)(HomePage);
