import React, { Component } from 'react'
import { connect } from 'dva';
import { message } from 'antd';
import styles from './Article.less';
import axios from "axios";
import qs from 'qs';
import moment from 'moment'
class Article extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  loadData(param) {
    axios.get('/newlineage/api/getdetail', {
      params: {
        item_id: this.props.location.state.id,
        type: 'web_notice'
      }
    })
      .then((res) => {
        let typeText = {
          '1': "综合公告",
          '2': "游戏说明",
          '3': "活动",
          '4': "更新与修复",
        }
        this.setState({
          date: moment(res.data.data[0].date).format('YYYY-MM--DD'),
          content: res.data.data[0].content,
          title: res.data.data[0].item,
          type: typeText[res.data.data[0].type],
        })
      })
      .catch((err) => {
        message.warning("请求错误");
      });
  }

  componentDidMount() {
    this.loadData()
  }

  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.head}>
          <h2 dangerouslySetInnerHTML={{ __html: this.state.title }}></h2>
          <div className={styles.tipHolder}>
            <span className={styles.tip}>作者： GM</span>
            <span className={styles.tip}>日期：{this.state.date}</span>
            <span className={styles.tip}>分类： {this.state.type}</span>
          </div>
        </div>
        <div className={styles.body} dangerouslySetInnerHTML={{ __html: this.state.content }}>
        </div>
        {/* <div className={styles.footer}>
          <a className={styles.pre} href="javascript:;">《 上一篇</a>
          <a className={styles.next} href="javascript:;">下一篇 》 </a>
        </div> */}
      </div>
    )
  }
}

export default Article