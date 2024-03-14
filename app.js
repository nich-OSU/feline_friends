/*
    SETUP
node*/

/*
# Citation for app.js from NODE.js starter app code
# 22 Feb 2024
# Adapted from material in nodejs-starter-app in OSU CS340 course github repo
# URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Express
var express = require('express');
var hbs = require('hbs');
var path = require('path');
var bodyParser = require('body-parser');
const moment= require('moment')
var app = express();
app.set('view engine', 'html')

app.set('views', path.join(__dirname, 'static'));
app.engine('html', require('hbs').__express);

PORT = 7799;

// Static Middleware
app.use('/',express.static(path.join(__dirname, 'static')))

// Database
var db = require('./database/db-connector');
const { Console } = require('console');
// create application/json parser
var jsonParser = bodyParser.json()
hbs.registerHelper('formatDate', function(dateString) {
    return new hbs.SafeString(
        moment(dateString).format("YYYY-MM-DD").toUpperCase()
    );
});
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
/*
    ROUTES
*/
var sql_add_employee = 'INSERT INTO Employees (first_name, last_name, email, phone, role) VALUES (?, ?, ?, ?, ?)';
var sql_select_employee = 'SELECT * FROM Employees';
var sql_update_employee = 'UPDATE Employees SET first_name = ?, last_name = ?, email = ?, phone = ?, role = ? WHERE employee_ID = ?';
var sql_delete_employee = 'DELETE FROM Employees WHERE employee_ID = ?';

var sql_add_customer = 'INSERT INTO Customers (business_name, contact_name, email, phone) VALUES (?, ?, ?, ?)';
var sql_select_customer = 'SELECT * FROM Customers';
var sql_update_customer = 'UPDATE Customers SET business_name = ?, contact_name = ?, email = ?, phone = ? WHERE customer_ID = ?';
var sql_delete_customer = 'DELETE FROM Customers WHERE customer_ID = ?';

var sql_add_product = 'INSERT INTO Products (name, description, wholesale_unit_price, inventory) VALUES (?, ?, ?, ?)';
var sql_select_product = 'SELECT * FROM Products';
var sql_update_product = 'UPDATE Products SET name = ?, description = ?, wholesale_unit_price = ?, inventory = ? WHERE product_ID = ?';
var sql_delete_product = 'DELETE FROM Products WHERE product_ID = ?';

var sql_add_order = 'INSERT INTO Orders (order_status, order_date, employee_ID, customer_ID) VALUES (?, ?, ?, ?)';
var sql_select_order = 'SELECT * FROM Orders';
var sql_select_order_fancy = 'SELECT order_ID AS "order_ID", order_status AS "Status", order_date AS "Date", Employees.last_name AS "Employee", Customers.business_name AS "Customer", Orders.employee_ID, Orders.customer_ID FROM Orders LEFT JOIN Employees ON Employees.employee_ID = Orders.employee_ID LEFT JOIN Customers ON Customers.customer_ID = Orders.customer_ID';
var sql_update_order = 'UPDATE Orders SET order_status = ?, order_date = ? WHERE order_ID = ?';
var sql_delete_order = 'DELETE FROM Orders WHERE order_ID = ?';

var sql_add_products_orders = 'INSERT INTO Products_Orders (product_ID, order_ID, quantity, price_per_unit) VALUES (?, ?, ?, ?)';
var sql_select_products_orders1 = 'SELECT Orders.order_ID, Orders.order_status, Orders.order_date, Products_Orders.product_ID, Products.name, Products.wholesale_unit_price, Products_Orders.quantity, Products_Orders.price_per_unit FROM Products_Orders join Orders ON Orders.order_ID = Products_Orders.order_ID JOIN Products ON Products.product_ID = Products_Orders.product_ID WHERE Orders.customer_ID =?';
var sql_select_products_orders = 'SELECT Orders.order_ID, Products_Orders.product_ID, Products.name, Products_Orders.quantity, Products.wholesale_unit_price FROM Products_Orders join Orders ON Orders.order_ID = Products_Orders.order_ID JOIN Products ON Products.product_ID = Products_Orders.product_ID WHERE Orders.customer_ID =?';
var sql_update_products_orders = 'UPDATE Products_Orders SET product_ID = ?, order_ID = ?, quantity = ?, price_per_unit = ? WHERE order_ID = ?';
var sql_delete_products_orders = 'DELETE FROM Products_Orders WHERE order_ID = ?';
var sql_delete_products_orders_by_productId = 'DELETE FROM Products_Orders WHERE product_ID = ?';

