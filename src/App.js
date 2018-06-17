import React, { Component } from 'react';
import './App.css';
import ProductItem from './ProductItem';
import AddProduct from "./AddProduct";

const products = [
  {
    name: 'iPad',
    price: 200,
  }, 
  {
    name: "iPhone",
    price: 1000,
  }
]
localStorage.setItem('products', JSON.stringify(products))

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: JSON.parse(localStorage.getItem('products')),
      search: '',
    };

    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.searchProducts = this.searchProducts.bind(this);
  }

  componentWillMount() {
    const products = this.getProducts();
    this.setState({ products });
  }

  getProducts() {
    return this.state.products;
  }

  onAdd(name, price) {
    const products = this.getProducts();

    products.push({
      name, 
      price, 
    });
    this.setState({products})
  }

  onEditSubmit(name, price, originalName) {  
    let products = this.getProducts(); 
    // let because we are mutating products!

    products = products.map( product => {
      if (product.name === originalName) {
        product.name = name;
        product.price = price;
      }
      //since we are using map, we need to return 
      return product;
    });
    this.setState({ products });
  }

  onDelete(name) {
     const products = this.getProducts();
     const filteredProducts = products.filter(product => {
       return product.name !== name;
     });

     this.setState({ products: filteredProducts });
  }

  searchProducts(e) {
    this.setState({search: e.target.value.substr(0,20)});
  }

  render() {
    let filteredSearch = this.state.products.filter(product => {
      return product.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
    });

    return (
      <div className="App">
        <h1>Products Manager</h1>
        <AddProduct
            onAdd={this.onAdd}
        />
          <div> 
            <h3> Search Products </h3> 
            <input placeholder=" Search .." value={this.state.search} onChange={this.searchProducts} />
            <hr />
          </div>
        {
          filteredSearch.map(product => {
          return(
            <ProductItem 
            key={product.name}
            {...product}
            onDelete={this.onDelete}
            onEditSubmit={this.onEditSubmit}
            />
          );
        })
      }
      </div>
    );
  }
}

export default App;
