import mongoose from 'mongoose';
import { CustomLogger } from '../utils/logger';
import dotenv from 'dotenv';
dotenv.config();

export class MongoConnector {

    private logger = new CustomLogger();


     connect = ()=>{
        mongoose
        .connect(`${process.env.MONGODB_URI}`)
        .then(() => {
            console.log("URI", process.env.MONGODB_URI)
            console.log('Connected to MongoDB');
        
        })
        .catch((error: any) => {
            
            console.log('MongoDB connection error:', error.message.toString());
        });
    

    }
}