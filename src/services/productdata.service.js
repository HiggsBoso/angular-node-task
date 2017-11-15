const ProductDataSvc = function ($http) {
  this.baseUrl = 'https://warm-fjord-42242.herokuapp.com';

  this.getProducts = function () {
    return $http.get(`${this.baseUrl}`)
      .then(res => res.data.products);
  };

  this.getProductById = function (id) {
    return $http.get(`${this.baseUrl}/${id}`)
      .then(res => res.data.product);
  };

  this.addProduct = function (product) {
    return $http.post(`${this.baseUrl}`, product)
      .then(res => res.data.product);
  };

  this.updateProduct = function (product) {
    return $http.patch(`${this.baseUrl}/${product._id}`, product)
      .then(res => res.data.product);
  };

  this.deleteProduct = function (product) {
    console.log(product);
    return $http.delete(`${this.baseUrl}/${product._id}`)
      .then(res => res.data.product);
  }
};

export default ProductDataSvc;
