<template>
    <section class="columnLayout h100">
        <section class="columnLayoutTitle">
            <section class="o-hidden">
                <h3 class="title shadow"><span class="pdl20 pdr20" @click="onTitleClick">{{title}}</span><img
                        :src="icons.menu"
                        v-on:mouseover="isShowQrcode=true"
                        v-on:mouseleave="isShowQrcode=false"
                        @click="open(qrcode)"/></h3>
            </section>
            <section class="qrcode shadow" v-show="isShowQrcode">
                <img class="w100 h100" :src="qrcode"/>
            </section>
        </section>
        <section class="layout h100 w100 shadow overScroll">
            <ul>
                <li class="item mg10 shadow clickable" v-for="item in list" @click="open(item.href)">
                    <div class="card-content pd20">
                        <div class="imageArea mgb10" v-if="item.image">
                            <img class="image" :src="item.image"/>
                        </div>
                        <div>
                            <h3 class="card-title pdb10">{{item.title}}</h3>
                            <p v-if="item.desc" class="card-date pdb5">
                                <span>{{item.desc}}</span>
                            </p>
                            <p v-if="item.ref||item.lang" class="card-date pdb5">
                                <span v-if="item.ref"
                                      class="pdr20">代码来源：{{item.ref === 'source' ? '本站原创' : '大牛分支'}}</span>
                                <span v-if="item.lang" class="pdl20">代码语言：{{item.lang}}</span>
                            </p>
                            <p v-if="item.create" class="card-date">
                                <span>发布于：{{item.create}}</span>
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
    </section>
</template>
<script>
    import icons from '../resource/icon.json';
    import { BrowserUtils } from '../../utils/web/Utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: ['title', 'datas', 'qrcode', 'target', 'titleClick'],
        data () {
            return {
                list: [],
                icons,
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
                    let json = require('../resource/' + this.datas);
                    this.list = json || [];
                }
            },
            open (url) {
                BrowserUtils.open(url);
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

    .columnLayoutTitle {
        height: $s60;
        position: absolute;
        left: -6px;
        top: rem(-60px);
        z-index: 2;
    }

    .columnLayoutTitle .title {
        height: $s50;
        line-height: $s50;
        background-color: white;
        margin: 6px;
        bottom: -6px;
        width: 7.2rem;
    }

    .columnLayoutTitle .title span {
        cursor: pointer;
        display: inline-block;
    }

    .columnLayoutTitle .title img {
        height: rem(24px);
        width: rem(24px);
        position: absolute;
        right: 0;
        top: 0;
        margin-top: rem(13px);
        margin-right: rem(13px);
        cursor: pointer;
    }

    .qrcode {
        position: absolute;
        right: 0;
        top: $s60;
        width: 140px;
        height: 140px;
        background-color: white;
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

    .imageArea {
        max-width: 100%;
        text-align: center;
        overflow: hidden;
        border-bottom: $borderStyle;
    }

    .imageArea .image {
        max-width: 60%;
    }
</style>