<template>
    <section class="headerLayout h100 w100 bunny-bg global-layout c-white shadow-bottom">
        <section class="headerBarLayout w100">
            <section class="headerWebSiteInfo">
                <img class="headerIcon" src="../../assets/img/icon_bunny_middle_white.png"/>
                <span class="headerName">兔子人网</span>
            </section>
            <ul class="headerMenu">
                <li class="headerMenuItem" v-for="(item,index) in firstList"
                    @click="onMenuClick(index)"
                    :data-index="index"
                    v-on:mouseenter="headerMenuMouseenter"
                    v-on:mouseleave="headerMenuMouseleave"
                    :class="[pathname===item.href?'currentPage':'']">
                    {{item.title}}
                </li>
            </ul>
            <section class="headerMoreMenu" v-if="secondList.length>0"
                     v-on:mouseenter="headerMoreMenuMouseenter"
                     v-on:mouseleave="headerMoreMenuMouseleave">
                <span></span>
                <span></span>
                <span></span>
            </section>
        </section>
        <section class="headerSecondMenuLayout bunny-bg shadow" v-show="isShowSecondMenu"
                 v-on:mouseenter="headerMoreMenuMouseenter"
                 v-on:mouseleave="headerMoreMenuMouseleave">
            <ul class="headerSecondMenu">
                <li class="headerSecondMenuItem" v-for="(item,index) in secondList"
                    @click="onSecondMenuClick(index)"
                    :class="[pathname===item.href?'currentPage':'']">
                    {{item.title}}
                </li>
            </ul>
        </section>
        <section class="headerPopMenuLayout bunny-bg shadow" v-show="isShowPopMenu"
                 :style="{left:popMenuLeft,right:popMenuRight}"
                 :data-index="currentPopIndex"
                 v-on:mouseenter="headerMenuMouseenter"
                 v-on:mouseleave="headerMenuMouseleave">
            <ul class="headerPopMenu">
                <li class="headerPopMenuItem" v-for="(item,index) in currentPopMenu">
                    {{item.title}}
                </li>
            </ul>
        </section>
    </section>
