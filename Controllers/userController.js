const projects = require("../Models/projectModel");
const users = require("../Models/userModel");
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { userName, email, password } = req.body
    //console.log(userName);
    //console.log(email);
    //console.log(password);
    // res.status(200).json("Registered Successfully")
    try {

        const existingUser = await users.findOne({ email }) //Vhecking user exist or not
        if (existingUser) {
            res.status(400).json("user already exist!! please log in")
        }
        else {
            const newuser = new users(
                {
                    userName, email, password, gitHub: "", linkedin: "", profile: ""

                }
            )
            // Store new object in DB collections
            await newuser.save()
            res.status(200).json(newuser)
        }
    }
    catch (err) {
        res.status(401).json(`Register API Failed ${err}`)
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    //console.log(email);
    try {
        const loogedinuser = await users.findOne({ email, password })
        if (loogedinuser) {
            const token = jwt.sign({ _id: loogedinuser._id }, "supersecretkey123")
            res.status(200).json({
                user: loogedinuser,
                token
            }
            )
        }
        else {
            res.status(404).json("Incorrect username or password")
        }
    }
    catch (er) {
        res.status(401).json(`Register API Failed ${err}`)

    }

}

exports.editProfile = async (req, res) => {
    const { userName, gitHub, linkedin, profile } = req.body
    const { _id } = req.params
    const profile1 = req.file ? req.file?.filename : profile
    // console.log(userName);
    // console.log(_id);
    // console.log(profile);
    //res.send("edit profile req recieved")
    try {
        const selectedUser = await users.findOne({ _id })
        // console.log(_id)

        if (selectedUser) {
            selectedUser.userName = userName
            selectedUser.gitHub = gitHub
            selectedUser.linkedin = linkedin
            selectedUser.profile = profile1

            //Save changes 

            await selectedUser.save()
            res.status(200).json(`${userName} Profile is updated`)
        }
        else {
            res.status(404).json(`${userName} user not present`)
        }

    }
    catch (ex) {
        res.status(401).json(`Update API Failed ${ex}`)
    }
}

exports.getProfile = async (req, res) => {
    //console.log(req);
    // console.log(res.headers);
    const { _id } = req.params
    try {
        const userData = await users.findOne({ _id })
        if (userData) {
            res.status(200).json(userData)
        }
        else {
            res.status(404).json("User doesn't exist")
        }


    }
    catch (ex) {
        res.status(401).json(`getProfile API Failed ${ex}`)
    }
}

exports.addProject = async (req, res) => {
    //console.log(req.file);
    const { title, languages, overView, gitHub, website } = req.body
    const {projectImage} =req.file?.filename
    const userId = req.payload
    console.log(projectImage);
    //console.log(userId);
    // console.log(title);
    // console.log(languages);
    // console.log(overView);
    // console.log(gitHub);
    // console.log(website);
    try {
        const existingProject = await projects.findOne({ gitHub })
        if (existingProject) {
            res.status(400).json(`${existingProject.title} already exist`)
        }
        else {
            const newProject = new projects(
                {
                    title, languages, overView, gitHub, website, projectImage:req.file?.filename, userId 

                });
                console.log(newProject);
            await newProject.save()
            res.status(200).json(newProject)
            //console.log(newProject);

        }
    }
    catch (ex) {
        //console.log(ex);
        res.status(401).json(`addProject API Failed ${ex}`)

    }
}

exports.getUserProject = async (req, res) => {
    const { id } = req.params
    // console.log("UserId "+id);
    try {
        const projectdata = await projects.find({ userId: id })
        // console.log(projectdata);
        if (projectdata) {
            res.status(200).json(projectdata)
            // console.log(projectdata);
        }
        else {
            res.status(404).json("No project uploaded yet")
        }

    }
    catch (ex) {
        res.status(401).json(`getUserProject API Failed ${ex}`)
    }
}
exports.getAllProject = async (req, res) => {
    try {
        const searchQuery = req.query.search
        console.log(searchQuery);
        const query = {
            languages: { $regex: searchQuery, $options: "i" }  // i is case insensitive
        }
        const projectdataArray = await projects.find(query)
        console.log(projectdataArray);
        if (projectdataArray) {
            res.status(200).json(projectdataArray)
        }
        else {
            res.status(404).json("No project uploaded yet")
        }

    }
    catch (ex) {
        res.status(401).json(`getProject API Failed ${ex}`)
    }
}

exports.getHomeProject = async (req, res) => {
    try {
        const homeprojectdataArray = await projects.find().limit(3)
        if (homeprojectdataArray) {
            res.status(200).json(homeprojectdataArray)
        }
        else {
            res.status(404).json("No project uploaded yet")
        }

    }
    catch (ex) {
        res.status(401).json(`getHomeProject API Failed ${ex}`)
    }
}

exports.editProject = async (req, res) => {
    const { title, languages, overView, gitHub, website,projectImage } = req.body
    const { _id } = req.params
    const updateProjectImage = req.file ? req.file?.filename : projectImage
    // console.log(userName);
    // console.log(_id);
    // console.log(profile);
    //res.send("edit profile req recieved")
    try {
        const updatedProject = await projects.findByIdAndUpdate({ _id },{title,languages,overView,gitHub,website,
       projectImage:updateProjectImage },{new:true})
        // console.log(_id)
        if (updatedProject) {
            //Save changes 
            await updatedProject.save()
            res.status(200).json(`${title} Project is updated`)
        }
        else {
            res.status(404).json(`${title} Project not present`)
        }

    }
    catch (ex) {
        res.status(401).json(`Update Project API Failed ${ex}`)
    }
}


exports.deleteUserProject = async (req, res) => {
    const { _id } = req.params
    // console.log("UserId "+id);
    try {
        const response = await projects.deleteOne({ _id})
        // console.log(response);
        if (response) {
            res.status(200).json("Project Deleted")
            // console.log(projectdata);
        }
       

    }
    catch (ex) {
        res.status(401).json(`deleteUserProject API Failed ${ex}`)
    }
}