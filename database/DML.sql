/**********
  Project:  Feeding Feline Friends 3F
  Team:     Group 76
            "Seattle Snow Furry"
  Team members:
            Olga Mokshantseva
            Nicholas Murray
**********/

/**********
    EMPLOYEE.html page manipulations
**********/

-- get all the Employees data
SELECT employee_ID AS "ID", first_name AS "First name", last_name AS "Last name", email AS "email", phone AS "Phone" FROM Employees;

-- add new employee
INSERT INTO Employees
    (employee_ID, first_name, last_name, email, phone)
VALUES
    (:idInput, :first_nameInput, :last_nameInput, :emailInput, :phoneInput);

--update employee
SELECT employee_ID AS "ID", first_name AS "First name", last_name AS "Last name", email AS "email", phone AS "Phone"
FROM
    Employees
WHERE
    employee_ID = :employee_employee_page;
UPDATE Employees
SET
    first_name = :first_nameInput, last_name = :last_nameInput, email = :emailInput, phone = :phoneInput
WHERE
    employee_ID = :employee_ID_update_page;

-- delete an Employee
DELETE FROM Employees WHERE employee_ID = :employee_ID_employee_page;

/*********
    CUSTOMERS.html manipulations
*********/

-- get all the Customers data
SELECT customer_ID AS "ID", business_name AS "Name", contact_name AS "Contact", email AS "email", phone AS "phone" FROM Customers;

-- add new Customer to the datapage
INSERT INTO Customers
    (business_name, contact_name, email, phone)
VALUES
    (:nameInput, :contactInput, :emailInput, :phoneInput);

-- update Customer data
SELECT customer_ID AS "ID", business_name AS "Name", contact_name AS "Contact", email AS "email", phone AS "phone"
FROM Customers
WHERE customer_ID = customer_ID_customers_page;
UPDATE Customers
SET business_name = :nameInput, contact_name = :contactInput, email = :emailInput, phone = :phoneInput
WHERE customer_ID = :customer_ID_update_page;

-- delete Customer data
DELETE FROM Customers WHERE customer_ID = :customer_ID_customers_page;

/***********
    PRODUCTS.html page manipulations
*********/

-- get all the Product data
SELECT product_ID AS "ID", name AS "Name", description AS "Description", wholesale_unit_price AS "price", Inventory AS "Inventory" FROM Products;

-- add new Products to the datapage
INSERT INTO Products
    (name, description, wholesale_unit_price, inventory)
VALUES
    (:nameInput, :descriptionInput, :priceInput, :inventoryInput);

-- update Product data
SELECT product_ID AS "ID", name AS "Name", description AS "Description", wholesale_unit_price AS "price", Inventory AS "Inventory"
FROM Products
WHERE product_ID = product_ID_products_page;
UPDATE Products
SET name = :nameInput, description = :descriptionInput, wholesale_unit_price = :priceInput, inventory :inventoryInput
WHERE product_ID = :product_ID_update_page;

-- delete Customer data
DELETE FROM Products WHERE product_ID = :product_ID_products_page;

/**********
    ORDERS.html manipulation page
**********/

-- get all Orders data
SELECT order_ID AS "ID", order_status AS "Status", order_date AS "Date", Employees.employee_ID AS "Employee", Customers.customer_ID AS "Customers"
FROM Orders
LEFT JOIN Employees
ON Employees.employee_ID = Orders.employee_ID
LEFT JOIN Customers
ON Customers.customer_ID = Orders.customer_ID;

-- add Order
INSERT INTO Orders (order_status, order_date, employee_ID, customer_ID)
VALUES (:statusInput, :dateInput, :employeeInput, :customerInput);

-- delete Order data
DELETE FROM Orders WHERE order_ID = order_ID_order_page;

/**********
    invoice.html manipulation
*********/

-- get all Product Orders
SELECT Products.product_ID AS "Product ID", Orders.order_ID AS "Order ID", quantity AS "quantity", price_per_unit AS "Price"
FROM Products_Orders
INNER JOIN Products
ON Products.product_ID = Products_Orders.product_ID
INNER JOIN Orders
ON Orders.order_ID = Products_Orders.order_ID;



-- get all Customer IDs and Names to populate Customer dropdown
SELECT customer_ID, customer_name FROM Customers;

-- get all Employee IDs and Numbers to populate Employee dropdown
SELECT employee_ID, first_name, last_name FROM Employee;

-- get all Product IDs and Descriptions to populate Product dropdown
SELECT product_ID, product_description FROM Products;

-- get all Order IDs to populate Order ID dropdown
SELECT order_ID, CONCAT(order_id, ' | ', order_date, ' | ', Customers.customer_name, ' | ', Employ.employee_ID) AS 'Order'
FROM Orders
INNER JOIN Customers ON Customers.customer_ID = Orders.customer_ID
INNER JOIN Employee ON Employee.employee_ID= Orders.employee_ID;

-- get all Order IDs where Customer is NuLL to populate Order ID dropdown
SELECT order_id, CONCAT(order_id, ' | ', order_date, ' | ', 'None', ' | ', Employee.employee_ID) AS 'Order'
FROM Orders
INNER JOIN Employee ON Employee.employee_ID = Orders.employee_ID
WHERE Orders.customer_ID is NULL;

-- add a new Order
INSERT INTO Orders (order_date, customer_ID, employee_ID, order_notes) VALUES
(:dateInput, :customer_ID_from_dropdown_Input, :employee_ID_from_dropdown_Input, :order_notes_Input);

-- add a new Order Detail
INSERT INTO OrderDetails (order_ID, product_ID, order_quantity, line_total) VALUES
(:order_ID_from_dropdown_Input, :product_ID_from_dropdown_Input, :order_quantity_Input, :line_total_Input);

-- delete an Order
DELETE FROM Orders WHERE order_id = :order_id_selected_from_orders_page;
