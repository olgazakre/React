import API_URL from "../../utils/api"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./SaleHome.module.css";
import NotFaund from "../../pages/NotFound/NotFaund";
import ButtonAdd from "../ButtonAdd/ButtonAdd";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

export default function SaleHome({product}){
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const dispatch = useDispatch();

  const handleAddToCart = (event) => {
    event.stopPropagation(); 
    event.preventDefault(); 
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/all`);
        console.log("API Response:", response.data);
        const filteredItems = response.data.filter((item) => item.discont_price !== null).slice(0, 4);
        setItems(filteredItems); 
        setLoading(false); 
      } catch (err) {
        setError(err.message); 
        setLoading(false); 
      }
    };

    fetchData(); 
  }, []); 

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error}</p>;


    return(
        <div className={styles.container}>
          <div className={styles.had}>
          <h1>Sale</h1>
<Link to="/Sales">
<button>All sales</button>
</Link>
          </div>

<div className={styles.imegesCont}>
    {items.map((item) => {
    const discountPercentage = Math.round(
            100 * ((item.price - item.discont_price) / item.price) );
return(           
<div key={item.id} className={styles.element}>
  <Link to={`/ProductDetails/${item.id}`}>
  <div className={styles.discountBadge}>
                  -{discountPercentage}%
                </div>
    <img src={`${API_URL}${item.image}`} alt={item.title} />
    <h3>{item.title}</h3>
    <div className={styles.priceCont}>
    <h2>${item.discont_price}</h2>
    <p>${item.price}</p>
    </div>
    </Link>
    <div className={styles.buttonAdd}>
        <ButtonAdd onClick={handleAddToCart}/>
        </div>
</div>
    )})}
</div>
        </div>
    )
};