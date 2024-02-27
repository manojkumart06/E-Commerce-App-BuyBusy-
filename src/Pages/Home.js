// react hooks
import { useState, useEffect } from "react";
import FilterBar from "../Component/Home/FilterBar";
import MainContent from "../Component/Home/MainContent";
import styles from "../styles/home.module.css";
import Loader from "../Component/Loader/Loader";


export function Home(){

    // loading status by default true
    const [isLoading,setLoading]=useState(true);
    const [applyFilter,setApplyFilter]=useState(false);

    const [price,setPrice]=useState(5000);
    const [category,setCategory]=useState('none');

    // for searched item
    const [search,setSearch]=useState('');

    // hide loader spinner
    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false);
        },400);            
    },[]);


    // return component
    return(
        <>
        {isLoading?<Loader />:
            <>
            <div className={styles.header}>
                <input type="text" 
                    placeholder="Search Item..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}/>
                <button onClick={() => setApplyFilter(!applyFilter)}>
                    {applyFilter?"Cancel":"Apply Filter"}
                </button>
            </div>
            <div className={styles.mainContainer}>
                {applyFilter && <FilterBar price={price}
                                            setPrice={setPrice}
                                            setCategory={setCategory} />}
                
                <MainContent search={search}
                             price={price}
                             category={category}
                             applyFilter={applyFilter} />
            </div>
        </>}
        </>
    );
}