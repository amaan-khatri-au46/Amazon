import { getProduct } from "../api.js";
import { hideLoading, parseRequestUrl } from "../utils.js";
import Rating from "../components/Rating.js";

const ProductScreen = {
  // in this method we need to access to add button and then add event to that 
  after_render: () =>{
    const request = parseRequestUrl();
    
    document.getElementById('add-button').addEventListener('click',
    () => {
      // redirect user to cart screen 
      document.location.hash  = `/cart/${request.id}`;
    });
  },
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    if (product.error) {
      return `<div>${product.error}</div>`;
    }
    hideLoading();
    return `
         <div class="content">
         <div class="back-to-result">
            <a href="/#/">Back to result </a>
         </div>
         <div class="details">
            <div class="details-image">
             <img  src="${product.image}" alt="${product.name}" />
            </div>
            <div class="details-info">
            <ul>
                <li>
                    <h1>${product.name}</h1>
                </li>

                    <li>
                    ${Rating.render({
                      value: product.rating,
                      text: `${product.numReviews} reviews`,
                    })}
                    </li>

                    <li>
                    price: <strong>₹${product.price}</strong>
                    </li>

                    <li>
                         Description: 
                        <div>
                        ${product.description}
                        </div>
                    </li>
            </ul>
             </div>

             <div class="details-action">
                    <ul>
                        <li>
                        price: ₹${product.price}
                        </li>

                        <li>
                        Status : 
                        ${
                          product.countInStock > 0
                            ? `<span class= "success">In Stock</span>`
                            : `<span class="error">Unavailable</span>`
                        }
                        </li>

                        <li>
                        <button id="add-button" class="primary fw">Add to Cart </div>
                    </li>
                </ul>
            </div>

            </div>

         </div>`;
  },
};
export default ProductScreen;
