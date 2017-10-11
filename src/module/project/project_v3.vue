<template>
    <section class="wrap h100 w100 bg-default">
        <HeaderLayout></HeaderLayout>
        <section class="w c-h pdt5">
            <ul v-for="(menu,index) in projectMenuList">
                <li class="article-item shadow mg10 bg-white" v-for="item in projectList[index]">
                    <div class="article-item-content">
                        <h2>
                            <a :href="item.href" target="_blank">{{item.title}}</a>
                        </h2>
                        <p class="mgt10">
                            <span class="pdr20"><em style="background-color: #0366D6;"></em>作者：{{item.author}}</span>
                            <span class="pdl20"><em style="background-color: #B07219;"></em>项目隶属：{{menu.title}}</span>
                        </p>
                        <p class="mgt10 text-gray">
                            <span>{{format(item.create_at)}}</span>
                        </p>
                    </div>
                    <a class="article-item-footer clickable" :href="item.href" target="_blank">查看详情</a>
                </li>
            </ul>
        </section>
        <LoadingLayout></LoadingLayout>
        <ToastLayout></ToastLayout>
    </section>
</template>
<script>
    import { HeaderLayout, LoadingLayout, ToastLayout } from '../../../utils/web/Components';
    import { co, Apis, BrowserUtils, DateUtils } from '../../../utils/web/Utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {
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
                        self.getProject(self.projectMenuList = data.result.projectMenuList || [], 0);
                    }
                });
            },
            getProject (projectMenuList, index) {
                if (projectMenuList.length > index) {
                    let self = this;
                    let id = projectMenuList[index].id;
                    self.toggleLoading(true);
                    co(function* () {
                        let data = yield Apis.getProjectListByMenu(id);
                        self.toggleLoading(false);
                        if (data.code === 0) {
                            self.projectList.push(data.result.projectList || []);
                        }
                        self.getProject(projectMenuList, index + 1);
                    });
                }
                console.log(this.projectList);
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
        components: {
            HeaderLayout,
            LoadingLayout,
            ToastLayout
        }
    };
</script>
<style lang="scss" scoped>
    @import '../../scss/default.scss';
    @import '../../assets/css/common/material-design.css';

    .wrap {
        margin-top: 49px;
    }

    .article-item {
        max-width: 800px;
        margin: $s10 auto;
    }

    .article-item-content,
    .article-item-footer {
        padding: 12px;
        border-bottom: $borderStyle;
        display: block;
    }

    .article-item-content h2 {
        padding: 5px 0;
    }

    .article-item-content em {
        width: 7px;
        height: 7px;
        margin-right: 7px;
        display: inline-block;
        border-radius: 50%;
    }

    .article-item-footer {
        font-size: 12px;
        padding: 6px 12px;
    }
</style>