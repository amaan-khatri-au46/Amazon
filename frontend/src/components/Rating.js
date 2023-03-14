/* eslint-disable no-nested-ternary */
// it is very similar to screen 
//  we need to have an object that has render method 
// render method except to parameters the number of stars and second one is the text that 
    // need to be return next to stars 
    // props is an object that contains some properties like value text and ect ..
     // if rating is >= 1 what i want to render is 'fa fa-star' it render a full star
     // or return props.value >=0.5? 'fa fa-star-half-o' half star
     // their are five star so we need to copy this star 5 times 
    // here i created a render function to show start based on the props.value
     // no of stars 
const Rating = {
    render: (props) =>{

        if(!props.value) {
            return '<div></div>';
        }
        return`
        <div class="rating">
        
        <span>
        <i class="${
            props.value >= 1
            ? 'fa fa-star'
            : props.value >= 0.5
            ? 'fa fa-star-half-o'
            : 'fa fa-star-o'
        }">
        </i>
        </span>

        <span>
        <i class="${
            props.value >= 2
            ? 'fa fa-star'
            : props.value >= 1.5
            ? 'fa fa-star-half-o'
            : 'fa fa-star-o'
        }">
        </i>
        </span>

        <span>
        <i class="${
            props.value >= 3
            ? 'fa fa-star'
            : props.value>= 2.5
            ? 'fa fa-star-half-o'
            : 'fa fa-star-o'
        }">
        </i>
        </span>

        <span>
        <i class="${
            props.value >= 4
            ? 'fa fa-star'
            : props.value>= 3.5
            ? 'fa fa-star-half-o'
            : 'fa fa-star-o'
        }">
        </i>
        </span>

        <span>
        <i class="${

            props.value >= 5
            ? 'fa fa-star'
            : props.value>= 4.5
            ? 'fa fa-star-half-o'
            : 'fa fa-star-o'
        }">
        </i>
        </span>
        <span> ${props.text || ''} </span>
    
        </div>

        `;
    }, 
};

export default Rating;