import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks";
import {productActions} from "../redux";


const ProductByCategoryList = () => {

    const {productsByCategory} = useAppSelector(state => state.productReducer);

    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(productActions.getProductsByCategory("men's clothing"))
    },[dispatch])

    return (
        <div>
        {/*    */}
        </div>
    );
};

export {ProductByCategoryList}
