const Events = require('../Events');
const Status = require('./Status');

class StatusManager {
    constructor() {
        this.statuses = [];

        this.setListeners();
    }

    setListeners() {
        Events.watch(Events.event.newStatus, status => {
            console.log('[StatusManager] Received new status.');

            this.processStatus(status);
        });

        console.log('[StatusManager] Listening to incoming statuses...');
    }

    /**
     * @param {Status} status
     */
    processStatus(status) {
        const existingStatusByKey = this.statuses.find(existingStatus => existingStatus.getKey() === status.getKey());

        if (existingStatusByKey) {
            console.log('[StatusManager] Status already exists, replacing the old status.');
            const index = this.statuses.indexOf(existingStatusByKey);
            this.statuses[index] = status;
            return;
        }

        console.log('[StatusManager] Adding new status to the statuses.');
        this.statuses.push(status);
    }
}

module.exports = new StatusManager();
