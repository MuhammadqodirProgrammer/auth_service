const {Router} =require("express")
const {  registerPost, loginPost, users } = require("../controllers/register.controller")

const router =Router()

router.post('/register' , registerPost)
router.post('/login' , loginPost)
router.get("/users" ,users)

module.exports =router




