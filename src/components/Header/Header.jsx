import React from 'react';
import logo from '../../assets/logo.svg';
import cartIcon from "../../assets/cartIcon.svg";
import { Link } from "react-router-dom";
import styles from "./Header.module.css"
import { useSelector } from 'react-redux';

const Header = () => {
    const {items} = useSelector(state => state.cart)

    const totalQuantity = items.reduce(
      (total, item) => total + item.quantity,
      0
    );
    
    return(
        <header>
            <div className={styles.container}>
<Link to="/">
<img src={logo} alt="logo" className={styles.logo}/>
</Link>
<nav>
    <ul className={styles.navig}>
        <li className={styles.link_main}>
            <Link to="/">Main Page</Link>
        </li>
        <li>
            <Link to="/Categories">Categories</Link>
        </li>
        <li>
            <Link to="/AllProducts">All Products</Link>
        </li>
        <li>
            <Link to="/Sales">All Sales </Link>
        </li>
    </ul>
</nav>
<Link to="/cart">
<img src={cartIcon} alt="cart" className={styles.cart}/>
{items.length > 0 && <div className={styles.badge}>{totalQuantity}</div>}
</Link>
            </div>
        </header>
    )
} 

export default Header;
