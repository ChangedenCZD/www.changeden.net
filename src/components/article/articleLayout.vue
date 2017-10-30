<template>
    <ul>
        <li class="article-item shadow mg10 bg-white" v-for="item in articleList">
            <div class="article-item-content">
                <h2>
                    <a :href="item.href" target="_blank">{{item.title}}</a>
                </h2>
                <p class="mgt10" v-if="item.desc">
                    <span>{{item.desc}}</span>
                </p>
                <p class="mgt10 text-gray" v-if="item.ref||item.lang">
                            <span v-if="item.ref"
                                  class="pdr20"><em
                                    style="background-color: #0366D6;"></em>来源：{{item.ref === 'source' ? '站内项目' : '站外大牛'}}</span>
                    <span v-if="item.lang" class="pdl20"><em
                            style="background-color: #B07219;"></em>语言：{{item.lang}}</span>
                </p>
                <div class="image mgt10" v-if="item.image">
                    <img :src="item.image"/>
                </div>
                <p class="mgt10 text-gray">
                    <span>{{item.create}}</span>
                </p>
            </div>
            <a class="article-item-footer clickable" :href="item.href" target="_blank">查看详情</a>
        </li>
    </ul>
</template>
<script>
    export default {
        props: ['articleList'],
        data () {
            return {};
        },
        created () {
        },
        updated () {
        },
        watch: {
            bodyWidth () {
            }
        },
        methods: {},
        computed: {},
        components: {}
    };
</script>
<style lang="scss" scoped>
    @import '../../scss/default.scss';
    @import '../../assets/css/common/material-design.css';

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

    .article-item-content {
        h2 {
            padding: 5px 0;
        }
        em {
            width: 7px;
            height: 7px;
            margin-right: 7px;
            display: inline-block;
            border-radius: 50%;
        }
        .image {
            text-align: center;
            img {
                max-width: 100%;
            }
        }
    }

    .article-item-footer {
        font-size: 12px;
        padding: 6px 12px;
    }
</style>