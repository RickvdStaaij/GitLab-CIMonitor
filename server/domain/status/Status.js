const validate = require('validate.js');

class Status {
    constructor(data) {
        this.data = data;
    }

    static getConstraints() {
        return {
            key: {
                presence: true,
            },
            state: {
                presence: true,
            },
        };
    }

    static createStatus(data) {
        console.log('[Status] Creating status...');

        return validate
            .async(data, this.getConstraints())
            .then(data => {
                // @todo: Push new status into a new listener

                console.log('[Status] Successfully added!');

                return new this(data);
            })
            .catch(errors => {
                throw {
                    message: 'The new status is not valid, please check the errors.',
                    errors: errors,
                };
            });
    }

    getData() {
        return this.data;
    }
}

module.exports = Status;
