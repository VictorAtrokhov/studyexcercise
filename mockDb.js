let mockDb = {
  products: [],
  bestBuyers: [],

  initMock: function () {
    let productList = [
      {
        id: 1,
        title: "Belt",
        description: "belt is leather",
        image: "/images/belt.jpeg",
        price: 5.44,
        timesBought: 0,
      },
      {
        id: 2,
        title: "Nimbus 2000",
        description: "Malfoy has better but is OK",
        image: "/images/nimbus.jpg",
        price: 2000.00,
        timesBought: 0,
      },
      {
        id: 3,
        title: "Retro car",
        description: "Broom should be faster",
        image: "/images/retrocar.jpg",
        price: 66.66,
        timesBought: 0,
      },
      {
        id: 4,
        title: "Cuban car",
        description: "Cool for summer vacations",
        image: "/images/cars.jpg",
        price: 13321.99,
        timesBought: 0,
      },
      {
        id: 5,
        title: "Batmans belt",
        description: "Everything for crimefight",
        image: "/images/batman.jpg",
        price: 7.77,
        timesBought: 0,
      },
      {
        id: 6,
        title: "Macbook",
        description: "Forget your old PC",
        image: "/images/macbook.jpg",
        price: 2000.00,
        timesBought: 0,
      },
      {
        id: 7,
        title: "Old PC",
        description: "Something only increases in value with time",
        image: "/images/compaq.jpg",
        price: 111.11,
        timesBought: 0,
      },
      {
        id: 8,
        title: "Long belt",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It hassum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
        image: "/images/belt.jpeg",
        price: 5.55,
        timesBought: 0,
      },
    ];
    let buyerList = [
      { name: "Joe Biden", count: 5 },
      { name: "Donald Trump", count: 4 },
      { name: "Barack Obama", count: 3 },
      { name: "George W. Bush", count: 2 },
      { name: "Bill Clinton", count: 1 },
    ]

    productList.forEach((product) => {
      this.addProduct(product);
    });
    buyerList.forEach((buyer) => {
      this.bestBuyers.push(buyer)
    });
  },

  addOrUpdateBuyer: function (name) {
    const existingBuyer = this.bestBuyers.find((buyer) => buyer.name === name);
    if (existingBuyer) {
      existingBuyer.count++;
    } else {
      this.bestBuyers.push({ name: name, count: 1 });
    }
  },

  // Method to get all products
  getProducts: function () {
    return this.products;
  },

  searchProductById: function (id) {
    return this.products.find((product) => product.id == id);
    // return this.products.find((product) => product.id === parseInt(id));
  },

  searchProductsByTitle: function (title) {
    return this.products.filter((product) =>
      product.title.toLowerCase().includes(title.toLowerCase())
    );
  },

  increaseTimesBought: function (id) {
    const product = this.searchProductById(id);
    if (product) {
      product.timesBought++;
    }
  },

  getMostBoughtProducts: function () {
    let sortedProducts = this.products.sort(
      (a, b) => b.timesBought - a.timesBought
    );

    return sortedProducts.slice(0, 6);
  },

  // Method to update product information by name
  updateProductByName: function (name, newData) {
    this.products.forEach((product) => {
      if (product.name === name) {
        Object.assign(product, newData);
      }
    });
  },

  getBestBuyers: function () {
    let sortedBuyers = this.bestBuyers.sort(
      (a, b) => b.count - a.count
    );

    return sortedBuyers.slice(0, 5);
},

  //For admins. Will not be implemented.
  addProduct: function (product) {
    this.products.push(product);
  },

  removeProductByName: function (name) {
    this.products = this.products.filter((product) => product.name !== name);
  },
};

module.exports = mockDb;
