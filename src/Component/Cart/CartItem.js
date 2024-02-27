import { useProductContext } from "../../ProductContext";
import oldStyles from "../../styles/home.module.css"
// new css styles 
import styles from "../../styles/cart.module.css";

export default function CartItem(props){

    const {name,image,price,category,quantity}=props.product;

    // required functions from custom hook (product)
    const {removeFromCart,increaseQuant,decreaseQuant}=useProductContext();

    return(
        <>
            {/* item card container */}
            <div className={oldStyles.cardContainer} >

                <div className={styles.imageContainer}>
                    <img src={image} alt={category} />
                </div>
                <div className={styles.itemInfo}>
                    <div className={styles.namePrice}>
                        {name}
                    </div>
                    
                    <div className={styles.priceQuant}>
                        <div className={styles.price}>
                            ₹{price}   
                        </div>

                        <div className={styles.quantity}>


                            <span className={styles.minus}>
                                <i class="fa-solid fa-circle-minus"
                                    onClick={() => decreaseQuant(props.product)} ></i> 
                            </span>

                            {/* quantity */}
                             &nbsp; {quantity} &nbsp;

                            {/* increase product quantity */}
                            <span className={styles.plus}>
                                <i class="fa-solid fa-circle-plus"
                                    onClick={() => increaseQuant(props.product)}></i>    
                            </span>
                            
                        </div>

                    </div>

                    {/* remove from cart button */}
                    <div className={styles.btnContainer}>
                        <button className={styles.removeBtn}
                                onClick={() => removeFromCart(props.product)}>
                            Remove From Cart
                        </button>
                    </div>

                </div>

            </div>
        </>
    )
}