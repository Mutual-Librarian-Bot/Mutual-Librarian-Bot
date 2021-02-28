import package_json from '../package.json'
import fs from 'fs'
import parseAuthor from 'parse-author'

const name = package_json.name

// [Parse the contributors field of package.json and extract the names only.]
const authors = [
    parseAuthor(package_json.author).name,
    ...package_json.contributors.map(parseAuthor).map(it => it.name)
]

// [Add a "-dev" suffix to the version number]
// [If it's not explicitly a production environment.]
const versionSuffix = process.env.NODE_ENV !== 'production' ? '-dev' : ''

// [Add a timestamp suffix to the version name.]
const stats = fs.statSync('package.json')
const mtime = new Date(stats.mtimeMs)
const year = mtime.getFullYear()
const month = `0${mtime.getMonth() + 1}`.slice(-2)
const date = `0${mtime.getDate()}`.slice(-2)
const dateSuffix = `${year}${month}${date}`

const version = package_json.version + versionSuffix + '~' + dateSuffix

export default { name, authors, version }
