import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Table, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const prices = {
    small: 8,
    medium: 10,
    large: 12,
    topping: 1
};

const Pizza = () => {
    const [size, setSize] = useState('');
    const [toppings, setToppings] = useState([
        { Id: 1, Name: "Mushrooms", Cost: 1 },
        { Id: 2, Name: "Peppers", Cost: 1 },
        { Id: 3, Name: "Onions", Cost: 1 },
        { Id: 4, Name: "Olives", Cost: 1 },
        { Id: 5, Name: "Tomatoes", Cost: 1 },
        { Id: 6, Name: "Bacon", Cost: 1 },
        { Id: 7, Name: "Ham", Cost: 1 },
        { Id: 8, Name: "Pineapple", Cost: 1 },
        { Id: 9, Name: "Jalapenos", Cost: 1 },
        { Id: 10, Name: "Pepperoni", Cost: 1 },
        { Id: 11, Name: "Sausage", Cost: 1 },
        { Id: 12, Name: "Chicken", Cost: 1 },
        { Id: 13, Name: "Beef", Cost: 1 },
        { Id: 14, Name: "Shrimp", Cost: 1 },
        { Id: 15, Name: "Anchovies", Cost: 1 },
        { Id: 16, Name: "Mozzarella", Cost: 1 },
        { Id: 17, Name: "Cheddar", Cost: 1 },
        { Id: 18, Name: "Parmesan", Cost: 1 },
        { Id: 19, Name: "Feta", Cost: 1 },
        { Id: 20, Name: "Gorgonzola", Cost: 1 },
    ]);
    const [selectedToppings, setSelectedToppings] = useState([]);
    const [price, setPrice] = useState(0);

    const handleSizeChange = (event) => {
        const { value } = event.target;
        setSize(value);
        setPrice(prices[value]);
    };

    const handleToppingsChange = (event) => {
        const { checked, value } = event.target;
        if (checked) {
            setSelectedToppings([...selectedToppings, value]);
        } else {
            setSelectedToppings(selectedToppings.filter((topping) => topping !== value));
        }
    };

    let totalPrice = price + selectedToppings.length;

    if (selectedToppings.length > 3) {
        const discount = totalPrice * 0.1;
        totalPrice -= discount;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const pizza = {
            size: size,
            toppings: toppings.filter((topping) => selectedToppings.includes(topping.Name)),
        };
        try {
            await axios.post('https://localhost:7282/api/pizza', pizza);
            alert('Try Again!');
        } catch (error) {
            console.error(error);
            alert('Pizza order created successfully!');
        }
    };



    return (
        <Container>

        <div class="p-5">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <img
                            src="https://www.unicornsinthekitchen.com/wp-content/uploads/2020/08/Mutti-Pizza-bar-edit-3.700px.jpg"
                            alt="pizza"
                            class="h-100 w-100 img-fluid"
                        />
                    </div>
                    <div className="col-sm-6">


                        <Form onSubmit={handleSubmit}>
                            <h1> Make yours own pizza</h1>
                            <Form>
                                <Form.Group controlId="sizeSelector">
                                    <Form.Label>Select Size:</Form.Label>
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-sm">
                                                <Form.Check
                                                    type="radio"
                                                    label="S"
                                                    name="size"
                                                    id="small"
                                                    value="small"
                                                    checked={size === "small"}
                                                    onChange={handleSizeChange}
                                                />
                                                <img
                                                    src="https://th.bing.com/th/id/OIP.D-JkAXOvy4dHWHtZybQC3gHaHP?pid=ImgDet&rs=1"
                                                    alt="Small Pizza"
                                                    width="100"
                                                    height="100"
                                                />
                                            </div>
                                            <div class="col-sm">
                                                <Form.Check
                                                    type="radio"
                                                    label="M"
                                                    name="size"
                                                    id="medium"
                                                    value="medium"
                                                    checked={size === "medium"}
                                                    onChange={handleSizeChange}
                                                />
                                                <img
                                                    src="https://static.vecteezy.com/system/resources/previews/000/476/647/original/vector-colorful-round-tasty-pizza.jpg"
                                                    alt="Medium Pizza"
                                                    width="100"
                                                    height="100"
                                                />
                                            </div>
                                            <div class="col-sm">
                                                <Form.Check
                                                    type="radio"
                                                    label="L"
                                                    name="size"
                                                    id="large"
                                                    value="large"
                                                    checked={size === "large"}
                                                    onChange={handleSizeChange}
                                                />
                                                <img
                                                    src="https://static.vecteezy.com/system/resources/previews/000/476/647/original/vector-colorful-round-tasty-pizza.jpg"
                                                    alt="Medium Pizza"
                                                    width="100"
                                                    height="100"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Form.Group>
                            </Form>
                            <Form.Group>
                                <Form.Label>Select Toppings</Form.Label>
                                <div class="row">
                                    {toppings.map((topping) => (
                                        <div class="col-md-6">
                                            <Form.Check
                                                key={topping.Id}
                                                type="checkbox"
                                                id={topping.Id}
                                                label={`${topping.Name} (+$${topping.Cost})`}
                                                value={topping.Name}
                                                onChange={handleToppingsChange}
                                                checked={selectedToppings.includes(topping.Name)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Order Pizza
                            </Button>
                        </Form>



                    </div>
                </div>
                </div>
            </div>
            <div class="p-5">
                {selectedToppings.length > 0 && (
                    <>
                        <h3>Order Details</h3>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Size</th>
                                    <th>Toppings</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{size}</td>
                                    <td>{selectedToppings.join(', ')}</td>
                                    <td>${totalPrice}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </>
                )}
            </div>
        </Container>
    );
};

export default Pizza;