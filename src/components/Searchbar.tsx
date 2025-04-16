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
  reportType: '10-K' | '8-K';
  createdAt?: string;
  summary?: string;
}

interface SearchbarProps {
  handleSearch: (item: Report) => void;
}

const Searchbar = ({ handleSearch }: SearchbarProps) => {
  const [ticker, setTicker] = useState('');
  const [reportType, setReportType] = useState<'10-K' | '8-K'>('10-K');
  const { data: session } = useSession();
  const router = useRouter();

  const onSearchClick = async () => {
    if (!ticker.trim()) return;

    if (!session?.user?.id) {
      router.push('/login');
      return;
    }

    const newItem: Omit<Report, '_id' | 'createdAt' | 'summary'> = {
      userId: session.user.id,
      ticker: ticker.toUpperCase(),
      logoURL: 'https://placehold.co/100x100',
      description: `This is a sample description for ${ticker.toUpperCase()}.`,
      notes: 'Add your personal notes here...',
      reportType, 
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

      handleSearch(savedReport);
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

      <select
        value={reportType}
        onChange={(e) => setReportType(e.target.value as '10-K' | '8-K')}
        className="searchbar-dropdown"
      >
        <option value="10-K">10-K</option>
        <option value="8-K">8-K</option>
      </select>

      <button onClick={onSearchClick} className="searchbar-button">
        Add
      </button>
    </div>
  );
};

export default Searchbar;
