import React from 'react';
import PropTypes from 'prop-types';
import {
  connect
} from 'dva';
import { Button } from 'antd';
import styles from './downloadPage.less';

function downloadPage({
  location
}) {
  function download(url) {
    window.open(url)
  }

  return (
    <div className={styles.normal}>
      <div className={styles.container}>
        <div style={{ marginBottom: "20px" }}>
          <Button cstyle={{ width: "200px" }} type="primary" size='large'><a target="_blank"
            onClick={download.bind(null, 'http://www.baidu.com')}>客户端(包括登陆器)--百度云</a></Button>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <Button style={{ width: "200px" }} type="primary" size='large'><a target="_blank"
            onClick={download.bind(null, 'http://www.qq.com')}>登陆器--百度云</a></Button>
        </div>
        <div>
          <Button style={{ width: "200px" }} type="primary" size='large'><a target="_blank"
            onClick={download.bind(null, 'http://www.qq.com')}>虚拟机--百度云</a></Button>
        </div>
      </div>
    </div>
  );
}

downloadPage.propTypes = {
  location: PropTypes.object.isRequired
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(downloadPage);
