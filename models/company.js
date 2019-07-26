var mongoos = require('mongoose');

var companySchema = mongoos.Schema({
    name:{type: String},
    address:{type: String},
    city:{type: String},
    country:{type: String},
    sector:{type: String},
    website:{type: String},
    image:{type: String, default: 'defaultPic.png'},
    employee: [{
        employeeId: {type: String, default: ''},
        employeeFullname: {type: String, default: ''},
        employeeRole: {type: String, default: ''},
    }],

    companyRating: [{
        comapnyName: {type: String, default: ''},
        userFullname: {type: String, default: ''},
        userRole: {type: String, default: ''},
        companyImage: {type: String, default: ''},
        userRating: {type: Number, default: 0},
        userReview: {type: String, default: ''}
    }],

    ratingNumber: [Number],
    ratingSum: {type:Number, default: 0}

});
module.exports = mongoos.model('Company', companySchema);