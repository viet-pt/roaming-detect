import React from 'react';
import GoogleMapReact from 'google-map-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/fontawesome-free-solid';

const AnyReactComponent = ({ key }) => (
  <div
    className="my-location"
    key={key}
  >
    <FontAwesomeIcon
      color="red"
      icon={faMapMarkerAlt}
      size="2x"
    />
  </div>
);

class SimpleMap extends React.PureComponent {

  handleApiLoaded = (map, maps) => {
    // use map and maps objects
  };
 
  render() {
    const { locationList } = this.props;
    return (
      <div style={{ height: '85vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyA1nvR3azrYqsmyemL1DLRt_1QhTvR45So' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
        >
          {locationList.map((item, index) => (
            <AnyReactComponent
              key={index}
              lat={item.lat}
              lng={item.lng}
            />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}

SimpleMap.defaultProps = {
  center: {
    lat: 21.019051,
    lng: 105.809652,
  },
  zoom: 15,
};
 
export default SimpleMap;
