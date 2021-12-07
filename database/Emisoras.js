const {Schema, model} = require('mongoose');

const EmisoraSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  link: {
    type: String,
    require: true
  },
  imgEmisora: {
    type: String
  },
  cityEmisora: {
    type: String
  },
  countryEmisora: {
    type: String
  },
  gender: {
    type: String
  },
  likes: {
    type: Number,
    default: 0
  },
  listened: {
    type: Number,
    default: 0
  }
},
{
  timestamps: true,
  versionKey: false
});

module.exports = model('Emisora', EmisoraSchema);

