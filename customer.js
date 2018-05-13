var printMessage = require('print-message');
const chalk = require("chalk");
var inquirer = require("inquirer");
var mysql = require("mysql");
const productDisp = chalk.underline.bold.blue;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Ezra0827",
  database: "bamazondb"
});


////////////////////////////////////////////////////
////////////////////////////////////////////////////
// Query Products   Query Products   Query Products
// Query Products   Query Products   Query Products
connection.query(function (error, res, fields) {
  if (error) throw error;
  console.log(chalk.underline.blue("Connected to server", res[0].solution));
  queryProducts();
});

function queryProducts() {
  var query = connection.query("SELECT * FROM products", function (err, res) {

    console.log(res);
  });
  selectProduct();

  connection.end();
}
// ////////////////////////////////////////////////////
// ////////////////////////////////////////////////////



// ////////////////////////////////////////////////////
// ////////////////////////////////////////////////////
// // Begin Transaction Begin Transaction Begin Transaction
// // Begin Transaction Begin Transaction Begin Transaction 
function selectProduct() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    inquirer
      .prompt([{
          name: "prodid",
          type: "list",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
              choiceArray.push(res[i].product_name);
            }
            //return printMessage([choiceArray]);
            return choiceArray;
          },
          message: "What item would you like to buy?"
        },
        {
          name: 'purchaseQuantity',
          type: 'input',
          message: "How many would you like to purchase?"
        }
      ])
      .then(function (answer) {

        var chosenItem;
        for (var i = 0; i < res.length; i++) {
          if (res[i].product_name === answer.prodid) {
            chosenItem = res[i];

          }

        }
        console.log(answer.purchaseQuantity);
        console.log(chosenItem.stock_quantity);
        console.log(answer.prodid);

        var stock = chosenItem.stock_quantity;
        var purchased = answer.purchaseQuantity
        var adjustStock = stock - purchased;

        if (answer.purchaseQuantity < chosenItem.stock_quantity) {

          connection.query(
            'UPDATE products SET stock_quantity = ' + adjustStock + 'Where ?', [

              {
                stock_quantity: chosenItem.stock_quantity - answer.purchaseQuantity
              },
              {
                product_name: chosenItem.name
              }
            ],

            function (error) {
              if (error) throw err;
              console.log('Product purchased');

              queryProducts();

            }
          )
        } else {
          console.log("I'm sorry. Your order was too high.")
          queryProducts();
        }

      });
  })
};

connection.connect();