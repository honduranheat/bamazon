var inquirer = require("inquirer");
var mysql = require("mysql");
var printMessage = require('print-message');
const chalk = require("chalk");
const cTable = require('console.table');
var connection = '';

function connect() {
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "Ezra0827",
        database: "bamazondb"
    });

    connection.connect(function (error) {
        // if (error) throw error;
        console.log("Connected to server");
        queryProducts(connection);
    });
};


function queryProducts() {
    connection.query("SELECT * FROM products;",
        function (error, list) {
            if (error) {
                throw error;
            } else {
                console.table(list);
            }
            selectProducts();
        }
    )
};



function selectProducts() {
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

                        return choiceArray;
                    },
                    message: "What item would you like to buy?"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many?"
                }
            ])
            .then(function (answer) {
                
                var chosenItem;
                
                for (var i = 0; i < res.length; i++) {
                    if (res[i].product_name === answer.prodid) {
                        chosenItem = res[i];
                    }
                }

                

                if (answer.quantity < chosenItem.stock_quantity) {
                    connection.query(
                        "UPDATE products SET ? WHERE ?", 
                        [
                        {
                            stock_quantity: chosenItem.stock_quantity - answer.quantity
                        },
                        {
                        product_name: answer.prodid
                    },
                ])
                console.log(chalk.blue('Purchase completed'));
                    next();
                    
                } else {
                    console.log("I'm sorry, your order is too big. Please try a smaller quantity.");
                    selectProducts();
                }
            });
    })
};

function next() {
    inquirer.prompt({
        name: 'checkout',
        type: 'confirm',
        message: 'Would you like to continue shopping?',
    }) .then(function(response) {
        if (response.checkout === true) {
            selectProducts();
        } else {
            console.log(chalk.blue('Thanks for shopping!'));
            connection.end();
        }
    })

}

connect();