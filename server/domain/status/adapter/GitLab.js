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

        // Check if status already exists
        const newStatus = StatusManager.getStatusByKey(key);

        // @todo: Keep the builds if the status already exists

        // @todo: If the pipeline is started, clear the jobs

        // @todo: Update all other details

        Status.createStatus({
            key,
            state: this.statusToState(data.object_attributes.status),
            title: data.project.path_with_namespace,
            subTitle: data.object_attributes.ref,
            image: data.project.avatar_url,
            userImage: data.user.avatar_url,
            stages: [],
            jobs: [],
        });
    }

    processBuildEvent(data) {
        // Not doing anything with the created status
        if (data.build_status === 'created') {
            return;
        }

        const key = this.getKeyFromBuild(data);

        // @todo: Check if the status is for the latest pipeline
        // @todo: Update the job for the status, and re-create the event
    }

    getKeyFromPipeline(data) {
        return `gitlab-${data.project.id}-${data.object_attributes.ref}`.replace(/[^\d\w-]/g, '-');
    }

    getKeyFromBuild(data) {
        return `gitlab-${data.project_id}-${data.ref}`.replace(/[^\d\w-]/g, '-');
    }

    statusToState(status) {
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
