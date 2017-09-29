<template>
    <section class="indexPageLayout h100 w100 bg-default global-layout">
        <PcHeader></PcHeader>
        <section class="bodyLayout">
            <marquee class="noticeLayout w100" v-if="noticeList.length>0">
                <a class="noticeItem" href="javascript:" @click="open(item.href)"
                   v-for="(item,idx) in noticeList">{{item.message}}</a>
            </marquee>
            <section class="articleLayout w100 h100">
                <section class="itArea area h100">
                    <section class="page h100">
                        <section class="title w100 shadow-bottom">
                            <h2>项目表</h2>
                            <div class="menu clickable" @click="toProject"><img :src="icons.menu"/>
                            </div>
                        </section>
                        <ul class="overscroll h100">
                            <!--动态-->
                            <li class="card mgt5 mgl5 mgr5" v-for="(item,idx) in articleList">
                                <div class="card-content pd20">
                                    <h2 class="card-title pdb10">{{item.title}}</h2>
                                    <p class="card-date">
                                        <span>发布于：{{format(item.create_at)}}</span>
                                    </p>
                                </div>
                                <div class="card-button">
                                    <a href="javascript:" @click="open(item.href)" class="w100 pd10 clickable">查看详情</a>
                                </div>
                            </li>
                        </ul>
                    </section>
                    <section class="page h100">
                        <section class="title w100 shadow-bottom">
                            <h2>头条栏</h2>
                            <div class="menu clickable"
                                 v-on:mouseover="isShowToutiaoQrcode=true"
                                 v-on:mouseleave="isShowToutiaoQrcode=false"
                                 @click="open('http://files.changeden.net/images/toutiao_qrcode.jpeg')">
                                <img :src="icons.menu"/></div>
                            <div class="qrcode" v-show="isShowToutiaoQrcode">
                                <img src="http://files.changeden.net/images/toutiao_qrcode.jpeg"/>
                                <p>请使用今日头条客户端扫描</p>
                            </div>
                        </section>
                        <ul class="overscroll h100">
                            <!--头条-->
                            <li class="card mgt5 mgl5 mgr5" v-for="(item,idx) in toutiaoList">
                                <div class="card-content pd20">
                                    <div class="imageArea mgb10" v-if="item.large_image_url">
                                        <img class="image" :src="item.large_image_url"/>
                                    </div>
                                    <div>
                                        <h2 class="card-title pdb10">{{item.title}}</h2>
                                        <p class="card-date">
                                            <span>{{format(item.create_time * 1000)}}</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="card-button">
                                    <a href="javascript:" @click="open(item.article_url)" class="w100 pd10 clickable">查看详情</a>
                                </div>
                            </li>
                        </ul>
                    </section>
                </section>
                <section class="eduArea area h100">
                    <section class="title w100 shadow-bottom">
                        <h2>英语阁</h2>
                        <div class="menu clickable"
                             v-on:mouseover="isShowWechatQrcode=true"
                             v-on:mouseleave="isShowWechatQrcode=false"
                             @click="open('http://files.changeden.net/images/mmexport1506592939050.webp')"><img
                                :src="icons.menu"/></div>
                        <div class="qrcode" v-show="isShowWechatQrcode">
                            <img src="http://files.changeden.net/images/mmexport1506592939050.webp"/>
                            <p>请使用微信客户端扫描</p>
                        </div>
                    </section>
                    <ul class="overscroll h100">
                        <!--公众号-->
                        <li class="card mgt5 mgl5 mgr5" v-for="(item,idx) in wechatList">
                            <div class="card-content pd20">
                                <div class="imageArea mgb10" v-if="item.image">
                                    <img class="image" :src="item.image"/>
                                </div>
                                <div>
                                    <h2 class="card-title pdb10">{{item.title}}</h2>
                                    <p class="card-date">
                                        <span>{{item.desc}}</span>
                                    </p>
                                    <p class="card-date">
                                        <span>发布于：{{item.create}}</span>
                                    </p>
                                </div>
                            </div>
                            <div class="card-button">
                                <a href="javascript:" @click="open(item.href)" class="w100 pd10 clickable">查看详情</a>
                            </div>
                        </li>
                    </ul>
                </section>
            </section>
        </section>
        <LoadingLayout></LoadingLayout>
        <ToastLayout></ToastLayout>
    </section>
