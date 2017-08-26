import React from 'react';
import { connect } from 'dva';
import styles from './Guide.css';

function Guide() {
  return (
    <div className={styles.normal}>
      Route Component: Guide
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Guide);
