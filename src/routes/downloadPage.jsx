
import PropTypes from 'prop-types';
import { Button, message } from 'antd';
import styles from './downloadPage.less';
import React, { Component } from 'react'
import axios from "axios";
class downloadPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [{}, {}, {}],
    };

  }
  download(url) {
    window.open(url)
  }
  componentDidMount() {
    axios.get('/newlineage/api/urlServlet', {
      params: {
      }
    }).then((res) => {
      this.setState({
        urls: res.data.data
      })

    })
      .catch((err) => {
        message.warning("请求错误");
      });
  }

  render() {
    let [url1, url2, url3] = [this.state.urls[0].url, this.state.urls[1].url, this.state.urls[2].url]
    return (
      <div className={styles.normal}>
        <div className={styles.container}>
          <div style={{ marginBottom: "20px" }}>
            <Button style={{ width: "200px" }} type="primary" size='large'><a target="_blank"
              onClick={this.download.bind(null, url1)}>客户端(包括登陆器)--百度云</a></Button>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <Button style={{ width: "200px" }} type="primary" size='large'><a target="_blank"
              onClick={this.download.bind(null, url2)}>登陆器--百度云</a></Button>
          </div>
          <div>
            <Button style={{ width: "200px" }} type="primary" size='large'><a target="_blank"
              onClick={this.download.bind(null, url3)}>虚拟机--百度云</a></Button>
          </div>
        </div>
      </div>
    );
  }
}

export default downloadPage

