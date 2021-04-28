const express = require('express');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const session = require('express-session');
const user = require('./model/User');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRouter');
const shapeRouter = require('./routes/shapeRouter');
const userShapeRouter = require('./routes/userShapeRouter');
const sessionauth = require('./utilities/session-auth');

const morgan = require('morgan');
const app=express();


/* const NODE_ENV = 'development';
const SES_Name = 'username';
const SES_Secret = 'hush,secret time';
const SES_Lifetime = 1000*60*60;
 */


const ses = {
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false },
  store: MongoStore.create({ mongoUrl: 'mongodb+srv://user1:Admin12@cluster0.rfjki.mongodb.net/shapeDatabse?retryWrites=true&w=majority'})

}

mongoose.connect(
  'mongodb+srv://user1:Admin12@cluster0.rfjki.mongodb.net/shapeDatabse?retryWrites=true&w=majority',
  {
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify : false,
    useUnifiedTopology : true,
  }
)
.then((result)=>{
  console.log('Database Connected');
})




app.use(session(ses));
app.use(helmet());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(userRouter); 
app.use(shapeRouter);
app.use(userShapeRouter);


/* app.use(session(
  {
    name : SES_Name,
    secret : SES_Secret,
    store : MongoStore.create({
      mongoUrl:
      'mongodb+srv://user1:Admin12@cluster0.rfjki.mongodb.net/shapeDatabse?retryWrites=true&w=majority',
      ttl : parseInt(SES_Lifetime)/1000,

    }),
    saveUninitialized : false,
    resave :false,
    cookie:{
      sameSite : true,
      secure : process.env.NODE_ENV === 'production',
      maxAge :parseInt(SES_Lifetime),
    },
  }
)); */

app.use(morgan('combined'));



const port = process.env.PORT || 3000;
app.listen(port,()=>{
  console.log("Server started at",  `${port}`);
});

module.exports=app;