const express = require('express');
const redis = require('redis');
const { promisify } = require('util');

const app = express();

const listProducts = [
  { itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4 },
  { itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10 },
  { itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2 },
  { itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5},
];

// Connect to Redis
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

client.on('error', (err) => {
  console.error(`Redis connection error: ${err}`);
});

// Data access functions
function getItemById(id) {
  return listProducts.find(product => product.itemId === id);
}

async function reserveStockById(itemId, stock) {
  try {
    await setAsync(`item:${itemId}:stock`, stock);
    console.log(`Reserved ${stock} stock for item ${itemId}`);
  } catch (error) {
    console.error(`Error reserving stock: ${error}`);
  }
}

async function getCurrentReservedStockById(itemId) {
  try {
    const stock = await getAsync(`item:${itemId}:stock`);
    return stock ? parseInt(stock, 10) : 0;
  } catch (error) {
    console.error(`Error getting reserved stock: ${error}`);
    return 0;
  }
}

// Define routes
app.get('/list_products', (req, res) => {
  res.json(listProducts.map(product => ({
    itemId: product.itemId,
    itemName: product.itemName,
    price: product.price,
    initialAvailableQuantity: product.initialAvailableQuantity,
  })));
});

app.get('/list_products/:itemId', (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const product = getItemById(itemId);

  if (!product) {
    res.json({ status: 'Product not found' });
    return;
  }

  const currentQuantity = product.initialAvailableQuantity - getCurrentReservedStockById(itemId);

  res.json({
    itemId: product.itemId,
    itemName: product.itemName,
    price: product.price,
    initialAvailableQuantity: product.initialAvailableQuantity,
    currentQuantity,
  });
});

app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const product = getItemById(itemId);

  if (!product) {
    res.json({ status: 'Product not found' });
    return;
  }

  const currentQuantity = product.initialAvailableQuantity - await getCurrentReservedStockById(itemId);

  if (currentQuantity <= 0) {
    res.json({ status: 'Not enough stock available', itemId });
    return;
  }

  await reserveStockById(itemId, 1);

  res.json({ status: 'Reservation confirmed', itemId });
});

// Start server
const PORT = 1245;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
