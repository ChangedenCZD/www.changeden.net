<template>
    <section class="h100 w100 bg-default global-layout">
        <PcHeader></PcHeader>
        <section class="bodyLayout">
            <ul class="operationLayout h100 overscroll bg-w shadow">
                <li class="operationItem shadow mgb5 mgt5"
                    v-for="(item,index) in projectMenuList">
                    <div class="baseLayout clickable"
                         :class="[currentMenuId===item.id?'selected':'']"
                         @click="onMenuClick(item,index)">
                        <span class="title h100">{{item.title}}</span>
                        <img class="icon" :src="Icons.more"/>
                    </div>
                </li>
            </ul>
            <section class="projectLayout w100 h100 overscroll">
                <ul>
                    <li class="card mgr20 mgl20 mgt10" v-for="(item,idx) in projectList">
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
    import { co, Apis, BrowserUtils, DateUtils, Icons } from '../../../utils/web/Utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {
                Icons,
                currentMenuId: null,
                projectMenuList: [],
                projectList: []
            };
        },
        created () {
            this.getMenu();
        },
        updated () {
        },
        watch: {
            bodyWidth () {
            }
        },
        methods: {
            ...mapActions(['showToast', 'toggleLoading']),
            getMenu () {
                let self = this;
                self.toggleLoading(true);
                co(function* () {
                    let data = yield Apis.getProjectMenu();
                    self.toggleLoading(false);
                    if (data.code === 0) {
                        let projectMenuList = self.projectMenuList = data.result.projectMenuList || [];
                        if (projectMenuList.length > 0) {
                            self.currentMenuId = projectMenuList[0].id;
                            self.getProject();
                        }
                    }
                });
            },
            getProject () {
                let self = this;
                self.toggleLoading(true);
                co(function* () {
                    let data = yield Apis.getProjectListByMenu(self.currentMenuId);
                    self.toggleLoading(false);
                    if (data.code === 0) {
                        self.projectList = data.result.projectList || [];
                    }
                });
            },
            onMenuClick (item, index) {
                this.currentMenuId = item.id;
                this.refreshMenu();
                this.getProject();
            },
            refreshMenu () {
                this.projectMenuList = JSON.parse(JSON.stringify(this.projectMenuList));
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
        components: {PcHeader, LoadingLayout, ToastLayout}
    };
</script>
<style lang="scss" scoped>
    @import '../../scss/default.scss';
    @import '../../assets/css/common/material-design.css';

    .card-title {
        font-size: rem(22px);
    }

    .card-date {
        font-size: rem(17px);
    }

    .card-button a {
        display: inline-block;
        padding-right: $s20;
        font-size: rem(15px);
    }

    .operationLayout {
        width: rem(200px);
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
        position: relative;
        cursor: pointer;
        border-bottom: $borderStyle;
    }

    .operationItem .title {
        position: absolute;
        left: 0;
        top: 0;
        text-align: center;
        width: rem(160px);
    }

    .operationItem .icon {
        position: absolute;
        right: $s10;
        top: $s20;
    }

    .operationItem .selected {
        background-color: wheat;
    }

    .projectLayout {
        position: absolute;
        left: 0;
        top: 0;
        padding-top: $s60;
        padding-left: rem(200px);
    }
</style>