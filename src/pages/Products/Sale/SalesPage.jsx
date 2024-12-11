import API_URL from "../../../utils/api"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./SalesPage.module.css";
import ProductCard from "../../../components/ProductCard/ProductCard";
import Breadcrumbs from "../../../components/BreadCrumbs/BreadCrumbs";
import Filters from "../../../components/Filters/Filters";
import { applyFilters } from "../../../components/FilterUtils/FilterUtils";


export default function SalePage(){
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
const [filteredProducts, setFilteredProducts] = useState([]);


const [filters, setFilters] = useState({
  priceFrom: "",
  priceTo: "",
  sortOption: "all",
  onlyDiscounted: false,
});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/all`);
        console.log("API Response:", response.data);
        const filteredItems = response.data.filter((item) => item.discont_price !== null);
        setItems(filteredItems); 
        setFilteredProducts(filteredItems)
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
    setFilteredProducts(applyFilters(items, filters));
  }, [filters, items]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error}</p>;

  const links = [
    {
      label: "Main Page",
      url: "/",
    },
    {
      label: "All Sales",
      
    },
]       
    return(
        <div className={styles.container}>
          <Breadcrumbs links={links}/>
          <div className={styles.had}>
          <h1>Discounted items</h1>
          </div>

          <Filters
        priceFrom={filters.priceFrom}
        priceTo={filters.priceTo}
        sortOption={filters.sortOption}
        onlyDiscounted={filters.onlyDiscounted}
        hideDiscountFilter={true} 
        onFilterChange={handleFilterChange}
      />

<div className={styles.imegesCont}>
    {filteredProducts.map((product) => (
 <ProductCard
 key={product.id}
 product={product}
 />
    ))}
</div>
        </div>
    )
};