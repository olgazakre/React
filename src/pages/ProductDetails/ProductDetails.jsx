import API_URL from "../../utils/api";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice"; 
import styles from "./ProductDetails.module.css";
import ButtonAdd from "../../components/ButtonAdd/ButtonAdd";
import Breadcrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import NotFaund from "../NotFound/NotFaund";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); 
  const { productId } = useParams();
  const dispatch = useDispatch(); 
  const [categoryName, setCategoryName] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/${productId}`);
        const res = await axios.get(`${API_URL}/categories/${response.data[0].categoryId}`)
        setProduct(response.data[0]);
        setLoading(false);
        setCategoryName(res.data.category.title)
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error}</p>;

  if (!product) return <NotFaund/>;

  const discountPercentage =
    product.discont_price !== null
      ? Math.round(
          100 * ((product.price - product.discont_price) / product.price)
        )
      : null;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product, quantity
      })
    );
    alert(`${quantity} item(s) added to the cart!`);
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const links = [
    {
      label: "Main Page",
      url: "/",
    },
    {
      label: "Categories",
      url: "/Categories",
    },
{
    label: categoryName,
    url:`/Categories/${product.categoryId}`
    
},
{
    label: product.title

}
]      

  return (
    <div className={styles.cont}>
      <Breadcrumbs links={links}/>  
    <div className={styles.container}>
      <img src={`${API_URL}${product.image}`} alt={product.title} />
      <div className={styles.recht}>
        <h1>{product.title}</h1>
        <div className={styles.priceCont}>
          {product.discont_price !== null ? (
            <>
              <h2>${product.discont_price}</h2>
              <p>${product.price}</p>
              <div className={styles.discountBadge}>-{discountPercentage}%</div>
            </>
          ) : (
            <h2>${product.price}</h2>
          )}
        </div>
        <div className={styles.controls}>
          <div className={styles.quantityWrapper}>
            <button
              className={styles.quantityButton}
              onClick={handleDecrease}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <input
              type="number"
              id="quantity"
              value={quantity}
              readOnly
              className={styles.quantityInput}
            />
            <button
              className={styles.quantityButton}
              onClick={handleIncrease}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <ButtonAdd onClick={handleAddToCart}/>
        </div>
        
      <h3>Description</h3>
      <p>{product.description}</p>
      </div>
    </div>
    </div>
  );
}
