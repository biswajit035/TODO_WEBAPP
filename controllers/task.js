const Users = require('../schema/Users')
const jwt = require('jsonwebtoken')
const JWT = process.env.JWT_SECRET_KEY


async function add(req, res) {
    const { name,date,isDone} = req.body
    const temp={name,date,isDone}
    try {
        let user = await Users.findByIdAndUpdate(req.user.userId, { $push: { task: temp } },{new:true})
        res.status(201).send(user.task)
    } catch (error) {
        console.log(error);
    }
}
async function edit(req, res) {
    const user = await Users.findById(req.user.userId);


    if (!user) {
        return res.status(404).send({ msg: 'User not found' });
    }

    const task = user.task.id(req.body.taskId);

    if (!task) {
        return res.status(404).json({ msg: 'Task not found' });
    }

    task.name = req.body.data.name || task.name;
    task.date = req.body.data.date || task.date;
    task.isDone = req.body.data.isDone;
    await user.save();
    res.status(201).json(user.task);
}
async function remove(req, res) {
    try {
        let user = await Users.findByIdAndUpdate(req.user.userId, { $pull: {task: { _id: req.body.id} } }, { new: true })
        res.status(201).send(user.task)
    } catch (error) {
        console.log(error);
    }
}
async function fetch(req, res) {
    try {
        let user =await Users.findById(req.user.userId).select('task')
        res.status(201).send(user)
    } catch (error) {
        console.log(error);
    }
}


module.exports = { add, fetch, remove,edit }
