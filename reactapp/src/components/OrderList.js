import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('https://localhost:7282/api/pizza');
                setOrders(response.data);
            } catch (error) {
                console.error(error);
                alert('Failed to fetch pizza orders. Please try again.');
            }
        };
        fetchOrders();
    }, []);

    return (
        <Container>
            <h1>Pizza Orders</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Size</th>
                        <th>Toppings</th>
                        <th>Total Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={order.id}>
                            <td>{index + 1}</td>
                            <td>{order.size}</td>
                            <td>{order.toppings.map((topping) => topping.name).join(', ')}</td>
                            <td>${order.totalCost}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default OrderList;