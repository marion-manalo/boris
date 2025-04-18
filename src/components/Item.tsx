'use client';
import Image from "next/image";
import Card from "./Card";
import { useState, useEffect } from "react";
import "./Item.css";

interface ItemProps {
  item: {
    _id: string;  
    userId: string;
    ticker: string;
    logoURL: string;
    description: string;
    notes: string;
    reportType: '10-K' | '8-K';
    createdAt?: string;
  };
}

const Item = ({ item }: ItemProps) => {
  const [logoURL, setLogoURL] = useState(item.logoURL);
  const [notes, setNotes] = useState(item.notes);

  // stock data
  const [stockData, setStockData] = useState<{ price: number } | null>(null);

  const handleUpdate = async (updates: { logoURL: string; notes: string }) => {
    try {
      const res = await fetch(`/api/report/${item._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
  
      if (!res.ok) {
        throw new Error(`Failed to update. Status: ${res.status}`);
      }
  
      const updated = await res.json();
      setLogoURL(updated.logoURL);
      setNotes(updated.notes);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  // financial modeling prep (FMP) api implementation
  // places stock "Price: xxx" on item card
  useEffect( () => {
    const fetchStockData = async() => {
      try {
        const res = await fetch(`https://financialmodelingprep.com/api/v3/profile/${item.ticker}?apikey=2Hey2f7sBndBUkPFmYt5FFNchnjCoHMo`)
        const data = await res.json();
        if (data && data.length > 0) {
          setStockData({ price: data[0].price });
        }
      } catch (err) {
        console.error('Error fetching FMP stock data:', err)
      }
    };
    fetchStockData();
  }, [item.ticker]);
  

  return (
    <Card
      className="item-card"
      logoURL={logoURL}
      notes={notes}
      reportId={item._id}
      onUpdate={handleUpdate}
    >
      <div className="item-image-container">
        <Image src={logoURL} alt={item.ticker} fill className="item-image" />
      </div>
      {/* <h2 className="item-company-name">{item.companyName}</h2> */}
      <h2 className="item-ticker">{item.ticker}</h2>

      {/* adding Stock Price to item card*/}
      {stockData && (
        <p className="item-stock-price">Price: ${stockData.price.toFixed(2)}</p>
      )}

      {/* <h2 className="item-stock-value">{item.stockValue}</h2> */}
      <p className="item-description">{item.description}</p>
      <p className="item-notes"><strong>Notes:</strong> {notes}</p>
    </Card>
  );
};

export default Item;
