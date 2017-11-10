<template>
    <section class="headerLayout w100">
        <div class="navigationBarLayout w100">
            <div class="navigationBar w100 c-h bg-white shadow-bottom">
                <div class="navigationIcon">
                    <img class="icon" src="../../assets/img/icon_bunny_large.png"/>
                    <span class="name">兔子人网</span>
                </div>
                <div class="navigationMore">
                    <div class="more clickable" @click="toggleMenu">
                        <img :src="icons.more"/>
                    </div>
                    <span class="path">{{title}}</span>
                </div>
            </div>
            <div class="navigationArea" v-show="isShowMenu" @click.self="toggleMenu" :style="{height:bodyHeight+'px'}">
                <ul class="menuList shadow">
                    <li v-for="item in navigation" class="clickable" v-if="!isActive(item)">
                        <a :href="'/m'+item.href">{{item.title}}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="expansionLayout w100">
        </div>
    </section>
</template>
<script>
    import navigation from '../../resource/navigation.json';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {
                navigation,
                currentPath: '',
                icons: {
                    more: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABnklEQVR4Xu2aTU7DQAyFn8PPlt6A6U3gBBQJJJZwMlgiYJGeAG7S4QZlSyBGSZEgIaCpqtoheVlGk4795nmc+VLByC8Zef6gAHTAyBVgCYzcANwEWQIsAScF9CIEvOOwnn4Hz3Ibo0co5iWgszDRfVwDMmsmrLm84kryuLQUwlSAOvk9LCAy6UxSdSkFppYimApQnoccIid/r7Dm2V08tXKBmQBVzWspi5TEJNOp1Z5gJ8BZONJMHpMEKPVYHuJTythNx1CATRVMfX70JVAJlbQJqs6z+9hqkakyrz/OrASq0FZtUCIEB91tEC9SaBhsG/wSATc/2qHqXApcWiZfxWPqgO+rXr8KvyHU93YRrdpe23luAqxfrdt5ggJsR9f/86t0gNdakQeQB3R4jzygflUiDyAPIA8YIhAZOxIjDyAPWPX9z28D5AHkAV6HkNa8PA32ZCHcwqADvKQnDyAPIA/4pfrIA0AeQB5AHjC8v8iQB5AHkAc0+j55gNchhDygqQCPwz1xolsYdICb9D2ZmA7oyUK4hUEHuEnfk4k/AHbcIFCgWJFyAAAAAElFTkSuQmCC'
                },
                isShowMenu: false,
                bodyHeight: 'auto'
            };
        },
        created () {
            this.$nextTick(() => {
                if (this.$el.querySelector('.expansionLayout').offsetHeight === 0) {
                    this.$el.querySelector('.navigationBarLayout').classList.add('shadow-bottom');
                }
                this.bodyHeight = window.document.documentElement.clientHeight;
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
            toggleMenu () {
                this.isShowMenu = !this.isShowMenu;
            },
            isActive (item) {
                return (this.currentPath || this.path) === item.href ? 'active' : '';
            }
        },
        computed: {
            ...mapGetters({
                bodyWidth: 'bodyWidth'
            }),
            path () {
                if (!this.currentPath) {
                    this.currentPath = this.$route.path.replace(/\/m/, '');
                    if (this.currentPath === '/') {
                        this.currentPath = '/index.html';
                    }
                }
                return this.currentPath;
            },
            title () {
                let title = '';
                let self = this;
                self.navigation.forEach((item) => {
                    if (self.path === item.href) {
                        title = item.title;
                    }
                });
                if (!title) {
                    console.log(self.path);
                    switch (self.path) {
                    case '/alibaba/taobaoke.html':
                        title = '淘宝客';
                        break;
                    case '/alibaba/juhuasuan.html':
                        title = '聚划算';
                        break;
                    }
                }
                return title;
            }
        },
        components: {}
    };
</script>
<style lang="scss" scoped>
    @import '../../scss/default.scss';
    @import '../../assets/css/common/material-design.css';

    $borderColor: rgba(82, 82, 82, 0.5);
    .headerLayout {
        position: static;
        top: 0;
        z-index: 10001;
    }

    .navigationBarLayout {
        position: fixed;
        top: 0;
        transform: translateZ(0);
        z-index: 10002;
    }

    .expansionLayout {
        margin-top: 0;
    }

    .navigationBar {
        height: 48px;
        .navigationMore {
            float: right;
            height: 48px;
            .path {
                float: right;
                display: table-cell;
                font: normal 16px/48px "Microsoft Yahei";
                padding-right: 12px;
            }
            .more {
                float: right;
                width: 48px;
                height: 48px;
                padding: 9px;
                border-left: $borderStyle;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }

    .navigationIcon {
        float: left;
        padding: 0 12px;
        .icon {
            float: left;
            width: 30px;
            height: 30px;
            margin: 9px 10px 9px 0;
        }

        .name {
            float: left;
            font: normal 18px/48px "Microsoft Yahei";
            font-weight: bold;
        }
    }

    .navigationArea {
        position: fixed;
        left: 0;
        top: 0;
        padding-top: 42px;
        height: 100%;
        width: 100%;
        .menuList {
            width: 30%;
            float: right;
            margin: 6px;
            li,
            li a {
                text-align: center;
            }

            li a {
                padding: 0 24px;
                font: normal 14px/44px "Microsoft Yahei";
                color: rgba(0, 0, 0, .7);
            }
        }
    }
</style>