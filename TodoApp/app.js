const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Local Array Storage (Hamara temporary database)
let tasks = [
    { id: 1, title: "Prepare Report", description: "Complete weekly project report", priority: "High", status: "Pending" },
    { id: 2, title: "Code Review", description: "Review auth module pull requests", priority: "Medium", status: "In Progress" }
];

let nextTaskId = 3;

// Helper function to calculate statistics
function getStats() {
    return {
        total: tasks.length,
        pending: tasks.filter(t => t.status === 'Pending').length,
        inProgress: tasks.filter(t => t.status === 'In Progress').length,
        completed: tasks.filter(t => t.status === 'Completed').length
    };
}

// 1. DASHBOARD: Home Page Route
app.get('/', (req, res) => {
    res.render('dashboard', { tasks: tasks, stats: getStats() });
});

// 2. CREATE: Render Add Form Page
app.get('/add', (req, res) => {
    res.render('add-task');
});

// 2. CREATE: Handle Form Submission
app.post('/add', (req, res) => {
    const { title, description, priority, status } = req.body;
    
    const newTask = {
        id: nextTaskId++, // Simple incremental ID
        title,
        description,
        priority,
        status: status || "Pending" // Use submitted status, fallback to Pending
    };

    tasks.push(newTask);
    res.redirect('/');
});

// 3. UPDATE: Render Edit Form Page with loaded data
app.get('/edit/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    
    if (!task) return res.status(404).send("Task not found");
    res.render('edit-task', { task });
});

// 4. UPDATE: Handle Edit Submission
app.post('/edit/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, description, priority, status } = req.body;
    
    let task = tasks.find(t => t.id === taskId);
    if (task) {
        task.title = title;
        task.description = description;
        task.priority = priority;
        task.status = status;
    }
    res.redirect('/');
});

// 5. STATUS CYCLING: Clicking on Badge cycles the status
app.get('/status/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    let task = tasks.find(t => t.id === taskId);
    
    if (task) {
        if (task.status === "Pending") task.status = "In Progress";
        else if (task.status === "In Progress") task.status = "Completed";
        else if (task.status === "Completed") task.status = "Pending";
    }
    res.redirect('/');
});

// Helper function to reassign sequential IDs after a delete
function normalizeTaskIds() {
    tasks = tasks.map((task, index) => ({
        ...task,
        id: index + 1
    }));
    nextTaskId = tasks.length + 1;
}

// 6. DELETE: Handle Task Removal
app.get('/delete/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== taskId);
    normalizeTaskIds();
    res.redirect('/');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});