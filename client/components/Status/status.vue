<template>
    <div class="status" :class="status.state">
        <div class="details">
            <img v-if="status.image" :src="status.image" class="image" />
            <img v-if="status.userImage" :src="status.userImage" class="user-image" />
            <div class="title">{{ status.title }}</div>
            <div class="sub-title">
                <span v-if="status.subTitle">{{ status.subTitle }}</span>
                <span class="time-ago" v-if="now">
                    <i class="far fa-clock"></i> {{ timeAgo }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    props: ['status', 'now'],
    computed: {
        timeAgo() {
            var timeAgo = moment(this.status.time).from(this.now);
            if (timeAgo === 'a few seconds ago' || timeAgo === 'in a few seconds') {
                return 'just now';
            }
            return timeAgo;
        },
    },
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
.status
    background: $color-info
    border-bottom: 5px solid $color-info-dark
    border-top: 2px solid $color-info-light

.details
    padding: 20px
    color: #fff

.title
    font-size: 50px

.sub-title
    font-size: 30px

.time-ago
    padding-left: 20px

.user-image,
.image
    height: 100px
    border-radius: 3px

.user-image
    float: right
    margin-left: 20px
    border-radius: 50%
    background-color: rgba(0, 0, 0, 0.1)

.image
    float: left
    margin-right: 20px

.success
    background: $color-success
    border-bottom: 5px solid $color-success-dark
    border-top: 2px solid $color-success-light

.warning
    background: $color-warning
    border-bottom: 5px solid $color-warning-dark
    border-top: 2px solid $color-warning-light

.error
    background: $color-error
    border-bottom: 5px solid $color-error-dark
    border-top: 2px solid $color-error-light
</style>
