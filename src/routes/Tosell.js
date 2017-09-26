
import styles from './Tosell.less';
import React, { Component } from 'react'
import { Input, Table, Pagination, message, Menu, Button, Tooltip } from 'antd';
import axios from "axios";
import { routerRedux, Link } from 'dva/router';
import rmb from "../assets/rmb.png";
import gb from "../assets/gb.png";

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
    axios.post('/newlineage/api/users', {
      firstName: 'Fred',
      lastName: 'Flintstone'
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
      title: "装备",
      className: styles.textCenter,
      key: 'item',
      render: (text, record) => <img src={record.img} alt="" />,
    },
    {
      title: "名称",
      key: "name",
      dataIndex: "name"
    },
    {
      title: "价格",
      key: "price",
      dataIndex: "price"
    },
    {
      title: "寄售人",
      key: "owner",
      dataIndex: "owner"
    },
    {
      title: "购买",
      className: styles.textCenter,
      key: 'handle',
      render: (text, record) => <Link to="/equipDetail?id=1"><Button>购买</Button></Link>
    }];


    return (
      <div className={styles.normal}>
        <div className={styles.switch}>

        </div>

        <Menu
          className={styles.menu}
          theme="dark"
          mode="horizontal"
          selectedKeys={[this.state.selectedKeys]}
          onClick={this.changeItem.bind(this, false)}
        >
          <Menu.Item key="武器">
            <a href="javascript:;">仓库物品</a>
          </Menu.Item>
          <Menu.Item key="防具">
            <a href="javascript:;">正在出售</a>
          </Menu.Item>
          <Menu.Item key="怪物">
            <a href="javascript:;">交易历史</a>
          </Menu.Item>
        </Menu>
        {/* <Menu
          className={styles.menu}
          theme="dark"
          mode="horizontal"
          selectedKeys={[this.state.subselectedKeys]}
          onClick={this.changeItem.bind(this, true)}
        >
          {this.state.subMenu}
        </Menu> */}
        <Table
          className="equipment"
          dataSource={this.state.tableDataSource}
          columns={columns}
          rowKey={record => record.id}
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
