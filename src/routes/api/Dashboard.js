// ************ Require's ************
const express = require("express");
const router = express.Router();
// const multer = require("multer");
// const path = require("path");
const DashboardApiController = require('../../controllers/api/DashboardApiController')

router.get('/widgets',DashboardApiController.widgets);
router.get('/products',DashboardApiController.products)
//router.get("/users", usersApiController.list);
//router.get("/profile/:id",  usersApiController.profile);


module.exports = router;
