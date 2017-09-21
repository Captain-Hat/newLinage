
import styles from './Lens.css';
import React, { Component } from 'react'
import { Input, Table, Pagination, message, Menu } from 'antd';
import axios from "axios";
import qs from 'qs';
import _ from 'underscore'
import { routerRedux, Link } from 'dva/router';

const menuItems = [
  {
    parent: "weapon", children: [
      { key: "dagger", name: "匕首" }, { key: "sword", name: "单手剑" }, { key: "tohandsword", name: "双手剑" }, { key: "edoryu", name: "双刀" },
      { key: "spear", name: "矛" }, { key: "singlespear", name: "单手矛" }, { key: "staff", name: "魔杖" }, { key: "blunt", name: "钝器" },
      { key: "tohandstaff", name: "双手魔杖" }, { key: "tohandblunt", name: "双手钝器" }, { key: "claw", name: "钢爪" }, { key: "bow", name: "弓" },
      { key: "singlebow", name: "单手弓" }, { key: "gauntlet", name: "铁手甲" }, { key: "kiringku", name: "奇古兽" }, { key: "chainsword", name: "锁链剑" }, { key: "sting", name: "飞刀" }, { key: "arrow", name: "弓箭" }
    ]
  },
  {
    parent: "armor", children: [
      { key: "cloak", name: "斗篷" }, { key: "T", name: "T恤" }, { key: "armor", name: "盔甲" }, { key: "glove", name: "手套" },
      { key: "boots", name: "靴子" }, { key: "shield", name: "盾牌" }, { key: "amulet", name: "项链" }, { key: "ring", name: "指环" },
      { key: "belt", name: "腰带" }, { key: "helm", name: "帽子" }, { key: "earring", name: "耳环" }, { key: "guarder", name: "臂甲" },
    ]
  },
  {
    parent: "etcitem", children: [
      { key: "light", name: "照明" }, { key: "wand", name: "魔术棒" }, { key: "potion", name: "药水" }, { key: "treasure_box", name: "宝箱" },
      { key: "gem", name: "宝石" }, { key: "food", name: "食物" }, { key: "scroll", name: "卷轴" }, { key: "totem", name: "图腾" },
      { key: "firecracker", name: "烟火" }, { key: "material", name: "材料" }, { key: "questitem", name: "任务道具" }, { key: "event", name: "活动道具" },
      { key: "petitem", name: "宠物装备" }, { key: "spellbook", name: "技能书" }, { key: "magic_doll", name: "魔法娃娃" }, { key: "other", name: "其他" }
    ]
  },
  { parent: "armor_set", children: [{}] },
]
class LensList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      agreement: false,
      tableDataSource: [],
      selectedKeys: "weapon",
      subselectedKeys: "dagger",
      subMenu: []
    };
    this.page = {
      current: 1,
      pageSize: 10,
      total: 100
    }
  }
  loadData(param = {}, isArmorset) {
    this.setState({
      tableDataSource: [],
      tableLoading: true,
    })
    const newParam = Object.assign({
      current: this.page.current,
      pageSize: this.page.pageSize,
      type: this.state.selectedKeys,
      species: this.state.subselectedKeys
    }, param)
    // 套装调其他接口
    let url = isArmorset ? '/api/armorset' : '/api/equipList';
    axios.post(url, qs.stringify(newParam)
    ).then((res) => {
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
    this.getItems('weapon')
  }
  changeItem(sub, item) {
    if (sub) {
      this.setState({ subselectedKeys: item.key })
      this.loadData({
        species: item.key
      })
    } else {
      this.setState({ selectedKeys: item.key })
      this.getItems(item.key)
    }

  }
  getItems(key) {
    let subItems = []
    let getOne = _.filter(menuItems, (item) => { return item.parent == key; });
    if (getOne.length > 0) {
      getOne[0].children.map((_v, _k) => {
        subItems.push(
          <Menu.Item key={_v.key}>
            <a href="javascript:;">{_v.name}</a>
          </Menu.Item>
        )
      })
      this.setState({
        subselectedKeys: getOne[0].children[0].key,
        subMenu: subItems
      })
      let flag = false;
      if (key == "armor_set") {
        flag = true
      }
      this.loadData({
        type: key,
        species: getOne[0].children[0].key
      }, flag)
    } else {
      this.setState({
        subselectedKeys: key,
        subMenu: subItems
      })
      // npc暂不调接口
      if (key == 'none' || 'task' || 'treasure_box') {
        this.setState({ tableDataSource: [] })
        return
      }
      this.loadData({
        type: key,
        species: key
      })
    }

  }
  
  render() {
    const columns = [{
      className: styles.leftCol,
      key: 'item',
      render: (text, record) => <img src={'http://localhost/newlineage/inv_gfx/' + record.invgfx + '.png'} alt="" />,
    },
    {
      className: styles.rightCol,
      key: 'name',
      render: (text, record) => <Link to="/equipDetail?id=1">{record.name}</Link>
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
          <Menu.Item key="etcitem">
            <a href="javascript:;">道具</a>
          </Menu.Item>
          <Menu.Item key="weapon">
            <a href="javascript:;">武器</a>
          </Menu.Item>
          <Menu.Item key="armor">
            <a href="javascript:;">防具</a>
          </Menu.Item>
          <Menu.Item key="none">
            <a href="javascript:;">NPC</a>
          </Menu.Item>
          <Menu.Item key="armor_set">
            <a href="javascript:;">套装</a>
          </Menu.Item>
          <Menu.Item key="magic_doll">
            <a href="javascript:;">魔法娃娃图鉴</a>
          </Menu.Item>
          <Menu.Item key="treasure_box">
            <a href="javascript:;">宝箱图鉴</a>
          </Menu.Item>
          <Menu.Item key="task">
            <a href="javascript:;">任务</a>
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
          pagination={{ pageSize: this.page.pageSize, current: this.page.current, total: this.page.total, showSizeChanger: true, showQuickJumper: true }}
          onChange={(pagination, filters, sorter) => {
            const newParam = { current: pagination.current, pageSize: pagination.pageSize }
            this.loadData(newParam);
            this.page.pageSize = pagination.pageSize
            this.page.current = pagination.current
          }}

        />
      </div>
    );
  }
}


export default LensList;
