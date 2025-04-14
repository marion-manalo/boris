// 'use client';

// import { useState } from 'react';
// import './Searchbar.css';

// const Searchbar = () => {
//   const [ticker, setTicker] = useState('');

//   const handleSearch = () => {
//     if (ticker.trim() !== '') {
//       console.log(`Searching for stock: ${ticker}`);
//       // Handle navigation or API call here
//     }
//   };

//   return (
//     <div className="searchbar-container">
//       <input
//         type="text"
//         placeholder="Enter stock ticker..."
//         value={ticker}
//         onChange={(e) => setTicker(e.target.value.toUpperCase())}
//         className="searchbar-input"
//       />
//       <button onClick={handleSearch} className="searchbar-button">
//         Search
//       </button>
//     </div>
//   );
// };

// export default Searchbar;

'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import './Searchbar.css';

const Searchbar = () => {
  const [ticker, setTicker] = useState('');
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSearch = () => {
    if (!session) {
      alert('You must be logged in to search for stocks.');
      return;
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
      <button onClick={handleSearch} className="searchbar-button">
        View Report
      </button>
    </div>
  );
};

export default Searchbar;
