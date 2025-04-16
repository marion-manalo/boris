'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import './Searchbar.css';

interface NewItem {
  _id: number;
  ticker: string;
  companyName: string;
  stockValue: number;
  logoURL: string;
  description: string;
  notes: string;
}

interface SearchbarProps {
  handleSearch: (item: NewItem) => void;
}

const Searchbar = ({ handleSearch }: SearchbarProps) => {
  const [ticker, setTicker] = useState('');
  const { data: session, status } = useSession();
  const router = useRouter();

  const onSearchClick = () => {
    if (!ticker.trim()) return;

    // Replace this mock object with real API call when ready
    const newItem: NewItem = {
      _id: Math.floor(Math.random() * 100000),
      ticker: ticker.toUpperCase(),
      companyName: `Company for ${ticker.toUpperCase()}`,
      stockValue: Math.floor(Math.random() * 1000),
      logoURL: 'https://placehold.co/100x100',
      description: `This is a sample description for ${ticker.toUpperCase()}.`,
      notes: 'Add your personal notes here..."'
    };

    handleSearch(newItem);
    setTicker('');
  };

  return (
    <div className="searchbar-container">
      <input
        type="text"
        placeholder="Enter stock ticker..."
        value={ticker}
        onChange={(e) => setTicker(e.target.value.toUpperCase())}
        className="searchbar-input"
      />
      <button onClick={onSearchClick} className="searchbar-button">
        Add
      </button>
    </div>
  );
};

export default Searchbar;
