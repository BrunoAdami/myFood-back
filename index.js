// Imports
const express = require('express');
const { Client, Request, Product, HasProduct } = require('./app/models');

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

// <<<<<<<<<<<<<<<<<<<<<<<<<  CODE TO CREATE STUFF >>>>>>>>>>>>>>>>>>>>>>>>

// createRequestsToBruno({
//   date: '01/02/2019',
//   totalValue: 123.5,
//   paid: false,
// });

/// GENERATE REQUESTS

// Request.bulkCreate([
//   {
//     date: '03/02/2019',
//     totalValue: 45.0,
//     paid: true,
//     clientId: 2,
//   },
//   {
//     date: '012/02/2019',
//     totalValue: 456.0,
//     paid: true,
//     clientId: 4,
//   },
// ]);

/// GENERATE PRODUCTS

// Product.bulkCreate([
//   {
//     name: 'Big Mac',
//     value: 16.7,
//     fabDate: '04/12/2019',
//     valDate: '05/12/2019',
//   },
//   {
//     name: 'Temaki de salmão',
//     value: 12.3,
//     fabDate: '04/12/2019',
//     valDate: '05/12/2019',
//   },
//   {
//     name: 'Salada Ceaser',
//     value: 11.0,
//     fabDate: '04/12/2019',
//     valDate: '05/12/2019',
//   },
//   {
//     name: 'Biscoito de Polvilho',
//     value: 12.0,
//     fabDate: '04/12/2019',
//     valDate: '05/12/2019',
//   },
//   {
//     name: 'Camarão Empanado',
//     value: 15.6,
//     fabDate: '04/12/2019',
//     valDate: '05/12/2019',
//   },
//   {
//     name: 'Bisteca de Porco',
//     value: 18.0,
//     fabDate: '04/12/2019',
//     valDate: '05/12/2019',
//   },
//   {
//     name: 'Red Bull',
//     value: 14.0,
//     fabDate: '04/11/2019',
//     valDate: '05/12/2019',
//   },
//   {
//     name: 'Suco de Laranja',
//     value: 12.0,
//     fabDate: '04/12/2019',
//     valDate: '05/12/2019',
//   },
//   {
//     name: 'Bife à parmegiana',
//     value: 16.7,
//     fabDate: '04/12/2019',
//     valDate: '05/12/2019',
//   },
//   {
//     name: 'Balde de frango grande',
//     value: 30.0,
//     fabDate: '04/12/2019',
//     valDate: '05/12/2019',
//   },
// ])
//   .then(createdFoods => {
//     Request.findAll({ where: { id: [1, 2] }, include: ['products'] })
//       .then(requests => {
//         requests.forEach(request => {
//           request
//             .setProducts(createdFoods)
//             .then(joinedRequestsProducts => {
//               console.log(joinedRequestsProducts);
//             })
//             .catch(err => console.log('Error while joining Requests and Products: ', err));
//         });
//       })
//       .catch(err => console.log('Error while Requests search: ', err));
//   })
//   .catch(err => console.log('Error while products creation: ', err));
