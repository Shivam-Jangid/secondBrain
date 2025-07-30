import mongoose, { Schema } from 'mongoose';
import dotenv from "dotenv";
dotenv.config();
const dburl =process.env.DB_URL 


const UserSchema = new Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String
});

const ContentTypes = ['post', 'video', 'note'];
const ContentSchema = new Schema({
    title:{type:String, required:true},
    type:{type:String, enum:ContentTypes, required:true},
    description: {type:String, required:true},
    link:{type:String,},
    tags:[{type:mongoose.Types.ObjectId, ref:'Tag'}],
    userId:{type:mongoose.Types.ObjectId, ref:'User',required:true}
});

const TagSchema = new Schema({
  title:{type:String,required:true, unique:true},
});

const LinkSchema = new Schema ({
      hash:{type:String, required:true},
      userId:{type: mongoose.Schema.ObjectId, ref:"User", required:true}
})
export const LinkModel = mongoose.model("Links", LinkSchema);
export const TagModel = mongoose.model('Tags', TagSchema);
export const ContentModel = mongoose.model('Contents', ContentSchema);
export const UserModel = mongoose.model('User', UserSchema);
async function connectDb() {
  try {
    if(dburl)
    await mongoose.connect(dburl);
    console.log("Connected to DB");
  } catch (err) {
    console.error(err);
  }
}

connectDb();