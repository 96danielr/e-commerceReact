import React from 'react';
import { useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux'; 
import { getCartThunk, buyCartThunk } from '../store/slices/cart.slice';
import {useNavigate} from "react-router-dom"
import {Button} from 'react-bootstrap'


const CarSlideBar = ({show,handleClose}) => {

    const dispatch = useDispatch()
    const cart = useSelector(state=>state.cart)
    const navigate = useNavigate()
    useEffect(()=>{

        dispatch(getCartThunk())
    },[])
    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>my cart</Offcanvas.Title>
        </Offcanvas.Header>
        
        <Offcanvas.Body>
        <Button onClick={() =>dispatch(buyCartThunk())}>buy cart</Button>
            <ul>


             {

                cart.map(product =>(

                    <li onClick={()=>navigate(`/detail/${product.id}`)}>{product.title}</li>


                ))
             }
            </ul>
        </Offcanvas.Body>
      </Offcanvas>
    );
};

export default CarSlideBar;