const express =require("express")
const app =express()
require('dotenv').config()
const cors =require("cors")

const routes =require('./src/routers')
const PORT =process.env.PORT
app.use(express.json())
app.use(cors())

app.use(routes)

app.listen(PORT ,()=>{
    console.log(`SERVER RUNNIG ON PORT: ${PORT} `);
})
