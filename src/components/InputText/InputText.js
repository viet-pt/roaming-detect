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
    const { value, placeholder, extensionClass } = this.props;
    return (
      <div className="input-text">
        <input
          type="text"
          className={extensionClass}
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
  value: PropTypes.string,
  handleOnChange: PropTypes.func,
  onEnter: PropTypes.func
};

InputText.defaultProps = {
  value: '',
  handleOnChange: () => {},
  onEnter: () => {}
};

export default InputText;
