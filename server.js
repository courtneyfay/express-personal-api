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

let myData = {
  name: "Courtney Fay",
  github_link: "https://github.com/courtneyfay",
  github_profile_image: "https://avatars3.githubusercontent.com/u/11844400?v=4&s=460",
  current_city: "Denver",
  shoes: [
    {
      type: 'sneakers', 
      brand: 'Vans', 
      color: 'black'
    },
    {
      type: 'pointy-toe flats', 
      brand: 'Aldo', 
      color: 'black'
    },
    {
      type: 'boots', 
      brand: 'Uggs', 
      color: 'black'
    }
  ]
};

let dreamVacations = [
  {
    _id: 0,
    activity: "surfing",
    city: "Playa Tamarindo",
    country: "Costa Rica",
    photoUrl: "http://blog.easydrop.com/wp-content/uploads/2010/09/Marilia-Jeribu-20-05-06-61.jpg"
  },
  {
    _id: 1,
    activity: "skiing",
    city: "Whistler-Blackcomb resort, Vancouver, British Columbia",
    country: "Canada",
    photoUrl: "https://img6.onthesnow.com/image/la/14/whistler_blackcomb_canada_3_140729.jpg"
  },
  {
    _id: 2,
    activity: "sightseeing before it goes underwater",
    city: "Venice",
    country: "Italy",
    photoUrl: "http://cdni.condenast.co.uk/1080x720/o_r/Panoramic-view-of-Grand-Canal-from-Apartment-Wagner-at-Palazzo-Polignac-venice-italy-conde-nast-traveller-23may16-stefano-scata_1080x720.jpg"
  },
  {
    _id: 3,
    activity: "yoga retreat at Shambhala Mountain Center",
    city: "Red Feather Lakes, CO",
    country: "US",
    photoUrl: "https://www.shambhalamountain.org/wp-content/uploads/2011/12/Stupa_Slideshow_1.jpg"
  },
  {
    _id: 4,
    activity: "study Irish literature",
    city: "Cork",
    country: "Ireland",
    photoUrl: "https://catherineryanhoward.files.wordpress.com/2010/02/cork-coffee.jpg"
  },
  {
    _id: 5,
    activity: "sailing",
    city: "",
    country: "Caribbean",
    photoUrl: "https://www.oasismarigot.com/wp-content/uploads/all-inclusive-caribbean-sailing-charters.jpg"
  },
];
  
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

// API documentation
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

// INDEX route for personal profile
app.get('/api/profile', function profile_index(req,res) {
  res.json(myData);
});

/*
// INDEX - return all
      {method: "GET", path: "/api/dream-vacations", description: "Returns data about ALL my dream vacations, including: " + 
        "_id (number), activity (string), city (string), country (string), photoUrl (string)"}, 
*/
// INDEX route for dream vacations
app.get('/api/dream-vacations', function vacations_index(req,res) {
  res.json(dreamVacations);
});



/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
