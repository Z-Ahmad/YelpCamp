const mongoose = require("mongoose");
const Campground = require("../models/campground");
const { places, descriptors } = require("./seedHelpers");
const cities = require("./cities");

mongoose
  .connect("mongodb://localhost:27017/yelp-camp", {
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
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "61213aef6e4d7e88f8cb365b",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
      price,
      images: [
        {
          url: "https://res.cloudinary.com/dcn6awac0/image/upload/v1630953997/YelpCamp/iegwzf1nieeqf3ns24un.jpg",
          filename: "YelpCamp/iegwzf1nieeqf3ns24un"
        },
        {
          url: "https://res.cloudinary.com/dcn6awac0/image/upload/v1630953997/YelpCamp/weojkcuvltx2mpjq2syc.jpg",
          filename: "YelpCamp/weojkcuvltx2mpjq2syc"
        },
        {
          url: "https://res.cloudinary.com/dcn6awac0/image/upload/v1630953997/YelpCamp/ppbvno2msgiuuodwkrqa.jpg",
          filename: "YelpCamp/ppbvno2msgiuuodwkrqa"
        }
      ]
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