</template>
<script>
    import toutiaoList from '../../resource/toutiao.json';
    import wechatList from '../../resource/wechat.json';
    import icons from '../../resource/icon.json';
    import { PcHeader, LoadingLayout, ToastLayout } from '../../../utils/web/Components';
    import { co, Apis, BrowserUtils, DateUtils } from '../../../utils/web/Utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {
                noticeList: [],
                noticeLength: 10,
                articleList: [],
                articleLength: 20,
                toutiaoList,
                wechatList,
                icons,
                isShowToutiaoQrcode: false,
                isShowWechatQrcode: false
            };
        },
        created () {
            this.getData();
        },
        watch: {},
        methods: {
            ...mapActions(['showToast', 'toggleLoading']),
            getData () {
                //                this.getNotice();
                this.getArticle();
            },
            getNotice () {
                let self = this;
                co(function* () {
                    let data = yield Apis.getOfficialNotice(self.noticeLength);
                    if (data.code === 0) {
                        self.noticeList = data.result.noticeList;
                    }
                });
            },
            getArticle () {
                let self = this;
                self.toggleLoading(true);
                co(function* () {
                    let data = yield Apis.getOfficialArticle(self.articleLength);
                    self.toggleLoading(false);
                    if (data.code === 0) {
                        self.articleList = data.result.articleList;
                    }
                });
            },
            open (url) {
                BrowserUtils.open(url);
            },
            format (date) {
                return DateUtils.format(date, 'yyyy-mm-dd HH:MM');
            },
            toProject () {
                BrowserUtils.to('/project.html');
            }
        },
        computed: {
            ...mapGetters({})
        },
        components: {
            PcHeader,
            LoadingLayout,
            ToastLayout
        }
    };
</script>
<style lang="scss" scoped>
    @import '../../scss/default.scss';
    @import '../../assets/css/common/material-design.css';

    .indexPageLayout .bodyLayout {
        padding-top: $s100;
    }

    .indexPageLayout .noticeLayout {
        font-size: rem(16px);
        position: fixed;
        left: 0;
        top: $s60;
        height: $s40;
        line-height: $s40;
    }

    .indexPageLayout .noticeLayout .noticeItem {
        margin-right: $s40;
    }

    .indexPageLayout .articleLayout .card-title {
        font-size: rem(22px);
    }

    .indexPageLayout .articleLayout .card-date {
        font-size: rem(17px);
    }

    .card-button a {
        display: inline-block;
        padding-right: $s20;
        font-size: rem(15px);
    }

    .articleLayout .area {
        float: left;
    }

    .articleLayout .itArea {
        width: 66.6%;
    }

    .articleLayout .eduArea {
        width: 33.3%;
    }

    .articleLayout .page {
        width: 50%;
        float: left;
    }

    .articleLayout .page,
    .articleLayout .eduArea {
        position: relative;
    }

    .articleLayout .imageArea {
        max-width: 100%;
        max-height: 120px;
        text-align: center;
        overflow: hidden;
    }

    .articleLayout .imageArea .image {
        max-width: 80%;
        min-width: 50%;
    }

    .articleLayout .eduArea .imageArea {
        max-height: 160px;
    }

    .articleLayout .title {
        position: absolute;
        left: 0;
        top: 0;
        height: 40px;
        line-height: 40px;
        text-align: center;
        z-index: 2;
        background-color: whitesmoke;
    }

    .articleLayout .overscroll {
        padding-top: 40px;
    }

    .articleLayout .title .menu {
        width: 24px;
        height: 24px;
        position: absolute;
        right: 0;
        top: 0;
        margin: 8px 10px;
        display: table;
        border-radius: 50%;
        cursor: pointer;
        overflow: hidden;
    }

    .articleLayout .title .menu img {
        width: 100%;
        height: 100%;
        display: table-cell;
    }

    .articleLayout .title .qrcode {
        position: absolute;
        right: 0;
        top: 0;
        margin-top: 40px;
        width: 180px;
        height: 180px;
        text-align: center;
        background-color: white;
    }

    .articleLayout .title .qrcode img {
        width: 140px;
        height: 140px;
        margin-top: 10px;
    }

    .articleLayout .title .qrcode p {
        font-size: 12px;
        margin-top: -20px;
    }

    .card {
        max-width: 420px;
        margin: rem(15px) auto;
    }
</style>