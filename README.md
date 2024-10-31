# Cognizance Academy
A fullstack application to assist users with studying. Users can create accounts, and then create their own study guides and flashcards to study with. 
## Frontend
Built with React JS. Uses Axios to make asynchronous calls to this application's backend as well as the Quotes API from API Ninjas to display quotes on education.
## Backend
Built with Node, Express, and MongoDB to store user accounts, Study Guides, and Flash Cards. Each Study Guide references the user that created them and has an array of Flash Cards. JWT verification is also implemented to protect routes, users get tokens to access routes when logging in. Implements all four CRUD operations.
## Technologies
- React
- React Bootstrap
- Node JS
- Express
- Mongoose
- JSON Web Tokens (JWT)
- CRUD
- Axios
## Deploys
- https://cognizance-academy.netlify.app/
## Credits
- https://www.api-ninjas.com/api/quotes
- https://medium.com/@ravipatel.it/building-a-secure-user-registration-and-login-api-with-express-js-mongodb-and-jwt-10b6f8f3741d