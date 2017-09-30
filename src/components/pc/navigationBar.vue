<template>
    <section class="navigationBar h100 bg-default global-layout shadow overScroll text-center">
        <section class="navigationIcon w100 bunny-bg shadow mgb5">
            <img class="icon" src="../../assets/img/icon_bunny_middle_white.png"/>
            <span class="name">兔子人网</span>
        </section>
        <ul>
            <li class="navigationItem"
                :class="[isActive(item)]"
                @click="to(item.href)"
                v-for="item in navigation">
                <strong>{{item.title}}</strong>
            </li>
        </ul>
    </section>
</template>
<script>
    import navigation from '../../resource/navigation.json';
    import {} from '../../../utils/web/Components';
    import { BrowserUtils } from '../../../utils/web/Utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {
                navigation,
                currentPath: ''
            };
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
            ...mapActions([]),
            isActive (item) {
                return (this.currentPath || this.path) === item.href ? 'active' : '';
            },
            to (url) {
                BrowserUtils.to(url);
            }
        },
        computed: {
            ...mapGetters({
                bodyWidth: 'bodyWidth'
            }),
            path () {
                if (!this.currentPath) {
                    this.currentPath = this.$route.path;
                }
                return this.currentPath;
            }
        },
        components: {}
    };
</script>
<style lang="scss" scoped>
    @import '../../scss/default.scss';
    @import '../../assets/css/common/material-design.css';

    .navigationBar {
        background-color: white;
        width: rem(120px);
        z-index: 2;
    }

    .navigationIcon {
        height: $s50;
        line-height: $s50;
        color: white;
        cursor: pointer;
    }

    .navigationIcon .icon {
        float: left;
        width: rem(24px);
        height: rem(24px);
        margin: rem(13px) rem(7px);
    }

    .navigationIcon .name {
        float: left;
        height: $s50;
        line-height: $s50;
        font-size: rem(18px);
    }

    .navigationItem {
        height: $s50;
        line-height: $s50;
        cursor: pointer;
    }

    .navigationItem:hover {
        background-color: whitesmoke;
    }

    .navigationItem:active,
    .navigationItem.active {
        background-color: #ededed;
    }
</style>