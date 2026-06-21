const Project = require('../models/Project');

// Get all projects
exports.getProjects = async (req, res) => {
    try {
        const pageSize = Number(req.query.pageSize) || 6;
        const page = Number(req.query.pageNumber) || 1;

        const keyword = req.query.keyword ? {
            title: {
                $regex: req.query.keyword,
                $options: 'i'
            }
        } : {};

        const category = req.query.category ? { category: req.query.category } : {};

        const count = await Project.countDocuments({ ...keyword, ...category });
        const projects = await Project.find({ ...keyword, ...category })
            .select('-description') // Exclude heavy description from list
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .sort({ createdAt: -1 })
            .lean();

        res.status(200).json({
            projects: projects.map(p => ({ ...p, id: p._id })),
            page,
            pages: Math.ceil(count / pageSize),
            total: count
        });
    } catch (err) {
        res.status(500).json({ message: "Lỗi hệ thống khi tải danh sách dự án", detail: err.message });
    }
};

// Get single project
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create project
exports.createProject = async (req, res) => {
    const project = new Project(req.body);
    try {
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update project
exports.updateProject = async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json(updatedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete project
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
