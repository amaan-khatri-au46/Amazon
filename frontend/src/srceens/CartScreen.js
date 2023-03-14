/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
import { getProduct } from "../api.js";
import { getCartItems, setCartItems } from "../localStorage.js";
import { parseRequestUrl, rerender } from "../utils.js";

// this function is for adding the item inside the cart and also updating the qty of the product 
const addToCart = (item, forceUpdate = false) => {
  // here i am bascially implementing cartItems 
  // the item which i am going to add to to the cart item 
  let cartItems = getCartItems();
  // here i am checking that the item which i need to add to cart is already exist or not 
  // i need to define here that the cart items is alredy defined or not
  // here we are using find function of array 
  // x of product is the id of the product and comparing with the id of current product 
  const existItem = cartItems.find((x) => x.product === item.product);
  // at the end we need to call
  // its like saving and we need to implement in the local storage
  if (existItem) {
    if (forceUpdate){
      cartItems = cartItems.map((x) =>
      x.product === existItem.product ? item : x
    );
    }
  } else {
    cartItems = [...cartItems, item];
  }
  setCartItems(cartItems);
  if(forceUpdate){
    rerender(CartScreen);
  }
};
const removeFromCart = (id) =>{
  // inside this function we need to update the localstorage by removing it 
  setCartItems(getCartItems().filter((x) => x.product !== id));
  if(id === parseRequestUrl().id){
    // if the both id matches then i want user to redirect to the cart screen 
    document.location.hash ='/cart';
  }else {
    rerender(CartScreen);
  }
}

const CartScreen = {
  after_render: () => {
    // in this function i want to implement after render 
    // i want to select box and cahnge event on them
    // i am going to save this elemet inside qty slect
    const qtySelects = document.getElementsByClassName('qty-select');
    // qty select need to converted to an array because i need to add 
    // because i need to add all events inside this object 
    // using Array from to convert it to an array
    Array.from(qtySelects).forEach((qtySelect) => {
      qtySelect.addEventListener('change',(e)=>{
        // inside this find method i am going to select the item that is = qty select
        const item = getCartItems().find((x) => x.product === qtySelect.id );
        // we are also conveting qty tonumber because the user seceted it is a string
        addToCart({ ...item, qty: Number(e .target.value) }, true);
      });
    });
    // here we are implementing our delete button to delete the item from the cart 
    const deleteButtons = document.getElementsByClassName('delete-button');
    Array.from(deleteButtons).forEach(deleteButton => {
      // we had added an event listener to the delete button
      deleteButton.addEventListener('click', () =>{
        removeFromCart(deleteButton.id);
      });
    });
    // when user will click to the PROCEEDTOCART it will throw it to the sigin Page 
    document.getElementById('checkout-button').addEventListener('click', ()=>{
      document.location.hash = '/signin';
    })
  },
  render: async () => {
    const request = parseRequestUrl();
    // user clicked at add to cart button
    // but if its null then the user selected the cart menu in the header menu... 
    if (request.id) {
      // so here i need to add the item to the cart 
      // first off all i need to get that product from back-end
      // so while calling getproduct method we can get the product 
      const product = await getProduct(request.id);
      // and when i had product so i need to call add to cart function 
      // basscically add to cart function has two parameter 
      // first of all the product i want to add to the cart 
      // all information about the product which i am going to add to the cart
      // and bydefualt we are adding qty to 1 product to the cart 
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty: 1,
      });
    }
    const cartItems = getCartItems();
    return ` 
        <div class="cart">
            <div class="cart-list">
                <ul class="cart-list-container">
                    <li>
                        <h3> Shopping Cart </h3>
                        <div>Price</div>
                    </li>

                    ${
                      cartItems.length === 0
                        ? '<div>Cart is empty. <a href="/#/">Go Shopping</a>'
                        : cartItems
                            .map(
                              (item) => `
                        <li>
                            <div class="cart-image">
                                <img src="${item.image}" alt = "${item.name}" />
                            </div>
                            <div class="cart-name">
                                <div>
                                    <a href="/#/product/${item.product}">
                                        ${item.name}
                                    </a>
                                </div>
                                <div>
                                    Qty: 
                                    <select class="qty-select" id="${item.product}">
                                        ${[...Array(item.countInStock).keys()].map((x) =>
                                           item.qty === x+1
                                           ? `<option selected value="${x+1}">${x+1}</option>`
                                           : `<option  value="${x+1}">${x+1}</option>`
                                            )}

        
                                    </select>
                                    <button type="button" class="delete-button" id="${item.product}">
                                        Delete
                                    </button>
                                </div> 
                            </div>
                            <div class="cart-price">
                            ₹${item.price}
                            </div>
                            
                        </li>
                        `
                            )
                            .join("\n")
                    }

                </ul>
            </div>
            <div class="cart-action">
                    <h3>
                        Subtotal (${cartItems.reduce(
                          (a, c) => a + c.qty,
                          0
                        )} items)
                        :
                        ₹${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                    </h3>
                    <button id="checkout-button" class="primary fw">
                        Proceed to Checkout
                    </button>
            </div>
        </div>
      `;
  },
};

export default CartScreen;
