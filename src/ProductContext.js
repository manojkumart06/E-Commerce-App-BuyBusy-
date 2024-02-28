import { createContext, useContext, useEffect, useState } from "react";
import { db } from "./firebase";
import { updateDoc, doc, arrayUnion, onSnapshot, arrayRemove } from "firebase/firestore";
import { data } from "./Assets/data";
import { useAuthValue } from "./AuthContext";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

export const productContext = createContext();


// custom hook 
export function useProductContext(){
    const value=useContext(productContext);
    return value;
}

// custom Provider
export function ProductContext({children}){
    
    // user's login status and loggedIn user
    const {isLoggedIn,userLoggedIn,setLoggedIn,setUserLoggedIn}=useAuthValue();
    const [itemInCart,setItemInCart]=useState(0);
    const [cart,setCart]=useState([]);
    const [myorders,setMyOrders]=useState([]);
    const [total,setTotal]=useState(0);

    function getDate(){
        // getting current date
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        // yy/mm/dd format
        return(`${year}-${month}-${day}`);
    }


    // to check if the user is still logged in on page refresh
    useEffect(()=>{
        // getting user authentication token from local storage
        const token=window.localStorage.getItem("token");
        if(token){
            // loggedIn user's data 
            const index=window.localStorage.getItem("index");
            const user=JSON.parse(index);
            setLoggedIn(token);
            setUserLoggedIn(user);
        }
    },[setLoggedIn, setUserLoggedIn]);



    // getting real time update of user's cart
    useEffect(()=>{
        // check whether user is logged in or not
        if(isLoggedIn){
            // getting real-time update of data
            const unsub = onSnapshot(doc(db, "BuyBusyy",userLoggedIn.id), (doc) => {
                // storing all the data in cart
                setCart(doc.data().cart);
                setMyOrders(doc.data().orders);
            });
            // total amount of products in cart
            let sum=0;
            cart.map((item) => Number(sum+=item.price));
            setTotal(sum);
            setItemInCart(cart.length);
            // unsubscribe from the snapshot listener when component unmounts
            return () => unsub();
        }
    },[isLoggedIn,userLoggedIn]);
    

    // To increase item's quantity
    async function increaseQuant(product){
        // finding item's index in cart array
        const index=cart.findIndex((item) => item.name === product.name);
        cart[index].quantity++; 
        setCart(cart);

        // update cart in firebase database
        const userRef = doc(db, "BuyBusyy", userLoggedIn.id);
        await updateDoc(userRef, {
            cart: cart
        });
        setItemInCart(itemInCart + 1);
        setTotal(Number(total + cart[index].price));
    }


    // to decrease item's quantity
    async function decreaseQuant(product){
        // finding item's index
        const index=cart.findIndex((item) => item.name === product.name);
        setTotal(Number(total - cart[index].price));
        
        // change quantity of product and update cart array
        if(cart[index].quantity > 1){
            cart[index].quantity--;
        }
        else{
            cart.splice(index,1);
        }

        // update cart and item Count
        setCart(cart);
        setItemInCart(itemInCart -1 );

        // update cart in array
        const userRef = doc(db, "BuyBusyy", userLoggedIn.id);
        await updateDoc(userRef, {
            cart: cart
        });
    }


    // function to add product to cart
    async function addToCart(product){

        if(!isLoggedIn){
            toast.error("Ohh please, you need login!!");
            return;
        }

        // checking whether the product already in the cart
        const index=cart.findIndex((item) => item.name === product.name);
        if(index !== -1){
            increaseQuant(cart[index]);
            toast.success("Product Quantity Increased!!");
            return;
        }

        // add product to the cart of loggedIn user
        const userRef = doc(db, "BuyBusyy", userLoggedIn.id);
        await updateDoc(userRef, {
            cart: arrayUnion({quantity:1,...product})
        });
        // increase item  count and total amount
        setTotal(Number(total + product.price));
        setItemInCart(itemInCart + 1);
        toast.success("Added to your Cart!!")
    }




    // remove a single product from cart
    async function removeFromCart(product){
        // update database 
        const userRef = doc(db, "BuyBusyy", userLoggedIn.id);
        await updateDoc(userRef, {
            cart: arrayRemove(product)
        });
        // reduce item count and total amount
        setTotal(Number(total - (product.quantity * product.price)));
        setItemInCart(itemInCart - product.quantity);
        toast.success("Removed from Cart!!")
    }

    // function to remove all product from cart
    async function clearCart(){
        
        if(itemInCart === 0){
            toast.error("Nothing to remove in Cart!!");    
            return;
        }

        // empty cart array in database
        const userRef = doc(db, "BuyBusyy", userLoggedIn.id);
        await updateDoc(userRef, {
            cart: []
        });
        setTotal(0);
        setItemInCart(0);
        toast.success("Cart is Empty Now!!");
    }


    
    // function to purchase all the items in cart
    async function purchaseAll(){
        // get current data from function
        const currentDate=getDate();

        // adding order to database
        const userRef = doc(db, "BuyBusyy", userLoggedIn.id);
        await updateDoc(userRef, {
            orders: arrayUnion({date:currentDate,list:cart,amount:total})
        });
        clearCart();
    }


    return(
        <productContext.Provider  value={{data,
                                    addToCart,
                                    cart,
                                    total,
                                    setTotal,
                                    removeFromCart,
                                    clearCart,
                                    purchaseAll,
                                    myorders,
                                    increaseQuant,
                                    decreaseQuant,
                                    itemInCart}}>

            {children}
        </productContext.Provider>
    );
}