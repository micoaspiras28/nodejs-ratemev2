var formidable = require('formidable');
var path = require('path');
var fs = require('fs');


module.exports = (app) => {
    app.get('/company/create', (req, res) => {
        res.render('company/company', {title: 'Company Registration', user: req.user});
    });
    
    app.post('/upload', (req, res) => {
        var form = new formidable.IncomingForm();

        form.uploadDir =  path.join(__dirname, '../public/uploads');

        form.on('file', (field, file) => {
            fs.rename(file.path, path.join(form.uploadDir, file.name), (err) => {
                if(err){
                    throw err
                }
                console.log('File has been renamed');
                
            });
        }),
        form.on('error', (err) => {
            console.log('An error occured', err);
        }),
        form.on('end', () => {
            console.log('File upload was successful');
        });
        form.parse(req);
    });
}