# feline_friends
## Oregon State University Computer Science course 340 Project
    web based user interface for relational database

## Project Outline and Database Outline
### Project 3F Overview
_Feeding Feline Friends_, **3F**, annually sells $500,000 in bulk cat food to four local vet hospitals
and five regional animal shelters. An online relational database driven website will allow 3F and
its seven employees to better track orders of ten different cat food products from its customers.
The system will manage product inventory. When orders are completed, the inventory will be
updated. It will also effectively track employee sales numbers to assist with annual bonus
considerations. The following entities will be described in greater detail in the Database Outline
below: _Employees_, _Customers_, _Orders_, _Products_, and _Products_Orders_.

### Database Outline
The outline describes the entities that **3F** will track in the relational database that we are building. The following are the entities and their associated attributes. 

1. **Employees**: record the details of Employees who sell the products.
  - employee_ID: int, auto_increment, unique, not NULL, PK
  - first_name: varchar(30), not NULL
  - last_name: varchar(30), not NULL
  - email: varchar(30), not NULL
  - phone: varchar(30), not NULL
  - role: varchar(30), not NULL
  - Relationship: a 1:M relationship between Employees and Orders is implemented with employeeID as FK inside of Orders. An employee can create/open many orders.
2. **Customers**: record active customer data who can order(buy) multiple Products by placing order with Employee.
  - customer_ID: int, auto_increment, unique, not NULL
  - business_name: varchar(30), not NULL
  - contact_name: varchar(30), not NULL
  - email: varchar(30), not NULL
  - phone: varchar(30), not NULL
  - Relationship: 1:M relationship between Customers and Orders with customerID as FK inside Orders.  
5. **Orders**: record the details of an order, status, who sells, what, when, and to whom.
  - order_ID: int, auto_increment, unique, not NULL, PK
  - order_status: varchar (30), not NULL
  - order_date: date, not NULL
  - employee_ID: int, unique, FK
  - customer_ID: int, unique, FK
  - Relationship: M:M relationship between Orders and Products. This relationship can be reduced to two 1:M relationships with an intersection table called Products_Orders, with orderID as FK.
6. **Products**: record the product available for sale by Employee.
  - product_ID: int, auto_increment, unique, not NULL, PK
  - name: varchar(30), not NULL
  - description: varchar(30), not NULL
  - wholesale_unit_price: decimal(10,2), not NULL
  - inventory: int, not NULL
  - Relationship: M:M relationship between Orders and Products. This relationship can be reduced to two 1:M relationships with productID as FK inside Products_Orders intersection table.
7. **Products_Orders**: intersection table that reduces the many to many relationship to one to many between the two tables Products and Orders.
  - product_ID: int, unique, not NULL, FK
  - order_ID: int, unique, not NULL, FK
  - quantity: int, not NULL
  - price_per_unit: decimal(10,2), not NULL
  - Relationship: This intersection table reduces the relationship between the products and the orders from M:M to two 1:M relationships.

## ER Diagram
[Entity Relationship Diagram](/img/ER_Diagram.png)
## Schema
[Relational Database Schema](/img/Schema.png)

## Citations:
Citations for all <.html> files based on and altered from (14 Mar 2024): 
  1. NODE.js starter app code OSU github repo
    - URL: [nodejs-starter-app code](https://github.com/osu-cs340-ecampus/nodejs-starter-app)
  2. course starter code called bsg_HTML_UI.zip from Project Step 3
    - URL: [Canvas Project step 3](https://canvas.oregonstate.edu/courses/1946034/assignments/9456216?wrap=1)
  3. Form input type formatting: Copied from W3 Schools HTML Input Types page
    - URL: [W3Schools](https://www.w3schools.com/html/html_form_input_types.asp)
  4. Use dropdown getElementById states to facilitate updateOrder function copied from stackoverflow
    - URL: [StackOverflow select a value](https://stackoverflow.com/questions/8140862/how-to-select-a-value-in-a-select-dropdown-with-javascript)
