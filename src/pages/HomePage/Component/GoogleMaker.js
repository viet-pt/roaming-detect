import React from 'react';
import './style.scss';
import {
  Marker,
  InfoWindow
} from 'react-google-maps';

class GoogleMaker extends React.PureComponent {
  state = {
    showingInfo: false,
  };

  onMarkerClick = (value) => {
    this.setState({
      showingInfo: value
    });
  }

  render() {
    const { item, index } = this.props;
    const { showingInfo } = this.state;
    return (
      <>
        <Marker
          position={{ lat: item.lat, lng: item.lng }}
          onClick={() => this.onMarkerClick(true)}
          label={`${index + 1}`}
        />
        {showingInfo &&
          <InfoWindow position={{lat: item.lat, lng: item.lng}}
            onCloseClick={() => this.onMarkerClick(false)}>
            <table className="info">
              <tr className="info__header">
                <td colspan="2">Thông tin vị trí</td>
              </tr>

              <tr>
                <td>Kinh độ</td>
                <td>{item.lng}</td>
              </tr>

              <tr>
                <td>Vĩ độ</td>
                <td>{item.lat}</td>
              </tr>

              <tr>
                <td>Thời gian</td>
                <td>{item.time}</td>
              </tr>

              <tr>
                <td>Địa chỉ</td>
                <td>{item.DST_DEST}</td>
              </tr>
            </table>
          </InfoWindow>
        }
      </>
    );
  }
}

export default GoogleMaker;
