import React, { useState } from "react";
import "./bill.css";

const BillCalculator = () => {
  const [items, setItems] = useState([{ name: "", quantity: 1, price: "" }]);
  const [totalCost, setTotalCost] = useState(0);

  const handleItemChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...items];
    newItems[index][name] = value;
    setItems(newItems);
  };

  const addItem = () => {
    const lastItem = items[items.length - 1];
    if (!lastItem.name || !lastItem.quantity || !lastItem.price) {
      alert("Please fill in all fields before adding a new item.");
      return; 
    }

    // Remove summaryItems related code
    setItems([...items, { name: "", quantity: 1, price: "" }]);
  };

  const calculateTotal = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5008/api/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
    });
    const data = await response.json();
    setTotalCost(data.totalCost);
  };

  return (
    <div className="bill-calculator-container">
      <h1>Bill Calculator</h1>
      <form onSubmit={calculateTotal}>
        {items.map((item, index) => (
          <div key={index} className="item-input">
            <input
              type="text"
              name="name"
              placeholder="Item Name"
              value={item.name}
              onChange={(event) => handleItemChange(index, event)}
              required
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(event) => handleItemChange(index, event)}
              min="1"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Item Price"
              value={item.price}
              onChange={(event) => handleItemChange(index, event)}
              min="0"
              step="0.01"
              required
            />
          </div>
        ))}
        <div style={{ textAlign: "center" }}>
          <button type="button" onClick={addItem}>
            Add Item
          </button>
          <button type="submit">Calculate Total</button>
        </div>
      </form>
      <h2>Total Cost: ₹{totalCost.toFixed(2)}</h2>


    </div>
  );
};

export default BillCalculator;

