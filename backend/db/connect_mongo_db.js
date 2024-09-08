import mongoose from 'mongoose';

const connect_mongo_db = async () => {
    try{
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to Mongo_DB");
    }
    catch (error) {
        console.log ("Error connecting to Mongo_DB", error.message)
    }
};

export default connect_mongo_db;