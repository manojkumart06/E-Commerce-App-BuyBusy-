
import styles from "../../styles/home.module.css";
import ItemCard from "./ItemCard";
import { useProductContext } from "../../ProductContext";
export default function MainContent(props){
    
    // values form props to filter list
    const {search,price,category,applyFilter}=props;
    
    // product data 
    const {data} = useProductContext();

    return(
        <div className={styles.itemContainer}>
            {/* filter on the basis of search bar */}
            {data.filter((item) => {
                    return search.toLocaleLowerCase() === ''
                    ? item
                    :item.name.toLocaleLowerCase().includes(search)})
            // filter on the basis of price range
            .filter((item) => {
                    return !applyFilter
                    ? item
                    :item.price <= price})
            // filter on the basis of category
            .filter((item) => {
                    return !applyFilter || category === 'none'
                    ? item
                    :item.category === category})
            // map to each item of the array
            .map((item) => <ItemCard 
                                    key={item.id} 
                                    item={item} />)}
        </div>
        
    )
}