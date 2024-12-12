import React from "react";
import styles from "./Filters.module.css";

export default function ProductFilters({
  priceFrom,
  priceTo,
  onlyDiscounted,
  sortOption,
  onFilterChange,
  hideDiscountFilter = false,
}) {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
      onFilterChange(name, value);
    }
  };

  return (
    <div className={styles.filters}>
      <div>
        <h3>Price</h3>
        <input
          type="number"
          id="priceFrom"
          name="priceFrom"
          value={priceFrom}
          onChange={handleInputChange}
          min="0"
          step="1"
          placeholder="from"
        />
        <input
          type="number"
          id="priceTo"
          name="priceTo"
          value={priceTo}
          onChange={handleInputChange}
          min="0"
          step="1"
          placeholder="to"
        />
      </div>

      {!hideDiscountFilter && ( 
        <div>
          <h3>Discount items</h3>
            <input
              type="checkbox"
              name="onlyDiscounted"
              checked={onlyDiscounted}
              onChange={(e) =>
                onFilterChange("onlyDiscounted", e.target.checked)
              }
            />
        </div>
      )}

      <div>
        <h3>Sorted</h3>
        <select
          id="sortOption"
          name="sortOption"
          value={sortOption}
          onChange={(e) => onFilterChange("sortOption", e.target.value)}
        >
          <option value="all">by default</option>
          <option value="new">newest</option>
          <option value="priceAsc">price: low - high</option>
          <option value="priceDesc">price: high - low</option>
        </select>
      </div>
    </div>
  );
}
