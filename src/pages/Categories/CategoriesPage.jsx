import API_URL from "../../utils/api"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./CategoriesPage.module.css";
import Breadcrumbs from "../../components/BreadCrumbs/BreadCrumbs";

export default function CategoriesPage(){
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories/all`);
        console.log("API Response:", response.data);
        const limitedItems = response.data; 
        setItems(limitedItems); 
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

      
  const links = [
    {
      label: "Main Page",
      url: "/",
    },
    {
      label: "Categories",
      
    }]

    return(
        <div className={styles.container}>
              <Breadcrumbs links={links}/>
          <div className={styles.had}>
          <h1>Categories</h1>
          </div>

<div className={styles.imegesCont}>
    {items.map((item) => (
<div key={item.id}>
  <Link to={`/Categories/${item.id}`}>
    <img src={`${API_URL}${item.image}`} alt={item.title} />
    <h3>{item.title}</h3>
    </Link>
</div>
    ))}
</div>
        </div>
    )
};