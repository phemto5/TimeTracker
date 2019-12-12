const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const finale = require("finale-rest");

let app = express();
app.use(cors());
app.use(bodyParser.json());
let database = new Sequelize({
  dialect: "sqlite",
  storage: "./Time.sqlite"
});
let Chunk = database.define("chunk", {
  start: Sequelize.STRING,
  open: Sequelize.BOOLEAN,
  stop: Sequelize.STRING,
  customer: Sequelize.NUMBER,
  body: Sequelize.TEXT,
  tag: Sequelize.STRING
});
let Customer = database.define("customer", {
  name: Sequelize.STRING
});
let Contact = database.define("contact", {
  fname: Sequelize.STRING,
  mname: Sequelize.STRING,
  lname: Sequelize.STRING,
  customerId: Sequelize.NUMBER
});
let Address = database.define("address", {
  street1: Sequelize.STRING,
  street2: Sequelize.STRING,
  city: Sequelize.STRING,
  country: Sequelize.STRING,
  zip: Sequelize.NUMBER,
  endpointType: Sequelize.NUMBER,
  refType: Sequelize.STRING,
  refID: Sequelize.NUMBER
});
let Phone = database.define("phone", {
  number: Sequelize.STRING,
  endpointType: Sequelize.NUMBER,
  refType: Sequelize.STRING,
  refID: Sequelize.NUMBER
});
let Email = database.define("email", {
  email: Sequelize.STRING,
  endpointType: Sequelize.NUMBER,
  refType: Sequelize.STRING,
  refID: Sequelize.NUMBER
});
let Web = database.define("web", {
  uri: Sequelize.STRING,
  endpointType: Sequelize.NUMBER,
  refType: Sequelize.STRING,
  refID: Sequelize.NUMBER
});
let EndType = database.define("endtype", {
  name: Sequelize.STRING
});
finale.initialize({
  app: app,
  sequelize: database
});
// eslint-disable-next-line no-unused-vars
let chunkResource = finale.resource({
  model: Chunk,
  endpoints: ["/chunks", "/chunks/:id"]
});
// eslint-disable-next-line no-unused-vars
let customerResources = finale.resource({
  model: Customer,
  endpoints: ["/customers", "/customers/:id"]
});
// eslint-disable-next-line no-unused-vars
let contactResources = finale.resource({
  model: Contact,
  endpoints: ["/contacts", "/contacts/:id"]
});
// eslint-disable-next-line no-unused-vars
let addressResources = finale.resource({
  model: Address,
  endpoints: ["/addresses", "/addresses/:id"]
});
// eslint-disable-next-line no-unused-vars
let phoneResources = finale.resource({
  model: Phone,
  endpoints: ["/phones", "/phones/:id"]
});
// eslint-disable-next-line no-unused-vars
let emailResources = finale.resource({
  model: Email,
  endpoints: ["/emails", "/emails/:id"]
});
// eslint-disable-next-line no-unused-vars
let webResources = finale.resource({
  model: Web,
  endpoints: ["/webs", "/webs/:id"]
});
// eslint-disable-next-line no-unused-vars
let endtypeResources = finale.resource({
  model: EndType,
  endpoints: ["/endtypes", "/endtypes/:id"]
});
database.sync({ force: true }).then(() => {
  app.listen(8081, () => {
    console.log("Listening on Localhost:8081");
  });
});
