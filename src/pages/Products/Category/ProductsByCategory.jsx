import API_URL from "../../../utils/api";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductCard from "../../../components/ProductCard/ProductCard";
import Breadcrumbs from "../../../components/BreadCrumbs/BreadCrumbs";
import NotFaund from "../../NotFound/NotFaund";
import ProductFilters from "../../../components/Filters/Filters";
import { applyFilters } from "../../../components/FilterUtils/FilterUtils";
import styles from "./ProductsByCategory.module.css";

export default function ProductsByCategory() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const { itemId } = useParams();

  const [filters, setFilters] = useState({
    priceFrom: "",
    priceTo: "",
    onlyDiscounted: false,
    sortOption: "all",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories/${itemId}`);
        console.log("API Response:", response.data);
        setProducts(response.data.data);
        setFilteredProducts(response.data.data); 
        setCategoryName(response.data.category.title);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [itemId]);

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  useEffect(() => {
    setFilteredProducts(applyFilters(products, filters));
  }, [filters, products]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error}</p>;

  if (products === "error") {
    return <NotFaund />;
  }

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
    },
  ];

  return (
    <div className={styles.container}>
      <Breadcrumbs links={links} />
      <div className={styles.had}>
        <h1>{categoryName}</h1>
      </div>

      <ProductFilters
        priceFrom={filters.priceFrom}
        priceTo={filters.priceTo}
        onlyDiscounted={filters.onlyDiscounted}
        sortOption={filters.sortOption}
        onFilterChange={handleFilterChange}
      />

      <div className={styles.imegesCont}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
