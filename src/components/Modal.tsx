import React, {FC} from 'react';
import {IProduct} from "../interfaces";
import {Button, Dialog, DialogContent, Typography} from "@mui/material";
import {useAppDispatch} from "../hooks";
import {addToBag} from "../redux";

interface IProps{
    product: IProduct,
    onClose: ()=>void;
}

const Modal:FC<IProps> = ({product, onClose}) => {

    const dispatch = useAppDispatch();

    const handleAddToBag = () => {
        // Dispatch the addToShoppingBag action with the selected product
        dispatch(addToBag(product));
    };

    const { title, image, price, description, category} = product;

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogContent>
                <div>
                    <Typography variant="h5" gutterBottom>
                        {title}
                    </Typography>
                    <img
                        src={image}
                        alt={title}
                    />
                    <Typography variant="body1" paragraph>
                        {description}
                    </Typography>
                    <Typography variant="body2" className="text-xl">
                        Price: ${price}
                    </Typography>
                    <Typography variant="body2">
                        {category}
                    </Typography>
                    <Button onClick={onClose}>Close</Button>
                    <Button onClick={handleAddToBag}>Add to bag</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export {Modal}
