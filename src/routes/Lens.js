import React from 'react';
import { connect } from 'dva';
import styles from './Lens.css';

function Lens() {
  return (
    <div className={styles.normal}>
      Route Component: Lens
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Lens);
