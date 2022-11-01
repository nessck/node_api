require('dotenv').config();

const app = require('./app');

const port = process.env.PORT;
var listener = app.listen(port, () => {
  console.log(`App running on port ${port}.` + listener.address().port);
});
