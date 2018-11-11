const validate = require('validate.js');
const Events = require('../Events');

class Status {
    constructor(data) {
        this.data = data;
    }

    static getConstraints() {
        return {
            key: {
                presence: true,
                format: /[\d\w_-]+/,
            },
            state: {
                presence: true,
                inclusion: ['success', 'warning', 'error', 'info'],
            },
            title: {
                presence: true,
            },
            subTitle: {},
            image: {
                url: true,
            },
            userImage: {
                url: true,
            },
        };
    }

    static createStatus(data) {
        console.log('[Status] Creating status...');

        return validate
            .async(data, this.getConstraints())
            .then(data => {
                data = { ...data, time: new Date() };
                const newStatus = new this(data);

                Events.push(Events.event.newStatus, newStatus);

                console.log('[Status] Successfully added!');

                return newStatus;
            })
            .catch(errors => {
                console.log('[Status] Validation failed, throwing error.');

                throw {
                    message: 'The new status is not valid, please check the errors.',
                    errors: errors,
                };
            });
    }

    getRawData() {
        return this.data;
    }

    getKey() {
        return this.data.key;
    }
}

module.exports = Status;
