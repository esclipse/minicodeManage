import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const columns = [
{
  title: 'school',
  dataIndex: 'school',
  key: 'school'
},
{
  title: 'time',
  dataIndex: 'time',
  key: 'time'
},
{
  title: 'yjname',
  dataIndex: 'yjname',
  key: 'yjname'
},
{
  title: 'description',
  dataIndex: 'description',
  key: 'description'
}]

const ProductList = ({ products }) => {
  return (
    <Table
      dataSource={products}
      columns={columns}
      rowKey={(record)=>record.time}
    />
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductList;