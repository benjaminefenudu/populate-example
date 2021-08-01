const mongoose = require("mongoose");

// Setup Environment Variables
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// Setup Database
const dbOnline = async (app) => {
  try {
    await mongoose.connect(
      process.env.DB_URL,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
      },
      () => {
        console.log("Connected to cloud database...");
        app.listen(PORT, () =>
          console.log(`Server listening on localhost:${PORT}...`)
        );
      }
    );
  } catch (error) {
    handleError(error);
  }
};

module.exports = dbOnline;
