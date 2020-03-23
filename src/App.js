import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Checkout from './checkout';
import './shoping.css';

function App() {

  const product = [
    { item: "A", price: 50, totalPrice: 0 , offer: "buy three ‘A’s and they’ll cost you $130.", dataheading: "Product", initialQuantity: 0 },
    { item: "B", price: 30, totalPrice: 0 , offer: "buy two ‘B’s and they’ll cost you $45.", dataheading: "Price", initialQuantity: 0 },
    { item: "C", price: 20, totalPrice: 0 , offer: "", dataheading: "Quantity", initialQuantity: 0 },
    { item: "D", price: 15, totalPrice: 0 , offer: "", dataheading: "Product", initialQuantity: 0 },
  ];

  const [productItem, setProductItem] = useState(product);
  const [checkout, setCheckout] = useState(false);

  const resetCart = () => {
    setProductItem(product);
    setCheckout(false);
  }
  
  // Handle The Change On Cart Quantity :-
  const handleCart = (e, proIndex) => {
    
    let updatedPro = productItem.filter( (pro, selectIndex) => {

      if(selectIndex === proIndex){
        if(parseInt(e.target.value) > parseInt(pro.initialQuantity) ){ // Updating The Cart Price
          pro.totalPrice   += pro.price ;
        }else{
          pro.initialQuantity = 0 ;
          pro.totalPrice = 0 ;
          return productItem ;
        }

        pro.initialQuantity = e.target.value ;  // Updating The Cart Quantity

        if(pro.item === "A" && pro.initialQuantity % 3 === 0){  // Updating The Cart Price On Product A

          let quantityOfA      = pro.initialQuantity / 3 ;  
              pro.totalPrice   = quantityOfA * 130 ;

        }else if(pro.item === "B" && pro.initialQuantity % 2 === 0){   // Updating The Cart Price On Product B

          let quantityOfB      = pro.initialQuantity / 2 ;  
              pro.totalPrice   = quantityOfB * 45 ;
        }
      }
      return pro ;
    });
    setProductItem(updatedPro);
  }

  // List The Available Products :-
  const productList = productItem.map((pro, proIndex) => {

    return (
      <tr key = {pro.item}>
        <td data-th={pro.dataheading}>
          <div className="row">
            <div className="col-sm-10">
              <h4 className="nomargin">{pro.item}</h4>
              <p>{pro.offer}.</p>
            </div>
          </div>
        </td>
        <td data-th={pro.dataheading}>${pro.price}</td>
        <td data-th={pro.dataheading}>
          <input type="number" className="form-control text-center" value={pro.initialQuantity} min = "0" onChange = { (e) => handleCart(e, proIndex)} />
        </td>
        <td data-th="Subtotal" className="text-center">${pro.totalPrice}</td>
      </tr>
    )

  });

  // Check Out Added Product :-
  const checkOutProducts = () => {
    setCheckout(true);
  }

  return (
    <div className="container">
      <table id="cart" className="table table-hover table-condensed">
        <thead>
          <tr>
            <th style={{ width: "50%" }}>Product</th>
            <th style={{ width: "10%" }}>Price</th>
            <th style={{ width: "8%" }}>Quantity</th>
            <th style={{ width: "22%" }} className="text-center">Subtotal</th>
          </tr>
        </thead>
        <tbody>
              {productList}
        </tbody>
        <tfoot>
          <tr>
							<td><button className="btn btn-success btn-block" onClick = {checkOutProducts}>Checkout <i className="fa fa-angle-right"></i></button></td>
              <td><button className="btn btn-warning btn-block" onClick = {resetCart}>Reset <i className="fa fa-angle-right"></i></button></td>
          </tr> 
        </tfoot>
      </table>
      { checkout && <Checkout checkOutData =  {productItem} /> }
    </div>
  );
}

export default App;
