
module.exports = (app, passport) => {

    app.get('/', (req, res, next) => {
           res.render('index', {title: 'Index || RateMe'});
    });

    app.get('/signup', (req, res) => {
        var errors = req.flash('error'); //to get the error message
        console.log(errors);
        res.render('user/signup', {title: 'Signup || RateMe', messages: errors, hasErrors: errors.Length > 0});
    });

    app.post('/signup', validate, passport.authenticate('local.signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    }));
    
    app.get('/login', (req, res) => {
        res.render('user/login', {title: 'Login || RateMe'});
    })
}

function validate(req, res, next){
    req.checkBody('fullname', 'Fullname is Required').notEmpty();
    req.checkBody('fullname', 'Fullname Must Not Be Less Thank 5').isLength({min:5});
    req.checkBody('email', 'Email is Required').notEmpty();
    req.checkBody('email', 'Email is Invalid').isEmail();
    req.checkBody('password', 'Password is Required').notEmpty();
    req.checkBody('password', 'Password Must Not Be Less Thank 5').isLength({min:5});
    req.check("password", "Password Must Contain at least 1 Number").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i");
    
    var errors = req.validationErrors();

    if(errors){
        var messages = [];
        errors.forEach((error) => {
            messages.push(error.msg);
        });

        req.flash('error', messages);
        res.redirect('/signup');
    }else{
        return next();
    }
}