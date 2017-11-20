<template>
    <section class="wrap h100 w100 bg-default">
        <HeaderLayout></HeaderLayout>
        <section class="w c-h pdt5" :style="{minHeight:minHeight+'px'}">
            <ul>
                <li v-for="cat in list">
                    <a class="cat-item-header clickable shadow mgt10"
                       :href="cat.href">
                        <span>{{cat.title}}</span>
                        <a class="cat-item-header-more">查看更多</a>
                    </a>
                    <ul class="product-list-wrap">
                        <li class="product-item shadow bg-white" v-for="item in cat.items"
                            :style="{width:productWidth+'px'}"
                            v-if="item.coupon_info">
                            <a :href="item.coupon_click_url" target="_blank" :title="item.title">
                                <p class="product-item-title one-line">
                                    <span>{{item.title}}</span>
                                </p>
                                <p class="product-item-coupon one-line text-orange" >
                                    <span>{{item.coupon_info}}</span>
                                </p>
                            </a>
                        </li>
                        <li class="product-item shadow bg-white" v-for="item in cat.items"
                            :style="{width:productWidth+'px'}"
                            v-else>
                            <a :href="item.item_url" target="_blank" :title="item.title">
                                <img :src="item.pict_url"/>
                                <p class="product-item-title one-line">
                                    <span>{{item.title}}</span>
                                </p>
                                <p class="product-item-price text-orange">
                                    <span>￥{{item.zk_final_price}}</span>
                                </p>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </section>
        <FooterLayout></FooterLayout>
        <AdsLayout></AdsLayout>
    </section>
</template>
<script>
    import dgList from '../../resource/dg.json';
    import tbkList from '../../resource/tbk.json';
    import jhsList from '../../resource/jhs.json';
    import { HeaderLayout, FooterLayout, AdsLayout } from '../../../utils/web/Components';
    import {} from '../../../utils/web/Utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {
                list: [
                    {
                        title: '优惠券',
                        items: [],
                        href: '/alibaba/coupon.html'
                    },
                    {
                        title: '淘宝客',
                        items: [],
                        href: '/alibaba/taobaoke.html'
                    },
                    {
                        title: '聚划算',
                        items: [],
                        href: '/alibaba/juhuasuan.html'
                    }
                ],
                productWidth: 'auto'
            };
        },
        created () {
            this.$nextTick(() => {
                this.list[0].items = dgList.slice(0, Math.min(8, dgList.length));
                this.list[1].items = tbkList.slice(0, Math.min(8, tbkList.length));
                this.list[2].items = tbkList.slice(0, Math.min(8, jhsList.length));
                this.list = this.list.concat();
                let parent = this.$el.querySelector('.product-list-wrap');
                if (parent) {
                    this.productWidth = (parent.offsetWidth - 5 * 10) / 4;
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
            ...mapActions(['showToast', 'toggleLoading'])
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
    @import '../../scss/default.scss';
    @import '../../assets/css/common/material-design.css';

    .wrap {
        margin-top: 49px;
    }
    .cat-item-header {
        padding: 10px 12px;
        display: block;
        position: relative;
        .cat-item-header-more {
            position: absolute;
            right: 12px;
            top: 0;
            font: normal 14px/44px "Microsoft Yahei";
        }
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
        .product-item-coupon{
            line-height: 22px;
            padding-top: 0;
            font-size: 14px;
        }
        .product-item-price {
            line-height: 22px;
            padding-top: 0;
            font-size: 16px;
        }
    }
</style>