<template>
    <section class="wrap h100 w100 bg-default">
        <NavigationBar></NavigationBar>
        <section class="body h100 w100">
            <section class="h100 w100 overScroll">
                <section class="mg20">
                    <p>注：以下内容由<a style="color: blue;" href="http://www.jikedaohang.com" target="_blank">极客导航网</a>整理</p>
                    <ul>
                        <li class="group mgt20 shadow bg-white" v-for="group in websites">
                            <p class="text-white pdl10 pdr10 pdt5 pdb5" :style="{'background-color':group.bgColor}">
                                <strong>{{group.title}}</strong>
                            </p>
                            <ul>
                                <li class="item clickable shadow" v-for="item in group.list"><a :href="item.href"
                                                                                                target="_blank">{{item.title}}</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </section>
            </section>
        </section>
    </section>
</template>
<script>
    import websites from '../../resource/website.json';
    import { NavigationBar } from '../../../utils/web/Components';
    import { BrowserUtils } from '../../../utils/web/Utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {
                websites
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
            ...mapActions([]),
            open (url) {
                BrowserUtils.open(url);
            }
        },
        computed: {
            ...mapGetters({
                bodyWidth: 'bodyWidth'
            })
        },
        components: {
            NavigationBar
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
        font-size: .6rem;
        font-size: 0.6rem;
    }

    .group {
        max-width: 770px;
    }

    .item {
        display: inline-block;
        width: 15.9%;
        line-height: 1.4rem;
        margin: $s10 2%;
        text-align: center;
    }

    .item a {
        display: block;
    }
</style>