// getting-started.js
import mongoose from 'mongoose'

// connectMongo().catch((err) => console.log(err))

function connectMongo() {
  mongoose.connect('mongodb://127.0.0.1:27017/f8_edu_dev')
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  mongoose.connection.on('connected', function () {
    console.log('DB Connected')
  })
  mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection has occured ' + err + ' error')
  })
}

export default connectMongo
