import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Table, Popconfirm, Button } from 'antd';
import { Link } from 'dva/router';

import styles from './Table.less';

const ProductList = ({ items, className }) => {
  const span = <span className={styles.articlePre}>[置顶]</span>
  const columns = [{
    key: 'item',
    render: (text, record) => <Link className={styles.itemCol} to={{ pathname: '/article', state: { id: record.id } }} >{record.istop == '1' ? span : null}{record.item ? record.item : '无标题'}</Link>,
  },
  {
    className: styles.dateCol,
    dataIndex: 'date',
    key: 'date'
  }];
  return (
    <Table
      className={className}
      dataSource={items}
      columns={columns}
      rowKey={record => record.id}
      pagination={false}
      showHeader={false}
    />
  );
}


ProductList.propTypes = {
  items: PropTypes.array.isRequired,
};


export default ProductList;