</template>
<script>
    import { mapActions, mapGetters } from 'vuex';
    import * as BrowserUtils from '../../utils/BrowserUtils';

    export default {
        props: [],
        data () {
            return {
                list: [
                    {title: '主页', href: '/index.html'},
                    {title: '开源项目', href: '', menu: [{title: 'Bunny开源项目'}]},
                    {title: '广告推广', href: '/advertisement.html'},
                    {title: '关于', href: '/about.html'},
                    {title: '联系', href: '/contact.html'},
                    {title: '捐赠', href: '/donate.html'},
                    {title: '登录', href: '/login.html'}
                ],
                firstList: [],
                secondList: [],
                isShowMenu: {},
                isShowSecondMenu: false,
                isShowPopMenu: false,
                currentPopIndex: 0,
                currentPopMenu: [],
                popMenuLeft: '',
                popMenuRight: ''
            };
        },
        created () {
            this.fixHeaderWidth();
        },
        updated () {
        },
        watch: {
            bodyWidth () {
                this.fixHeaderWidth();
            }
        },
        methods: {
            ...mapActions([]),
            headerMenuMouseenter (e) {
                let index = this.currentPopIndex = e.target.dataset.index;
                let item = this.list[index];
                let popList = this.currentPopMenu = item.menu || [];
                if (popList.length > 0) {
                    this.isShowPopMenu = true;
                    this.$nextTick(() => {
                        let target = this.$el.querySelectorAll('.headerMenuItem')[index];
                        this.popMenuLeft = '';
                        this.popMenuRight = '0px';
                        if (target) {
                            let popLayoutWidth = this.$el.querySelector('.headerPopMenuLayout').offsetWidth;
                            let popMenuLeft = parseInt(target.offsetLeft + (target.offsetWidth - popLayoutWidth) / 2);
                            if ((popMenuLeft + popLayoutWidth) < this.bodyWidth) {
                                this.popMenuLeft = popMenuLeft + 'px';
                                this.popMenuRight = '';
                            }
                        }
                    });
                }
            },
            headerMenuMouseleave (e) {
                this.isShowPopMenu = false;
            },
            headerMoreMenuMouseenter (e) {
                this.isShowSecondMenu = true;
            },
            headerMoreMenuMouseleave (e) {
                this.isShowSecondMenu = false;
            },
            onMenuClick (index) {
                let item = this.list[index];
                let href = item.href;
                let menu = item.menu;
                if (href) {
                    BrowserUtils.to(href);
                } else if (menu) {
                    this.isShowMenu.index = !this.isShowMenu.index;
                }
            },
            onSecondMenuClick (index) {
                this.headerMoreMenuMouseleave();
                let item = this.secondList[index];
                let href = item.href;
                let menu = item.menu;
                if (href) {
                    BrowserUtils.to(href);
                } else if (menu) {
                    this.headerMenuMouseenter({
                        target: {
                            dataset: {
                                index: this.firstList.length + index
                            }
                        }
                    });
                }
            },
            fixHeaderWidth () {
                this.$nextTick(() => {
                    let headerWebSiteInfoWidth = this.headerWebSiteInfoWidth;
                    let headerMenuWidth = this.headerMenuWidth;
                    let headerRealWidth = headerWebSiteInfoWidth + headerMenuWidth;
                    let isOverflow = headerRealWidth > this.bodyWidth;
                    if (isOverflow) {
                        let offset = this.list.length - 1 - (headerRealWidth - this.bodyWidth + this.headerMoreMenuWidth * 1.8) / 80;
                        let firstList = [];
                        let secondList = [];
                        this.list.forEach((item, index) => {
                            if (index > offset) {
                                secondList.push(item);
                            } else {
                                firstList.push(item);
                            }
                        });
                        this.$nextTick(() => {
                            this.firstList = firstList;
                            this.secondList = secondList;
                        });
                    } else {
                        this.$nextTick(() => {
                            this.firstList = this.list;
                            this.secondList = [];
                        });
                    }
                });
            }
        },
        computed: {
            ...mapGetters({
                bodyWidth: 'bodyWidth'
            }),
            headerMoreMenuWidth () {
                let el = this.$el && this.$el.querySelector('.headerMoreMenu');
                return el && el.offsetWidth || 0;
            },
            headerWebSiteInfoWidth () {
                return this.$el && this.$el.querySelector('.headerWebSiteInfo').offsetWidth || 0;
            },
            headerMenuWidth () {
                return 80 * this.list.length;
            },
            pathname () {
                return window.location.pathname;
            }
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
        z-index: 990;
    }

    .headerWebSiteInfo {
        float: left;
        padding: $s10;
        cursor: pointer;
        opacity: 0;
    }

    .headerLayout .headerIcon {
        float: left;
        width: $s40;
        height: $s40;
        margin-right: $s10;
    }

    .headerLayout .headerName {
        float: left;
        height: $s40;
        line-height: $s40;
        font-size: rem(24px);
    }

    .headerMenu {
    }

    .headerMenuItem {
        float: left;
        display: inline-block;
        cursor: pointer;
        height: $s60;
        line-height: $s60;
        text-align: center;
        width: 80px;
    }

    .headerMoreMenu {
        position: absolute;
        right: 0;
        top: 0;
        width: $s60;
        height: $s60;
        cursor: pointer;
        padding-top: rem(10px);
    }

    .headerMoreMenu span {
        display: block;
        height: rem(4px);
        width: 60%;
        margin: rem(7px) 20% 0;
        background-color: white;
    }

    .headerSecondMenuLayout {
        position: absolute;
        right: 0;
        top: $s60;
    }

    .headerSecondMenuItem {
        padding: rem(14px) $s60;
        cursor: pointer;
    }

    .headerPopMenuLayout {
        position: absolute;
        top: $s60;
        font-size: rem(20px);
    }

    .headerPopMenuItem {
        padding: rem(14px) $s60;
        cursor: pointer;
    }

    /***/
    .headerMenuItem:hover,
    .headerMoreMenu:hover,
    .headerSecondMenuItem:hover,
    .headerLayout .currentPage {
        background: #e44f20;
    }

    .headerPopMenuItem:hover {
        background: #f94d1f;
    }
</style>