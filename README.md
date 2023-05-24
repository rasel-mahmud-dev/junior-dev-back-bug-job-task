# junior-dev-back

## BACKEND

### Packages
- bcryptjs
- jsonwebtoken
- yup
- express
- mongoose
- ...

## Features
- Customer Login/Registration API
- admin can add product.
- customer can buy single product or their cart products.
- customer can add product into carts that store inside database.
- customer can payment with bkash.
- added product search via title.


## Model
#### User
- firstName: String
- lastName: String
- email: {type: String, index: true, unique: true}
- password: String
- avatar: String
- createdAt: Date
- updatedAt: Date
- role: enum: ['customer', 'admin']


#### Product
- title: String
- price: Number
- description: String
- thumb: String
- discount: Number
- stock: Number
- sellerId: ref: User Collection


#### Cart 
- productId: ref: Product
- quantity: Number
- customerId: ref: User


## Route

#### authentication
- POST api/auth/login [Public] Login User
- POST api/auth/register [public] create a new account
- GET api/auth/verify [Public] verify logged user


#### products
- GET api/products [Public] get all product
- POST api/products [PRIVATE] add product
- GET api/products/search [Public] product search
- GET api/products/:productId [Public] product detail

#### carts
- GET api/carts [PRIVATE] get all carts product
- POST api/carts [PRIVATE] add product
- DELETE api/carts:/productId [PRIVATE] product search

#### bkash payment
- POST /bkash/createPayment [PRIVATE] create payment
- GET bkash/execute agreement and create payment
- GET bkash/status [PRIVATE] get payment status


#### Hompage
![2023-05-24_151105.png](public%2F2023-05-24_151105.png)


#### Search Product
![2023-05-24_151152.png](public%2F2023-05-24_151152.png)


#### Add Product page [PRIVATE ROUTE]
![2023-05-24_151400.png](public%2F2023-05-24_151400.png)


#### Regstration page
![2023-05-24_151434.png](public%2F2023-05-24_151434.png)


#### Checkout page
![2023-05-24_151223.png](public%2F2023-05-24_151223.png)

