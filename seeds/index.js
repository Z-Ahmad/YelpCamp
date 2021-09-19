if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const Campground = require("../models/campground");
const { places, descriptors } = require("./seedHelpers");
const cities = require("./cities");
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/yelp-camp";

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("CONNECTION OPEN!!");
  })
  .catch((err) => {
    console.log("OH NO ERROR!!");
    console.log(err);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "6147a17d30f23949843083e1",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
      price,
      geometry: {
        type: "Point",
        coordinates: [cities[random1000].longitude, cities[random1000].latitude]
      },
      images: [
        {
          url: "https://res.cloudinary.com/dcn6awac0/image/upload/v1631028789/YelpCamp/z4zcmc4nbiug5rez4a75.jpg",
          filename: "YelpCamp/z4zcmc4nbiug5rez4a75"
        },
        {
          url: "https://res.cloudinary.com/dcn6awac0/image/upload/v1631323386/YelpCamp/iqfr5g59vrmpbwwohsad.jpg",
          filename: "YelpCamp/iqfr5g59vrmpbwwohsad"
        },
        {
          url: "https://res.cloudinary.com/dcn6awac0/image/upload/v1631028744/YelpCamp/bvwa6ykxdgmulazt3ine.jpg",
          filename: "YelpCamp/bvwa6ykxdgmulazt3ine"
        }
      ]
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
