const Users = require('../schema/Users')
const jwt = require('jsonwebtoken')
const JWT = process.env.JWT_SECRET_KEY

// task add
async function add(req, res) {

    // destructuring data
    const { name, date, isDone } = req.body

    // making a sample object to push it to the model in mongodb
    const temp = { name, date, isDone }

    try {
        // finding the exact user by id and pushing it to task
        let user = await Users.findByIdAndUpdate(req.user.userId, { $push: { task: temp } }, { new: true })

        // send the status with task array
        res.status(201).send(user.task)
    } catch (error) {
        console.log(error);
    }
}

// task edit
async function edit(req, res) {
    // destructring data
    const { name, date, isDone } = req.body.data;
    // find the user using id
    const user = await Users.findById(req.user.userId);

    // User is not there in database
    if (!user) {
        return res.status(404).send({ msg: 'User not found' });
    }

    // finding the exact task to update
    const task = user.task.id(req.body.taskId);

    // task is not there
    if (!task) {
        return res.status(404).send({ msg: 'Task not found' });
    }

    // changing the targeted task
    task.name = name || task.name;
    task.date = date || task.date;
    task.isDone = isDone;

    // save the task
    await user.save();

    // send the edited user to client with status
    res.status(201).json(user.task);
}

// delete task
async function remove(req, res) {
    try {
        // finding the user using id and pull the targeted task
        let user = await Users.findByIdAndUpdate(req.user.userId, { $pull: { task: { _id: req.body.id } } }, { new: true })

        // sending the modified task array to client with status
        res.status(201).send(user.task)
    } catch (error) {
        console.log(error);
    }
}

// fetchin all the task
async function fetch(req, res) {
    try {
        // getting all the task of targeted user 
        let user = await Users.findById(req.user.userId).select('task');

        if (!user) {
            return res.status(404).send({ msg: 'User not found' });
        }

        // send the task array to client with code
        res.status(201).send(user.task)
    } catch (error) {
        console.log(error);
    }
}


module.exports = { add, fetch, remove, edit }
