'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import './Searchbar.css';

interface Report {
  _id: string; 
  userId: string;
  ticker: string;
  logoURL: string;
  description: string;
  notes: string;
  createdAt: string;
}

interface SearchbarProps {
  handleSearch: (item: Report) => void;
}

const Searchbar = ({ handleSearch }: SearchbarProps) => {
  const [ticker, setTicker] = useState('');
  const { data: session, status } = useSession();
  const router = useRouter();

  const onSearchClick = async () => {
    if (!ticker.trim()) return;

    if (!session?.user?.id) {
      router.push('/login');
      return;
    }

    const newItem: Omit<Report, '_id' | 'createdAt'> = {
      userId: session.user.id,
      ticker: ticker.toUpperCase(),
      logoURL: 'https://placehold.co/100x100',
      description: `This is a sample description for ${ticker.toUpperCase()}.`,
      notes: 'Add your personal notes here...'
    };

    try {
      const res = await fetch('/api/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      });

      if (!res.ok) {
        throw new Error(`Failed to save report. Status: ${res.status}`);
      }

      const savedReport: Report = await res.json();
      console.log('Saved report:', savedReport);

      handleSearch(savedReport); // Pass the complete report (with _id) back to Items
      setTicker('');
    } catch (err) {
      console.error('Error posting report:', err);
    }
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
