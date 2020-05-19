import React from 'react';
import './style.scss';

const Footer = () =>  {
  return (
    <div className="footer">
      <div className="container">
        {/* <img src={logo_vnpt} className="footer__logo" alt="logo-vnpt" /> */}
        <div className="footer__content ">
          <div> Cơ quan chủ quản: Tổng công ty Truyền thông VNPT-Media </div>
          <div>Địa chỉ: Số 57A phố Huỳnh Thúc Kháng, Phường Láng Hạ, Quận Đống Đa, Thành phố Hà Nội, Việt Nam.</div>
          <div>ĐKKD: 0106873188 do Sở KH-DT cấp ngày 12/06/2015</div>
          <div>Giấy phép mạng xã hội số: 301/GP-BTTTT do Bộ Thông tin và Truyền thông cấp ngày 30/06/2017</div>
          <div>Email: vnptmedia@vnpt.vn Điện thoại: 02437722728 Fax: 02437722733</div>
          <div>&copy; Toàn bộ bản quyền thuộc VNPT</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
