<template>
    <section class="wrap h100 w100 bg-default">
        <HeaderLayout></HeaderLayout>
        <section class="w c-h pdt5" :style="{minHeight:minHeight+'px'}">
            <ul class="product-list-wrap">
                <li class="product-item shadow bg-white" v-for="item in dgList"
                    :style="{width:productWidth+'px'}">
                    <a :href="item.coupon_click_url" target="_blank" :title="item.title">
                        <img :src="item.pict_url"/>
                        <p class="product-item-title one-line">
                            <span>{{item.title}}</span>
                        </p>
                        <p class="product-item-coupon one-line text-orange">
                            <span>{{item.coupon_info}}</span>
                        </p>
                        <p class="product-item-price text-orange">
                            <span>￥{{item.zk_final_price}}</span>
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
    import dgList from '../../../resource/dg.json';
    import { HeaderLayout, FooterLayout, AdsLayout } from '../../../../utils/web/Components';
    import { } from '../../../../utils/web/Utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {
                dgList,
                productWidth: 'auto'
            };
        },
        created () {
            this.$nextTick(() => {
                let parent = this.$el.querySelector('.product-list-wrap');
                if (parent) {
                    let maxWidth = parent.offsetWidth;
                    let length = Math.min(dgList.length, 4);
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