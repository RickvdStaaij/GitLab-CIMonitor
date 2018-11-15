const Status = require('../Status');
const StatusManager = require('../StatusManager');

class StatusAdapterGitLab {
    processWebHook(data) {
        switch (data.object_kind) {
            case 'pipeline':
                this.processPipelineEvent(data);
                break;
            case 'build':
                this.processBuildEvent(data);
                break;
        }
    }

    processPipelineEvent(data) {
        const key = this.getKeyFromPipeline(data);

        Status.createStatus({
            key,
            state: this.pipelineStatusToState(data.object_attributes.status),
            title: data.project.path_with_namespace,
            subTitle: data.object_attributes.ref,
            image: data.project.avatar_url,
            userImage: data.user.avatar_url,
            stages: data.object_attributes.stages,
            jobs: data.builds.map(build => {
                return {
                    name: build.name,
                    stage: build.stage,
                    state: this.buildStatusToState(build.status),
                };
            }),
        });
    }

    processBuildEvent(data) {
        const key = this.getKeyFromBuild(data);

        // Check if status key already exists, if not, ¯\_(ツ)_/¯
        const status = StatusManager.getStatusByKey(key);
        if (!status) {
            return;
        }

        // @todo: Clean the job so only the required params are present

        // @todo: Update the job in the jobs array, then re-push the status with the new jobs list
    }

    getKeyFromPipeline(data) {
        return `gitlab-${data.project.id}-${data.object_attributes.ref}`.replace(/[^\d\w-]/g, '-');
    }

    getKeyFromBuild(data) {
        return `gitlab-${data.project_id}-${data.ref}`.replace(/[^\d\w-]/g, '-');
    }

    pipelineStatusToState(status) {
        if (status === 'pending') {
            return 'info';
        }

        if (status === 'running') {
            return 'warning';
        }

        if (status === 'failed') {
            return 'error';
        }

        return 'success';
    }

    buildStatusToState(status) {
        if (status === 'pending') {
            return 'info';
        }

        if (status === 'running') {
            return 'warning';
        }

        if (status === 'failed') {
            return 'error';
        }

        return 'success';
    }
}

module.exports = new StatusAdapterGitLab();