/*
Customers
*/

app.get('/customers', urlencodedParser, function(req, res){
    var query = db.pool.query(sql_select_customer, function (err, result) {
        if (err) throw err;
    //    console.log(result);
        var model = { result: result };
        res.render('customers', { model });
      });
});

app.post('/addCustomer', urlencodedParser, function(req, res)
    {
        db.pool.query(sql_add_customer,[req.body.business_name, req.body.contact_name, req.body.email, req.body.phone], function (err, results, fields){
            if (err) {
                console.log(err);
            }
            // Send the results to the browser
            res.redirect("/customers");
        });
    });

app.post('/updateCustomer', urlencodedParser, function(req, res)
    {
        db.pool.query(sql_update_customer,[req.body.business_name, req.body.contact_name, req.body.email, req.body.phone, req.body.customer_ID], function (err, results, fields){
            if (err) {
                console.log(err);
            }
            // Send the results to the browser
            res.redirect("/customers");
        });
    });

app.get('/deleteCustomer/:customer_ID', function(req, res)
    {
        db.pool.query(sql_delete_customer,[req.params.customer_ID], function (err, results, fields){
            if (err) {
                console.log(err);
            }
            // Send the results to the browser
            res.redirect("/customers");
        });
    });

/*
Employees
*/

app.get('/employees', urlencodedParser, function(req, res){
    var query = db.pool.query(sql_select_employee, function (err, result) {
        if (err) throw err;
    //    console.log(result);
        var model = { result: result };
        res.render('employees', { model });
      });
});

app.post('/addEmployee', urlencodedParser, function(req, res)
    {
        db.pool.query(sql_add_employee,[req.body.first_name, req.body.last_name, req.body.email, req.body.phone, req.body.role], function (err, results, fields){
            if (err) {
                console.log(err);
            }
            // Send the results to the browser
            res.redirect("/employees");
        });
    });

app.post('/updateEmployee', urlencodedParser, function(req, res)
    {
        db.pool.query(sql_update_employee,[req.body.fname, req.body.lname, req.body.eemail, req.body.ephone, req.body.erole, req.body.empid], function (err, results, fields){
            if (err) {
                console.log(err);
            }
            // Send the results to the browser
            res.redirect("/employees");
        });
    });

app.get('/deleteEmployee/:employee_ID', function(req, res)
    {
        db.pool.query(sql_delete_employee,[req.params.employee_ID], function (err, results, fields){
            if (err) {
                console.log(err);
            }
            // Send the results to the browser
            res.redirect("/employees");
        });
    });

/*
Products
*/
app.get('/products', urlencodedParser, function(req, res){
    var query = db.pool.query(sql_select_product, function (err, result) {
        if (err) throw err;
    //    console.log(result);
        var model = { result: result };
        res.render('products', { model });
      });
});

app.post('/addProduct', urlencodedParser, function(req, res)
    {
        db.pool.query(sql_add_product,[req.body.name, req.body.description, req.body.price, req.body.inventory], function (err, results, fields){
            if (err) {
                console.log(err);
            }
            // Send the results to the browser
            res.redirect("/products");


        });
    });

app.post('/updateProduct', urlencodedParser, function(req, res)
    {
        db.pool.query(sql_update_product,[req.body.name, req.body.description, req.body.wholesale_unit_price, req.body.inventory, req.body.product_ID], function (err, results, fields){
            if (err) {
                console.log(err);
            }
            // Send the results to the browser
            res.redirect("/products");
        });
    });

