const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const app = express()
require('dotenv').config()

//Database connection 
require('./databaseConnection')

app.use(cors({
    origin: '*'
}));

const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const sec_30 = 1000 * 30;
app.use(sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: sec_30 },
    resave: false
}));

app.use(cookieParser());
app.use(bodyparser.urlencoded({limit: '50mb',extended: true}))
app.use(bodyparser.json({ limit: '50mb' }))


app.get('/',(req, res)=>{
    return res.status(200).send(`server is listning at PORT ${process.env.PORT}`)
})

// import routes
const routes = require('./src/routers/routes')

//redirect to the router
app.use(routes)

// no route error handling
app.use((req, res)=>{
    return res.send("Error: 404 Page not found")
})

app.listen(process.env.PORT,()=>{
    console.log(`server is listning at port http://localhost:${process.env.PORT}`);
})