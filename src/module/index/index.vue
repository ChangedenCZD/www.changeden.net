<template>
    <section class="indexPageLayout h100 w100 bg-default global-layout">
        <PcHeader></PcHeader>
        <section class="bodyLayout">
            <marquee class="noticeLayout w100" v-if="noticeList.length>0">
                <a class="noticeItem" href="javascript:" @click="open(item.href)"
                   v-for="(item,idx) in noticeList">{{item.message}}</a>
            </marquee>
            <section class="articleLayout overscroll w100 h100">
                <ul>
                    <!--动态-->
                    <li class="card mgt5" v-for="(item,idx) in articleList">
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
        </section>
        <LoadingLayout></LoadingLayout>
        <ToastLayout></ToastLayout>
    </section>
</template>
<script>
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
                articleLength: 20
            };
        },
        created () {
            this.getData();
        },
        watch: {},
        methods: {
            ...mapActions(['showToast', 'toggleLoading']),
            getData () {
                this.getNotice();
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
</style>