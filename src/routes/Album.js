import React from 'react';
import { connect } from 'dva';
import styles from './Album.css';

function Album() {
  return (
    <div className={styles.normal}>
      Route Component: Album
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Album);
