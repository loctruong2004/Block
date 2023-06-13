const express = require('express');
const router = express.Router();

const CourseController = require('../app/controlles/CoursesController');

router.get('/create', CourseController.create);
router.post('/store', CourseController.store);
router.post('/handle-form-action', CourseController.hanldeAction);
router.post('/trash-form', CourseController.hanldeTrashAction);
router.get('/:id/edit', CourseController.edit);
router.put('/:id', CourseController.update);
router.patch('/:id/restore', CourseController.Restore);
router.delete('/:id', CourseController.delete);
router.delete('/:id/force', CourseController.forceDelete);
router.get('/:slug', CourseController.show);

module.exports = router;