app.get('/deleteProduct/:product_ID', function(req, res)
    {
        db.pool.query(sql_delete_products_orders_by_productId,[req.params.order_ID], function (err, results, fields){
            db.pool.query(sql_delete_product,[req.params.product_ID], function (err, results, fields){
                if (err) {
                console.log(err);
                }
                // Send the results to the browser
                res.redirect("/products");
            });
        });
    });

/*
Orders
*/

app.get('/orders', urlencodedParser, function(req, res){
    // switching to "fancy"
    var query = db.pool.query(sql_select_order_fancy, function (err, result) {
        if (err) throw err;
    //    console.log(result);
        var query_Cus = db.pool.query(sql_select_customer, function (err, result_customers) {

            var query_emp = db.pool.query(sql_select_employee, function (err, result_employees) {

                var query_prod = db.pool.query(sql_select_product, function(err, result_products) {

                    var model = { result: result };
                    var customers = { result: result_customers };
                    var employees = { result: result_employees };
                    var products = { result: result_products };
                    res.render('orders', { model,  customers, employees, products });
                })
            });
        });
    });
});

app.post('/addOrder', urlencodedParser, function(req, res)
    {
        db.pool.query(sql_add_order,[req.body.order_status, req.body.order_date, req.body.employee_ID, req.body.customer_ID], function (err, results, fields){
            if (err) {
                console.log(err);
            }
            // Send the results to the browser
            res.redirect("/orders");
        });
    });

app.post('/updateOrder', urlencodedParser, function(req, res)
    {
        db.pool.query(sql_update_order,[req.body.order_status, req.body.order_date, req.body.update_order_Id], function (err, results, fields){
            if (err) {
                console.log(err);
            }
            // Send the results to the browser
            // console.log(req.body.order_status, req.body.order_date, req.body.employee_ID, req.body.customer_ID, req.body.update_order_Id);
            res.redirect("/orders");
        });
    });

app.get('/deleteOrder/:order_ID', function(req, res)
    {
        db.pool.query(sql_delete_products_orders,[req.params.order_ID], function (err, results, fields){
            db.pool.query(sql_delete_order,[req.params.order_ID], function (err, results, fields){

                if (err) {
                    console.log(err);
                }
                // Send the results to the browser
                res.redirect("/orders");
            });
        });
    });

/*
Products_Orders
*/

app.post('/invoices', urlencodedParser, function(req, res){

    var query = db.pool.query(sql_select_products_orders1,[req.body.customer_ID], function (err, result) {
        if (err) throw err;
        // console.log(result);
        var invoices = { result: result };
        var query2 = db.pool.query(sql_select_customer, function (err, result) {
            if (err) throw err;
        //    console.log(result);
            var customers = { result: result };
            var customer_name = req.body.customer_name
            res.render('invoice', { invoices, customers, customer_name });
        })
    });
});

app.get('/invoices', urlencodedParser, function(req, res){

    var query = db.pool.query(sql_select_customer, function (err, result) {
        if (err) throw err;
    //    console.log(result);
        var customers = { result: result };
        res.render('invoice', { customers });
      });
});

app.post('/updateProducts_Orders', urlencodedParser, function(req, res)
    {
        db.pool.query(sql_update_products_orders,[req.body.product_ID, req.body.order_ID, req.body.quantity, req.body.price_per_unit, req.body.order_ID], function (err, results, fields){
                     //   console.log(req.body.fname, req.body.lname, req.body.eemail, req.body.ephone, req.body.erole, req.body.empid);
                        // Send the results to the browser
                    //    console.log(err);
                       res.redirect("/orders");


        });
    });

app.post('/addProducts_Orders', urlencodedParser, function(req, res)
    {
        // console.log(req.body.product_ID, req.body.order_ID, req.body.quantity, req.body.price_per_unit);
        db.pool.query(sql_add_products_orders,[req.body.product_ID, req.body.order_ID, req.body.quantity, req.body.price_per_unit], function (err, results, fields){

                        // Send the results to the browser
                       // console.log(err);
                        res.redirect("/orders");


        });
    });


/*
    LISTENER
*/
//  process.on('uncaughtException', function(err) {
//      //console.log(err);
//    });
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
