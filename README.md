# booknook
**Overview:**
A full-stack web application for an online bookstore developed with React.js. 

**Main Components:**

:heavy_check_mark: **Search Bar**: Given keyword, searches for relevant titles. Displays 10 results.

:heavy_check_mark: **Cart**: Each book from search can be added to cart through an icon. Grand total calculated using price and quantity of each item.

:heavy_check_mark: **Registration/Login**: Users can register and login through a Redux form. 

:heavy_check_mark: **Blog**: A blog feature using Quill.js was included in the project (users might want to leave book reviews, for instance). 
Posts may be edited or deleted and users can also add comments to each post.

## Main Functions and How They Work

### Backend
- **Koa**: koa-router is used to make different API requests. Auth involves post (register, login, logout) and get(check [login]).
Comments uses post (write comments), get (list comments), patch (update comments), and delete. Posts uses get (list posts, get one post), 
post (write post), delete, patch, and use. 

- **Mongoose Models**: There are three Mongoose models - comments, posts, and users. 
- **JWT User Authentication**: A JWT_SECRET token is kept in a .env file, which can be generated in a Mac terminal through 
*openssl rand -hex 64*. A middleware called *jwtMiddleware.js* is used for authentication.

### Frontend
- **Redux Modules, Redux Store, and Redux-Saga**: A redux store is created by passing the root reducer to createStore. Redux modules are used for registration, login, logout, comments (both listing and writing), and posts (both listing and writing). 
Redux saga is used to dispatch actions to the Redux store and initiate side effects (yield takeLatest). 
- **Navbar**: Navlink from 'react-router-dom' is used for page navigation. 

### REST API used in this project
- **Books**: The project uses a Korean books REST API from [Kakao Developers](https://developers.kakao.com/), but a site with English books can be easily made by replacing this API 
with [Google Books API](https://developers.google.com/books). An API token from Kakao is needed to see this project live.

## Technologies Used
### Backend

:heavy_check_mark: MongoDB

:heavy_check_mark: Koa

:heavy_check_mark: Joi

:heavy_check_mark: Axios

### Frontend

:heavy_check_mark: React.js

:heavy_check_mark: Redux

:heavy_check_mark: Quill.js


## Miscellaneous Remarks

- Postman, Mongoose, MongoDB Compass
