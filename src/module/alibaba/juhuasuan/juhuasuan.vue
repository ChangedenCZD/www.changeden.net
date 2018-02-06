<template>
    <section class="wrap h100 w100 bg-default">
        <HeaderLayout></HeaderLayout>
        <section class="w c-h pdt5" :style="{minHeight:minHeight+'px'}">
            <ul class="product-list-wrap">
                <li class="product-item shadow bg-white" v-for="item in jhsList"
                    :style="{width:productWidth+'px'}">
                    <a :href="item.pc_url" target="_blank" :title="item.title">
                        <img :src="item.pic_url_for_p_c"/>
                        <p class="product-item-title one-line">
                            <span>{{item.title}}</span>
                        </p>
                        <p class="product-item-price text-orange">
                            <span>￥{{item.act_price}}</span>
                        </p>
                        <p class="product-item-end-time text-gray">
                            <span>结束时间：{{format(item.show_end_time)}}</span>
                        </p>
                    </a>
                </li>
            </ul>
        </section>
        <FooterLayout></FooterLayout>
        <AdsLayout></AdsLayout>
    </section>
</template>
<script>
    import jhsList from '../../../resource/jhs.json';
    import { HeaderLayout, FooterLayout, AdsLayout } from '../../../../utils/web/Components';
    import { DateUtils } from '../../../../utils/web/Utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {
                jhsList,
                productWidth: 'auto'
            };
        },
        created () {
            this.$nextTick(() => {
                let parent = this.$el.querySelector('.product-list-wrap');
                if (parent) {
                    let maxWidth = parent.offsetWidth;
                    let length = Math.min(jhsList.length, 4);
                    this.productWidth = (maxWidth - (length + 1) * 10) / length;
                }
            });
        },
        updated () {
        },
        watch: {
            bodyWidth () {
            }
        },
        methods: {
            ...mapActions(['showToast', 'toggleLoading']),
            format (time) {
                return DateUtils.format(time, 'yyyy-mm-dd HH:MM:ss');
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
            FooterLayout,
            AdsLayout
        }
    };
</script>
<style lang="scss" scoped>
    @import '../../../scss/default';
    @import '../../../assets/css/common/material-design.css';

    .wrap {
        margin-top: 49px;
    }

    .product-item {
        display: inline-block;
        margin: 10px 0 10px 10px;
        a,
        img {
            width: 100%;
            max-width: 100%;
        }
        img {
            display: table-cell;
        }
        p {
            padding: 2px 6px;
        }
        .product-item-title {
            height: 26px;
            line-height: 22px;
            font-size: 14px;
        }
        .product-item-price,
        .product-item-end-time {
            line-height: 22px;
            padding-top: 0;
            font-size: 16px;
        }
        .product-item-end-time {
            font-size: 12px;
        }
    }
</style>