// Imports
const express = require('express');
const { Client, Request, Product, HasProduct, Restaurant, Deliver, Vehicle, DeliversRequest } = require('./app/models');
const Sequelize = require('sequelize');
const cors = require('cors');

// Create API express instance

const app = express();

app.use(cors());

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

// Fetch data

// SELECT `id`, `name`, `CPF`, `adress`, `phone`, `email` FROM `Clients` AS `Client`;

app.get('/client', async (req, res) => {
  const clients = await Client.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });
  res.set('X-Total-Count', clients.length);
  res.set('Access-Control-Expose-Headers', 'X-Total-Count');
  res.json(clients);
});

app.get('/deliver', async (req, res) => {
  const delivers = await Deliver.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });
  res.set('X-Total-Count', delivers.length);
  res.set('Access-Control-Expose-Headers', 'X-Total-Count');
  res.json(delivers);
});

app.get('/product', async (req, res) => {
  const products = await Product.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });
  res.set('X-Total-Count', products.length);
  res.set('Access-Control-Expose-Headers', 'X-Total-Count');
  res.json(products);
});

app.get('/request', async (req, res) => {
  const requests = await Request.findAll({ attributes: { exclude: ['createdAt', 'updatedAt', 'clientId'] } });
  res.set('X-Total-Count', requests.length);
  res.set('Access-Control-Expose-Headers', 'X-Total-Count');
  res.json(requests);
});

app.get('/restaurant', async (req, res) => {
  const restaurants = await Restaurant.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });
  res.set('X-Total-Count', restaurants.length);
  res.set('Access-Control-Expose-Headers', 'X-Total-Count');
  res.json(restaurants);
});

// Querys created for demonstration purpose

// SELECT `id`, `name`, `CPF`, `adress`, `phone`, `email`, `createdAt`, `updatedAt` FROM `Clients` AS `Client` WHERE `Client`.`name` = 'clientName';

app.get('/client/:clientName', async (req, res) => {
  const clients = await Client.findAll({ where: { name: req.params.clientName } });
  res.json(clients);
});

// SELECT `id`, `date`, `totalValue`, `paid`, `clientId`, `createdAt`, `updatedAt`, `ClientId` FROM `Requests` AS `Request` WHERE `Request`.`totalValue` > 'requestValueMinimum'

app.get('/request/:requestValueMinimum', async (req, res) => {
  const Op = Sequelize.Op;
  const requests = await Request.findAll({
    where: { totalValue: { [Op.gt]: Number(req.params.requestValueMinimum) } },
  });
  res.json(requests);
});

//

// Init API

const PORT = 5000;

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

//////// CREATE RESTAURANTS

// Restaurant.bulkCreate([
//   {
//     name: 'McDonalds',
//     score: 4.0,
//     category: 'Fast Food',
//     CNPJ: '1234567890',
//     adress: 'Rua do McDonalds',
//   },
//   {
//     name: 'Burguer King',
//     score: 4.2,
//     category: 'Fast Food',
//     CNPJ: '1234567893',
//     adress: 'Rua do Burguer King',
//   },
//   {
//     name: 'KFC',
//     score: 4.1,
//     category: 'Fast Food',
//     CNPJ: '1234567890',
//     adress: 'Rua do KFC',
//   },
//   {
//     name: 'Pizzaria Trivial',
//     score: 5.0,
//     category: 'Restaurante',
//     CNPJ: '1234567890',
//     adress: 'Rua da Trivial',
//   },
//   {
//     name: 'Spoleto',
//     score: 4.0,
//     category: 'Restaurante',
//     CNPJ: '1234567890',
//     adress: 'Rua do Spoleto',
//   },
//   {
//     name: 'Taki Sushi',
//     score: 4.6,
//     category: 'Restaurante',
//     CNPJ: '1234567890',
//     adress: 'Rua do Sushi',
//   },
//   {
//     name: 'Gelato',
//     score: 4.5,
//     category: 'Sorveteria',
//     CNPJ: '1234567890',
//     adress: 'Rua do Gelato',
//   },
//   {
//     name: 'Fogo de Churrasco',
//     score: 4.0,
//     category: 'Restaurante',
//     CNPJ: '1234567890',
//     adress: 'Rua da Carne',
//   },
//   {
//     name: 'SubWay',
//     score: 4.1,
//     category: 'Fast Food',
//     CNPJ: '1234567890',
//     adress: 'Rua do SubWay',
//   },
//   {
//     name: 'Divino Fogão',
//     score: 4.3,
//     category: 'Restaurante',
//     CNPJ: '1234567890',
//     adress: 'Rua do Fogão',
//   },
// ]);

