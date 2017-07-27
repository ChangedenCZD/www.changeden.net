<template>
    <section class="h100 w100 bg-default global-layout">
        <PcHeader></PcHeader>
        <section class="bodyLayout">
            <section class="donateArea pd20 font-s5 bg-white shadow mg20">
                <swiper class="pageLayout" :options="pageSwiperOption" ref="pageSwiper">
                    <swiper-slide class="page overscroll conversationListLayout" v-for="item in pages">
                        <img :src="item.image"/>
                    </swiper-slide>
                </swiper>
            </section>
            <ul class="operationArea">
                <li class="operationItem w100 shadow clickable mgb5 mgt5"
                    :class="[index===page?'text-orange':'']"
                    v-for="(item,index) in pages"
                    @click="onPageSelected(index)">
                    {{item.name}}
                </li>
            </ul>
        </section>
    </section>
</template>
<script>
    import { PcHeader } from '../../../utils/web/Components';
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import {} from '../../../utils/web/Utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {
                pages: [
                    {name: '支付宝', image: '/static/img/donate_qrcode_alipay.jpg'},
                    {name: '微信支付', image: '/static/img/donate_qrcode_wxpay.png'}
                ],
                page: 0,
                pageSwiperOption: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    onSlideChangeEnd: (swiper) => {
                        this.page = swiper.realIndex;
                    },
                    loop: false
                }
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
            onPageSelected (index) {
                this.page = index;
                this.$nextTick(() => {
                    this.$refs.pageSwiper.swiper.slideTo(index, 244, false);
                });
            }
        },
        computed: {
            ...mapGetters({
                bodyWidth: 'bodyWidth'
            })
        },
        components: {PcHeader, swiper, swiperSlide}
    };
</script>
<style lang="scss" scoped>
    @import '../../scss/default.scss';
    @import '../../assets/css/common/material-design.css';

    .operationArea {
        position: absolute;
        left: $s30;
        top: $s80;
        width: rem(150px);
    }

    .operationItem {
        display: inline-block;
        cursor: pointer;
        height: $s50;
        line-height: $s50;
        text-align: center;
    }

    .donateArea {
        text-align: center;
    }

    .donateArea img {
        width: rem(250px);
        height: rem(250px);
        max-width: 100%;
        margin: $s20 rem(180px);
    }
</style>