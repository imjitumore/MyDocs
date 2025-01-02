const express = require("express");
const app = express();
const port = 5400;
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const userModel = require("./modules/userModule");
const documentModel = require("./modules/documentModule");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { userEmail } = req.params;
        const dir = path.join(__dirname, "uploads", userEmail);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error("Invalid file type"));
      }
      cb(null, true);
    },
  });
  


  app.post("/api/uploads/:userEmail", upload.array("documents"), async (req, res) => {
    try {
        const { userEmail } = req.params;
        const { documentType } = req.body;
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        const user = await userModel.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const existingDocument = user.documents.find(doc => doc.documentType === documentType);
        if (existingDocument) {
            return res.status(400).json({ message: `Document of type ${documentType} already uploaded.` });
        }

        const documents = files.map(file => ({
            documentType,
            filePath: file.path,
            uploadDate: new Date(),
        }));

        const updatedUser = await userModel.findOneAndUpdate(
            { email: userEmail },
            { $push: { documents: { $each: documents } } },
            { new: true }
        );

        res.status(201).json({
            message: "Documents uploaded successfully",
            userDocuments: updatedUser.documents,
        });
    } catch (error) {
        console.error("Error uploading documents:", error.stack);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});


  
app.put('/api/documents/:documentType', async (req, res) => {
    const { documentType } = req.params;
  
    try {
      const result = await documentModel.findOneAndUpdate(
        { name: documentType },
        { isUpload: true },
        { new: true }
      );
  
      if (!result) {
        return res.status(404).json({ message: 'Document not found.' });
      }
  
      res.status(200).json({ message: 'Document status updated.', document: result });
    } catch (error) {
      console.error('Error updating document status:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });
  

app.get("/api/documents", async (req, res) => {
    try {
      const data = await documentModel.find({});
      res.status(200).json({
        message: "All documents fetched successfully",
        data,
      });
    } catch (error) {
      console.error("Error fetching documents:", error);
      res.status(500).json({
        message: "An error occurred while fetching documents",
        error: error.message,
      });
    }
  });
  
  app.get("/api/uploads/:userEmail/:documentType", async (req, res) => {
    const { userEmail, documentType } = req.params;

    try {
        const user = await userModel.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const document = user.documents.find(doc => doc.documentType === documentType);
        if (!document) {
            return res.status(404).json({ message: "Document not found." });
        }
        const filePath = path.resolve(document.filePath);
        console.log(filePath)
        res.sendFile(filePath);
    } catch (err) {
        console.error("Error fetching file:", err);
        res.status(500).json({ message: "Internal server error." });
    }
});


app.put("/api/uploads/:userEmail", upload.single("document"), async (req, res) => {
    const { userEmail } = req.params;
    const { documentType } = req.body;
  
    try {
      const user = await userModel.findOne({ email: userEmail });
      if (!user) return res.status(404).json({ message: "User not found." });
  
      const documentIndex = user.documents.findIndex(
        (doc) => doc.documentType === documentType
      );
  
      if (documentIndex === -1) {
        return res.status(404).json({ message: "Document not found." });
      }
  
      user.documents[documentIndex].filePath = req.file.path;
      await user.save();
      res.status(200).json({ message: "Document updated successfully." });
    } catch (err) {
      console.error("Error updating document:", err);
      res.status(500).json({ message: "Internal server error." });
    }
  });
  

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