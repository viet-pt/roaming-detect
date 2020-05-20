import React from 'react';
import './style.scss';
import { DatePicker, TimePicker } from 'antd';
// import moment from 'moment';

class InputTime extends React.PureComponent {
  onChangeDate = (date, dateString) => {
    this.props.onChangeDate(dateString);
  }

  onChangeTime = (date, dateString) => {
    this.props.onChangeTime(dateString);
  }

	render() {
    const { title, customClass } = this.props;
	  return (
      <div className={`input-time ${customClass || ''}`}>
        <div className="input-time__title">{title}</div>
        <div className="input-time__content">
          <DatePicker
            onChange={this.onChangeDate}
            className="mb-1"
            format="DD-MM-YYYY"
            placeholder="Chọn ngày"
          />
          <TimePicker
            onChange={this.onChangeTime}
            placeholder="Chọn giờ"
            // defaultValue={moment('00:00:00', 'HH:mm:ss')}
          />
        </div>
      </div>
	  );
	}
}

export default InputTime;
