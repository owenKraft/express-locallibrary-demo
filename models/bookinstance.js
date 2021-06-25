const mongoose = require('mongoose')
const { DateTime } = require('luxon')

const Schema = mongoose.Schema

const BookInstanceSchema = new Schema(
    {
        book: {type: Schema.Types.ObjectId, ref: 'Book', required: true},
        imprint: {type: String, required: true},
        status: {type: String, required: true, enum: ['Available','Maintenance','Loaned','Reserved'],default: 'Maintenance'},
        due_back: {type: Date, default: Date.now}
    }
)

// Virtual for bookInstance's URL
BookInstanceSchema
    .virtual('url')
    .get(function(){
        return '/catalog/bookinstance/' + this._id
    })

// Virtual for bookInstance's due date, now formatted
BookInstanceSchema
    .virtual('due_back_formatted')
    .get(function(){
        return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED)
    })

// Virtual for author's birth date, now formatted in YYYY-MM-DD
BookInstanceSchema
    .virtual('due_back_yyyy')
    .get(function(){
        return this.due_back ? 
        this.due_back.toISOString().split('T')[0] : 
        'Unknown'
    })

// Export model
module.exports = mongoose.model('BookInstance', BookInstanceSchema)