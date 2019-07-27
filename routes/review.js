
module.exports = (app) => {
    app.get('/review/:id', (req, res) => {
        res.render('company/review', {title: 'Company Review || Rate Me', user: req.user});
    })
}