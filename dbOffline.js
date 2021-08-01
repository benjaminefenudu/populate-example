const mongoose = require("mongoose");

const dbOffline = async (app) => {
  mongoose.connect("mongodb://localhost/populatedb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  await mongoose.connection
    .once("open", () => {
      console.log("Connected to offline database...");
    })
    .on("error", (error) => {
      console.log("Connection error: ", error);
    });

  app.listen(3050, () => {
    console.log("Listening on port 3050...");
  });
};

module.exports = dbOffline;
