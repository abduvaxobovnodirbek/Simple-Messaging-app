const mongoose = require("mongoose");
//process.env.MONGO_URI

const connectToDatabase = async () => {
  await mongoose.connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB Connected`);
};

module.exports = connectToDatabase;
