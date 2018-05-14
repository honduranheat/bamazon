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
        mainMenu(connection);
    });
};

function mainMenu() {
    inquirer
        .prompt({
            name: "main",
            type: "list",
            message: "Choose the ID of the function you wish to start",
            choices: ["View Products", "Query Low Inventory", "Update Product Inventory", "Add New Product"]
        }).then(function (response) {
            if (response.main === "View Products") {
                viewProd();
            } else if (response.main === "Query Low Inventory") {
                queryLow();
            } else if (response.main === "Update Product Inventory") {
                updateProd();
            } else if (response.main === "Add New Product") {
                addNew();
            }

        })
};

function viewProd() {
    console.log('view prod');
    connection.query("SELECT * FROM products;",
        function (error, list) {
            if (error) {
                throw error;
            } else {
                console.table(list);
                next();
            }
        }
    )
}

function queryLow() {
    console.log('query low');
    connection.query("SELECT * FROM products WHERE ?", 
    
    [{
        product_quantity: product_quantity = product_quantity < 5
    }],
    function (error, list) {
        if (error) {
            throw error;
        } else {
            console.table(list);
            
        }
    }
)
}

function updateProd() {
    console.log('update prod');
}

function addNew() {
    console.log('add new');
}

function next() {
    inquirer
        .prompt({
            name: "next",
            type: "confirm",
            message: "Return to Main Menu?"
        }).then(function (response) {
            if (response.next === true) {
                mainMenu();
            } else {
                connection.end();
            }
        })
}
connect();