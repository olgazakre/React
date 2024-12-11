export const applyFilters = (items, filters) => {
  let filtered = [...items];

  const { priceFrom, priceTo, onlyDiscounted, sortOption } = filters;

  // Фильтрация по минимальной цене
  if (priceFrom && priceFrom > 0) {
    filtered = filtered.filter((product) => {
      const effectivePrice = product.discont_price || product.price;
      return effectivePrice >= parseFloat(priceFrom);
    });
  }

  // Фильтрация по максимальной цене
  if (priceTo && priceTo > 0) {
    filtered = filtered.filter((product) => {
      const effectivePrice = product.discont_price || product.price;
      return effectivePrice <= parseFloat(priceTo);
    });
  }

  // Фильтрация по наличию скидки
  if (onlyDiscounted) {
    filtered = filtered.filter((product) => product.discont_price !== null);
  }

  // Сортировка
  if (sortOption === "new") {
    // Сортировка по новизне (по дате обновления, начиная с новых)
    filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  } else if (sortOption === "priceAsc") {
    // Сортировка по возрастанию цены
    filtered.sort((a, b) => {
      const priceA = a.discont_price || a.price;
      const priceB = b.discont_price || b.price;
      return priceA - priceB;
    });
  } else if (sortOption === "priceDesc") {
    // Сортировка по убыванию цены
    filtered.sort((a, b) => {
      const priceA = a.discont_price || a.price;
      const priceB = b.discont_price || b.price;
      return priceB - priceA;
    });
  }

  return filtered;
};
