<template>
    <section class="wrap h100 w100 bg-default">
        <HeaderLayout></HeaderLayout>
        <section class="w100 c-h pdt5" :style="{minHeight:minHeight+'px'}">
            <ul class="coupon-list-wrap">
                <li class="coupon-item" v-for="item in dgList"
                    :style="{width:couponWidth+'px'}">
                    <img class="coupon-item-product-pic" :src="item.pict_url"/>
                    <p class="coupon-item-product-title one-line pd5 bg-white">
                        <span>{{item.title}}</span>
                    </p>
                    <div class="coupon-item-detail" :style="{width:couponWidth+'px',height:couponHeight+'px'}">
                        <img class="coupon-item-bg" src="../../../../assets/img/taobao_coupon_bg.png"
                             :style="{height:couponHeight+'px'}"/>
                        <a class="coupon-item-info w100 h100" :href="item.coupon_click_url" target="_blank"
                           :title="item.title" :style="{height:couponHeight+'px'}">
                            <div class="coupon-item-info-area" :style="{height:couponHeight+'px'}">
                                <p class="text-orange one-line"
                                   :style="{height:couponInfoHeight+'px',lineHeight:couponInfoHeight+'px'}">
                                    <span>{{item.coupon_info}}</span>
                                </p>
                                <p class="one-line"
                                   :style="{height:couponInfoHeight+'px',lineHeight:couponInfoHeight+'px'}">
                                    <span>{{item.coupon_end_time}}失效</span>
                                </p>
                            </div>
                            <div class="coupon-item-info-draw"
                                 :style="{height:couponHeight+'px',lineHeight:couponHeight+'px'}">
                                <span>立即领取</span>
                            </div>
                        </a>
                    </div>
                </li>
            </ul>
        </section>
        <FooterLayout></FooterLayout>
    </section>
</template>
<script>
    import dgList from '../../../../resource/dg.json';
    import HeaderLayout from '../../../../components/m/header.vue';
    import FooterLayout from '../../../../components/m/footer.vue';
    import {} from '../../../../../utils/web/Components';
    import {} from '../../../../../utils/web/Utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {
                dgList,
                couponWidth: 'auto',
                couponHeight: 'auto',
                couponInfoHeight: 'auto'
            };
        },
        created () {
            this.$nextTick(() => {
                let parent = this.$el.querySelector('.coupon-list-wrap');
                if (parent) {
                    this.couponWidth = (parent.offsetWidth - 3 * 10) / 2;
                    this.couponHeight = this.couponWidth / 19.86 * 7.44;
                    this.couponInfoHeight = this.couponHeight / 2 - 7;
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
    @import '../../../../scss/default';
    @import '../../../../assets/css/common/material-design.css';

    .wrap {
        margin-top: 49px;
    }

    .coupon-item {
        display: inline-block;
        margin: 10px 0 10px 10px;
        position: relative;
        a,
        img {
            width: 100%;
            max-width: 100%;
        }
        img {
            display: table-cell;
        }
        .coupon-item-detail {
            position: relative;
        }
        .coupon-item-info {
            position: absolute;
            left: 0;
            top: 0;
            .coupon-item-info-area,
            .coupon-item-info-draw {
                float: left;
                text-align: center;
            }
            .coupon-item-info-area {
                width: 59.67%;
                padding: 7px 0;
                p {
                    font-size: 12px;
                }
            }
            .coupon-item-info-draw {
                width: 36.68%;
                color: whitesmoke;
                font-size: 13px;
            }
        }
        .coupon-item-product-title {
            font-size: 12px;
        }
    }
</style>