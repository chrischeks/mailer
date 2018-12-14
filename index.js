var express = require('express');
var nodemailer = require('nodemailer');
var jade = require('jade');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=>{
    res.render('index')
});
app.get('/about', (req, res)=>{
    res.render('about')
});
app.get('/contact', (req, res)=>{
    res.render('contact')
});

app.post('/contact/send', (req, res)=>{

    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: account.user, // generated ethereal user
                pass: account.pass // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    

var mailOption = {
    from: "Chekwube Udeogu <chekwubeudeogu@gmail.com>",
    to: "afritest32019@gmail.com",
    subject: "Contact Form Submission",
    text: "This is the form submitted by Name: "+req.body.name+ "Email: " +req.body.email+ "Message: " +req.body.message,
    html: "<p>This is the form submitted by </p><ul><li>Name: "+req.body.name+"</li><li> Email: " +req.body.email+"</li><li> Message: " +req.body.message+"</ul></ul>"
}

transporter.sendMail(mailOption, function(error, info){
    if(error){
        console.log(error);
        res.redirect('/');
    }
    else {
        console.log('Mail sent' + info.response);
        res.redirect('/');
    }
})
});
});

app.listen(3000, function(){
    console.log('Express listening on port 3000')
});
