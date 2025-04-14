import Image from "next/image";
import Card from "./Card";
import "./Item.css";

interface ItemProps {
    item: {
      _id: number;
      ticker: string;
      companyName: string;
      stockValue: number;
      logoURL: string;
      description: string;
    };
}

const Item = ({ item }: ItemProps) => {
    return (
      <Card className="item-card">
        <div className="item-image-container">
            <Image src={item.logoURL} alt={item.companyName} fill className="item-image" />
        </div>
        <h2 className="item-company-name">{item.companyName}</h2>
        <h2 className="item-ticker">{item.ticker}</h2>
        <h2 className="item-stock-value">{item.stockValue}</h2>
        <p className="item-description">{item.description}</p>
      </Card>
  );
};

export default Item;