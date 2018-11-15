const validate = require('validate.js');
const Events = require('../Events');

class Status {
    constructor(data) {
        this.data = data;
    }

    static jobsValidator(jobs) {
        // Do not care if not set
        if (!jobs) {
            return;
        }

        if (!validate.isArray(jobs)) {
            return 'Jobs must be an array';
        }

        const errors = [];
        jobs.forEach((job, index) => {
            const validateErrors = validate(job, {
                name: {
                    presence: true,
                },
                stage: {
                    presence: true,
                },
                state: {
                    presence: true,
                    inclusion: ['created', 'pending', 'running', 'error', 'success', 'allowed-error'],
                },
            });
            if (validateErrors) {
                errors.push(`job ${index}: ${JSON.stringify(validateErrors)}`);
            }
        });

        return errors.length > 0 ? errors : null;
    }

    static stagesValidator(stages) {
        // Do not care if not set
        if (!stages) {
            return;
        }

        if (!validate.isArray(stages)) {
            return 'Stages must be an array';
        }

        if (stages.find(stage => !validate.isString(stage))) {
            return 'Stages must be an array of strings';
        }
    }

    static getConstraints() {
        validate.validators.jobsValidator = this.jobsValidator;
        validate.validators.stagesValidator = this.stagesValidator;

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
            stages: {
                stagesValidator: true,
            },
            jobs: {
                jobsValidator: true,
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
