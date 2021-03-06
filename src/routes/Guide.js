
import styles from './Guide.css';
import React, { Component } from 'react'
import { Input, Table, Pagination, message, Button } from 'antd';
import axios from "axios"
import qs from 'qs';

import { Link } from 'dva/router';

class Guide extends Component {
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
    axios.post('/newlineage/api/showAnnouncement', qs.stringify({
      current: 1,
      pageSize: 10,
      type: 2
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
    const columns = [{
      key: 'item',
      render: (text, record) => <Link to="/Article"><a href="#">{record.item}</a></Link>,
    },
    {
      className: styles.alignCenter,
      dataIndex: 'date',
      key: 'date'
    }];


    return (
      <div className={styles.normal}>
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
        <Button type="primary"><Link to="/addAnnouncement">写公告</Link></Button>
      </div>
    );
  }
}


export default Guide;
