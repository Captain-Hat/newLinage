
import styles from './Lens.less';
import React, { Component } from 'react'
import { Input, Table, Pagination, message, Menu, Spin, Tooltip } from 'antd';
import axios from "axios";
import qs from 'qs';
import _ from 'underscore'
import { routerRedux, Link } from 'dva/router';
// 写死的照片
import monsterImg from '../assets/mo059.gif';
let npcData = [
  {
    "gfxid": "34",
    "name": "鳄鱼",
    "agro": "1",//主动
    "ac": "5",
    "size": "large",
    "exp": "6",
    "lawful": "12",
    "lvl": "10",
    "mr": "1",//抗魔
    "hp": "1",
    "mp": "1",
    "str": "1",
    "dex": "1",
    "con": "0",
    "intel": "0",
    "wis": "2",
    "agrocoi": "1",//看穿隐身
    "agrososc": "1",//看穿变身
    "tamble": "1"
  },
  {
    "gfxid": "34",
    "name": "王八",
    "agro": "0",//主动
    "ac": "5",
    "size": "large",
    "exp": "6",
    "lawful": "iron",
    "lvl": "10",
    "mr": "1",//抗魔
    "hp": "1",
    "mp": "1",
    "str": "1",
    "dex": "1",
    "con": "0",
    "intel": "0",
    "wis": "2",
    "agrocoi": "0",//看穿隐身
    "agrososc": "0",//看穿变身
    "tamble": "1"
  }
  ,
  {
    "gfxid": "34",
    "name": "兔子",
    "agro": "0",//主动
    "ac": "5",
    "size": "large",
    "exp": "6",
    "lawful": "iron",
    "lvl": "10",
    "mr": "1",//抗魔
    "hp": "1",
    "mp": "1",
    "str": "1",
    "dex": "1",
    "con": "0",
    "intel": "0",
    "wis": "2",
    "agrocoi": "0",//看穿隐身
    "agrososc": "0",//看穿变身
    "tamble": "1"
  }
]
let magic_doll = [
  {
    "name": "一个魔法娃娃",
    'ac': '3',

    'hpr': '2',
    'hpr_time': '1',//
    'mpr': '6',
    'mpr_time': '1',

    'dmg': '5',//额外伤害
    "dmg_chance": "2",//概率打出额外伤害，如果0 100
    "dmg_reduction": "6",
    "dmg_reduction_chance": "20",
    'effect': '8',
    'effect_chance': '8',
    'exp': '8',
    'exp_chance': '8',

    'maxhp': '23',
    'maxmp': '6',
    'hit': '6',//攻击成功
    "bow_hit": "3",
    "bow_dmg": "8",
    "dmg_evasion_chance": "10",//回避概率
    "weight_reduction": "34",
    'mr': '6',
    'sp': '6',
    'str': '5',
    'con': '4',
    'dex': '3',
    'intl': '4',
    'wis': '5',
    'cha': '8',
    'water': '8',
    'fire': '8',
    'wind': '8',
    'earth': '8',
    'regist_stun': '8',
    'regist_stone': '8',
    'regist_sleep': '8',
    'regist_freeze': '8',
    'regist_sustain': '8',
    'regist_blind': '8',
    'make_itemid': '一个礼物',
  }
]

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
  { parent: "npc", children: [{ key: "monster", name: "怪物" }] },
]
const weaponDetail = {
  ex: {
    dmg_large: '最大攻击',
    dmg_small: '最小攻击',
  },
  show: {
    // weight: '重量',
    add_cha: '魅力值',//+ -
    add_con: '体质',//+- 
    add_dex: '敏捷',//+-
    add_hp: '血量',//+-
    add_hpr: '血量恢复',//+-
    add_int: '智力',//+-
    add_mp: '蓝量',//+-
    add_mpr: '蓝量恢复',//+-
    add_sp: '魔攻',//+-
    add_str: '力量',//+-
    add_wis: '精神',//+-
    dmgmodifier: '额外攻击',//+-
    double_dmg_chance: '暴击率',//：
    haste_item: '永久加速效果',//判断1显示
    hitmodifier: '攻击成功',//+-
    magicdmgmodifier: '魔法暴击',//+-
    // material: '材质',
    max_lvl: '最大等级',//:
    min_lvl: '最小等级',//:
    weight_reduction: '增加负重',
    damage_reduction: '伤害减免',
    hit_modifier: '攻击成功',
    dmg_modifier: '额外攻击点数',
    bow_hit_modifier: '弓的命中率',
    bow_dmg_modifier: '弓打击值',
    max_use_time: '使用期限',
    delay_effect: '使用间隔',
    defense_water: '水属性防御',
    defense_wind: '风属性防御',
    defense_earth: '土属性防御',
    defense_fire: '火属性防御',
    regist_stun: '昏迷耐性',
    regist_stone: '石化耐性',
    regist_sleep: '睡眠耐性',
    regist_freeze: '寒冰耐性',
    regist_sustain: '支撑耐性',
    regist_blind: '致盲耐性',
    grade: '强度',
    food_volume: '饱食度',         //(3为特 2为低 1为中 0为高 -1不显示)
    hpr: '血量恢复',
    mpr: '蓝量恢复',
    mr: '魔法防御',
    sp: '魔攻',
    str: '力量',
    con: '体质',
    dex: '敏捷',
    intl: '智力',
    wis: '精神',
    cha: '魅力'

  },

  orNot: {
    canbedmg: '损坏',
    cant_delete: '删除',
    trade: '交易',
    stackable: '堆叠',
    can_seal: '封印',
    polyid: '变身',
  },
  whoUse: {
    use_knight: '骑士',
    use_elf: '精灵',
    use_mage: '法师',
    use_royalL: '王族',
    use_darkelf: '黑暗精灵',
    use_dragonknight: '龙骑',
    use_illusionist: '幻术师',
  },
  npc: {
    // "ac": "防御",
    "mr": "魔抗",//抗魔
    "hp": "血量",
    "mp": "蓝量",
    "str": "力量",
    "dex": "敏捷",
    "con": "体质",
    "intel": "智力",
    "wis": "精神",
  },
  npcEx: {
    "agrocoi": "看穿隐身",//看穿隐身
    "agrososc": "看穿变身",//看穿变身
    "tamble": "可以迷魅"
  }




}
class LensList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      agreement: false,
      tableDataSource: [],
      selectedKeys: "weapon",
      subselectedKeys: "dagger",
      subMenu: [],
      loading: false
    };
    this.page = {
      current: 1,
      pageSize: 10,
      total: 100
    }
  }
  showLoading(value) {
    this.setState({
      loading: value
    })
  }
  loadData(param = {}, url = "/api/equipList") {
    this.setState({
      tableDataSource: [],
      tableLoading: true,
    })
    this.showLoading(true)
    const newParam = Object.assign({
      current: this.page.current,
      pageSize: this.page.pageSize,
      type: this.state.selectedKeys,
      species: this.state.subselectedKeys
    }, param)
    // 同步页码
    this.page.current = newParam.current;
    this.page.pageSize = newParam.pageSize;
    if (this.state.selectedKeys == 'npc') { url = '/api/npc' }
    axios.post(url, qs.stringify(newParam)
    ).then((res) => {
      let data = res.data
      this.page.total = data.option.total;
      this.setState({
        tableLoading: false,
        tableDataSource: data.data
      })
      this.showLoading(false)
    })
      .catch((err) => {
        this.setState({
          tableLoading: false,
          tableDataSource: [],
        })
        this.showLoading(false)
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
        species: item.key,
        current: 1
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
      // 需要更换接口的几个情况
      let url;
      if (key == "armor_set") {
        url = '/api/armorset'
      }
      if (key == "npc") {
        url = '/api/npc'
      }
      this.loadData({
        current: 1,
        type: key,
        species: getOne[0].children[0].key
      }, url)
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
        current: 1,
        type: key,
        species: key
      })
    }

  }

  render() {
    const normalColunms = [
      {
        className: styles.leftCol,
        key: 'item',
        render: (text, record) => <img src={'http://localhost/newlineage/inv_gfx/' + record.invgfx + '.png'} alt="" />,
      }, {
        className: styles.rightCol,
        key: 'name',
        render: (text, record) => {
          let pre = '';
          if (record.bless == '0') {
            pre = '受祝福的'
          } else if (record.bless == '2') {
            pre = '受诅咒的'
          }
          // {{pathname:"/select", hash:'#ahash', query:{foo: 'bar', boo:'boz'}, state:{data:'miao'}  }}
          return <Link to={{ pathname: '/equipDetail', state: { name: record.name } }} > {pre + record.name} </Link >
        }
      }, {
        className: styles.mainProp,
        key: 'main',
        render: (text, record) => {
          let weight = this.state.selectedKeys == 'weapon' || 'etcitem' ? record.weight : record.weight / 1000
          return (<div className={styles.tdBox}>
            {+record.dmg_small ? <span className={styles.detailItem}>{'攻击：' + record.dmg_small + '/' + record.dmg_large}</span> : null}
            {+record.ac ? <span className={styles.detailItem}>{'防御：' + record.ac}</span> : null}
            {record.material ? <span className={styles.detailItem}>{'材质：' + record.material}</span> : null}
            {weight ? <span className={styles.detailItem}>{'重量：' + weight}</span> : null}
            {+record.safenchant ? <span className={styles.detailItem}>{'安定值：' + record.safenchant}</span> : null}
          </div>)

        }
      },
      {
        className: styles.detail,
        key: 'detail',
        render: (text, record) => {
          return <Detail rowData={record} data={weaponDetail} />
        }
      },
      {
        className: styles.whoUse,
        key: 'whoUse',
        render: (text, record) => {
          let classes = {
            use_knight: '骑士',
            use_elf: '精灵',
            use_mage: '法师',
            use_royalL: '王族',
            use_darkelf: '黑暗精灵',
            use_dragonknight: '龙骑',
            use_illusionist: '幻术师',
          }
          let users = []
          for (var key in classes) {
            if (+record[key]) {
              // users.push(equipProps.whoUse[key])
              users.push(<span key={key} className={styles.detailItem}>{classes[key]}</span>)
            }
          }
          return (<div className={styles.tdBox}>{users}</div>)
        }
      }];
    const armorSetlColunms = [
      {
        className: styles.rightCol,
        key: 'name',
        render: (text, record) => {
          return <Link to="/equipDetail?id=1" > {record.note}</Link >
        }
      },
      {
        className: styles.setImgs,
        key: 'item',
        render: (text, record) => {
          let parts = []
          record.list.map((v, k) => {
            parts.push(<Tooltip title={v.name}>
              <img key={k} className={styles.setImg} src={'http://localhost/newlineage/inv_gfx/' + v.invgfx + '.png'} alt={v.name} />
            </Tooltip>)
          })
          return (<div className={styles.setImgsBox}>
            {parts}
          </div>)
        }
      },
      {
        className: styles.mainProp,
        key: 'main',
        render: (text, record) => {
          let weight = this.state.selectedKeys == 'weapon' || 'etcitem' ? record.weight : record.weight / 1000
          return (<div className={styles.tdBox}>
            {+record.dmg_small ? <span className={styles.detailItem}>{'攻击：' + record.dmg_small + '/' + record.dmg_large}</span> : null}
            {+record.ac ? <span className={styles.detailItem}>{'防御：' + record.ac}</span> : null}
            {record.material ? <span className={styles.detailItem}>{'材质：' + record.material}</span> : null}
            {weight ? <span className={styles.detailItem}>{'重量：' + weight}</span> : null}
            {+record.safenchant ? <span className={styles.detailItem}>{'安定值：' + record.safenchant}</span> : null}
          </div>)

        }
      },
      {
        className: styles.detail,
        key: 'detail',
        render: (text, record) => {
          return <Detail rowData={record} data={weaponDetail} />
        }
      }
    ];
    const npclColunms = [
      {
        className: styles.npcImg,
        key: 'npcImg',
        render: (text, record) => {
          return (
            <img className={''} src={monsterImg} alt={record.name} />
          )
        }
      },
      {
        className: styles.rightCol,
        key: 'name',
        render: (text, record) => {
          return <Link to="/equipDetail?id=1" > {record.name}</Link >
        }
      },
      {
        className: styles.mainProp,
        key: 'main',
        render: (text, record) => {
          return (<div className={styles.tdBox}>
            <span className={styles.detailItem}>{'EXP：' + record.exp}</span>
            <span className={styles.detailItem}>{'正义值：' + record.lawful}</span>
            <span className={styles.detailItem}>{record.size == 'large' ? '大怪' : '小怪'}</span>
            <span className={styles.detailItem}>{'等级：' + record.lvl}</span>
            <span className={styles.detailItem}>{'防御：' + record.ac}</span>
            <span className={styles.detailItem} style={{ color: record.agro == '1' ? 'red' : '' }}>{record.agro == '1' ? '主动' : '不主动'}</span>
          </div>)
        }
      },
      {
        className: styles.detail,
        key: 'detail',
        render: (text, record) => {
          let items = []
          for (var key in weaponDetail.npc) {
            if (+record[key]) {
              items.push(
                <span key={'npc' + key} className={styles.detailItem}>{weaponDetail.npc[key]}:{record[key]}</span>
              )
            }
          }
          return (
            <div className={styles.colContainer}>
              <div className={styles.npcdetailCol}   >
                {items.slice(0, 3)}
              </div>
              <div className={styles.npcdetailCol}  >
                {items.slice(3)}
              </div>
            </div>
          )
        }
      },
      {
        className: styles.npcExCol,
        key: 'exProp',
        render: (text, record) => {
          let items = []
          for (var key in weaponDetail.npcEx) {
            if (+record[key]) {
              items.push(
                <span key={'exprop' + key} className={styles.detailItem}>{weaponDetail.npcEx[key]}</span>
              )
            }
          }
          return (
            <div className={styles.npcdetailCol} >
              {items}
            </div>
          )
        }
      }
    ];
    const magic_dollColunms = [{
      className: styles.leftCol,
      key: 'item',
      render: (text, record) => <img src={'http://localhost/newlineage/inv_gfx/' + record.invgfx + '.png'} alt="" />,
    },
    {
      className: styles.rightCol,
      key: 'name',
      render: (text, record) => {
        return <Link to="/equipDetail?id=1" > {record.name}</Link >
      }
    },
    {
      className: styles.mainProp,
      key: 'main',
      render: (text, record) => {
        let weight = this.state.selectedKeys == 'weapon' || 'etcitem' ? record.weight : record.weight / 1000
        return (<div className={styles.tdBox}>
          {+record.dmg_small ? <span className={styles.detailItem}>{'攻击：' + record.dmg_small + '/' + record.dmg_large}</span> : null}
          {+record.ac ? <span className={styles.detailItem}>{'防御：' + record.ac}</span> : null}
          {record.material ? <span className={styles.detailItem}>{'材质：' + record.material}</span> : null}
          {weight ? <span className={styles.detailItem}>{'重量：' + weight}</span> : null}
          {+record.safenchant ? <span className={styles.detailItem}>{'安定值：' + record.safenchant}</span> : null}
        </div>)

      }
    },
    {
      className: styles.detail,
      key: 'detail',
      render: (text, record) => {
        return <Detail rowData={record} data={weaponDetail} />
      }
    },
    {
      className: styles.whoUse,
      key: 'whoUse',
      render: (text, record) => {
        let classes = {
          use_knight: '骑士',
          use_elf: '精灵',
          use_mage: '法师',
          use_royalL: '王族',
          use_darkelf: '黑暗精灵',
          use_dragonknight: '龙骑',
          use_illusionist: '幻术师',
        }
        let users = []
        for (var key in classes) {
          if (+record[key]) {
            // users.push(equipProps.whoUse[key])
            users.push(<span key={key} className={styles.detailItem}>{classes[key]}</span>)
          }
        }
        return (<div className={styles.tdBox}>{users}</div>)
      }
    }];
    let whichCol;
    if (this.state.selectedKeys == 'armor_set') {
      whichCol = armorSetlColunms
    } else if (this.state.selectedKeys == 'npc') {
      whichCol = npclColunms
    } else if (this.state.selectedKeys == 'magic_doll') {
      whichCol = magic_dollColunms
    } else {
      whichCol = normalColunms
    }

    return (
      <Spin spinning={this.state.loading} tip="Loading...">
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
            <Menu.Item key="npc">
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
            <Menu.Item key="petitem">
              <a href="javascript:;">宠物装备图鉴</a>
            </Menu.Item>
            <Menu.Item key="make">
              <a href="javascript:;">物品制作</a>
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
            //dataSource={magic_doll}
            columns={whichCol}
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
      </Spin>
    );
  }
}
export default LensList;

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }
  createDetail() {
    let equipProps = this.props.data;
    let rowData = this.props.rowData;
    let detailsLeft = []
    // details.push(<span>{object[key]}:{rowData[key]}</span>)

    // 先遍历可以直接显示的
    for (var key in equipProps.show) {
      // double_dmg_chance: '暴击率',//：
      // haste_item: '永久加速效果',//判断1显示
      // max_lvl: '最大等级',//:
      // min_lvl: '最小等级',//:
      if (key == 'grade') {
        if (rowData[key] && rowData[key] != '-1') {
          let lev;
          switch (rowData[key]) {
            case '0':
              lev = '高'
              break;
            case '1':
              lev = '中'
              break;
            case '2':
              lev = '低'
              break;
            case '3':
              lev = '特'
              break;
            default:
              break;
          }
          detailsLeft.push(<span key={key} className={styles.detailItem}>{equipProps.show[key]}：{lev} </span>)
        }
      } else if (key == 'max_use_time' || key == 'delay_effect') {
        if (+rowData[key]) {
          detailsLeft.push(<span key={key} className={styles.detailItem}>{equipProps.show[key]}{rowData[key] / 3600}小时</span>)
        }
      } else if (key == 'weight_reduction') {
        if (+rowData[key]) {
          detailsLeft.push(<span key={key} className={styles.detailItem}>{equipProps.show[key]}{rowData[key]}%</span>)
        }
      } else if (key == 'double_dmg_chance' || key == 'max_lvl' || key == 'min_lvl') {
        if (+rowData[key]) {
          detailsLeft.push(<span key={key} className={styles.detailItem}>{equipProps.show[key]}：{rowData[key]}</span>)
        }
      } else if (key == 'haste_item') {
        rowData[key] == '1' ? detailsLeft.push(<span key={key} className={styles.detailItem}>永久加速效果</span>) : null;
      } else {
        if (+rowData[key]) {
          if (+rowData[key] > 0) {
            detailsLeft.push(<span key={key} className={styles.detailItem}>{equipProps.show[key]}+{rowData[key]}</span>)
          } else {
            detailsLeft.push(<span key={key} className={styles.detailItem}>{equipProps.show[key]}{rowData[key]}</span>)
          }
        }
      }
    }


    let detailsMiddle = []
    // 在遍历是否判断的
    for (var key in equipProps.orNot) {
      if (key == 'can_seal') {
        if (rowData[key] == '1') {
          detailsMiddle.push(<span key={key} className={styles.detailItem}>可{equipProps.orNot[key]}</span>)
        }
      } else if (key == 'stackable') {
        if (rowData[key] == '0') {
          detailsMiddle.push(<span key={key} className={styles.detailItem}>不可{equipProps.orNot[key]}</span>)
        }
      } else if (key == 'canbedmg') {
        if (rowData[key] == '0') {
          detailsMiddle.push(<span key={key} className={styles.detailItem}>不可{equipProps.orNot[key]}</span>)
        }
      } else {
        if (rowData[key] == '1') {
          detailsMiddle.push(<span key={key} className={styles.detailItem}> 不可{equipProps.orNot[key]}</span>)
        }
      }
    }
    return [detailsLeft, detailsMiddle]
  }
  render() {
    return (
      <div className={styles.colContainer}>
        <div className={styles.detailCol} >
          {this.createDetail()[0]}
        </div>
        <div className={styles.detailCol}>
          {this.createDetail()[1]}
        </div>
      </div>
    )
  }
} 