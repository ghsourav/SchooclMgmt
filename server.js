const express = require("express");
const app = express()
const session = require('express-session');
const port = 2000;

const passport = require('passport');
const flash = require("connect-flash");

const SchoolAuth = require('./router/Authlogin')
const ClientRouter = require('./router/client')
const MyAc = require("./router/Myaccount")

const path = require("path")
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
  extname: ".hbs",
  helpers: {
    if_eq: function(a, b, opts) {
      if (a == b) return opts.fn(this);
      else return opts.inverse(this);
    },
  }
})

require('./config/passport')(passport)


app.use('/', express.static('public'))
app.use('/uploads', express.static('uploads'))



app.engine(".hbs", hbs.engine);
app.set("view engine", "hbs");
app.set('views', './views');



app.use(
  session({
    secret: "sourav",
    resave: false,
    saveUninitialized: true,
    cookie: {
      path: "/"
      //maxAge: 18000000000
    },
    name: "id",
    ttl: 1 * 60 * 60
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use("/",SchoolAuth);
app.use("/",ClientRouter)
//app.use('/',MyAc)



  app.get("***", (req, res) => {
    res.render("404",{title:'404 Page Not Found'});
  });

app.listen(port,()=>{
    console.log("Server runs on " +port )
})