/**********
  Project:  Feeding Feline Friends 3F
  Team:     Group 76
            "Seattle Snow Furry"
  Team members:
            Olga Mokshantseva
            Nicholas Murray
**********/

/**********
Drop tables if exist
**********/
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

--drop the table if they exist to minimize errors.
DROP TABLE IF EXISTS Employees;           -- object table employees, includes information about employees
DROP TABLE IF EXISTS Customers;           -- object table customers, includes information about customers
DROP TABLE IF EXISTS Products;            -- object table products, includes information about products
DROP TABLE IF EXISTS Orders;              -- object table orders, includes information about orders
DROP TABLE IF EXISTS Products_Orders;     -- intesection table Products_Orders

/**********
Create 3F database tables
**********/

-- Employees table
CREATE TABLE Employees (
  employee_ID int NOT NULL AUTO_INCREMENT,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  email varchar(30) NOT NULL,
  phone varchar(30) NOT NULL,
  role varchar(30) NOT NULL,
  PRIMARY KEY (employee_ID)
);

-- Customers table
CREATE TABLE Customers (
  customer_ID int NOT NULL AUTO_INCREMENT,
  business_name varchar(30) NOT NULL,
  contact_name varchar(30) NOT NULL,
  email varchar(30) NOT NULL,
  phone varchar(30) NOT NULL,
  PRIMARY KEY (customer_ID)
);

-- Products table
CREATE TABLE Products (
  product_ID int NOT NULL AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  description varchar(50) NOT NULL,
  wholesale_unit_price decimal(10,2) NOT NULL,
  inventory int NOT NULL,
  PRIMARY KEY (product_ID)
);

-- Orders table
CREATE TABLE Orders (
  order_ID int NOT NULL AUTO_INCREMENT,
  order_status varchar(30) NOT NULL,
  order_date date NOT NULL,
  employee_ID int,
  customer_ID int,
  PRIMARY KEY (order_ID),
  FOREIGN KEY (employee_ID) REFERENCES Employees(employee_ID) ON DELETE SET NULL,
  FOREIGN KEY (customer_ID) REFERENCES Customers(customer_ID) ON DELETE CASCADE
);

-- Products_Orders
CREATE TABLE Products_Orders (
  product_ID int,
  order_ID int,
  quantity int NOT NULL,
  price_per_unit decimal(10,2) NOT NULL,
  FOREIGN KEY (product_ID) REFERENCES Products(product_ID) ON DELETE CASCADE,
  FOREIGN KEY (order_ID) REFERENCES Orders(order_ID) ON DELETE CASCADE
);

/**********
Insert sample data into database table
***********/
-- add employees into emplyees database table
INSERT INTO Employees (
  first_name,
  last_name,
  email,
  phone,
  role
)
VALUES
(
  "Raja",
  "Hernandez",
  "rajher@3Fpurrfect.com",
  "333-414-9999",
  "Marketing Manager"
),
(
  "Kaylee",
  "Dotty",
  "kaydot@3Fpurrfect.com",
  "333-425-1989",
  "Warehouse Manager"
),
(
  "Dwight",
  "Fraser",
  "dwifra@3Fpurrfect.com",
  "333-874-6572",
  "Warehouse clerk"
),
(
  "Gertrude",
  "Connell",
  "gercon@3Fpurrfect.com",
  "333-343-9119",
  "Warehouse clerk"
),
(
  "Alex",
  "Marianna",
  "alemar@3Fpurrfect.com",
  "389-577-5309",
  "Warehouse clerk"
);

-- add customers data into Customers database table
INSERT INTO Customers (
  business_name,
  contact_name,
  email,
  phone
)
VALUES
(
  "Casa de los Gatos",
  "Adelaida Laurita",
  "alaurita@housecat.net",
  "619-555-0746"
),
(
  "Springfield Humane Society",
  "Pika Keola",
  "pikkeo@springfieldhs.org",
  "616-222-9251"
),
(
  "Save the Cats",
  "Nasrin Sujata",
  "nasrin@catina.net",
  "644-602-9994"
);

-- add products to the Products database table
INSERT INTO Products (
  name,
  description,
  wholesale_unit_price,
  inventory
)
VALUES
(
  "Dinner Time Premium flats",
  "3 ounce can salmon fillets, 25-pack",
  68.99,
  100
),
(
  "Kitten Kibble Krate",
  "25 lb dry chicken vegetable cat food",
  60.49,
  52
),
(
  "Whiskers Wet Tube Bulk",
  "10 lb blended protein cat food chub",
  28.75,
  40
);

-- add orders to the Orders table
INSERT INTO Orders (
  order_status,
  order_date,
  employee_ID,
  customer_ID
)
VALUES
(
  "Filled",
  "2023-10-10",
  1,
  1
),
(
  "Placed",
  "2023-11-21",
  2,
  1
),
(
  "Paid",
  "2023-12-15",
  4,
  2
);

-- add Products_Orders to Products_Orders table
INSERT INTO Products_Orders (
  product_ID,
  order_ID,
  quantity,
  price_per_unit
)
VALUES
(
  1, 2, 10, 60.00
),
(
  2, 1, 5, 60.49
),
(
  3, 3, 10, 25.00
);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;