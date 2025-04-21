'use client';
import Image from "next/image";
import Card from "./Card";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
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

  onDelete: (id: string) => void;
}

const Item = ({ item, onDelete }: ItemProps) => {
  const { data: session } = useSession();
  const [logoURL, setLogoURL] = useState(item.logoURL);
  const [notes, setNotes] = useState(item.notes);

  const [stockData, setStockData] = useState<{
    price: number;
    change: number;
    companyName: string;
  } | null>(null);

  const handleUpdate = async (updates: { logoURL: string; notes: string }) => {
    if (!session) {
      alert("Please log in to update items.");
      return;
    }

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

  const handleDelete = async () => {
    if (!session) {
      alert("Please log in to delete items.");
      return;
    }

    try {
      const res = await fetch(`/api/report/${item._id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error(`Failed to delete. Status: ${res.status}`);
      }

      onDelete(item._id);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const res = await fetch(
          `https://financialmodelingprep.com/api/v3/profile/${item.ticker}?apikey=2Hey2f7sBndBUkPFmYt5FFNchnjCoHMo`
        );
        const data = await res.json();
        if (data && data.length > 0) {
          setStockData({
            price: data[0].price,
            change: data[0].changes,
            companyName: data[0].companyName,
          });
        }
      } catch (err) {
        console.error('Error fetching FMP stock data:', err);
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
      onDelete={handleDelete}
    >
      <div className="item-image-container">
        <Image src={logoURL} alt={item.ticker} fill className="item-image" />
      </div>
      <h2 className="item-ticker">
        <strong>{stockData?.companyName}</strong> ({item.ticker})
      </h2>

      {stockData && (
        <p className="item-stock-price">
          Price: ${stockData.price.toFixed(2)}{' '}
          {(() => {
            const previousPrice = stockData.price - stockData.change;
            const percentChange = (stockData.change / previousPrice) * 100;
            const changeColor = percentChange >= 0 ? 'green' : 'red';
            const formattedChange = percentChange.toFixed(2);

            return (
              <span style={{ color: changeColor }}>
                {percentChange >= 0 && '+'}
                {stockData.change.toFixed(2)} ({formattedChange}%)
              </span>
            );
          })()}
        </p>
      )}

      <p className="item-description">{item.description}</p>
      <p className="item-notes"><strong>Notes:</strong> {notes}</p>
    </Card>
  );
};

export default Item;
