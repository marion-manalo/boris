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
}

const PublicItems = () => {
  const [publicItems, setPublicItems] = useState<Report[]>([]);

  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        const res = await fetch('SamplePortfolio.json'); // Place JSON in `public/data/`
        const data = await res.json();
        setPublicItems(data);
      } catch (err) {
        console.error('Error loading public data:', err);
      }
    };

    fetchPublicData();
  }, []);

  return (
    <section className="items-section">
      <h2>Example Reports</h2>
      <div className="items-container">
        {publicItems.length === 0 ? (
          <p>No public reports available.</p>
        ) : (
          <div className="items-grid">
            {publicItems.map((item) => (
              <Item key={item._id} item={item} onDelete={() => {}} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PublicItems;
