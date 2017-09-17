
import styles from './Lens.css';
import React, { Component } from 'react'
import { Input, Table, Pagination, message, Menu } from 'antd';
import axios from "axios";
import qs from 'qs';

import { routerRedux, Link } from 'dva/router';

const menuItems = [
  { parent: "武器", children: ["匕首", "单手剑", "双手剑", "双刀", "矛", "魔杖", "钝器", "钢爪", "弓", "铁手", "甲奇", "古兽", "锁链剑"] },
  { parent: "防具", children: ["头盔", "斗篷", "T恤", "盔甲", "手套", "鞋子", "盾牌", "项链", "戒指", "皮带", "耳环", "臂甲"] },
  { parent: "怪物", children: [] },
  { parent: "其他", children: [] },
]
class LensList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      agreement: false,
      tableDataSource: [],
      selectedKeys: "武器",
      subselectedKeys: "",
      subMenu: []
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
    axios.post('/api/equipList', qs.stringify({
      type: "武器",
      species: "匕首",
      current: 1,
      pageSize: 10,
    })
    )
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
    this.getItems('武器')
  }
  changeItem(sub, item) {
    if (sub) {
      this.setState({ subselectedKeys: item.key })
    } else {
      this.setState({ selectedKeys: item.key })
      this.getItems(item.key)
    }
  }
  getItems(key) {
    let subItems = []
    menuItems.map((v, k) => {
      if (v.parent == key) {
        v.children.map((_v, _k) => {
          subItems.push(
            <Menu.Item key={_v}>
              <a href="javascript:;">{_v}</a>
            </Menu.Item>
          )
        })
        this.setState({
          subselectedKeys: v.children[0],
          subMenu: subItems
        })

      }
    })

  }
  getdetail() {
    // routerRedux.push('/equipDetail')
    // dispatch(routerRedux.push('/equipDetail'));
  }
  render() {
    const columns = [{
      className: styles.leftCol,
      key: 'item',
      render: (text, record) => <img src={record.img} alt="" />,
    },
    {
      className: styles.rightCol,
      key: 'desc',
      render: (text, record) => <Link to="/equipDetail?id=1">{record.desc}</Link>
    }];


    return (
      <div className={styles.normal}>
        <Menu
          className={styles.menu}
          theme="dark"
          mode="horizontal"
          selectedKeys={[this.state.selectedKeys]}
          onClick={this.changeItem.bind(this, false)}
        >
          <Menu.Item key="武器">
            <a href="javascript:;">武器</a>
          </Menu.Item>
          <Menu.Item key="防具">
            <a href="javascript:;">防具</a>
          </Menu.Item>
          <Menu.Item key="怪物">
            <a href="javascript:;">怪物</a>
          </Menu.Item>
          <Menu.Item key="其他">
            <a href="javascript:;">其他</a>
          </Menu.Item>
        </Menu>
        <Menu
          className={styles.submenu}
          theme="dark"
          mode="horizontal"
          selectedKeys={[this.state.subselectedKeys]}
          onClick={this.changeItem.bind(this, true)}
        >
          {this.state.subMenu}
        </Menu>
        <Table
          className="equipment"
          dataSource={this.state.tableDataSource}
          columns={columns}
          rowKey={record => record.id}
          showHeader={false}
          bordered={true}
          pagination={{ pageSize: this.page.pageSize, current: this.page.pageNumber, total: this.page.total, showSizeChanger: true, showQuickJumper: true }}
          onChange={(pagination, filters, sorter) => {
            const newParam = { pageNumber: pagination.current, pageSize: pagination.pageSize }
            this.loadData(newParam);
            this.page.pageSize = pagination.pageSize
            this.page.pageNumber = pagination.current
          }}

        />
      </div>
    );
  }
}


export default LensList;
