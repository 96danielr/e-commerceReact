import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios'
import getConfig from '../../utils/getConfig';


export const purchases = createSlice({
    name: 'purchases',
    initialState: [],
    reducers: {
        setPurchases:(state,action)=>{

            const purchases = action.payload

            return purchases;
        }

    }
})

export const getpurchases = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/purchases", getConfig())
        .then(res => dispatch(setPurchases(res.data.data.purchases)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const {setPurchases} = purchases.actions;

export default purchases.reducer;
