const mongoose = require("mongoose");

const DB = async (app) => {
    mongoose.connect("mongodb://localhost/populatedb", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
    await mongoose.connection
    .once("open", () => {
        console.log("DB connected...");
    })
    .on("error", (error) => {
        console.log("Connection error: ", error);
    });  
    
    app.listen(3050, ()=> {
        console.log("Listening on port 3050...")
    })
}

module.exports = DB