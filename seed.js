// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

let db = require('./models');

let dreamVacations = [
  {
    activity: "surfing",
    city: "Playa Tamarindo",
    country: "Costa Rica",
    photoUrl: "http://blog.easydrop.com/wp-content/uploads/2010/09/Marilia-Jeribu-20-05-06-61.jpg"
  },
  {
    activity: "skiing",
    city: "Whistler-Blackcomb resort, Vancouver, British Columbia",
    country: "Canada",
    photoUrl: "https://img6.onthesnow.com/image/la/14/whistler_blackcomb_canada_3_140729.jpg"
  },
  {
    activity: "sightseeing before it goes underwater",
    city: "Venice",
    country: "Italy",
    photoUrl: "http://cdni.condenast.co.uk/1080x720/o_r/Panoramic-view-of-Grand-Canal-from-Apartment-Wagner-at-Palazzo-Polignac-venice-italy-conde-nast-traveller-23may16-stefano-scata_1080x720.jpg"
  },
  {
    activity: "yoga retreat at Shambhala Mountain Center",
    city: "Red Feather Lakes, CO",
    country: "US",
    photoUrl: "https://www.shambhalamountain.org/wp-content/uploads/2011/12/Stupa_Slideshow_1.jpg"
  },
  {
    activity: "study Irish literature",
    city: "Cork",
    country: "Ireland",
    photoUrl: "https://catherineryanhoward.files.wordpress.com/2010/02/cork-coffee.jpg"
  },
  {
    activity: "sailing",
    city: "",
    country: "Caribbean",
    photoUrl: "https://www.oasismarigot.com/wp-content/uploads/all-inclusive-caribbean-sailing-charters.jpg"
  },
];

db.Vacation.remove({}, function(err, vacations){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all vacations');

    // create new records based on the array dreamVacations
    db.Vacation.create(dreamVacations, function(err, vacations){
      if (err) { return console.log('err', err); }
      console.log("created", dreamVacations.length, "vacations");
      process.exit();
    });
  }
});


