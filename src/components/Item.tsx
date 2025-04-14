import styles from "./Item.module.css";
import Image from "next/image";
import Card from "./Card";

interface ItemProps {
    item: {
      _id: number;
      ticker: string;
      companyName: string;
      stockValue: string;
      logoURL: string;
    };
}

const Item = ({ item }: ItemProps) => {
    return (
      <Card className={styles.card}>
        <div className={styles.imageContainer}>
            <Image src={item.logoURL} alt={item.companyName} fill className={styles.image} />
        </div>
      <h2 className={styles.companyName}>{item.companyName}</h2>
      <h2 className={styles.ticker}>{item.ticker}</h2>
      <h2 className={styles.stockValue}>{item.stockValue}</h2>
    </Card>
  );
};

export default Item;