const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        retryWrites: true, // or false depending on your preference
        // Increase timeout value
        serverSelectionTimeoutMS: 30000, // 30 seconds
      }).then(con => {
        console.log(`MongoDB is connected to the host: ${con.connection.host}`);
    }).catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });
};

module.exports = connectDatabase;
