<template>
    <section class="wrap h100 w100 bg-default">
        <NavigationBar></NavigationBar>
        <section class="body h100 w100">
            <section class="project h100 w100">
                <ProjectLayout v-for="(item,index) in projectMenuList" :class="[isActive(index)]"
                               :title="item.title"
                               :target="index"
                               :datas="projectList[item.id]"
                               :titleClick="columnChange"
                ></ProjectLayout>
            </section>
        </section>
        <LoadingLayout></LoadingLayout>
        <ToastLayout></ToastLayout>
    </section>
</template>
<script>
    import { NavigationBar, ProjectLayout, LoadingLayout, ToastLayout } from '../../../utils/web/Components';
    import { co, Apis, BrowserUtils, DateUtils } from '../../../utils/web/Utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {
                currentProject: 0,
                projectMenuList: [],
                projectList: {}
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
            isActive (column) {
                return column === this.currentProject ? 'active' : '';
            },
            getMenu () {
                let self = this;
                self.toggleLoading(true);
                co(function* () {
                    let data = yield Apis.getProjectMenu();
                    self.toggleLoading(false);
                    if (data.code === 0) {
                        let projectMenuList = self.projectMenuList = data.result.projectMenuList || [];
                        if (projectMenuList.length > 0) {
                            self.getProject();
                        }
                        self.$nextTick(() => {
                            let columns = self.$el.querySelectorAll('.projectLayout');
                            let parentNode = self.$el.querySelector('.project');
                            let height = parentNode.offsetHeight - (60 / 24) * window.fontSize;
                            let width = Math.min(parentNode.offsetWidth, 600);
                            columns.forEach((item, index) => {
                                item.style.left = (index * 8 + 0.5) + 'rem';
                                item.style.height = height + 'px';
                                item.style.width = width + 'px';
                            });
                        });
                    }
                });
            },
            getProject () {
                let self = this;
                let id = self.projectMenuList[self.currentProject].id;
                if (!self.projectList[id]) {
                    self.toggleLoading(true);
                    co(function* () {
                        let data = yield Apis.getProjectListByMenu(id);
                        self.toggleLoading(false);
                        if (data.code === 0) {
                            self.projectList[id] = data.result.projectList || [];
                        }
                        self.projectMenuList = self.projectMenuList.concat();
                    });
                }
            },
            columnChange (column) {
                this.currentProject = column;
                this.getProject();
            }
        },
        computed: {
            ...mapGetters({
                bodyWidth: 'bodyWidth'
            })
        },
        components: {
            NavigationBar,
            ProjectLayout,
            LoadingLayout,
            ToastLayout
        }
    };
</script>
<style lang="scss" scoped>
    @import '../../scss/default.scss';
    @import '../../assets/css/common/material-design.css';

    .wrap {
        position: relative;
    }

    .body {
        position: absolute;
        left: 0;
        top: 0;
        padding-left: rem(120px);
    }

    .projectLayout {
        position: absolute;
        top: $s70;
        animation: hidden 0.2s linear alternate;
        z-index: 1;
    }

    .projectLayout:hover,
    .projectLayout:active,
    .projectLayout.active {
        top: $s60;
        animation: active 0.2s linear alternate;
    }

    .projectLayout.active {
        z-index: 2;
    }

    @keyframes active {
        0% {
            top: rem(70px);
        }
        25% {
            top: rem(68px);
        }
        50% {
            top: rem(65px);
        }
        75% {
            top: rem(62px);
        }
        100% {
            top: rem(60px);
        }
    }

    @keyframes hidden {
        0% {
            top: rem(60px);
        }
        25% {
            top: rem(62px);
        }
        50% {
            top: rem(65px);
        }
        75% {
            top: rem(68px);
        }
        100% {
            top: rem(70px);
        }
    }
</style>