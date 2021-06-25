const mongoose = require('mongoose')
const { DateTime } = require('luxon')
  
const Schema = mongoose.Schema

const AuthorSchema = new Schema(
    {
        first_name: {type: String, required: true, maxLength: 100},
        family_name: {type: String, required: true, maxLength: 100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date},
    }
)

// Virtual for author's full name
AuthorSchema
    .virtual('name')
    .get(function (){
        return this.family_name + ', ' + this.first_name
    })

// Virtual for author's URL
AuthorSchema
    .virtual('url')
    .get(function(){
        return '/catalog/author/' + this._id
    })

// Virtual for author's birth date, now formatted
AuthorSchema
    .virtual('date_of_birth_formatted')
    .get(function(){
        // return this.date_of_birth
        // return DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
        return this.date_of_birth ? 
        DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : 
        'Unknown'
    })

// Virtual for author's birth date, now formatted in YYYY-MM-DD
AuthorSchema
    .virtual('date_of_birth_yyyy')
    .get(function(){
        return this.date_of_birth ? 
        this.date_of_birth.toISOString().split('T')[0] : 
        'Unknown'
    })

// Virtual for author's death date, now formatted
AuthorSchema
    .virtual('date_of_death_formatted')
    .get(function(){
        return this.date_of_death ? 
        DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : 
        this.date_of_birth_formatted === 'Unknown' ?
        'Unknown' :
        'Present'
    })

// Virtual for author's birth date, now formatted in YYYY-MM-DD
AuthorSchema
    .virtual('date_of_death_yyyy')
    .get(function(){
        return this.date_of_death ? 
        this.date_of_death.toISOString().split('T')[0] : 
        'Unknown'
    })

// Virtual for author's lifespan
AuthorSchema
    .virtual('lifespan')
    .get(function(){
        return this.date_of_birth_formatted + " - " + this.date_of_death_formatted
    })

//Export model
module.exports = mongoose.model('Author', AuthorSchema)