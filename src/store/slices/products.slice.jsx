import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios';

export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProducts:(state, action) => {

            const products = action.payload

            return products
        }
    }
})
export const getProductsThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products')
        .then(res => dispatch(setProducts(res.data.data.products)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const filterQueryThunk = searchProduct => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${searchProduct}`)
        .then(res => dispatch(setProducts(res.data.data.products)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const filterCategoryThunk = (categorieId) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${categorieId}`)
        .then(res => dispatch(setProducts(res.data.data.products)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const {setProducts} = productsSlice.actions;

export default productsSlice.reducer;
