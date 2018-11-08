<template>
    <div class="dashboard">
        <div v-for="(status, index) in statuses" :key="index">
            <hr>
            <h3>{{ status.key }}</h3>
            <p>{{ status.state }}</p>
        </div>
        <tool-bar />
    </div>
</template>

<script>
import socketEvents from '../../shared/socketEvents';
import ToolBar from './ToolBar';

export default {
    components: { ToolBar },
    data: () => {
        return {
            statuses: [],
        };
    },
    sockets: {
        [socketEvents.statusesUpdated](statuses) {
            console.log('New statuses updated event!');
            this.statuses = statuses;
        },
    },
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped>

</style>
