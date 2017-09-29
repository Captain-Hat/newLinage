import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { message } from 'antd';
import styles from './Login.css';
import LoginForm from '../components/LoginForm.js';
import CookieTool from './share/cookie';
import { hashHistory } from 'react-router';
import axios from "axios";
import qs from 'qs';
function Login({ dispatch }) {

  function sumit(values) {

    // let accessInfo = {
    //   access: '2',
    //   userName: 'ylb'
    // }
    // // 设置cookie
    // CookieTool.setCookie('accessInfo', accessInfo)
    // dispatch({
    //   type: 'main/changeLogin',
    //   payload: { accessInfo },
    // });
    // // 回到首页
    // hashHistory.push('/')
    axios.post('/newlineage/api/LoginServlet',
      qs.stringify(values), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }

    )
      .then((res) => {
        message.success('登录成功')
        let accessInfo = {
          access: res.data.access_level,
          userName: values.login
        }
        // 设置cookie
        CookieTool.setCookie('accessInfo', accessInfo)
        dispatch({
          type: 'main/changeLogin',
          payload: { accessInfo },
        });
        // 回到首页
        hashHistory.push('/')
      })
      .catch((err) => {
        message.warning("请求错误");
      });
  }

  return (
    <div className={styles.normal}>
      <LoginForm onOk={sumit} />
    </div>
  );
}

Login.propTypes = {
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Login);
