import React, { Component } from 'react';

class ProductItem extends Component {
  constructor(props){
    super(props);

    this.state = {
      isEdit: false,
    }
    
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);

  }
  onDelete() {
    const { onDelete, name } = this.props;
    onDelete(name);
  }

  onEdit() {
    this.setState({ isEdit: true })
  }

  onEditSubmit(e) {
    e.preventDefault();

    this.props.onEditSubmit(this.nameInput.value,this.priceInput.value, this.props.name)
    // adding this.props.name because we need to find the product in the full list we will be editing. Normally, we would use a key for this. 

    this.setState({ isEdit: false });
    //changing isEdit back to false after we have submitted 
  }

  render() {
    const {name, price} = this.props;

    return (
      <div className="products-box">
      { this.state.isEdit ? 
        (
          <div>
            <form onSubmit={this.onEditSubmit}>
              <input placeholder="Name" ref={nameInput => this.nameInput = nameInput} defaultValue={name} />
              <input placeholder="Price" ref={priceInput => this.priceInput = priceInput} defaultValue={price} />
              <button>Save</button>
            </form>
          </div>
        )
        : (
          <div>
          <span>{name}</span> 
          {` | `}
           <span>{price}</span>
          {` | `}
          <button onClick={this.onEdit}>Edit Product</button>
          {` | `}
          <button onClick={this.onDelete}>Delete Product</button>
          </div>
        )
      }
      </div>
    );
  }
}

export default ProductItem;
