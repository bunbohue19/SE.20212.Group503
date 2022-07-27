# SE.20212.Group503
The repository of group P2W

## Installation
1. Requirements
    - Open port 1433. [How to enable SQL port 1433?](https://l.messenger.com/l.php?u=https%3A%2F%2Fkienthuclaptrinh.vn%2F2012%2F07%2F24%2F7-buoc-de-mo-port-1433-cho-ms-sql-server%2F&h=AT0wVnFXBc2hFC98Sm__QBrUptfcvhcCIcYXODp_SZcSmTXEut22f9oFIXRDU3AbFmIQn3sg7VOibTDS-giJUMcCsbxHvQME8HRyKGnaVckChvqCv8aecR2iXqUvbbfrnAg2dySg1_t4KmSFjYM_0Q) 
    - SQL Server Management Studio
    - Install Node js then run 'npm install http-server' on cmd or terminal 
2. How to run
    - Clone project. 
    - Open `SQL Server Management Studio` and run the query `updated_restaurant_query.sql` in folder `API`.
    - Change SQL Server to Mixed Mode Authentication.  [How to change SQL Server to Mixed Mode Authentication?](https://www.top-password.com/knowledge/sql-server-authentication-mode.html)
    - Direct to folder `API` then open cmd and run the command line `java -jar server_api-2.2.0.jar` to start backend.
    - Go to folder (html) `SE.20212.Group503\frontend` and run 'http-server -l -c'. Http-server will open at port 8082.
    - Open website at http://localhost:8082/html/home.html.
