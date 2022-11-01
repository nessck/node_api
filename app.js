const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const pool = require('./configuration/config');

const app = express();
app.use(helmet());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Get all food
const getFood = (req, res) => {
  pool.query('SELECT * FROM food', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json({
      status: 'sucess',
      requestTime: req.requestTime,
      data: results.rows,
    });
  });
};

// Get food by id
const getFoodById = (req, res) => {
  const reqId = parseInt(req.params.id);
  pool.query('SELECT * FROM food WHERE id = $1', [reqId], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json({
      status: 'sucess',
      requestTime: req.requestTime,
      data: results.rows,
    });
  });
};

// Create food
const newFood = (req, res) => {
  const { dish, country } = req.body;
  pool.query(
    'INSERT INTO food (dish, country) VALUES ($1, $2)',
    [dish, country],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`New food added`);
    }
  );
};

// Update food
const updateFood = (req, res) => {
  const reqId = parseInt(req.params.id);
  const { dish, country } = req.body;
  pool.query(
    'UPDATE food SET dish = $1, country = $2 WHERE id = $3',
    [dish, country, reqId],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`Food modified with ID: ${reqId}`);
    }
  );
};

const deleteFood = (req, res) => {
  const reqId = parseInt(req.params.id);
  pool.query('DELETE FROM food WHERE id = $1', [reqId], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`Food deleted with ID: ${reqId}`);
  });
};

const helloWorld = (req, res) => {
  res.status(200).json({
    status: 'sucess',
    requestTime: req.requestTime,
    data: "hello world" +" DB_USER: " + process.env.DB_USER + 
    " DB_HOST: " + process.env.DB_HOST + 
    " DB_PORT: " + process.env.DB_PORT ,
  });
};

app.route('/helloworld').get(helloWorld)
app.route('/food').get(getFood).post(newFood);
app.route('/food/:id').get(getFoodById).put(updateFood).delete(deleteFood);

module.exports = app;
