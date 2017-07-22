<template>
    <section class="h100 w100 bg-default global-layout">
        <PcHeader></PcHeader>
        <section class="openLayout w100 h100">
            <ul class="operationLayout h100 overscroll bg-w shadow">
                <li class="operationItem shadow mgt10"
                    v-for="(item,index) in operationList">
                    <div class="baseLayout clickable"
                         :class="[isSelected[index]?'selected':'']"
                         @click="onBaseLayoutClick(index)">
                        <span class="title h100">{{item.title}}</span>
                        <img class="icon" :class="[isShowMenu[index]?'t270':'t0']" :src="icons.more"
                             v-if="item.menu&&item.menu.length>0"/>
                    </div>
                    <ul class="menuLayout"
                        :style="{height: menuLayoutHeight[index]}"
                        v-if="item.menu&&item.menu.length>0">
                        <li class="menuItem clickable"
                            :class="[isSelected[index+'_'+index2]?'selected':'']"
                            v-for="(item2,index2) in item.menu"
                            @click="onMenuClick(item2,index,index2)">
                            <span class="title h100">{{item2.title}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
            <section class="webpageLayout h100 w100">
                <iframe class="webpageArea w100 h100" :src="currentUrl"></iframe>
            </section>
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
                    //                    {
                    //                        title: '权限管理',
                    //                        menu: [
                    //                            {
                    //                                title: '权限列表',
                    //                                url: '/permission/list.html'
                    //                            },
                    //                            {
                    //                                title: '用户权限',
                    //                                url: '/permission/user.html'
                    //                            }]
                    //                    },
                    {
                        title: '文章管理',
                        menu: [
                            {
                                title: '发布',
                                url: '/article/publish.html'
                            },
                            {
                                title: '列表',
                                url: '/article/list.html'
                            }]
                    },
                    {
                        title: '广告管理',
                        menu: [
                            {
                                title: '发布',
                                url: '/advertisement/publish.html'
                            },
                            {
                                title: '列表',
                                url: '/advertisement/list.html'
                            }]
                    }
                ],
                isShowMenu: {},
                isSelected: {},
                menuLayoutHeight: {},
                currentUrl: 'https://www.changeden.net'
            };
        },
        created () {
            let self = this;
            self.checkToken();
            self.operationList.forEach((item, index) => {
                self.menuLayoutHeight[index] = '0px';
            });
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
                    this.menuLayoutHeight[key] = '0px';
                }
                if (this.operationList[index].menu && this.operationList[index].menu.length > 0) {
                    this.isShowMenu[index] = !before;
                    if (!before) {
                        this.menuLayoutHeight[index] = 45 * this.operationList[index].menu.length + 'px';
                    }
                    this.refreshMenu();
                } else {
                    this.onMenuClick(this.operationList[index], index);
                }
            },
            onMenuClick (item, index, index2) {
                this.currentUrl = item.url;
                this.isSelected = {};
                if (index2 || index2 === 0) {
                    this.isSelected[index + '_' + index2] = true;
                } else {
                    this.isSelected[index] = true;
                }
                this.refreshMenu();
            },
            refreshMenu () {
                this.operationList = JSON.parse(JSON.stringify(this.operationList));
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
        padding-top: rem(58px);
    }

    .operationLayout {
        width: rem(160px);
        text-align: center;
        font-size: rem(18px);
        z-index: 2;
        background-color: whitesmoke;
    }

    .operationItem {
        position: relative;
        transition: all 1s;
    }

    .operationItem .baseLayout {
        height: $s60;
        line-height: $s60;
    }

    .operationItem .baseLayout,
    .operationItem .menuItem {
        position: relative;
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

    .menuLayout {
        transition: all 0.35s;
        overflow-y: hidden;
    }

    .operationItem .menuItem {
        height: 45px;
        line-height: 45px;
    }
    .operationItem .menuItem .title{
        position: relative;
        left: inherit;
        top: inherit;
        font-size: rem(17px);
    }
    .webpageLayout {
        position: absolute;
        left: 0;
        top: 0;
        padding-left: rem(160px);
        padding-top: rem(60px);
        z-index: 1;
    }

    .webpageLayout .webpageArea {
        border: none;
    }

    .operationItem .selected {
    }
</style>