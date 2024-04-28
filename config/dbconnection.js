const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log(
      "db is connected...",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;

// mongoose.connect('mongodb+srv://vivekdodiya1510:4HbVMA7WjClplGuE@cluster0.otflvkv.mongodb.net/mycontect-backend?retryWrites=true&w=majority')
// .then(()=>{console.log('db is conected successfully....');})
