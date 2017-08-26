import React from 'react';
import { connect } from 'dva';
import styles from './Forum.css';

function Forum() {
  return (
    <div className={styles.normal}>
      Route Component: Forum
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Forum);
