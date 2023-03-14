// structure of component
// here we had make our render function independent 
// if the user is guest user i just need to show signin 
import { getUserInfo } from "../localStorage";

const Header = {
    render: () => {
        const {name, isAdmin} = getUserInfo();
        return ` 
        <div class="brand">  
            <a href="/#/">Amazon</a>
        </div>
        <div>
        ${
            name 
                ? `<a href = "/#/profile">${name}</a>`
                : `<a href="/#/signin">Sign-In</a>`
            }
            <a href="/#/cart">Cart</a>
            ${isAdmin?`<a href="/#/dashboard">Dashboard</a>` : ''}
        </div>
    ` ;
    },
    after_render: () => {},
};

export default Header;