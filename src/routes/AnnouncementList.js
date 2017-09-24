
import styles from './AnnouncementList.less';
import React, { Component } from 'react'
import { Input, Table, Pagination, message, Button, Menu } from 'antd';
import { Link } from 'dva/router';
import axios from "axios";
import qs from 'qs';

class AnnouncementList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      agreement: false,
      tableDataSource: []
    };
    this.page = {
      pageNumber: 1,
      pageSize: 10,
      total: 100
    }
  }
  loadData(param) {
    this.setState({
      tableDataSource: [],
      tableLoading: true,
    })
    param = param || {};
    const newParam = Object.assign({
      pageNumber: this.page.pageNumber,
      pageSize: this.page.pageSize
    }, param)
    axios.post('/api/showAnnouncement', qs.stringify({
      current: 1,
      pageSize: 10,
      type: 1
    }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
      .then((res) => {
        let data = res.data
        this.page.total = data.option.total;
        this.setState({
          tableLoading: false,
          tableDataSource: data.data
        })
      })
      .catch((err) => {
        this.setState({
          tableLoading: false,
          tableDataSource: [],
        })
        message.warning("请求错误");
      });
  }
  componentDidMount() {
    this.loadData()
  }
  render() {
    const span = <span className={styles.articlePre}>[置顶]</span>
    const columns = [{
      className: styles.item,
      key: 'item',
      render: (text, record) => <Link to="/Article"><a href="#">{span}{record.item}</a></Link>,
    },
    {
      className: styles.alignCenter,
      dataIndex: 'date',
      key: 'date'
    }];


    return (
      <div className={styles.normal}>
        <Menu
          className={styles.menu}
          theme="dark"
          mode="horizontal"
        // selectedKeys={[this.state.selectedKeys]}
        //onClick={this.changeItem.bind(this, false)}
        >
          <Menu.Item key="etcitem">
            <a href="javascript:;">综合公告</a>
          </Menu.Item>
          <Menu.Item key="weapon">
            <a href="javascript:;">游戏说明</a>
          </Menu.Item>
          <Menu.Item key="armor">
            <a href="javascript:;">活动</a>
          </Menu.Item>
          <Menu.Item key="update">
            <a href="javascript:;">更新与修复</a>
          </Menu.Item>
        </Menu>
        <Table
          className="announcement"
          dataSource={this.state.tableDataSource}
          columns={columns}
          rowKey={record => record.id}
          showHeader={false}
          pagination={{ pageSize: this.page.pageSize, current: this.page.pageNumber, total: this.page.total, showSizeChanger: true, showQuickJumper: true }}
          onChange={(pagination, filters, sorter) => {
            const newParam = { pageNumber: pagination.current, pageSize: pagination.pageSize }
            this.loadData(newParam);
            this.page.pageSize = pagination.pageSize
            this.page.pageNumber = pagination.current
          }}

        />
        <div className={styles.btnBox}>
          <Button type="primary"><Link to="/addAnnouncement">写公告</Link></Button>
        </div>
      </div>
    );
  }
}


export default AnnouncementList;
