const Events = require('../Events');
const Status = require('./Status');
const staticEvents = require('../../../shared/socketEvents');

class StatusManager {
    constructor() {
        this.statuses = [];

        this.setListeners();
    }

    setListeners() {
        Events.watch(Events.event.newStatus, status => this.onNewStatus(status));

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

    getStatuses() {
        return (
            this.statuses
                // Get raw data only
                .map(status => status.getRawData())
                // Newest updates first
                .sort((statusA, statusB) => statusA.time < statusB.time)
        );
    }

    /**
     * @return Status
     */
    getStatusByKey(statusKey) {
        return this.statuses.find(status => status.key === statusKey);
    }

    /**
     * @param {Status} status
     */
    onNewStatus(status) {
        console.log('[StatusManager] Received new status.');

        this.processStatus(status);

        // @todo: Remove old statuses

        Events.push(Events.event.statusesUpdated);
    }

    reset() {
        this.statuses = [];

        Events.push(Events.event.statusesUpdated);
    }
}

module.exports = new StatusManager();
