import {models, model, Schema} from 'mongoose';



const UserSchema = new Schema({
    firstname: {required: true, type: String},
    lastname: {required: true, type: String},
    username: {required: true, type: String},
    email: {required: true, type: String},
    password: {required: true, type: String},
    zip: String,
    state: String,
    city: String,
    imageProfile: String
});


const User = models.User || model("User", UserSchema);
export default User;
