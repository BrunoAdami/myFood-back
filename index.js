// Imports
const express = require('express');
const { Client, Request } = require('./app/models');

// Create API express instance

const app = express();

app.use(express.json());

// routes

app.get('/', (req, res) => {
  res.send(`myFood API is working :)`);
});

// create a client

app.post('/client', async (req, res) => {
  const client = await Client.create(req.body);
  res.json(client);
});

// get all clients

app.get('/client', async (req, res) => {
  const clients = await Client.findAll({});
  res.json(clients);
});

// get a client by name

app.get('/client/<name>');

// Init API

const PORT = 3000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

// code to test models:

const createRequestsToBruno = async request => {
  try {
    const client = await Client.findAll({
      where: {
        name: 'Bruno',
      },
    });
    Request.create({
      ...request,
      totalValue: request.totalValue,
      clientId: client[0].id,
    });
  } catch (e) {
    console.log(e);
  }
};

createRequestsToBruno({
  date: '01/02/2019',
  totalValue: 123.5,
  paid: false,
});
