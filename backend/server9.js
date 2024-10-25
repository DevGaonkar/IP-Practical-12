const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5008;

// Middleware
app.use(cors());
app.use(bodyParser.json()); 

app.post('/api/calculate', (req, res) => {
    const items = req.body.items; 
    let totalCost = 0;

    items.forEach(item => {
        const price = parseFloat(item.price) || 0; 
        totalCost += price * item.quantity;
    });

    res.json({ totalCost });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
