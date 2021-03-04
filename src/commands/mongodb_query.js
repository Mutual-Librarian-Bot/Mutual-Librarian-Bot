import Mongo from '../mongodb'
const { MongoClient, dbURL } = Mongo
import util from 'util'
import { inspect } from 'util'

export default {
    description: 'Queries the specified collection with the given arguments.',
    action: async (client, message, [...query]) => {

        console.log(`Incoming message: ${message}`)

        MongoClient.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
            if (err) throw err
            var dbo = db.db("mydb")
            var query = { address: query } // [Use toString?]

            console.log(`dbo: [` + dbo + `] | query: [` + util.inspect(query) + `] | args: [` + args +`]`)

            dbo.collection("customers").find(query).toArray(function(err, result) {
                if (err) throw (err)

                console.log(util.inspect(result))

                message.channel.send(`Result: [` + util.inspect(result) + `]`)
                db.close()
            })
        })
    }
}