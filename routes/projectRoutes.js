const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProjectById);
router.post('/', protect, adminOnly, projectController.createProject);
router.put('/:id', protect, adminOnly, projectController.updateProject);
router.delete('/:id', protect, adminOnly, projectController.deleteProject);

module.exports = router;
