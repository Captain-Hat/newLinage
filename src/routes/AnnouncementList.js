
import styles from './AnnouncementList.less';
import React, { Component } from 'react'
import { Input, Table, Pagination, message, Button, Menu, Dropdown, Icon } from 'antd';
import { Link } from 'dva/router';
import axios from "axios";
import qs from 'qs';
import { hashHistory } from 'react-router'
class AnnouncementList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      agreement: false,
      tableDataSource: [],
      currentType: "1",
      currentId: '',
      currentRowData: {}
    };
    this.page = {
      current: 1,
      pageSize: 10,
      total: 100
    }
  }
  loadData(param = {}) {
    this.setState({
      tableDataSource: [],
      tableLoading: true,
    })
    const newParam = Object.assign({
      current: this.page.current,
      pageSize: this.page.pageSize,
      type: this.state.currentType
    }, param)
    axios.post('/newlineage/api/showAnnouncement', qs.stringify(newParam), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
      .then((res) => {
        let data = res.data
        this.page.total = data.option.total;
        this.page.current = newParam.current;
        this.page.pageSize = newParam.pageSize;
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
  handleArticle(item) {
    if (item.key == '1') {
      //  编辑
      hashHistory.push({
        pathname: '/addAnnouncement',
        state: this.state.currentRowData
      }
      )
    } else {
      axios.post('/newlineage/api/noticemanger',
        qs.stringify({
          item_id: this.state.currentId,
          action: item.key
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }

      )
        .then((res) => {
          message.success('操作成功')
          this.loadData({ current: 1 })
        })
        .catch((err) => {
          message.warning("请求错误");
        });
    }

  }
  getCurrentId(record, index) {
    this.setState({
      currentId: record.id,
      currentRowData: record
    })
  }
  changeItem(item) {
    this.setState({
      currentType: item.key
    })
    this.loadData({ type: item.key, current: 1 })
  }
  render() {
    const menu = (
      <Menu
        onClick={this.handleArticle.bind(this)}
      >
        <Menu.Item key="1">
          编辑
        </Menu.Item>
        <Menu.Item key="2">
          置顶
        </Menu.Item>
        <Menu.Item key="3">
          删除
        </Menu.Item>
        <Menu.Item key="4">
          取消置顶
        </Menu.Item>
      </Menu>
    );
    const span = <span className={styles.articlePre}>[置顶]</span>
    const columns = [{
      className: styles.item,
      key: 'item',
      render: (text, record) => <Link to={{ pathname: '/article', state: { id: record.id } }} >{record.istop == '1' ? span : null}{record.item ? record.item : '无标题'}</Link>,
    },
    {
      className: styles.alignCenter,
      dataIndex: 'date',
      key: 'date'
    },
    {
      className: styles.handle,
      key: 'handle',
      render: (text, record) => {
        return <Dropdown overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link" href="#">
            <Icon type="down" />
          </a>
        </Dropdown>
      }
    },
    ];


    return (
      <div className={styles.normal}>
        <Menu
          className={styles.menu}
          theme="dark"
          mode="horizontal"
          selectedKeys={[this.state.currentType]}
          onClick={this.changeItem.bind(this)}
        >
          <Menu.Item key="1">
            <a href="javascript:;">综合公告</a>
          </Menu.Item>
          <Menu.Item key="2">
            <a href="javascript:;">游戏说明</a>
          </Menu.Item>
          <Menu.Item key="3">
            <a href="javascript:;">活动</a>
          </Menu.Item>
          <Menu.Item key="4">
            <a href="javascript:;">更新与修复</a>
          </Menu.Item>
        </Menu>
        <Table
          onRowClick={this.getCurrentId.bind(this)}
          className="announcement"
          dataSource={this.state.tableDataSource}
          columns={columns}
          rowKey={record => record.id}
          showHeader={false}
          pagination={{ pageSize: this.page.pageSize, current: this.page.current, total: this.page.total, showSizeChanger: true, showQuickJumper: true }}
          onChange={(pagination, filters, sorter) => {
            const newParam = { current: pagination.current, pageSize: pagination.pageSize }
            this.loadData(newParam);
            this.page.pageSize = pagination.pageSize
            this.page.current = pagination.current
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
