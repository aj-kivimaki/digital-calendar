import express from "express";
import { auth } from "../db/firebaseAdmin";

export const Router = express.Router();

// create a new user
Router.post("/signup", async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
    emailVerified: false,
    displayName: req.body.displayName,
    photoURL: "http://www.example.com/12345678/photo.png",
    disabled: false,
  };

  auth
    .createUser(user)
    .then((userRecord) => {
      // User created successfully
      res.status(200).json({
        message: "User created successfully",
        user: {
          uid: userRecord.uid,
          email: userRecord.email,
          emailVerified: userRecord.emailVerified,
          displayName: userRecord.displayName,
          photoURL: userRecord.photoURL,
          disabled: userRecord.disabled,
        },
      });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Error creating new user", error: error });
    });
});

// get a user
Router.get("/users/:uid", async (req, res) => {
  const uid = req.params.uid;

  auth
    .getUser(uid)
    .then((userRecord) => {
      // User found
      res.status(200).json({
        message: "Successfully fetched user data:",
        // user: userRecord.toJSON(),
        user: {
          uid: userRecord.uid,
          email: userRecord.email,
          emailVerified: userRecord.emailVerified,
          displayName: userRecord.displayName,
          photoURL: userRecord.photoURL,
          disabled: userRecord.disabled,
        },
      });
    })
    .catch((error) => {
      console.log("Error fetching user data:", error);
    });
});
