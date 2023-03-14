// we defined a homescreen its like an object 
import axios from 'axios';
import Rating from '../components/Rating.js';
import { hideLoading, showLoading } from '../utils.js';

// and it contains a method call render 
// javascript uses the document object model(DOM) to manipulate the dom elements.
// rendering refers to showing the output in the browser. 
const HomeScreen = {
      render: async () => {
        showLoading();
        const response = await axios({
            url:'http://localhost:8000/api/products' ,
            // the output which returns is an array and this array in json format 
            headers: {
                'Content-Type': 'application/json',
            },
        });
        hideLoading();
        if(!response || response.statusText !== 'OK') {
            return `<div> Error in getting data </div>`;
        }
        // json return a promise and while using await i can convert that data 
        // and save that data inside products variable
        const products = response.data;
        // here we are going to use template literals 
        // so its possible us to return an string with multiple line and also 
        // we can use js object inside template literal using $  {}
        return ` 
        <ul class="products">
         ${products.map(
            // using map function we are converting each product araays to li 
            (product) => `
         <li>
         <div class="product">
                            <a href="/#/product/${product._id}"> 
                           
                                <img src="${product.image}" alt="${product.name}" /> 
                            </a>
                            <div class="product-name">
                                <a href="/#/product/1">
                               
                                    ${product.name}  
                                </a>
                            </div>
                            <div class="product-rating">
                            ${Rating.render({
                                value: product.rating, 
                                text: `${product.numReviews} reviews`,
                            })}
                            </div>
                            <div class="product-brand">
                           
                                ${product.brand} 
                            </div>
                            <div class="product-price">
                
                                ₹ ${product.price}  
                            </div>
                        </div>
         </li>
         `

        ).join('\n')} 
           
        `;
    },
};
export default HomeScreen;