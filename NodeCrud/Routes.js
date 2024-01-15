const express = require("express");
const Nodemailer = require("nodemailer");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Post = require("./Post");
const dotenv = require("dotenv");
// const SMTPConnection = require("nodemailer/lib/smtp-connection");
const { default: mongoose } = require("mongoose");
const multer = require("multer");
dotenv.config();
//  now we create a mail's portal
const transpoter = Nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
// otp generate

const generateOtp = () => {
  let number = "0123456789";
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += number[Math.floor(Math.random() * 10)];
  }
  return OTP;
};
router.post("/create", async (req, res) => {
  const { username, password, name, phone, email, gender, country } = req.body;

  if (
    !username ||
    !password ||
    !phone ||
    !name ||
    !gender ||
    !email ||
    !country
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new Post({
    username,
    password: hashedPassword,
    phone,
    name,
    email,
    gender,
    country,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const user = await Post.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { username: user.username, userId: user._id },
      "your-secret-key",
      { expiresIn: "1h" }
    );

    user.tokens = token;
    await user.save();

    res.json({ token, test: "test" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// email with otp;

const JWT_SCREAT = "your-secret-key";

router.post("/emaillogin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await Post.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "invalid email or password" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      // saving genreated otp into user database
      const otp = generateOtp();
      user.otp = otp;
      await user.save();
      // send mail to another email
      const mailOption = {
        from: "shivamthakur171625@gmail.com",
        to: user.email,
        subject: "otp bhej rha hun terko ",
        text: `ye le tera otp ${otp}`,
      };

      transpoter.sendMail(mailOption, (error, info) => {
        if (error) {
          return res.status(500).json({ message: error.message });
        }
        console.log(info.response);
      });

      // generating the tokens when user trying to login
      const token = jwt.sign(
        { username: user.username, _id: user._id, email: user.email },
        JWT_SCREAT,
        { expiresIn: "1h" }
      );
      // if user tokens is not found show the empty array in db
      if (!user.tokens) {
        user.tokens = [];
      }
      // if the user data is found so push the token into user db field tokens
      user.tokens.push(token);
      await user.save();
      return res.json({
        username: user.username,
        _id: user._id,
        email: user.email,
        token,
      });
    } else {
      return res.status(401).json({ message: "invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Assuming this code is a part of your server-side Node.js application
// This is the route handling the verification of OTP

router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await Post.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.otp) {
      return res.status(400).json({ message: "No OTP found for the user" });
    }

    if (user.otp === otp) {
      // Clearing the OTP after successful verification
      user.otp = null;
      await user.save();
      return res.status(200).json({ message: "OTP verified successfully" });
    } else {
      return res.status(401).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error during OTP verification", error.message);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await Post.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await Post.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const userId = req.params.id;
  const { username, phoneNumber } = req.body;

  // if (!username || !phoneNumber) {
  //   return res.status(400).json({ message: "All fields are required" });
  // }

  try {
    const updatedUser = await Post.findByIdAndUpdate(
      userId,
      {
        username,
        phoneNumber,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await Post.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// change pasword
router.post("/change-password", async (req, res) => {
  const { email, username, oldPassword, newPassword } = req.body;
  try {
    const user = await Post.findOne({ email });
    const userName = await Post.findOne({ username });
    if (
      !user ||
      !userName ||
      !(await bcrypt.compare(oldPassword, user.password))
    ) {
      return res.status(401).json({ error: "invalid credentials" });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: "password updatyew sucessfuly" });
  } catch (error) {
    console.error("error changing password :", error);
    return res.status(500).json({ error: "internal server error" });
  }
});

//  for User Update and profile
// const { objectId } = mongoose.Types; //  it is used  to check  scheema
router.get("/profile/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ message: "invalid user id" });
    }
    const user = await Post.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user daat:", error);
    res.status(500).json({ message: "internal server Error" });
  }
});
router.put("/update/:id", async (req, res) => {
  const userId = req.params.id;
  const { username, name, email, phone } = req.body;

  console.log("Received update request with data:", req.body);

  if (!username || !name || !email || !phone) {
    return res.status(400).json({ message: "all fields are required" });
  }

  try {
    const updatedUser = await Post.findByIdAndUpdate(
      userId,
      {
        username,
        name,
        email,
        phone,
        // country,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "user not found" });
    }

    console.log("Updated user:", updatedUser);
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ message: "internal server error" });
  }
});

// user delete api
router.delete("/delete/:id", async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const deletedUser = await Post.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// user Image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/image");
    // specify the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Routes

// Example route for handling image upload
router.post("/upload-image/:id", upload.single("image"), async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await Post.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file upload" });
    }
    user.image = req.file.originalname;
    await user.save();
    res.json({ message: "avtar image uploadded suceesfully" });
  } catch (error) {
    console.error("error uploading avatar image:", error);
    res.status(500).json({ message: "internal server error" });
  }
});
router.get("/", async (req, res) => {
  try {
    // Get the search query from the request parameters
    const searchQuery = req.query.search;

    // Construct the query based on whether there's a search query or not
    const query = searchQuery
      ? {
          $or: [
            { username: { $regex: searchQuery, $options: "i" } },
            { email: { $regex: searchQuery, $options: "i" } },
          ],
        }
      : {};

    // Fetch users based on the constructed query
    const users = await Post.find(query);

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
