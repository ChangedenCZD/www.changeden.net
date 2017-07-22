<template>
    <section class="childPageHeader h100 w100 bg-default global-layout bg-w shadow-bottom">
        <img class="logo" :src="logo" v-if="logo"/>
        <h2 class="title">{{title}}</h2>
    </section>
</template>
<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: ['title', 'logo'],
        data () {
            return {};
        },
        created () {
        },
        updated () {
        },
        watch: {
            bodyWidth () {
            }
        },
        methods: {
            ...mapActions([])
        },
        computed: {
            ...mapGetters({
                bodyWidth: 'bodyWidth'
            })
        },
        components: {}
    };
</script>
<style lang="scss" scoped>
    @import '../../scss/default.scss';
    @import '../../assets/css/common/material-design.css';

    .childPageHeader {
        height: $s80;
        line-height: $s80;
    }

    .childPageHeader .logo,
    .childPageHeader .title {
        float: left;
    }
    .childPageHeader .logo{
        margin: $s20 rem(15px) $s20 $s20;
        width: $s40;
        height: $s40;
    }
</style>