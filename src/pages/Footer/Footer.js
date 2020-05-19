import React from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/fontawesome-free-solid';
import logo_vnpt from 'assets/img/logo-vnpt.png';

const Footer = () => (
  <div className="footer">
    <div className="footer__left">
      <FontAwesomeIcon
        color="#385898"
        className="footer__icon mr-3"
        icon={faMapMarkerAlt}
        size="2x"
      />
      <div>
        TỔNG CÔNG TY TRUYỀN THÔNG VNPT-MEDIA <br />
        57A HUỲNH THÚC KHÁNG, QUẬN ĐỐNG ĐA, HÀ NỘI, VIỆT NAM
      </div>
    </div>

    <div className="footer__right">
      <span className="footer__title">Sản phẩm của VNPT</span>
      <img
        src={logo_vnpt}
        className="footer__logo"
        alt="logo-vnpt"
      />
    </div>
        
  </div>
);

export default Footer;
