<template>
    <section class="wrap h100 w100 bg-default">
        <HeaderLayout></HeaderLayout>
        <section class="w c-h pdt5">
            <ul>
                <li class="group shadow bg-white" v-for="group in websites">
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
</template>
<script>
    import websites from '../../resource/website.json';
    import { HeaderLayout } from '../../../utils/web/Components';
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
            ...mapActions([])
        },
        computed: {
            ...mapGetters({
                bodyWidth: 'bodyWidth'
            })
        },
        components: {
            HeaderLayout
        }
    };
</script>
<style lang="scss" scoped>
    @import '../../scss/default.scss';
    @import '../../assets/css/common/material-design.css';

    .wrap {
        margin-top: 49px;
    }

    .group {
        max-width: 800px;
        margin: $s20 auto 0;
    }

    .item {
        display: inline-block;
        width: 17.6%;
        line-height: 1.4rem;
        margin: $s10 0 $s10 2%;
        text-align: center;
    }

    .item a {
        display: block;
    }
</style>