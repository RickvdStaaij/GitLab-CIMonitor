<template>
    <div>
        <h1>Dashboard</h1>
        <div v-for="(status, index) in statuses" :key="index">
            <hr>
            <h3>{{ status.key }}</h3>
            <p>{{ status.state }}</p>
        </div>
    </div>
</template>

<script>
import socketEvents from '../../shared/socketEvents';

export default {
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
h1
    color: $color-error
</style>
