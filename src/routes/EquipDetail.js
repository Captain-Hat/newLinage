
import styles from './EquipDetail.less';
import React, { Component } from 'react'
import { Input, Table, Pagination, message, Menu, Button } from 'antd';
import axios from "axios";
import { routerRedux } from 'dva/router';
// import mainProperty from "./share/columns.js"

const mainProperty = [
  {
    title: 'AC',
    key: 'AC',
    render: (text, record, index) => {
      // 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引，@return里面可以设置表格行/列合并
      return <span>AC</span>
    }
  },
  {
    title: 'AC',
    key: 'ACtext',
    dataIndex: "ac"
  },
  {
    title: 'safe',
    key: 'safe',
    render: (text, record, index) => {
      // 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引，@return里面可以设置表格行/列合并
      return <span>safe</span>
    }

  },
  {
    title: 'safe',
    key: 'safetext',
    dataIndex: "safe"
  },
  {
    title: 'type',
    key: 'type',
    render: (text, record, index) => {
      // 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引，@return里面可以设置表格行/列合并
      return <span>type</span>
    }

  },
  {
    title: 'type',
    key: 'typetext',
    dataIndex: "type"
  }
];
const marketInfo = [{
  title: '物品',
  key: 'AC1',
  render: (text, record, index) => {
    // 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引，@return里面可以设置表格行/列合并
    return <span>AC</span>
  }
},
{
  title: '+',
  key: 'ACtext1',
  dataIndex: "ac"
},
{
  title: '名字',
  key: 'safe1',
  render: (text, record, index) => {
    // 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引，@return里面可以设置表格行/列合并
    return <span>王者圣剑</span>
  }

},
{
  title: '数量',
  key: 'safetext1',
  dataIndex: "safe"
},
{
  title: '总价',
  key: 'safetext2',
  dataIndex: "safe"
},
{
  title: '购买',
  key: 'type1',
  render: (text, record, index) => {
    // 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引，@return里面可以设置表格行/列合并
    return <Button>前往购买</Button>
  }
}
];
class EquipDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableLoading: false,
      mainTable: [],
      marketInfoTable: []
    };
    this.page = {
      pageNumber: 1,
      pageSize: 10,
      total: 100
    }
  }
  loadData(param) {
    this.setState({
      mainTable: [],
      tableLoading: true,
    })
    param = param || {};
    const newParam = Object.assign({
      pageNumber: this.page.pageNumber,
      pageSize: this.page.pageSize
    }, param)
    axios.post('/api/detail', {
      firstName: 'Fred',
      lastName: 'Flintstone'
    })
      .then((res) => {
        let data = res.data
        this.page.total = data.option.total;
        this.setState({
          tableLoading: false,
          mainTable: data.data
        })
      })
      .catch((err) => {
        this.setState({
          tableLoading: false,
          mainTable: [],
        })
        message.warning("请求错误");
      });
  }

  componentDidMount() {
    this.loadData()
    console.log(this.props)
  }

  render() {


    console.log(mainProperty)
    return (
      <div className={styles.normal}>
        <div className={styles.head}>
          <img src="http://pic.duowan.com/df/1104/166256478415/166256500012.jpg" alt="" />
          <span>圣剑</span>
        </div>
        <Table
          className="equipment"
          dataSource={this.state.mainTable}
          columns={mainProperty}
          rowKey={record => record.id}
          showHeader={false}
          bordered={true}
          pagination={false}
        />
        <h2 className={styles.title}>商城信息</h2>
        <Table
          className="equipment"
          dataSource={this.state.mainTable}
          columns={marketInfo}
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

