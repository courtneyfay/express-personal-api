// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/

// var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    woops_i_has_forgot_to_document_all_my_endpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/courtneyfay/express_self_api/README.md",
    base_url: "http://infinite-sierra-66569.herokuapp.com", 
    endpoints: [
      // Description of APIs
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      
      // Personal profile API
      {method: "GET", path: "/api/profile", description: "Returns data about me, including: " + 
        "name (string), github_link (string), github_profile_image (string), current_city (string), " + 
        "shoes (array, e.g. {type: 'sneakers', brand: 'Vans', color: 'black'}"}, 
      
      ////////////////////
      // CRUDDABLE DATA //
      ////////////////////

      // INDEX - return all
      {method: "GET", path: "/api/dream-vacations", description: "Returns data about ALL my dream vacations, including: " + 
        "_id (number), activity (string), city (string), country (string), photoUrl (string)"}, 
      
      // SHOW - return 1
      {method: "GET", path: "/api/dream-vacations/:id", description: "Using the _id, returns ONE dream vacation object: " + 
        "_id (number), activity (string), city (string), country (string), photoUrl (string)"}, 
      
      // CREATE - make a new 1
      {method: "POST", path: "/api/dream-vacations", description: "Adds a new dream vacation to my list: " + 
        "_id (number), activity (string), city (string), country (string), photoUrl (string)"}, 

      // UPDATE - edit an existing 1
      {method: "PUT", path: "/api/dream-vacations/:id", description: "Using the _id, edits parts of an existing " +
        "dream vacation: activity (string), photoUrl (string)"},
      
      // DELETE - destroys 1
      {method: "DELETE", path: "/api/dream-vacations/:id", description: "Using the _id, deletes one dream vacation"}
    ]
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
