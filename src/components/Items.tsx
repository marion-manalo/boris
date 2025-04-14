'use client';
import StockItemsInit from "../SamplePortfolio.json";
import Item from "./Item";
import Searchbar from "./Searchbar";
import { useState } from 'react';
import './Items.css'; // 👈 import CSS

const Items = () => {
  const [StockItems, setStockItems] = useState(StockItemsInit);

  const handleAddItem = (newItem: typeof StockItemsInit[0]) => {
    setStockItems(prevItems => [...prevItems, newItem]);
  };

  return (
    <section className="items-section">
        <div className="searchbar-wrapper">
            <Searchbar handleSearch={handleAddItem} />
        </div>
        <div className="items-container">
            {StockItems.length === 0 ? (
            <p>No stocks in portfolio.</p>
    ) : (
        <div className="items-grid">
            {StockItems.map((item) => (
                <Item key={item._id} item={item} />
            ))}
        </div>
    )}
  </div>
</section>

  );
};

export default Items;