// CREATE AND LINK PRODUCTS

// Product.bulkCreate([
//   {
//     name: 'Lasanha',
//     value: 22.0,
//     fabDate: '04/12/2019',
//     valDate: '06/07/2019',
//   },
//   {
//     name: 'Macarrão tradicional',
//     value: 24.0,
//     fabDate: '04/12/2019',
//     valDate: '06/07/2019',
//   },
//   {
//     name: 'Macarrão quatro queijos',
//     value: 15.0,
//     fabDate: '04/12/2019',
//     valDate: '06/07/2019',
//   },
// ]).then(products => {
//   Restaurant.findAll({ where: { id: [5] }, include: ['products'] }).then(restaurants => {
//     restaurants.forEach(restaurant => restaurant.setProducts(products));
//   });
// });

// CREATE CLIENTS

// Client.bulkCreate([
//   {
//     name: 'Pedro',
//     CPF: '13423423',
//     adress: 'Rua do Pedro',
//     email: 'pedro@teste.com',
//   },
//   {
//     name: 'Clark Kent',
//     CPF: '13423423',
//     adress: 'Rua do Superman',
//     email: 'superman@teste.com',
//   },
//   {
//     name: 'Bruce Wayne',
//     CPF: '13423423',
//     adress: 'Rua do Batman',
//     email: 'batman@teste.com',
//   },
//   {
//     name: 'Peter Parker',
//     CPF: '13423423',
//     adress: 'Rua do Aranha',
//     email: 'spiderman@teste.com',
//   },
//   {
//     name: 'Bruce Banner',
//     CPF: '13423423',
//     adress: 'Rua do Verdão',
//     email: 'hulk@teste.com',
//   },
//   {
//     name: 'Tony Stark',
//     CPF: '13423423',
//     adress: 'Rua do Aço',
//     email: 'ironman@teste.com',
//   },
// ]);

// CREATE DELIVERS

// Deliver.bulkCreate([
//   {
//     name: 'Doutor Estranho',
//     email: 'doutor@teste.com',
//     CNH: '14324214',
//     RG: '1432423423',
//     phone: '(11) 12345678',
//   },
//   {
//     name: 'Pantera Negra',
//     email: 'pantera@teste.com',
//     CNH: '14324214',
//     RG: '1432423423',
//     phone: '(11) 12345678',
//   },
//   {
//     name: 'Viúva Negra',
//     email: 'viuva@teste.com',
//     CNH: '14324214',
//     RG: '1432423423',
//     phone: '(11) 12345678',
//   },
//   {
//     name: 'Thor',
//     email: 'thor@teste.com',
//     CNH: '14324214',
//     RG: '1432423423',
//     phone: '(11) 12345678',
//   },
//   {
//     name: 'Feiticeira Escarlate',
//     email: 'escarlate@teste.com',
//     CNH: '14324214',
//     RG: '1432423423',
//     phone: '(11) 12345678',
//   },
//   {
//     name: 'Galactus',
//     email: 'galactus@teste.com',
//     CNH: '14324214',
//     RG: '1432423423',
//     phone: '(11) 12345678',
//   },
//   {
//     name: 'Gavião Arqueiro',
//     email: 'gavião@teste.com',
//     CNH: '14324214',
//     RG: '1432423423',
//     phone: '(11) 12345678',
//   },
//   {
//     name: 'Charles Xavier',
//     email: 'xavier@teste.com',
//     CNH: '14324214',
//     RG: '1432423423',
//     phone: '(11) 12345678',
//   },
//   {
//     name: 'Magneto',
//     email: 'magneto@teste.com',
//     CNH: '14324214',
//     RG: '1432423423',
//     phone: '(11) 12345678',
//   },
//   {
//     name: 'Demolidor',
//     email: 'demolidor@teste.com',
//     CNH: '14324214',
//     RG: '1432423423',
//     phone: '(11) 12345678',
//   },
// ]);

