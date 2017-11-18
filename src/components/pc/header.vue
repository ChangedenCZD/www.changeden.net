<template>
    <section class="headerLayout w100 bg-white shadow-bottom">
        <div class="navigationBarLayout w100 bg-white">
            <div class="navigationBar w c-h">
                <div class="navigationIcon">
                    <img class="icon" src="../../assets/img/icon_bunny_large.png"/>
                    <span class="name">兔子人开源</span>
                </div>
                <div class="navigationArea">
                    <ul>
                        <li v-for="item in navigation" class="clickable">
                            <a :href="item.href"
                               :class="[isActive(item)]">{{item.title}}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="expansionLayout w100">
        </div>
    </section>
</template>
<script>
    import navigation from '../../resource/navigation.json';
    import {} from '../../../utils/web/Components';
    import {} from '../../../utils/web/Utils';
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
            this.$nextTick(() => {
                if (this.$el.querySelector('.expansionLayout').offsetHeight === 0) {
                    this.$el.querySelector('.navigationBarLayout').classList.add('shadow-bottom');
                }
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
                    this.currentPath = this.$route.path;
                    if (this.currentPath === '/') {
                        this.currentPath = '/index.html';
                    }
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
        li,
        li a {
            display: inline-block;
            text-align: center;
        }

        li a {
            padding: 0 24px;
            font: normal 14px/44px "Microsoft Yahei";
            border-top: 2px solid transparent;
            border-bottom: 2px solid transparent;
            color: rgba(0, 0, 0, .7);
        }

        li a.active {
            font-weight: bold;
            border-bottom-color: $borderColor;
        }
    }

    .navigationIcon {
        float: left;
        padding: 0 24px;
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
        float: right;
    }
</style>