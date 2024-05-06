const express = require('express');
const { createUser, loginUserCtrl, getAllUsers, getUser, deleteUser, updateUser, unBlockUser, blockUser } = require('../controller/userCtrl');
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();


router.post('/register', createUser);
router.post('/login', loginUserCtrl);
router.get('/all-users', getAllUsers);
router.get("/:id", authMiddleware, isAdmin, getUser);
router.delete('/:id', deleteUser);
router.put('/edituser', authMiddleware, updateUser);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unBlockUser);
module.exports = router;