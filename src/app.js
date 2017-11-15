import angular from 'angular';
import 'bootstrap';
import 'style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css';

import ProductsCtrl from './controllers/products.controller';
import ProductDataSvc from './services/productdata.service.js';

const app = angular.module('ProductsApp', []);

app.controller('ProductsCtrl', ProductsCtrl);
app.service('ProductDataSvc', ProductDataSvc);
