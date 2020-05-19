import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { HOME_PAGE } from 'global/routes';

class NavButton extends React.PureComponent {

	render() {
	  const { item, cateId } = this.props;
	  return (
      <>
        <div className={`position-relative nav-btn ${cateId === item.cateId ? 'nav-active' : ''}`}>
          <Link to={{pathname: `${HOME_PAGE}${item.url}`, state: item }} className="nav-btn__title">
            {item.name}
          </Link>
        </div>
      </>
	  );
	}
}

NavButton.propTypes = {
  title: PropTypes.string
};

NavButton.defaultProps = {
  title: ''
};

export default NavButton;
