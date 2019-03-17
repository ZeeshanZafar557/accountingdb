//imports all modules
var express=require('express');
var mongoose=require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

//making express method and defining itto app
var app=express();

//for push notification ends
//port no

var path =require('path');
//for seperate route file
const port=process.env.PORT||4000;
if(process.env.NODE_ENV === 'production')
{
    app.get('/', function (req, res) {
       const index = path.join(__dirname, '../', 'build','index.html');
        res.sendFile(index);
      })
 }
app.use(cors());

//adding body parser
app.use(bodyparser.json());

//adding static files
app.use(express.static(path.join(__dirname, 'public')));

//for binding port
app.listen(port,()=>{
    console.log('Server started at '+ port);
});
const route=require('./routes/route');
//testing server
// / is for if user is on home page

/*app.get('/',(req,res)=>{
    res.send('foobar');
})*/
app.use('/api',route);
//connect to mongo
mongoose.connect('mongodb://accounts:accounts1@ds161794.mlab.com:61794/accounts-db');
// mongoose.connect('mongodb://localhost:27017/accountingdb');
mongoose.connection.on('connected',()=>{
    console.log('db connected');
});
mongoose.connection.on('error',(err)=>{
  
    if(err)
    {  console.log('db error '+err);
  }
  });