import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';
class InputText extends React.PureComponent {

  handleOnChange = (e) => {
    const { value } = e.target;
    this.props.handleOnChange(value);
  }

  handleOnKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.props.onEnter();
    }
  }

  render() {
    const { value, placeholder, extension, title, customClass, isNumber } = this.props;
    return (
      <div className={`input-text ${customClass || ''}`}>
        {title && <span className="mr-2 input-text__title">{title}</span>}
        <input
          type={isNumber ? "number": "text"}
          className={extension}
          value={value}
          placeholder={placeholder}
          onChange={this.handleOnChange}
          onKeyDown={this.handleOnKeyDown}
        />
      </div>
    );
  }
}

InputText.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  isNumber: PropTypes.bool,
  handleOnChange: PropTypes.func,
  onEnter: PropTypes.func,
};

InputText.defaultProps = {
  value: '',
  isNumber: false,
  handleOnChange: () => {},
  onEnter: () => {},
};

export default InputText;
