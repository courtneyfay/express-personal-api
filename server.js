// require express and other modules
const express = require('express'),
   app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/

const db = require('./models');

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
      
      //////////////////////////
      // ROUTES DOCUMENTATION //
      //////////////////////////

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

// INDEX route for ALL dream vacations
app.get('/api/dream-vacations', function vacations_index(req,res) {
  db.Vacation.find({}, function(err, vacations) {
    if (err) { 
        return console.log("FIRE!" + err);
    } else {
      res.json(vacations);
    }
  });
});

// SHOW route for an existing dream vacation by id
app.get('/api/dream-vacations/:id', function vacations_show(req,res) {
  let searchId = req.params.id; 
  db.Vacation.find({_id: searchId }, function(err, vacations) {
    if (err) {
      return console.log("Error!" + err);
    } else {
      res.json(vacations);
    }
  });
});

// CREATE route to add a new dream vacation
app.post('/api/dream-vacations', function vacations_create(req,res) {

  let newVacation = { 
    activity: req.body.activity, 
    city: req.body.city,
    country: req.body.country,
    photoUrl: req.body.photoUrl
  };

  db.Vacation.create(newVacation, function(err, vacation) {
    res.json(newVacation);
  });
  
});

// UPDATE route to edit an existing vacation by id
app.put('/api/dream-vacations/:id', function(req,res) {
  let searchId = req.params.id; 
  db.Vacation.findOne({_id: searchId }, function(err, vacation) {
    if (err) {
      return console.log("Error!" + err);
    } else {
      vacation.activity = req.body.activity;
      vacation.photoUrl = req.body.photoUrl;

      vacation.save(function(err) {
        if (err) {
          console.log(err);
        }
      }); 
      res.json(vacation);
    };
  });
});

// DELETE route to destroy an existing vacation by id
app.delete('/api/dream-vacations/:id', function(req,res) {
  for (let i = 0; i < dreamVacations.length; i++) {
    if (parseInt(req.params.id) === dreamVacations[i]._id) {
      res.json(dreamVacations[i]);
      dreamVacations.splice(i,1);
    };
  };
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
