const mongoose = require('mongoose');
const slugify  = require('slugify'); // slugify pacage allows to convert names to lowercase
const tourSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true,'A tour must have a name'],
        unique: true,
        trim: true,
        maxLength: [40, 'a tour name must have less than 40 characters'],
        minLength: [10, "a tour name must have 10 or more characters" ]
    },
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration'],
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function(val){
                return val < this.price;
            },
            message: 'Discount price ({VALUES}) must be below regular price'
        }
    },
    rating: {
        type: Number,
        default: 4.0,
        max: [5.0, 'rating must be below 5.0'],
        min: [1.0, 'rating must be above 1.0']
    },
    secretTour: {
        type: Boolean,
        default: false
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty'],
        enum: {
            values: ['easy','normal','hard'],
            message: 'a difficulty must be either easy , normal or hard'
        }
        
    },
    slug: String
},{timestamps: true},
//  {
//     toJSON: {virtuals: true},
//     toObject: {virtuals: true}
//  }
)

// tourSchema.virtual("durationWeeks").get(function(){
//     this.duration / 7;
// })

// DOCUMENT MIDDLEWARE
tourSchema.pre('save',function(){
    this.slug = slugify(this.name, {lower: true});
})

// QUERY MIDDLEWARE
tourSchema.pre(/^find/,function(){
// tourSchema.pre('find',function(){ // this will work findOne(), update() and delete() commands bot not find()
    this.find({secretTour: {$ne:true}});
})

const Tour = mongoose.model('Tour',tourSchema);

module.exports = Tour;