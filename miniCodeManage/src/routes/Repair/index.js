import React from 'react';
import { connect } from 'dva';
import ProductList from '../../components/ProductList';
import { Button } from 'antd';

const Products = ({ dispatch, products }) => {
  function handleDelete(id) {
    dispatch({
      type: 'products/delete',
      payload: id,
    });
  }
  function querylist(){
    dispatch({
      type: 'queryList'
    })
  }
  return (
    <div>
      <h2>List of Products</h2>
      <Button onClick={querylist}>QUERY</Button>
      <ProductList onDelete={handleDelete} products={products} />
    </div>
  );
};

// export default Products;
export default connect(({ products }) => ({
  products,
}))(Products);