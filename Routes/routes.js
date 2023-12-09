const express= require('express')

//Create router object

const router=new express.Router()
const userController= require('../Controllers/userController')
const upload = require('./middlewares/multermiddlewares')
const { jwtMiddleware } = require('./middlewares/jwtmiddlewares')
//sign up

router.post('/user/register',userController.register)

//login
router.post('/user/login',userController.login)

//Update profile
router.put('/user/update-profile/:_id',jwtMiddleware, upload.single("profile"),userController.editProfile)

//get profile

router.get('/user/getprofile/:_id',jwtMiddleware,userController.getProfile)

//add new project

router.post('/user/addProject',jwtMiddleware,upload.single("projectImage"),userController.addProject)

//get user  project
router.get('/user/get-user-project/:id',userController.getUserProject)
//get All projects
router.get('/user/get-all-projects',userController.getAllProject)
//get 3 of all projects
router.get('/user/get-home-projects',userController.getHomeProject)

//Update Project
router.put('/user/update-project/:_id',jwtMiddleware, upload.single("projectImage"),userController.editProject)

//Delete Project
router.delete('/user/delete-project/:_id',jwtMiddleware,userController.deleteUserProject)
module.exports=router
