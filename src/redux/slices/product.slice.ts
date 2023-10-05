import {IProduct} from "../../interfaces";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {productService} from "../../services";
import {AxiosError} from "axios";

interface IState {
    products: IProduct[];
    productsByCategory: IProduct[];
    product: IProduct;
    productsInBag: IProduct[]
}

const initialState: IState = {
    products: [],
    productsByCategory: [],
    product:null,
    productsInBag:[]
}

const getProducts = createAsyncThunk<IProduct[], void>(
    'productSlice/getProducts',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await productService.getAllProduct();
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const getProductsByCategory = createAsyncThunk<IProduct[], string>(
    'productSlice/getProductByCategory',
    async (category, {rejectWithValue}) => {
        try {
            const {data} = await productService.getProductByCategory(category);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const getProduct = createAsyncThunk<IProduct, number>(
    'productSlice/getProduct',
    async (id,{rejectWithValue}) =>{
        try {
            const {data} = await productService.getProducById(id)
            return data
        }catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const slice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        addToBag: (state, action)=>{
            state.productsInBag.push(action.payload)
        },
        removeFromBag: (state, action) => {
            state.productsInBag = state.productsInBag.filter((product) => product.id !== action.payload);
        },
    },
    extraReducers: builder =>
        builder
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload
            })
            .addCase(getProductsByCategory.fulfilled, (state, action) => {
                state.productsByCategory = action.payload
            })
            .addCase(getProduct.fulfilled, (state, action)=>{
                state.product = action.payload
            })
})

const {reducer: productReducer, actions} = slice;

export const { addToBag, removeFromBag } = actions;

const productActions = {
    ...actions,
    getProducts,
    getProductsByCategory,
    getProduct,

}

export {productActions, productReducer}
