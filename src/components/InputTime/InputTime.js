import React from 'react';
import './style.scss';
import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';

class InputTime extends React.PureComponent {
  onChangeDate = (date, dateString) => {
    this.props.onChangeDate(dateString);
  }

  onChangeTime = (date, dateString) => {
    this.props.onChangeTime(dateString);
  }

	render() {
    const { title, customClass, defaultTime } = this.props;
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
            defaultValue={moment(defaultTime, 'HH:mm:ss')}
          />
        </div>
      </div>
	  );
	}
}

InputTime.propTypes = {
  title: PropTypes.string,
  defaultTime: PropTypes.string
};

InputTime.defaultProps = {
  defaultTime: '00:00:00'
};

export default InputTime;
