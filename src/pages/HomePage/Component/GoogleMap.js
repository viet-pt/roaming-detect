import React from 'react';
import { compose, withProps } from 'recompose';
import './style.scss';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap as ReactGoogleMap,
  Polyline
} from 'react-google-maps';
import GoogleMaker from './GoogleMaker';

class GoogleMap extends React.PureComponent {

  render() {
    const { locationList } = this.props;
    return (
      <ReactGoogleMap>
        {locationList.map((item, index) => (
          <div key={index}>
            <GoogleMaker item={item} index={index} />
          </div>
        ))}
        <Polyline path={locationList} />
      </ReactGoogleMap>
    );
  }
}

const enhance = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDnXwhhg8SfyNqOzPcFJvW3NywvXoRPRww&libraries=drawing,places,geometry',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '85vh' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,
);

ReactGoogleMap.defaultProps = {
  defaultCenter: {
    lat: 21.019051,
    lng: 105.809652,
  },
  defaultZoom: 15,
};

export default enhance(GoogleMap);
