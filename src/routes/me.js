const express = require('express');
const router = express.Router();
const meController = require('../app/controllers/MeController');


router.get('/storage/courses', meController.storageCourses);
router.get('/trash/courses', meController.trashCourses);

module.exports = router;