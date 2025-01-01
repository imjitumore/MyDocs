const express = require("express");
const app = express();
const port = 5400;
const cors = require("cors");
const userModel = require("./modules/userModule");

app.use(cors());
app.use(express.json()); 


app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please enter both email and password" });
        }

        const existingUser = await userModel.findOne({ email });
        
        if (!existingUser) {
            return res.status(400).json({ message: "User does not exist" });
        }

        if (password !== existingUser.password) {
            return res.status(400).json({ message: "Invalid password" });
        }

        return res.status(200).json({
            message: "Login Successful",
            user: {
                email: existingUser.email,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
})


app.post("/api/signup", async (req, res) => {
    try {
        console.log(req.body)
        const {fname,lname,email,password,confirmpassword} = req.body

        if ( !fname || !lname || !email || !password || !confirmpassword ) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }
        const user = await userModel({
            firstName:fname,
            lastName:lname,
            email:email,
            password:password,
            confirmpassword:confirmpassword
        }) 
        const data = await user.save()
        console.log(data); // Log the products to the console

    res.status(200).json({"Message":"Signup Succesfully Completed"}); // Send the products as a response
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Internal server error" }); // Send an error response
    }
});

app.listen(port, () => {
    console.log("Server Running on port " + port);
});