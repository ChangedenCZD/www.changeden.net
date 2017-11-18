<template>
    <section class="footerLayout w100">
        <section class="footerArea w">
            <div class="infoLayout">
                <h3>
                    <img src="../../assets/img/icon_bunny_large.png"/>
                    <span>兔子人开源</span>
                </h3>
                <p class="mgt10">
                    <span>兔子人开源网致力于打造成为多种编程语言的开源网站。</span>
                </p>
                <p>
                    <span>站内提供大量与互联网、科学、教育相关的内容。大家能从中了解到更多新的知识。所有的信息皆开源，请勿擅自用于商业运作。</span>
                </p>
                <p class="mgt10">
                    <span>转载内容版权归作者及来源网站所有，本站原创内容转载请注明来源，商业媒体及纸媒请先联系本站。</span>
                </p>
            </div>
            <div class="linkLayout">
                <h3>友情链接</h3>
                <ul>
                    <li class="item" v-for="item in list">
                        <a :href="item.href" target="_blank">{{item.title}}</a>
                    </li>
                </ul>
            </div>
        </section>
        <div class="icpInfoLayout mg10">
            <span class="pdr20">邮箱：changeden520@gmail.com</span>
            <span class="pdr20">Q群：618839726</span>
            <span class="pdr20">© 2016 兔子人开源</span>
            <a href="http://www.miitbeian.gov.cn/" target="_blank"><span>粤ICP备16095614号</span></a>
        </div>
    </section>
</template>
<script>
    import {} from '../../../utils/web/Components';
    import {} from '../../../utils/web/Utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {
                list: [
                    {
                        title: '阿里云',
                        href: 'https://cn.aliyun.com'
                    },
                    {
                        title: '腾讯云',
                        href: 'https://cloud.tencent.com'
                    },
                    {
                        title: '百度云',
                        href: 'https://cloud.baidu.com'
                    },
                    {
                        title: 'iconfont(图标字体)',
                        href: 'http://www.iconfont.cn'
                    },
                    {
                        title: 'Github(代码仓库)',
                        href: 'https://github.com'
                    },
                    {
                        title: 'tinypng(图片压缩)',
                        href: 'https://tinypng.com'
                    },
                    {
                        title: 'Vue.js(前端框架)',
                        href: 'https://cn.vuejs.org'
                    },
                    {
                        title: '360导航',
                        href: 'http://hao.360.cn/'
                    },
                    {
                        title: '360安全浏览器',
                        href: 'http://se.360.cn/'
                    },
                    {
                        title: '有道词典',
                        href: 'http://youdao.com'
                    },
                    {
                        title: '今日头条',
                        href: 'https://www.toutiao.com'
                    },
                    {
                        title: '极客导航',
                        href: 'http://www.jikedaohang.com'
                    },
                    {
                        title: '＋更多',
                        href: '/about.html'
                    }
                ]
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
            ...mapActions([])
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
    @import '../../scss/default.scss';
    @import '../../assets/css/common/material-design.css';

    .footerArea {
        margin: 2rem auto;
        h3 {
            line-height: 40px;
            height: 50px;
            padding: 5px 0;
        }
        .infoLayout,
        .linkLayout {
            display: inline-block;
            padding: 0 24px;
        }

        .infoLayout {
            width: 55%;
            font-size: 13px;
            h3 {
                font-size: 0.7rem;
                img {
                    float: left;
                    width: 30px;
                    height: 30px;
                    margin: 9px 10px 9px 0;
                }
                span {
                    float: left;
                    font: normal 18px/48px "Microsoft Yahei";
                    font-weight: bold;
                }
            }
        }

        .linkLayout {
            width: 40%;
            float: right;
            font-size: 13px;
            h3 {
                font-size: 0.7rem;
            }
            .item {
                display: inline-block;
                margin: 10px 20px 0 0;
            }
        }
    }

    .icpInfoLayout {
        text-align: center;
        font-size: 13px;
    }
</style>