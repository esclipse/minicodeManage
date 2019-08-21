import React,{ PureComponent } from 'react';
import { connect } from 'dva';
import ProductList from '../../components/ProductList';
class Repaire extends PureComponent{

  componentDidMount(){
    this.props.dispatch({
      type: 'products/queryList'
    })
  }
  render() {
    const { products } = this.props;
    return(
      <div>
          <h2>Repaire Log</h2>
          <ProductList products={products} />
      </div>
    )
  }
}

export default connect(({ products }) => ({
  products,
}))(Repaire);