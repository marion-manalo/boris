'use client';
import StockItemsInit from "../SamplePortfolio.json";
import Item from "./Item";
import Searchbar from "./Searchbar";
import {useState} from 'react';
import Card from './Card';

const Items = () => {

    const [StockItems, setStockItems] = useState(StockItemsInit);

    const handleAddItem = (newItem: typeof StockItemsInit[0]) => {
      setStockItems(prevItems => [...prevItems, newItem]);
    };

    return (
    
        <section className='px-4 py-6'>
            <Searchbar handleSearch ={handleAddItem}/>
            <div className='container-xl lg:container m-auto px-4 py-6'>
                
                {StockItems.length === 0 ? (
                    <p>No stocks in portoflio.</p>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {StockItems.map((item) => (  
                        <Item key={item._id} item={item} />
                    ))}
                        
                    </div>
                )}
            </div>
        </section>

    );
};
export default Items; 