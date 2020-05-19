import React from 'react';
import { compose, withProps } from 'recompose';
import './style.scss';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap as ReactGoogleMap,
  Marker } from 'react-google-maps';

class GoogleMap extends React.PureComponent {

  handleOnChange = () => {

  }

  render() {
    const { isMarkerShown } = this.props;
    return (
      <ReactGoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
      >
        {isMarkerShown && <Marker position={{ lat: 21.019, lng: 105.807 }} />}
      </ReactGoogleMap>
    );
  }
}

const enhance = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '500px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,
);

export default enhance(GoogleMap);
