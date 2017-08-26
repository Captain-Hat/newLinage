import React from 'react';
import { connect } from 'dva';
import styles from './Market.css';

function Market() {
  return (
    <div className={styles.normal}>
      Route Component: Market
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Market);
