import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';

const loadJS = function (src) {
  var ref = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
}
class SimpleMap extends React.PureComponent {
  
  componentDidMount() {
    window.initMap = this.initMap;
    const YOUR_API_KEY = 'AIzaSyDnXwhhg8SfyNqOzPcFJvW3NywvXoRPRww';
    loadJS(`https://maps.googleapis.com/maps/api/js?key=${YOUR_API_KEY}&callback=initMap`);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.locationList !== this.props.locationList) {
      this.initMap(this.props.locationList[0]);
    }
  }

  initMap = (item) => {
    const google = window.google;
    const map = new google.maps.Map(ReactDOM.findDOMNode(this.refs.map), {
      zoom: 15,
      center: {
        lat: item ? item.lat : 21.019051,
        lng: item ? item.lng : 105.809652
      }
    });

    this.getMaker(map);
    this.drawLines(google, map);
  }

  drawLines = (google, map) => {
    const newLines = [];
    const { locationList } = this.props;

    if (locationList.length === 0) {
      return;
    }
    
    for (let i = 0; i < locationList.length - 1; i++) {
      const line = new google.maps.Polyline({
        path: locationList.slice(i, i + 2),
        strokeColor: '#f33030',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        icons: [{
          icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW},
          offset: '60%',
        }]
      });
      line.setMap(map);
      newLines.push(line);
    }
  }

  getInfoWindow = (index) => {
    const google = window.google;
    const item = this.props.locationList[index];
    const contentString =
      `<table>
      <thead>
        <tr>
          <td colSpan="2">Thông tin vị trí</td>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Kinh độ</td>
          <td>${item.lng}</td>
        </tr>

        <tr>
          <td>Vĩ độ</td>
          <td>${item.lat}</td>
        </tr>

        <tr>
          <td>Thời gian</td>
          <td>${item.lastUpdate}</td>
        </tr>

        <tr>
          <td>Địa chỉ</td>
          <td>${item.addr}</td>
        </tr>
      </tbody>
    </table>`

    const infoWindow = new google.maps.InfoWindow({
      content: contentString
    });
    return infoWindow;
  }

  getMaker = (map) => {
    const { locationList } = this.props;
    const google = window.google;
    
    for (let i = 0; i < locationList.length; i++) {
      const item = locationList[i];
      const marker = new google.maps.Marker({
        position: {
          lat: item.lat,
          lng: item.lng
        },
        map,
        title: `${i + 1}`
      });
      
      const infowindow = this.getInfoWindow(i);
      marker.addListener('click', () => {
        infowindow.open(map, marker);
      });

      google.maps.event.addListener(map, "click", () => {
        infowindow.close();
      });
    }
  }

  render() {
    return (
      <>
        <div ref="map" style={{height: '85vh', width: '100%'}}></div>
      </>
    );
  }
}

export default SimpleMap;
