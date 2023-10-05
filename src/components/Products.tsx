import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks";
import {productActions} from "../redux";
import {ProductCard} from "./ProductCard";
import {IProduct} from "../interfaces";
import {Modal} from "./Modal";

const Products = () => {

    const {products} = useAppSelector(state => state.productReducer);
    const [sortingOption, setSortingOption] = useState('alphabetical');
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(productActions.getProducts())
    }, [dispatch]);

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortingOption(event.target.value);
    };

    const handleProductClick = (product: IProduct) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    const sortedProducts = [...products];

    if (sortingOption === 'alphabetical') {
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortingOption === 'lowToHighPrice') {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortingOption === 'highToLowPrice') {
        sortedProducts.sort((a, b) => b.price - a.price);
    }

    return (
        <div className="w-full flex items-center justify-center ">
            <div className="absolute top-14 right-4">
                <label  htmlFor="sortSelect">Sort By: </label>
                <select id="sortSelect" onChange={handleSortChange} value={sortingOption}>
                    <option value="alphabetical">Alphabetical (A-Z)</option>
                    <option value="lowToHighPrice">Price: Low to High</option>
                    <option value="highToLowPrice">Price: High to Low</option>
                </select>
            </div>
            <div className="flex w-full flex-wrap gap-3 top-24 items-center  mt-16 p-4">
                {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onClick={() => handleProductClick(product)} />
                ))}
            </div>
            {isModalOpen && selectedProduct && (
                <Modal product={selectedProduct} onClose={closeModal} />
            )}
        </div>
    );
};

export {Products}
