
import styles from './Lens.less';
import React, { Component } from 'react'
import { Input, Table, Pagination, message, Menu, Spin, Tooltip, Button } from 'antd';
import axios from "axios";
import qs from 'qs';
import _ from 'underscore'
import { routerRedux, Link } from 'dva/router';
// 写死的照片
// import monsterImg from '../assets/mo059.gif';  
import { menuItems, weaponDetail } from './share/publicConfig';
import EquipDetail from './EquipDetail';
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
      loading: false,
      detail: false,
      detailRecord: {}
    };
    this.page = {
      current: 1,
      pageSize: 10,
      total: 100
    }
    this.key = {
      selectedKeys: '',
      subselectedKeys: ''
    }
  }
  showLoading(value) {
    this.setState({
      loading: value
    })
  }
  loadData(param = {}, url = '/newlineage/api/equipList') {
    this.setState({
      tableDataSource: [],
      tableLoading: true,
      detail: false
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
    if (this.key.selectedKeys == 'npc') { url = '/newlineage/api/npc' }
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
      this.key.selectedKeys = item.key
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
        url = '/newlineage/api/armorset'
      }
      if (key == "npc") {
        url = '/newlineage/api/npc'
      }
      // npc暂不调接口
      if (key == 'none' || key == 'task' || key == 'treasure_box' || key == 'npc' || key == 'make') {
        this.setState({ tableDataSource: [] })
        return
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
      if (key == 'none' || key == 'task' || key == 'treasure_box' || key == 'npc' || key == 'make') {
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
  showDetail(detail) {
    this.setState({
      detail: true,
      detailRecord: detail
    })
  }
  bakcList() {
    this.setState({
      detail: false
    })
  }
  render() {
    const normalColunms = [
      {
        className: styles.leftCol,
        key: 'item',
        render: (text, record) => <img src={'/newlineage/inv_gfx/' + record.invgfx + '.png'} alt="" />,
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
          return <a href='javascript:;' onClick={this.showDetail.bind(this, record)}> {pre + record.name} </a >
        }
      }, {
        className: styles.mainProp,
        key: 'main',
        render: (text, record) => {
          let weight = record.weight / 1000;
          return (<div className={styles.tdBox}>
            {+record.dmg_small ? <span className={styles.detailItem}>{'攻击：' + record.dmg_small + '/' + record.dmg_large}</span> : null}
            {+record.ac ? <span className={styles.detailItem}>{'防御：' + record.ac}</span> : null}
            {record.material ? <span className={styles.detailItem}>{'材质：' + record.material}</span> : null}
            {weight ? <span className={styles.detailItem}>{'重量：' + weight}</span> : null}
            {record.safenchant != '-1' ?
              <span className={styles.detailItem}>{'安定值：' + record.safenchant}</span>
              :
              <span className={styles.detailItem}>不可强化</span>
            }
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
            use_royal: '王族',
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
          return <span>{record.note}</span >
        }
      },
      {
        className: styles.setImgs,
        key: 'item',
        render: (text, record) => {
          let parts = []
          record.list.map((v, k) => {
            parts.push(<Tooltip title={v.name}>
              <a href='javascript:;' onClick={this.showDetail.bind(this, v)}>
                <img key={k} className={styles.setImg} src={'/newlineage/inv_gfx/' + v.invgfx + '.png'} alt={v.name} />
              </a >
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
            {record.safenchant != '-1' ?
              <span className={styles.detailItem}>{'安定值：' + record.safenchant}</span>
              :
              <span className={styles.detailItem}>不可强化</span>
            }
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
            <img className={''} src={''} alt={record.name} />
          )
        }
      },
      {
        className: styles.rightCol,
        key: 'name',
        render: (text, record) => {
          return <a href='javascript:;' onClick={this.showDetail.bind(this, record)}> {record.name} </a >
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
    const magic_dollColunms = [
      {
        className: styles.leftCol,
        key: 'item',
        render: (text, record) => <img src={'/newlineage/inv_gfx/' + record.invgfx + '.png'} alt="" />,
      },
      {
        className: styles.rightCol,
        key: 'name',
        render: (text, record) => {
          return <a href='javascript:;' onClick={this.showDetail.bind(this, record)}> {record.name} </a >
        }
      },
      {
        className: styles.mainProp,
        key: 'main',
        render: (text, record) => {
          let weight = record.weight / 1000
          return (<div className={styles.tdBox}>
            {+record.dmg_small ? <span className={styles.detailItem}>{'攻击：' + record.dmg_small + '/' + record.dmg_large}</span> : null}
            {/* {+record.ac ? <span className={styles.detailItem}>{'防御：' + record.ac}</span> : null} */}
            {record.material ? <span className={styles.detailItem}>{'材质：' + record.material}</span> : null}
            {weight ? <span className={styles.detailItem}>{'重量：' + weight}</span> : null}
            {record.safenchant != '-1' ?
              <span className={styles.detailItem}>{'安定值：' + record.safenchant}</span>
              :
              <span className={styles.detailItem}>不可强化</span>
            }
          </div>)

        }
      },
      {
        className: styles.detail,
        key: 'detail',
        render: (text, record) => {
          return <Detail type={'magic_doll'} rowData={record} data={weaponDetail} />
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

          {
            this.state.detail
              ?
              <div>

                <EquipDetail rowData={this.state.detailRecord} backList={this.bakcList.bind(this)} />
              </div>
              :
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
                  this.loadData(newParam, this.state.selectedKeys == 'armor_set' ? '/newlineage/api/armorset' : '/newlineage/api/equipList');
                  this.page.pageSize = pagination.pageSize
                  this.page.current = pagination.current
                }}

              />
          }
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
      // dmg_reduction effect  exp
      if (key == 'makename') {
        if (rowData[key]) {
          detailsLeft.push(<span key={key} className={styles.detailItem}>{equipProps.show[key]}:  {rowData[key]}</span>)
        }
      }
      else if (key == 'ac') {
        if (this.props.type == 'magic_doll') {
          if (+rowData[key] > 0) {
            detailsLeft.push(<span key={key} className={styles.detailItem}>{equipProps.show[key]}+{rowData[key]}</span>)
          } else if (+rowData[key] < 0) {
            detailsLeft.push(<span key={key} className={styles.detailItem}>{equipProps.show[key]}{rowData[key]}</span>)
          }

        }
      }
      else if (key == 'dmg_evasion_chance' || key == 'weight_reduction') {
        if (+rowData[key]) {
          detailsLeft.push(<span key={key} className={styles.detailItem}>{equipProps.show[key]}+{rowData[key]}% </span>)
        }
      }
      // else if (){

      // }
      else if (key == 'dmg_reduction') {
        if (+rowData[key]) {
          if (+rowData['dmg_reduction_chance']) {
            detailsLeft.push(<span key={key} className={styles.detailItem}>{rowData['dmg_reduction_chance']}%的概率减伤{rowData['dmg_reduction']} </span>)
          } else if (rowData['dmg_reduction_chance'] == '0') {
            detailsLeft.push(<span key={key} className={styles.detailItem}>100%的概率减伤{rowData['dmg_reduction']} </span>)
          }
        }
      }
      else if (key == 'effect') {
        if (+rowData[key]) {
          detailsLeft.push(<span key={key} className={styles.detailItem}>有{rowData['effect_chance']}%的概率使目标中毒 </span>)
        }
      }
      else if (key == 'exp') {
        if (+rowData[key]) {
          detailsLeft.push(<span key={key} className={styles.detailItem}>有{rowData['exp_chance']}%的概率获得{rowData['exp']}%的经验 </span>)

        }
      }
      else if (key == 'dmg') {
        if (+rowData[key]) {
          if (+rowData['dmg_chance']) {
            detailsLeft.push(<span key={key} className={styles.detailItem}>{rowData['dmg_chance']}%的概率打出额外伤害{rowData['dmg']} </span>)
          } else if (rowData['dmg_chance'] == '0') {
            detailsLeft.push(<span key={key} className={styles.detailItem}>100%的概率打出额外伤害{rowData['dmg']} </span>)
          }
        }
      }
      else if (key == 'hpr') {
        if (+rowData[key]) {
          if (+rowData['hpr_time']) {
            detailsLeft.push(<span key={key} className={styles.detailItem}>每{rowData['hpr_time']}分钟恢复血量{rowData['hpr']} </span>)
          } else {
            detailsLeft.push(<span key={key} className={styles.detailItem}>血量恢复{rowData['hpr']} </span>)
          }
        }
      }
      else if (key == 'mpr') {
        if (+rowData[key]) {
          if (+rowData['mpr_time']) {
            detailsLeft.push(<span key={key} className={styles.detailItem}>每{rowData['mpr_time']}分钟恢复蓝量{rowData['mpr']} </span>)
          } else {
            detailsLeft.push(<span key={key} className={styles.detailItem}>蓝量恢复{rowData['mpr']} </span>)
          }
        }
      }
      else if (key == 'grade') {
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