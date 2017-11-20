<template>
    <section class="wrap h100 w100 bg-default">
        <HeaderLayout></HeaderLayout>
        <section class="w100 c-h pdt5" :style="{minHeight:minHeight+'px'}">
            <ul>
                <li v-for="cat in list">
                    <a class="cat-item-header clickable shadow mgt10"
                       :href="cat.href">
                        <span>{{cat.title}}</span>
                        <a class="cat-item-header-more">查看更多</a>
                    </a>
                    <ul class="product-list-wrap">
                        <li class="product-item shadow bg-white" v-for="item in cat.items"
                            :style="{width:productWidth+'px'}">
                            <a :href="item.item_url" target="_blank" :title="item.title">
                                <img :src="item.pict_url" v-if="!item.coupon_info"/>
                                <p class="product-item-title one-line">
                                    <span>{{item.title}}</span>
                                </p>
                                <p class="product-item-coupon text-orange" v-if="item.coupon_info">
                                    <span>{{item.coupon_info}}</span>
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
    </section>
</template>
<script>
    import dgList from '../../../resource/dg.json';
    import tbkList from '../../../resource/tbk.json';
    import jhsList from '../../../resource/jhs.json';
    import HeaderLayout from '../../../components/m/header.vue';
    import FooterLayout from '../../../components/m/footer.vue';
    import {} from '../../../../utils/web/Components';
    import {} from '../../../../utils/web/Utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {
                list: [
                    {
                        title: '优惠券',
                        items: [],
                        href: '/m/alibaba/coupon.html'
                    },
                    {
                        title: '淘宝客',
                        items: [],
                        href: '/m/alibaba/taobaoke.html'
                    },
                    {
                        title: '聚划算',
                        items: [],
                        href: '/m/alibaba/juhuasuan.html'
                    }
                ],
                productWidth: 'auto'
            };
        },
        created () {
            this.$nextTick(() => {
                this.list[0].items = dgList.slice(0, Math.min(4, dgList.length));
                this.list[1].items = tbkList.slice(0, Math.min(4, tbkList.length));
                this.list[2].items = tbkList.slice(0, Math.min(4, jhsList.length));
                this.list = this.list.concat();
                let parent = this.$el.querySelector('.product-list-wrap');
                if (parent) {
                    this.productWidth = (parent.offsetWidth - 3 * 10) / 2;
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

    .cat-item-header {
        padding: 0 12px;
        line-height: 44px;
        display: block;
        position: relative;
        .cat-item-header-more {
            position: absolute;
            right: 12px;
            top: 0;
            font: normal 12px/44px "Microsoft Yahei";
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
            font-size: 13px;
        }
        .product-item-price {
            line-height: 22px;
            padding-top: 0;
            font-size: 16px;
        }
    }
</style>