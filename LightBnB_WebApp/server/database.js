//const properties = require('./json/properties.json');
// const users = require('./json/users.json');

const {
  Pool
} = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/*------------------------------------ Users-----------------------------------*/

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  console.log("getuserE");
  return pool
    .query(`SELECT * FROM users WHERE email = $1`, [email])
    .then((result) => {

      return result.rows[0];

    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });

};
exports.getUserWithEmail = getUserWithEmail;

/*--------------------------Single user from db given their id----------------------- */

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  console.log("getuserIDDDD");
  return pool
    .query(`SELECT * FROM users WHERE id = $1`, [id])
    .then((result) => {

      return result.rows[0];

    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
  //return Promise.resolve(users[id]);
};
exports.getUserWithId = getUserWithId;


/*------------------------------------Add new user to db------------------------------*/

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  console.log("adduserrrrrrrrrrr");
  return pool
    .query(`INSERT INTO users (name, email, password) VALUES($1, $2, $3) RETURNING *`, [user.name, user.email, 'password'])
    .then((result) => {
      console.log(result.rows);
      return result.rows;

    })
    .catch((err) => {
      console.log(err.message);
    });



  // const userId = Object.keys(users).length + 1;
  // user.id = userId;
  // users[userId] = user;
  // return Promise.resolve(user);
};
exports.addUser = addUser;

/*---------------------------------------- Reservations----------------------------------*/

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  console.log("getallreservns########################");
  return pool
    .query(`SELECT * FROM reservations WHERE guest_id = $1 LIMIT $2`, [guest_id, limit])
    .then((result) => {
      //console.log(result.rows);
      return result.rows;

    })
    .catch((err) => {
      console.log(err.message);
    });
};

//return getAllProperties(null, 2);
//}
exports.getAllReservations = getAllReservations;


/*-------------------------------------- Properties-----------------------------------*/

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if (options.city) {

    queryParams.push(`${options.city}`);
    queryString += `WHERE city LIKE $${queryParams.length} `;

  }
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `AND owner_id = $${queryParams.length - 1}`;
  }

  if (options.minimum_price_per_night && options.maximum_price_per_night) {

    queryParams.push(`${options.minimum_price_per_night * 100}`);

    queryParams.push(`${options.maximum_price_per_night * 100}`);

    //console.log("Queryparams########: ", queryParams);
    queryString += `AND cost_per_night BETWEEN $${queryParams.length - 1} AND $${queryParams.length}  `;
  }

  if (options.minimum_rating) {
    //console.log("@@@@@@-------------888==options.ratings")

    queryParams.push(`${options.minimum_rating}`);
    queryString += `AND property_reviews.rating >= $${queryParams.length}`;
  }
  //console.log("Options:*******$$$$3##-------: ", options);

  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT ${limit};
  `;

  //console.log(queryString, queryParams);

  return pool.query(queryString, queryParams).then((res) => res.rows);

};
exports.getAllProperties = getAllProperties;


/*----------------------------------Add property to db-------------------------------*/

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  return pool
    .query(`INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
    
      [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.street, property.city, property.province, property.post_code, property.country, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms])

    .then((result) => {
      //console.log(result.rows);
      return result.rows;

    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.addProperty = addProperty;
