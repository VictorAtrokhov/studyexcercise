const express = require("express");
const path = require("path");
const multiparty = require("multiparty");
const app = express();
const PORT = 3000;
const mockDb = require("./mockDb");

// Initialize mock data
mockDb.initMock();

app.set("views", path.join(__dirname, "pages"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "resources")));

app.get("/", (req, res) => {
  res.render("index", { title: "Homepage" });
});

app.get("/products", (req, res) => {
  let products;
  let query = req.query.search;
  if (query) {
    products = mockDb.searchProductsByTitle(query);
  } else {
    products = mockDb.getProducts();
  }
  res.render("products", { title: "Product catalog", products: products });
});

app.get("/buy/:productId", (req, res) => {
  let product = mockDb.searchProductById(req.params.productId);
  res.render("completion", { title: "Checkout", product: product });
});

app.get("/view/:productId", (req, res) => {
  let product = mockDb.searchProductById(req.params.productId);
  res.render("productdetail", {
    title: "Product Description",
    product: product,
  });
});

app.get("/other", (req, res) => {
  res.render("other", { title: "Something else" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About shop" });
});

app.get("/bestCustomers", (req, res) => {
  let bestBuyers = mockDb.getBestBuyers();
  let bestProducts = mockDb.getMostBoughtProducts();
  let data = { bestBuyers: bestBuyers, bestProducts: bestProducts };
  res.render("best", { title: "Loyal customers", data: data });
});

app.post("/submit", (req, res) => {
  const form = new multiparty.Form();

  form.parse(req, (err, fields, files) => {
    //Timeout to simulate real server.
    setTimeout(() => {
      if (err) {
        console.error("Error parsing form data:", err);
        res.status(404).send("Something went wrong");
        return;
      }

      mockDb.increaseTimesBought(fields.id);
      mockDb.addOrUpdateBuyer(`${fields.firstName} ${fields.lastName}`);

      res.json({
        success: true,
        name: fields.title,
      });
    }, 3000);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
