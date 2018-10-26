const Events = require('../Events');
const Status = require('./Status');

class StatusManager {
    constructor() {
        this.statuses = [];

        Events.watch(Events.event.newStatus, status => this.processStatus(status));
        console.log('[StatusManager] Listening to incoming statuses...');
    }

    /**
     * @param {Status} status
     */
    processStatus(status) {
        console.log('[EventManager] Received new status!');

        // If the status key already exists, overwrite it
        const existingStatusByKey = this.statuses.find(existingStatus => existingStatus.getKey() === status.getKey());
        if (existingStatusByKey) {
            const index = this.statuses.indexOf(existingStatusByKey);
            this.statuses[index] = status;
            return;
        }

        this.statuses.push(status);
    }
}

module.exports = new StatusManager();
