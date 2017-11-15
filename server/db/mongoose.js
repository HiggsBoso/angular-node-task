let mongoose = require('mongoose');

const dbuser = 'guest';
const dbpassword = 'db_pass';

const mongodbURI = 'mongodb://<dbuser>:<dbpassword>@ds163595.mlab.com:63595/product-db';

mongoose.Promise = global.Promise;
mongoose.connect(mongodbURI || 'mongodb://localhost:27017/ProductApp', {
  useMongoClient: true
});

module.exports = {
  mongoose
};
