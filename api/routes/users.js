import express from "express";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauth", verifyToken, (req, res, next) => {
//     res.send("You are good")
// })
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("You can delete your account")
// })
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("Hello Admin, You can delete any account")
// })

// Update
router.put('/:id', verifyUser, updateUser)
// Delete
router.delete('/:id', verifyUser, deleteUser)
// Get one
router.get('/:id', verifyUser, getUser)
// Get All
router.get('/', verifyAdmin, getAllUsers)

export default router