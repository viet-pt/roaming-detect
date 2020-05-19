import React from 'react';
import './style.scss';
import Spin from 'antd/es/spin';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

const ProgressTurn = (props) => (
  <>
    <Modal
      show={props.loading > 0}
      className="progress"
    >
      <Spin size="large" />
    </Modal>
  </>
);

const mapStateToProps = state => ({
  loading: state.loading.loading,
});

export default connect(mapStateToProps)(ProgressTurn);
