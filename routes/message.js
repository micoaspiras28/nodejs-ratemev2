
var User = require('../models/user');
var Message = require('../models/message');

// var async = require('async');

module.exports = (app) => {
    app.get('/message/:id', (req, res) => {
        User.findById({'_id': req.params.id}, (err, data) => {
            res.render('messages/message', {title: 'Private Message || Rate Me', user: req.user,
            data: data});
        })

        // async.parallel([
        //     function(callback){

        //     }
        // ]);
    });

    app.post('/message/:id', (req, res) => {
        var newMessage = new Message();

        User.findOne({'_id': req.params.id}, (err, data) => {
            newMessage.userFrom = req.user.id;
            newMessage.userTo = req.params.id;
            newMessage.userFromName = req.user.fullname;
            newMessage.userTo = data.fullname;
            newMessage.body = req.body.message;
            newMessage.createdAt = new Date();

            console.log(newMessage);
            

            newMessage.save((err) => {
                res.redirect('/message/'+req.params.id);
            });
        })
    });
}