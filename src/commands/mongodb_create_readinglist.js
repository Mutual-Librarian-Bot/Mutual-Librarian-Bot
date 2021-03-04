import Mongo from '../mongodb'
const { MongoClient, dbURL } = Mongo
import { Base, User } from 'discord.js'

export default {
    description: 'Creates the user\'s reading list [WIP]',
    action: async (client, message, []) => {
        
        var messageAuthorID = message.author.id

        console.log(`Incoming message: ${message} | messageAuthorID: ${messageAuthorID}`)

        MongoClient.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
            if (err) throw err
            var dbo = db.db("mydb")

            dbo.collection("ReadingLists").insertOne(listObj, function(err, res)
            {
                if (err) throw err
                console.log(res)
                db.close()
            })
        })
    }
}

/* [Collection: ReadingLists - Ideal Document Format]
[
    { 
        _id: messageAuthorID, name: "My Reading List"   [No idea if name should even exist]
        book1: { title: "Title", subtitle: "Subtitle", author: "Author", link: "https://book-link-here/", topics: ["Topic-1", "Topic-2", "Topic-3", etc] },
        book2: { title: "Title", subtitle: "Subtitle", author: "Author", link: "https://book-link-here/", topics: ["Topic-1", "Topic-2", "Topic-3", etc] },
        book3: { title: "Title", subtitle: "Subtitle", author: "Author", link: "https://book-link-here/", topics: ["Topic-1", "Topic-2", "Topic-3", etc] }
    },
   { 
        _id: messageAuthorID, name: "My Reading List"   [No idea if name should even exist]
        book1: { title: "Title", subtitle: "Subtitle", author: "Author", link: "https://book-link-here/", topics: ["Topic-1", "Topic-2", "Topic-3", etc] },
        book2: { title: "Title", subtitle: "Subtitle", author: "Author", link: "https://book-link-here/", topics: ["Topic-1", "Topic-2", "Topic-3", etc] },
        book3: { title: "Title", subtitle: "Subtitle", author: "Author", link: "https://book-link-here/", topics: ["Topic-1", "Topic-2", "Topic-3", etc] }
    },
    { 
        _id: messageAuthorID, name: "My Reading List"   [No idea if name should even exist]
        book1: { title: "Title", subtitle: "Subtitle", author: "Author", link: "https://book-link-here/", topics: ["Topic-1", "Topic-2", "Topic-3", etc] },
        book2: { title: "Title", subtitle: "Subtitle", author: "Author", link: "https://book-link-here/", topics: ["Topic-1", "Topic-2", "Topic-3", etc] },
        book3: { title: "Title", subtitle: "Subtitle", author: "Author", link: "https://book-link-here/", topics: ["Topic-1", "Topic-2", "Topic-3", etc] }
    }
]
*/
/* [Ideas / Thoughts / Etc.]

Keep the book information separate from the reading status, perhaps that's where the personal reading list comes into play.

Which, by extension, means that all that needs to be done for bookmarks and page highlights, is a reference to book index or whatever;
Instead of having fully fledged reading list with all the information.
*/