<template>
    <section class="wrap h100 w100 bg-default">
        <HeaderLayout></HeaderLayout>
        <section class="w100 c-h pdt5" :style="{minHeight:minHeight+'px'}">
            <ul v-for="item in projectList">
                <li class="article-item shadow mg10 bg-white">
                    <div class="article-item-content">
                        <h2>
                            <a :href="item.href" target="_blank">{{item.title}}</a>
                        </h2>
                        <p class="mgt10">
                            <span class="pdr20"><em style="background-color: #0366D6;"></em>作者：{{item.author}}</span>
                        </p>
                        <p class="mgt10 text-gray">
                            <span>{{item.create_at}}</span>
                        </p>
                    </div>
                    <a class="article-item-footer clickable" :href="item.href" target="_blank">查看详情</a>
                </li>
            </ul>
        </section>
        <FooterLayout></FooterLayout>
    </section>
</template>
<script>
    import projectList from '../../../resource/bunny_project.json';
    import HeaderLayout from '../../../components/m/header.vue';
    import FooterLayout from '../../../components/m/footer.vue';
    import { BrowserUtils } from '../../../../utils/web/Utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {
                projectList
            };
        },
        created () {
        },
        updated () {
        },
        watch: {
            bodyWidth () {
            }
        },
        methods: {
            ...mapActions(['showToast', 'toggleLoading']),
            open (url) {
                BrowserUtils.open(url);
            }
        },
        computed: {
            ...mapGetters({
                bodyWidth: 'bodyWidth',
                minHeight: 'minHeight'
            })
        },
        components: {
            HeaderLayout,
            FooterLayout
        }
    };
</script>
<style lang="scss" scoped>
    @import '../../../scss/default.scss';
    @import '../../../assets/css/common/material-design.css';

    .wrap {
        margin-top: 49px;
    }

    .article-item {
    }

    .article-item-content,
    .article-item-footer {
        padding: 12px;
        border-bottom: $borderStyle;
        display: block;
    }

    .article-item-content {
        h2 {
            padding: 5px 0;
            a {
                line-height: 30px;
            }
        }
        em {
            width: 7px;
            height: 7px;
            margin-right: 7px;
            display: inline-block;
            border-radius: 50%;
        }
    }

    .article-item-footer {
        font-size: 12px;
        padding: 6px 12px;
    }
</style>