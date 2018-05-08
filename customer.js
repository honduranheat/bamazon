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

connection.connect();

connection.query("SELECT 1 + 1 AS solution", function(error, res, fields) {
  if (error) throw error;
  console.log(chalk.underline.blue("The solution is: ", res[0].solution));
  queryProducts();
});

function queryProducts() {
  var query = connection.query("SELECT * FROM products", function(err, res) {
    
    console.log(res);
  });
  start();
}

function start() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "prodid",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
              choiceArray.push(res[i].item_name);
            }
            return choiceArray;
          },
          message: "What item would you like to buy?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < res.length; i++) {
          if (res[i].item_name === answer.choice) {
            chosenItem = res[i];
          }
        }

        // if (chosenItem.stock_quantity > 0) {
        //     // bid was high enough, so update db, let the user know, and start over
        //     connection.query(
        //       "UPDATE auctions SET ? WHERE ?",
        //       [
        //         {
        //           highest_bid: answer.bid
        //         },
        //         {
        //           id: chosenItem.id
        //         }
        //       ],
        //       function(error) {
        //         if (error) throw err;
        //         console.log("Bid placed successfully!");
        //         queryProducts();
        //       }
        //     );
        //   }
        //   else {
        //     // bid wasn't high enough, so apologize and start over
        //     console.log("Your bid was too low. Try again...");
        //     queryProducts();
        //   }


      });
  })};

