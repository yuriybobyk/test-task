import React, {FC} from 'react';
import {IProduct} from "../interfaces";

interface IProps{
    product: IProduct;
    onClick: () => void;
}

const ProductCard:FC<IProps> = ({product, onClick}) => {

    const {title, image, price } = product

    return (
        <div onClick={onClick} className="w-[350px] h-[380px] flex flex-col items-center p-3 border-solid border-2 border-b-sky-500 gap-6">
            <div className="text-xl underline decoration-2">{title}</div>
            <img className="h-[200px] transition duration-200 ease-out hover:scale-105" src={image} alt={title}/>
            <div>${price}</div>
        </div>
    );
};

export {ProductCard}
