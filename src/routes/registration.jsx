import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import styles from './registration.less';
import RegistForm from '../components/RegistForm.js';

function registration({
  dispatch
}) {
  function sumit(values) {
    dispatch({
      type: 'registration/sumit',
      payload: values,
    });
  }
  return (
    <div className={styles.normal}>
      <RegistForm onOk={sumit} />
    </div>
  );
}

registration.propTypes = {
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(registration);
