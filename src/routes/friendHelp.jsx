import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Checkbox, Modal } from 'antd';
import styles from './friendHelp.less';
import axios from "axios";
const confirm = Modal.confirm;
let url;
class friendHelp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      agreement: false,
    };
  }
  changeSelect = (e) => {
    this.setState({
      agreement: e.target.checked
    })
  }
  moneyHelp = () => {
    if (this.state.agreement) {
      window.open(url)
    } else {
      this.warning()
    }
  }
  componentDidMount = () => {
    axios.get('/newlineage/api/urlServlet', {
      params: {
      }
    }).then((res) => {
      url = res.data.data[3].url
    })
      .catch((err) => {
        message.warning("请求错误");
      });
  }
  warning = () => {
    Modal.warning({
      title: '捐赠须知',
      content: '请阅读协议并同意后再捐赠，如不同意，请离开。',
    });
  }
  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.text}>
          <p>1.捐赠行为纯属玩家自愿行为，如非自愿请您立即关闭网页离开，捐赠费用仅用于服务器的维护和服务器代码研究的日常支出。</p>
          <p>2.服务器为免费测试服，您不捐赠也能很好的测试游戏，我们也会想办法继续维持下去。</p>
          <p>3.捐赠币仅能用来购买一些不破坏游戏平衡的游戏道具，详情请看详细的服务器设置。</p>
          <p>4.捐赠币获得比率为1捐赠币/1元。</p>
          <p>5.捐赠币仅能用于兑换本测试服的游戏道具，不能兑换现金，不能进行转账交易，不能购买本测试服外的其他东西。</p>
          <div style={{ paddingTop: "50px" }}>
            <Checkbox
              onChange={this.changeSelect}
            >
              我同意以上条款
          </Checkbox></div>
          <div style={{ textAlign: "center", paddingTop: "50px" }}>
            <Button type="primary" size="large" onClick={this.moneyHelp}>捐赠</Button>
          </div>
        </div>

      </div>
    )
  }
}

export default friendHelp;


