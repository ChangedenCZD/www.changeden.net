<template>
    <section class="h100 w100 bg-default global-layout">
        <PcHeader></PcHeader>
        <section class="openLayout w100 h100">
            <ul class="operationLayout h100 overscroll bg-w shadow">
                <li class="operationItem shadow mgt5" v-for="(item,index) in operationList">
                    <div class="baseLayout clickable" @click="onBaseLayoutClick(index)">
                        <span class="title h100">{{item.title}}</span>
                        <img class="icon" :class="[isShowMenu[index]?'t270':'t0']" :src="icons.more" v-if="item.menu&&item.menu.length>0"/>
                    </div>
                    <ul class="menuLayout" v-show="isShowMenu[index]"
                        v-if="item.menu&&item.menu.length>0">
                        <li class="menuItem clickable" v-for="(item2,index2) in item.menu">
                            <span class="title h100">{{item2.title}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </section>
    </section>
</template>
<script>
    import icons from '../../resource/icon.json';
    import { PcHeader } from '../../../utils/web/Components';
    import { co, Apis } from '../../../utils/web/Utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {
                icons,
                operationList: [
                    {
                        title: '权限管理',
                        menu: [
                            {
                                title: '权限列表',
                                url: '/permission/list.html'
                            },
                            {
                                title: '用户权限',
                                url: '/permission/user.html'
                            }]
                    },
                    {
                        title: '文章管理',
                        menu: [
                            {
                                title: '文章发布',
                                url: '/article/publish.html'
                            },
                            {
                                title: '文章列表',
                                url: '/article/list.html'
                            }]
                    },
                    {
                        title: '广告管理',
                        menu: [
                            {
                                title: '广告发布',
                                url: '/advertisement/publish.html'
                            },
                            {
                                title: '广告列表',
                                url: '/advertisement/list.html'
                            }]
                    }
                ],
                isShowMenu: {}
            };
        },
        created () {
            this.checkToken();
        },
        updated () {
        },
        watch: {
            bodyWidth () {
            }
        },
        methods: {
            ...mapActions([]),
            checkToken () {
                console.log('checkToken');
            },
            onBaseLayoutClick (index) {
                let before = !!this.isShowMenu[index];
                for (let key in this.isShowMenu) {
                    this.isShowMenu[key] = false;
                }
                this.isShowMenu[index] = !before;
                this.operationList = JSON.parse(JSON.stringify(this.operationList));
                console.log(this.isShowMenu);
            }
        },
        computed: {
            ...mapGetters({
                bodyWidth: 'bodyWidth'
            })
        },
        components: {PcHeader}
    };
</script>
<style lang="scss" scoped>
    @import '../../scss/default.scss';
    @import '../../assets/css/common/material-design.css';

    .openLayout {
        position: absolute;
        left: 0;
        top: 0;
        padding-top: $s60;
    }

    .operationLayout {
        width: rem(160px);
        text-align: center;
        font-size: rem(18px);
    }

    .operationItem {
        position: relative;
    }

    .baseLayout, .menuItem {
        position: relative;
        height: $s60;
        line-height: $s60;
        cursor: pointer;
        border-bottom: $borderStyle;
    }

    .operationItem .title {
        position: absolute;
        left: rem(35px);
        top: 0;
    }

    .operationItem .icon {
        position: absolute;
        right: $s10;
        top: $s20;
    }

</style>