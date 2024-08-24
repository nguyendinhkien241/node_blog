const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');


class CourseController {

    show(req, res, next) {
        Course.findOne({
            slug: req.params.slug
        })
            .then((course) => {
                res.render('courses/show', {course: mongooseToObject(course) })
            })
            .catch(next);
    }

    create(req, res) {
        res.render('courses/create');
    }

    store(req, res) {
        req.body.image = `https://files.fullstack.edu.vn/f8-prod/courses/7.png`;
        const course = new Course(req.body);
        course.save()
            .then(() => res.redirect('/me/storage/courses'))
            .catch(error => {
            })
    }

    // async store(req, res) {
    //     try {
    //         req.body.img = `https://files.fullstack.edu.vn/f8-prod/courses/7.png`;
    //         const course = new Course(req.body);
    //         await course.save();
    //         res.redirect('/');
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).send('Internal Server Error');
    //     }
    // }

    edit(req, res,next) {
        Course.findById(req.params.id)
            .then((course) => {
                res.render('courses/edit', {course: mongooseToObject(course)});
            })
            .catch(next);
    }

    update(req, res,next) {
        Course.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/me/storage/courses'))
            .catch(next)
    }

    delete(req, res, next) {
        Course.delete({_id: req.params.id})
            .then(() => res.redirect('back')) 
            .catch(next);
    }

    restore(req, res,next) {
        Course.restore({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    forceDelete(req, res, next) {
        Course.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    handleFormActions(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                {
                    Course.delete({_id: {$in: req.body.courseIds}})
                        .then(() => res.redirect('back')) 
                        .catch(next);
                    break;
                }
            default:
                res.json({Message: 'Invalid action'})
        }
    }

}

module.exports = new CourseController();
