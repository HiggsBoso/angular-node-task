export default function ProductsCtrl(ProductDataSvc) {
  this.products = [];
  this.createMode = false;
  this.currentProduct = {};
  this.newProduct = {};

  this.updateProductList = function () {
    ProductDataSvc.getProducts().then((products) => {
      this.products = products;
    });
  };

  this.updateProductList();

  this.createProduct = function () {
    if (this.newProduct.name.length > 0 && this.newProduct.price) {
      ProductDataSvc.addProduct(this.newProduct)
        .then((product) => {
          // I don't think this is the right way to update list,
          // but for now I'll leave it like that
          this.updateProductList();
        });
      this.newProduct = {};
    }
  };

  this.editProduct = function () {
    if (this.currentProduct.name.length > 0 && this.currentProduct.price) {
      ProductDataSvc.updateProduct(this.currentProduct)
        .then(product => this.updateProductList());
    }
  };

  this.selectProductToDelete = function (index) {
    this.currentProduct = {
      ...this.products[index]
    };
  };

  this.deleteProduct = function () {
    ProductDataSvc.deleteProduct(this.currentProduct)
      .then((product) => {
        this.updateProductList();
      });
  };

  this.switchToCreateMode = function () {
    this.createMode = true;
  };

  this.switchToEditMode = function (index) {
    this.createMode = false;
    this.currentProduct = {
      ...this.products[index]
    };
  };
}
