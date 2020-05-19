import React from 'react';
import './style.scss';
import { connect } from 'react-redux';
import { ProgressAction } from 'services/users/user/actions';
import HomeHeader from './Component/HomeHeader';
import SimpleMap from './Component/SimpleMap';
// import GoogleMap from './Component/GoogleMap';
class HomePage extends React.PureComponent {
  state = {
    isMarkerShown: true,
    locationList: [
      {
        lat: 21.019051,
        lng: 105.809652,
      },
      {
        lat: 21.026081,
        lng: 105.812581,
      },
      {
        lat: 21.026001,
        lng: 105.821765,
      },
      {
        lat: 21.013302, 
        lng: 105.819426,
      },
    ],
  }

  componentDidMount() {
    // const script = document.createElement("script");
    // const YOUR_API_KEY = 'AIzaSyA1nvR3azrYqsmyemL1DLRt_1QhTvR45So';
    // script.src = `https://maps.googleapis.com/maps/api/js?key=${YOUR_API_KEY}`;
    // script.async = true;
    // script.defer = true;
    // document.body.appendChild(script);
  }

  render() {
    const { locationList } = this.state;
    return (
      <div className="home-page">
        <HomeHeader />
        {/* <GoogleMap
          isMarkerShown={isMarkerShown}
        /> */}
        <SimpleMap locationList={locationList} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  showProgressTurn: () => dispatch({ type: ProgressAction.SHOW_PROGRESS }),
  hideProgressTurn: () => dispatch({ type: ProgressAction.HIDE_PROGRESS }),
});

export default connect(null, mapDispatchToProps)(HomePage);
