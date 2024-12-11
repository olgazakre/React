

import API_URL from "../../../utils/api"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./AllProducts.module.css";
import ProductCard from "../../../components/ProductCard/ProductCard";
import Breadcrumbs from "../../../components/BreadCrumbs/BreadCrumbs";
import Filters from "../../../components/Filters/Filters";
import { applyFilters } from "../../../components/FilterUtils/FilterUtils";



export default function AllProductsPage(){
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
const [filteredItems, setFilteredItems] = useState([]);

const [filters, setFilters] = useState({
  priceFrom: "",
  priceTo: "",
  onlyDiscounted: false,
  sortOption: "all",
});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/all`);
        console.log("API Response:", response.data);
        const filteredItems = response.data;
        setItems(filteredItems); 
        setFilteredItems(response.data);
        setLoading(false); 
      } catch (err) {
        setError(err.message); 
        setLoading(false); 
      }
    };

    fetchData(); 
  }, []); 

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  useEffect(() => {
    setFilteredItems(applyFilters(items, filters));
  }, [filters, items]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error}</p>;


  const links = [
    {
      label: "Main Page",
      url: "/",
    },
    {
      label: "All Products",
     
    },
]      
  
         
    return(
        <div className={styles.container}>
          <Breadcrumbs links={links}/>
          <div className={styles.had}>
          <h1>All products</h1>
          </div>

          <Filters
        priceFrom={filters.priceFrom}
        priceTo={filters.priceTo}
        onlyDiscounted={filters.onlyDiscounted}
        sortOption={filters.sortOption}
        onFilterChange={handleFilterChange}
      />


<div className={styles.imegesCont}>
    {filteredItems.map((product) => (
 <ProductCard
 key={product.id}
 product={product}
 />
    ))}
</div>
        </div>
    )
};