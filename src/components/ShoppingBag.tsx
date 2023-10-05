import React, { FC } from 'react';
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useAppDispatch, useAppSelector } from "../hooks";
import {addToBag, removeFromBag} from "../redux";
import { IProduct } from "../interfaces";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

interface GroupedProduct {
    product: IProduct;
    quantity: number;
}

const ShoppingBag: FC<IProps> = ({ onClose, isOpen }) => {
    const productsInBag = useAppSelector(state => state.productReducer.productsInBag);
    const dispatch = useAppDispatch();

    const handleRemoveFromBag = (productId: number) => {
        dispatch(removeFromBag(productId));
    };

    const handleAddToBag = (productId: number) => {
        dispatch(addToBag(productId));
    };

    const groupProducts = (products: IProduct[]): GroupedProduct[] =>
        products.reduce((result: GroupedProduct[], product: IProduct) => {
            const existingProduct = result.find((p: GroupedProduct) => p.product.id === product.id);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                result.push({ product, quantity: 1 });
            }
            return result;
        }, []);

    const groupedProducts: GroupedProduct[] = groupProducts(productsInBag);

    const menuClassName = isOpen
        ? 'left-menu open translate-x-0'
        : 'left-menu -translate-x-full';

    return (
        <div className={`fixed top-0 right-0 w-64 h-full bg-amber-50 pt-8 z-10 transform transition-transform duration-700 flex flex-col justify-center gap-4 p-6 ${menuClassName}`}>
            <div className="flex justify-between items-center">
                <span className="bg-blue-500 text-white px-2 py-1 rounded-full">
                    {productsInBag.length} items
                </span>
            </div>
            {isOpen && (<XMarkIcon onClick={onClose} className="h-6 w-6 cursor-pointer absolute top-4 right-4" />)}

            {productsInBag.length === 0 ? (
                <div>Your Bag is empty</div>
            ) : (
                groupedProducts.map((group) => (
                    <div key={group.product.id}>
                        <div className=" flex flex-wrap gap-3">
                            Title: {group.product.title} - Quantity: {group.quantity}
                            <button className="h-4 bg-gray-300 w-4 flex justify-center items-center" onClick={() => handleAddToBag(group.product.id)}>+</button>
                            <button className="h-4 bg-gray-300 w-4 flex justify-center items-center" onClick={() => handleRemoveFromBag(group.product.id)}>-</button>
                        </div>
                        <img className="mt-4 mb-4" src={group.product.image} alt={group.product.title} />
                        <button className="h-6 w-16 bg-gray-300 flex justify-center items-center" onClick={() => handleRemoveFromBag(group.product.id)}>Remove</button>
                    </div>
                ))
            )}
        </div>
    );
};

export { ShoppingBag };
