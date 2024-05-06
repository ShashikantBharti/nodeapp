const mongoose = require('mongoose');

const DatabaseConnect = async () => {
  try {
    const result = await mongoose.connect(process.env.MONGODB_URL);
    if (!result) {
      throw new Error(`Database is not connected`);
    }
    console.log(`Database connections is stablisted`);
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

module.exports = DatabaseConnect;
