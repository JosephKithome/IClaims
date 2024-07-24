import mongoose from 'mongoose';
import { CustomLogger } from '../utils/logger';

export class MongoConnector {

    private logger = new CustomLogger();


     connect = ()=>{
        mongoose
        .connect(`${process.env.DATABASE_URL}`)
        .then(() => {
            console.log('Connected to MongoDB');
        
        })
        .catch((error: any) => {
            console.log('MongoDB connection error:', error.message.toString());
        });
    

    }
}