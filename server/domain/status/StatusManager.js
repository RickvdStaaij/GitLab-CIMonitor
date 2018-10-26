class StatusManager {
    constructor() {
        this.statuses = [];

        // @todo: Listen to creation of new statuses
        console.log('[StatusManager] Listening to incoming statuses...');
    }
}

module.exports = new StatusManager();
