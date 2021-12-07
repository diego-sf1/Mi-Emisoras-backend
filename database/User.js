const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
  name : {
    type: String,
    require: true
  },
  lastName : {
    type: String,
    require: true
  },
  age: {
    type: Number
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true
  },
  city: {
    type: String,
    require: true
  },
  country: {
    type: String,
    require: true
  },
  url: {
    type: String
  },
  avatar: {
    type: String
  }
},
{
  timestamps: true,
  versionKey: false
});

//TODO: Hash the pass with bcryptjs

module.exports = model('User', UserSchema);

