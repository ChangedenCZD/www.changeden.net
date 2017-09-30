<template>
    <section class="projectLayout h100">
        <section class="projectLayoutTitle">
            <section class="o-hidden">
                <h3 class="title shadow" @click="onTitleClick">{{title}}</h3>
            </section>
        </section>
        <section class="layout w100 shadow overScroll">
            <ul>
                <li class="item shadow clickable" v-for="item in list" @click="open(item.href)">
                    <div class="card-content pd20">
                        <h3 class="card-title pdb10">{{item.title}}</h3>
                        <p v-if="item.create_at" class="card-date pdb5">
                            <span>作者：{{item.author}}</span>
                        </p>
                        <p v-if="item.create_at" class="card-date">
                            <span>发布于：{{format(item.create_at)}}</span>
                        </p>
                    </div>
                </li>
            </ul>
        </section>
    </section>
</template>
<script>
    import { co, Apis, BrowserUtils, DateUtils } from '../../utils/web/Utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: ['title', 'datas', 'target', 'titleClick'],
        data () {
            return {
                list: [],
                isShowQrcode: false
            };
        },
        created () {
            this.fixDatas();
        },
        updated () {
        },
        watch: {
            bodyWidth () {
            },
            datas () {
                this.fixDatas();
            }
        },
        methods: {
            ...mapActions([]),
            onTitleClick () {
                this.titleClick && this.titleClick(this.target);
            },
            fixDatas () {
                if (this.datas) {
                    this.list = this.datas || [];
                }
            },
            open (url) {
                BrowserUtils.open(url);
            },
            format (date) {
                return DateUtils.format(date, 'yyyy-mm-dd HH:MM');
            }
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
    @import '../scss/default.scss';
    @import '../assets/css/common/material-design.css';

    .projectLayoutTitle {
        height: $s60;
        position: absolute;
        left: -6px;
        top: rem(-60px);
        z-index: 2;
    }

    .projectLayoutTitle .title {
        height: $s50;
        line-height: $s50;
        background-color: white;
        margin: 6px;
        bottom: -6px;
        width: 7.2rem;
        cursor: pointer;
        text-align: center;
    }

    .layout {
        background-color: white;
        max-height: 100%;
    }

    .item {
        cursor: pointer;
        border-radius: 0.4rem;
        margin: 0.6rem 0.8rem;
    }
</style>