const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');


class MeController {

    storageCourses(req, res,next) {
        Course.find({})
            .then(courses => res.render('./me/storage_courses', {
                courses: multipleMongooseToObject(courses)
            }))
            .catch(next);
    }

    trashCourses(req, res, next) {
        Course.findWithDeleted({deleted: true})
            .then(courses => res.render('me/trash_courses', {
                courses: multipleMongooseToObject(courses)
            }))
            .catch(next);
    }

}

module.exports = new MeController();
