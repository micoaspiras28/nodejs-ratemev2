module.exports = {
    auth: {
        user: 'youremail@yahoo.com',
        pass: 'yourpassword'
    },

    facebook: {
        clientID: '456991051519296',
        clientSecret: 'f35acd12aa714cc857a871933060bde1',
        profileFields: ['email', 'displayName'],
        callbackURL: 'http://localhost:3000/auth/facebook/callback',
        passReqToCallback: true
        
    }
}