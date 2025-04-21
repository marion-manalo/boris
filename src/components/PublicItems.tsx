'use client';
import { useEffect, useState } from 'react';
import Item from './Item';
import './Items.css';

interface Report {
  _id: string;
  userId: string;
  ticker: string;
  logoURL: string;
  description: string;
  notes: string;
  reportType: '10-K' | '8-K';
  createdAt?: string;
  summary?: string;
  stockData: {
    price: number;
    change: number;
    companyName: string;
  };
}

const PublicItems = () => {
  const [stockItems, setStockItems] = useState<Report[]>([
    {
      _id: '68059eb95708b9bda9d2c721',
      userId: '67fa749334b6e4c31c059706',
      ticker: 'GOOG',
      description: 'This is a sample description for GOOG.',
      logoURL: 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
      notes: 'Add your personal notes here...',
      reportType: '10-K',
      stockData: {
        price: 153.36,
        change: -2.14,
        companyName: 'Alphabet Inc.',
      },
      summary: 'This is a summary of GOOG\'s 10-K filing...',
    },
  ]);

  return (
    <section className="items-section">
      <div className="items-container">
        {stockItems.length === 0 ? (
          <p>No stocks available.</p>
        ) : (
          <div className="items-grid">
            {stockItems.map((item) => (
              <Item
                key={item._id}
                item={item}
                onDelete={() => {
                  setStockItems((prevItems) => prevItems.filter((i) => i._id !== item._id));
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PublicItems;
