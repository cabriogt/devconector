require('dotenv').config()

const express = require('express');
const morgan = require('morgan')
const connectDb =require('./config/db')


const app = express();

const PORT = process.env.PORT || 5000;

app.use(morgan('dev'))

app.use(express.json({extended:false}))


app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE');
    next();
})

app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/posts',require('./routes/api/posts'));


//Connect Db
connectDb()
//App Listen
app.listen(PORT,()=>
console.log(`App listen on http://localhost:5000 port:${PORT}`)
)