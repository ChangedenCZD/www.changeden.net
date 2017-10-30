<template>
    <section class="wrap h100 w100 bg-default">
        <HeaderLayout></HeaderLayout>
        <section class="w100 c-h pdt5 pdb10" :style="{minHeight:minHeight+'px'}">
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
        <FooterLayout></FooterLayout>
    </section>
</template>
<script>
    import websites from '../../../resource/website.json';
    import HeaderLayout from '../../../components/m/header.vue';
    import FooterLayout from '../../../components/m/footer.vue';
    import { BrowserUtils } from '../../../../utils/web/Utils';
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

    .group {
        margin: 8px 6px 0;
        p {
            font-size: 15px;
        }
        .item {
            display: inline-block;
            width: 30.6%;
            line-height: 1.4rem;
            margin: $s10 0 $s10 2%;
            text-align: center;
            font-size: 13px;
            a {
                display: block;
            }
        }
    }

</style>