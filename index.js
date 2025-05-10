const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

// حافظه موقت برای ذخیره وظایف
let tasks = [];
let taskIdCounter = 1;

// لیست تمام وظایف
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// افزودن وظیفه جدید
app.post('/tasks', (req, res) => {
    const { title } = req.body;
    const newTask = {
        id: taskIdCounter++,
        title: title || "No Title",
        done: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// دریافت وظیفه بر اساس ID
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

// حذف وظیفه
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== taskId);
    res.json({ result: 'Task deleted' });
});

// مسیر health check برای readiness/liveness probe
app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

app.listen(port, () => {
    console.log(`To-Do API running on http://localhost:${port}`);
});
