import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Modal, message } from 'antd';
import { Link } from 'dva/router';
import styles from './header.less';
import { connect } from 'dva';
import logo from '../../assets/logo.png';
import CookieTool from '../../routes/share/cookie.js';
import axios from "axios";
import { hashHistory } from 'react-router';
const confirm = Modal.confirm;
function Header({ dispatch, location, accessInfo }) {
  console.log(location)
  const changeSelect = ({ item, key, keyPath }) => {
    dispatch({
      type: 'main/changeActive',
      payload: {
        location: { pathname: key }
      },
    });
  }
  const logout = () => {

    confirm({
      title: '提示',
      content: '您确定退出登录吗？',
      onOk() {
        // 清除cookie
        axios.get('/newlineage/api/LoginServlet', {
          params: {
          }
        }).then((res) => {
          if (res.data.errcode == '100') {
            // 发布成功跳到列表
            message.success("退出成功！");
            CookieTool.delCookie()
            dispatch({
              type: 'main/changeLogin',
              payload: {
                accessInfo: {
                  access: '',
                  userName: ''
                }
              },
            });
            // 回到首页
            hashHistory.push('/')
          }
        })
          .catch((err) => {
            message.warning("请求错误");
          });

      },
      onCancel() {
      },
    });

  }
  return (
    <div style={{ position: 'relative' }}>
      <header className={styles.normal}>
        <Menu
          className={styles.menu}
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          onClick={changeSelect}
        >
          <Menu.Item key="/logo">
            <div className={styles.logo}>
              <Link to="/"><img src={logo} alt="" /></Link>
            </div>
          </Menu.Item>
          <Menu.Item key="/home">
            <Link to="/"><span>首页</span></Link>
          </Menu.Item>
          <Menu.Item key="/registration">
            <Link to="/registration">账号注册</Link>
          </Menu.Item>
          {/* <Menu.Item key="/forum">
          <Link to="/forum">论坛</Link>
        </Menu.Item> */}
          <Menu.Item key="/announcementList">
            <Link to="/announcementList">公告栏</Link>
          </Menu.Item>
          <Menu.Item key="/lens">
            <Link to="/lens">透视镜</Link>
          </Menu.Item>
          {/* <Menu.Item key="/market">
          <Link to="/market">拍卖行</Link>
        </Menu.Item> */}
          <Menu.Item key="/downloadPage">
            <Link to="/downloadPage">下载中心</Link>
          </Menu.Item>
          <Menu.Item key="/friendHelp">
            <Link to="/friendHelp">友情赞助</Link>
          </Menu.Item>
          <Menu.Item key="/aboutUs">
            <Link to="/aboutUs">关于我们</Link>
          </Menu.Item>
          {/* <Menu.Item key="/album">
          <Link to="/album">精彩截图</Link>
        </Menu.Item> */}
          {
            accessInfo.userName
              ?
              <Menu.Item key="/login" style={{ paddingRight: "0", paddingLeft: "60px" }}>
                <span>
                  <a href="javascript:;" onClick={logout}>退出</a>
                </span>
              </Menu.Item>
              :
              <Menu.Item key="/login" style={{ paddingRight: "0", paddingLeft: "60px" }}>
                <Link to="/login">登录</Link>
              </Menu.Item>
          }

          {/* <Menu.Item key="/logout" style={{ paddingLeft: "0", marginLeft: "8px" }}>
          <a>登出</a>
        </Menu.Item> */}
        </Menu>
      </header>
      {
        accessInfo.userName
          ?
          <span className={styles.userName}>{accessInfo.userName}</span>
          :
          null
      }
    </div>
  );
}

Header.propTypes = {
  location: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  const { location, accessInfo } = state.main;
  return {
    location,
    accessInfo
  };
}
export default connect(mapStateToProps)(Header);  
