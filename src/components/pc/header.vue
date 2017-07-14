<template>
    <section class="headerLayout h100 w100 bunny-bg global-layout">
        <img class="headerIcon" src="../../assets/img/icon_bunny_middle_white.png"/>
        <label class="headerName">兔子人网</label>
    </section>
</template>
<script>
    import { mapActions, mapGetters } from 'vuex';
    export default {
        props: [],
        data () {
            return {
                list: [
                    {title: '主页', href: '/index.html'},
                    {title: '开源项目', href: '', menu: []},
                    {title: '广告推广', href: '/advertisement.html'},
                    {title: '关于', href: '/about.html'},
                    {title: '联系', href: '/contact.html'},
                    {title: '捐赠', href: '/donate.html'}
                ]
            };
        },
        created () {},
        watch: {},
        methods: {
            ...mapActions([])
        },
        computed: {
            ...mapGetters({})
        },
        components: {}
    };
</script>
<style lang="scss" scoped>
    @import '../../scss/default.scss';
    @import '../../assets/css/common/material-design.css';

    .headerLayout {
        position: relative;
        height: $s60;
    }

    .headerLayout .headerIcon {
        float: left;
        margin: $s10;
        width: $s40;
        height: $s40;
    }
    .headerLayout .headerName{
        float: left;
        height: $s60;
    }
</style>