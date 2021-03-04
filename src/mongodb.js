import Mongo from 'mongodb'

const MongoClient = Mongo.MongoClient
const dbURL = "mongodb://localhost:27017/" // [Should this be a package value?]

export default { MongoClient, dbURL }