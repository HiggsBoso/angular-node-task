const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Product } = require('./models/product');

let app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  }
  else {
      next();
  }
});

app.use(express.static(__dirname + './../dist'));
app.use(bodyParser.json());

app.post('/products', (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price
  });

  product.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/products', (req, res) => {
  Product.find().then((products) => {
    res.send({ products });
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/products/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Product.findById(id).then((product) => {
    if (!product) {
      return res.status(404).send();
    }

    res.send({ product });
  }, (err) => {
    res.status(400).send();
  });
});

app.delete('/products/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Product.findByIdAndRemove(id).then((product) => {
    if (!product) {
      return res.status(404).send();
    }

    res.send(product);
  }).catch((e) => {
    res.status(400).send();
  });
});

app.patch('/products/:id', (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['name', 'price']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Product.findByIdAndUpdate(id, { $set: body }, { new: true }).then((product) => {
    if (!product) {
      return res.status(404).send();
    }

    res.send({ product });
  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
