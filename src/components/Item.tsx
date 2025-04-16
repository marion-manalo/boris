'use client';
import Image from "next/image";
import Card from "./Card";
import { useState } from "react";
import "./Item.css";

interface ItemProps {
  item: {
    _id: number;
    ticker: string;
    companyName: string;
    stockValue: number;
    logoURL: string;
    description: string;
    notes: string;
  };
}

const Item = ({ item }: ItemProps) => {
  const [logoURL, setLogoURL] = useState(item.logoURL);
  const [notes, setNotes] = useState(item.notes);

  const handleUpdate = ({ logoURL: newLogoURL, notes: newNotes }: { logoURL: string; notes: string }) => {
    setLogoURL(newLogoURL);
    setNotes(newNotes);
  };

  return (
    <Card
      className="item-card"
      logoURL={logoURL}
      notes={notes}
      onUpdate={handleUpdate}
    >
      <div className="item-image-container">
        <Image src={logoURL} alt={item.companyName} fill className="item-image" />
      </div>
      <h2 className="item-company-name">{item.companyName}</h2>
      <h2 className="item-ticker">{item.ticker}</h2>
      <h2 className="item-stock-value">{item.stockValue}</h2>
      <p className="item-description">{item.description}</p>
      <p className="item-notes"><strong>Notes:</strong> {notes}</p>
    </Card>
  );
};

export default Item;
