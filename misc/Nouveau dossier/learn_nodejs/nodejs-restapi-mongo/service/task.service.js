const taskRepository  = require('../repository/task.repository');
const logger = require('../logger/api.logger');

class TaskService {

    constructor() {}

    async getTasks() {
        logger.info('Service: getTasks')
        return await taskRepository.getTasks();
    }

    async getTask(taskId) {
        logger.info('Service: getTask')
        return await taskRepository.getTask(taskId);
    }

    async createTask(task) {
        return await taskRepository.createTask(task);
    }

    async updateTask(task) {
        return await taskRepository.updateTask(task);
    }

    async deleteTask(taskId) {
        return await taskRepository.deleteTask(taskId);
    }

}

module.exports = new TaskService();