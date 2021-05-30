import mongoose from 'mongoose';

const user = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const db_name = process.env.DB_NAME;

export const mongoURI = `mongodb+srv://${user}:${password}@todocluster.cr5bd.mongodb.net/${db_name}?retryWrites=true&w=majority`

const connectDB = async () => {
    console.log('Trying to connect to mongo....');
    try{
        await mongoose.connect(mongoURI, {useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true},);
        console.log('Successfully connected to mongo');
    }catch(err){
        console.log(`Unable to connect to mongo db`);
        console.log(err);
    }
}

export default connectDB;