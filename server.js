const express=require('express')
const mongoose=require('mongoose')
const Cards=require('./dbCards')
const Cors=require('cors')


//App config
const app=express()
const port=process.env.PORT||8001
const connection_url=`mongodb+srv://admin:adsfds23452345234dfshdfhh.;io];'li@cluster0.roqps.mongodb.net/tinderdb?retryWrites=true&w=majority`

//middleware 

app.use(express.json())
app.use(Cors()); 

//dbconfig
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,

}).then(console.log('database connected succssfuly'));

//api endpoints
app.get('/',(req,res)=>{
    res.status(200).send("hello clever programner")
})
app.post('/tinder/cards',(req,res)=>{  
    const dbCard=req.body;
    Cards.create(dbCard, (err,data)=>{

    if(err) 
    {res.status(500).send(err)}
    else{
        res.status(201).send(data);
    }

    })
});

app.get('/tinder/cards',(req,res)=>{
    Cards.find((err,data)=>{

        if(err) 
        {res.status(500).send(err)}
        else{
            res.status(200).send(data);
        }
    
        })

}
)

//Listner

app.listen(port,()=>{console.log(`litsening on localhost port ${port}`)})