// CREATE VEHICLES

// Vehicle.bulkCreate([
//   {
//     kind: 'Car',
//     plate: '2131231',
//     model: 'Ferrari',
//     deliverId: 1,
//   },
//   {
//     kind: 'Car',
//     plate: '432432423',
//     model: 'Mazeratti',
//     deliverId: 2,
//   },
//   {
//     kind: 'Car',
//     plate: '43423423',
//     model: 'Ford',
//     deliverId: 3,
//   },
//   {
//     kind: 'Bycicle',
//     plate: null,
//     model: null,
//     deliverId: 4,
//   },
//   {
//     kind: 'Bycicle',
//     plate: null,
//     model: null,
//     deliverId: 5,
//   },
//   {
//     kind: 'Plane',
//     plate: null,
//     model: 'Airbus',
//     deliverId: 6,
//   },
//   {
//     kind: 'Plane',
//     plate: null,
//     model: 'Airbus',
//     deliverId: 7,
//   },
//   {
//     kind: 'Spaceship',
//     plate: null,
//     model: 'Light Speed',
//     deliverId: 8,
//   },
//   {
//     kind: 'Rocket',
//     plate: null,
//     model: 'Ultrassonic',
//     deliverId: 9,
//   },
//   {
//     kind: 'Truck',
//     plate: '143242342',
//     model: 'Monster Truck',
//     deliverId: 10,
//   },
// ]);

// link REQUESTS and delivers

// DeliversRequest.bulkCreate([
//   {
//     deliverPrice: 123.0,
//     destiny: 'Rua do teste 1',
//     date: '12/12/2019',
//     deliveryLimit: '13/12/2019',
//     done: false,
//     requestId: 10,
//     deliverId: 10,
//   },
//   {
//     deliverPrice: 15.0,
//     destiny: 'Rua do teste 2',
//     date: '12/12/2019',
//     deliveryLimit: '13/12/2019',
//     done: false,
//     requestId: 9,
//     deliverId: 1,
//   },
//   {
//     deliverPrice: 17.0,
//     destiny: 'Rua do teste 3',
//     date: '12/12/2019',
//     deliveryLimit: '13/12/2019',
//     done: true,
//     requestId: 8,
//     deliverId: 2,
//   },
//   {
//     deliverPrice: 189.0,
//     destiny: 'Rua do teste 4',
//     date: '12/12/2019',
//     deliveryLimit: '13/12/2019',
//     done: false,
//     requestId: 7,
//     deliverId: 3,
//   },
//   {
//     deliverPrice: 13.0,
//     destiny: 'Rua do teste 5',
//     date: '12/12/2019',
//     deliveryLimit: '13/12/2019',
//     done: true,
//     requestId: 6,
//     deliverId: 4,
//   },
//   {
//     deliverPrice: 27.0,
//     destiny: 'Rua do teste 6',
//     date: '12/12/2019',
//     deliveryLimit: '13/12/2019',
//     done: true,
//     requestId: 5,
//     deliverId: 5,
//   },
//   {
//     deliverPrice: 37.0,
//     destiny: 'Rua do teste 7',
//     date: '12/12/2019',
//     deliveryLimit: '13/12/2019',
//     done: true,
//     requestId: 4,
//     deliverId: 6,
//   },
//   {
//     deliverPrice: 45.0,
//     destiny: 'Rua do teste 8',
//     date: '12/12/2019',
//     deliveryLimit: '13/12/2019',
//     done: true,
//     requestId: 3,
//     deliverId: 7,
//   },
//   {
//     deliverPrice: 23.0,
//     destiny: 'Rua do teste 9',
//     date: '12/12/2019',
//     deliveryLimit: '13/12/2019',
//     done: true,
//     requestId: 2,
//     deliverId: 8,
//   },
//   {
//     deliverPrice: 34.0,
//     destiny: 'Rua do teste 10',
//     date: '12/12/2019',
//     deliveryLimit: '13/12/2019',
//     done: false,
//     requestId: 1,
//     deliverId: 9,
//   },
// ]);
