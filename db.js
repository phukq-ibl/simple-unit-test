
function getAll(db, cb) {
    db.collection('todo').find({}).toArray((err, rs) => {
        cb(err, rs);
    })
}

module.exports = {
    getAll: getAll
}