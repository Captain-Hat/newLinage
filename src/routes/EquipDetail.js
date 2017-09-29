
import styles from './EquipDetail.less';
import React, { Component } from 'react'
import { Input, Table, Pagination, message, Menu, Button } from 'antd';
import axios from "axios";
import qs from 'qs';
import { routerRedux } from 'dva/router';
// import mainProperty from "./share/columns.js"
import { hashHistory } from 'react-router'

const dropList = [
  {
    title: '掉落怪物',
    key: 'mob_name',
    render: (text, record, index) => {
      // 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引，@return里面可以设置表格行/列合并
      return <span>{record.mob_name}</span>
    }
  },
  {
    title: '掉落数量',
    key: 'count',
    render: (text, record, index) => {
      // 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引，@return里面可以设置表格行/列合并
      return <span>{record.min}~{record.max}</span>
    },
  },
  {
    title: '掉落概率',
    key: 'dropPoint',
    render: (text, record, index) => {
      // 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引，@return里面可以设置表格行/列合并
      return <span>{record.chance / 10000 + '%'}</span>
    }
  },

];
message.config({
  top: 100,
  duration: 2,
});
class EquipDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableLoading: false,
      dorpTable: [],
    };
    this.page = {
      pageNumber: 1,
      pageSize: 10,
      total: 100
    }
  }
  loadData(param) {
    axios.get('/newlineage/api/getdetail', {
      params: {
        item_id: this.props.rowData.item_id,
        type: 'droplist'
      }
    })
      .then((res) => {
        this.setState({
          dorpTable: res.data.data
        })
        // message.success("操作成功");
      })
      .catch((err) => {
        message.warning("请求错误");
      });
  }

  componentDidMount() {
    this.loadData()
  }

  render() {
    let pre = '';
    if (this.props.rowData.bless == '0') {
      pre = '受祝福的'
    } else if (this.props.rowData.bless == '2') {
      pre = '受诅咒的'
    }
    return (
      <div>

        <div className={styles.head}>
          <img src={'/newlineage/inv_gfx/' + this.props.rowData.invgfx + '.png'} alt="" />
          <span>{pre + this.props.rowData.name} </span>
          <Button className={styles.backBtn} onClick={this.props.backList} type='primary'>返回</Button>
          <div style={{ clear: 'both' }}></div>
        </div>
        <div className={styles.tableTitle}>掉落概况</div>
        <Table
          className={styles.detailTable}
          dataSource={this.state.dorpTable}
          columns={dropList}
          rowKey={record => record.id}
          showHeader={true}
          bordered={true}
          pagination={false}
        />

      </div>
    );
  }
}


export default EquipDetail;

