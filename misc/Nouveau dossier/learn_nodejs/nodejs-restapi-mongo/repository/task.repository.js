const { connect, disconnect } = require('../config/db.config');
const todo = require('../model/task.model');
const logger = require('../logger/api.logger');

class TaskRepository {

    constructor() {
        connect();
    }

    async getTasks() {
        const tasks = await todo.find();
        logger.info('Task Repository :: tasks: ', tasks);
        await console.log('Returned tasks' + tasks);
        return tasks;
    }

    async getTask(taskId) {
        const task = await todo.findById(taskId);
        logger.info('Task Repository :: task: ', task);
        await console.log('Returned task' + task);
        return task;
    }

    async createTask(task) {
        let data = {};
        try {
            data = await todo.create(task);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateTask(task) {
        let data = {};
        try {
            let query = {'_id': task._id};
            await todo.findOneAndUpdate(query, task, {'useFindAndModify': false});
            data = await todo.findById(task._id); //Returns the upadted todo unlike findOneAndUpdate which returns the old todo data
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async deleteTask(taskId) {
        let data = {};
        try {
            data = await Task.deleteOne({_id : taskId});
        } catch(err) {
            logger.error('Error::' + err);
        }
        return {status: `${data.deletedCount > 0 ? true : false}`};
    }

}

module.exports = new TaskRepository();