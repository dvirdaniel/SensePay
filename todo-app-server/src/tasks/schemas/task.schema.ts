import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
   name: String,
   isDone: Boolean
});
