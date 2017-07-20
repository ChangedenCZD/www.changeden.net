<template>
    <section class="loadingLayout h100 w100 bg-default global-layout" v-if="isShowLoading||tempShow">
        <div class="spinner" v-if="supportCss3">
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
        </div>
        <div class="spinner" v-else>
            <img id="loadingImage" :class="['t'+deg]" src="../assets/img/loading_icon.png"/>
        </div>
    </section>
</template>
<script>
    import {} from '../../utils/web/Components';
    import { BrowserUtils } from '../../utils/web/Utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {
                id: null,
                tempShow: false,
                supportCss3: true,
                deg: 0
            };
        },
        created () {
            this.supportCss3 = BrowserUtils.cssSupports('transform') && BrowserUtils.cssSupports('animation') && BrowserUtils.cssSupports('animationDelay');
            if (!this.supportCss3) {
                this.start();
            }
        },
        updated () {},
        watch: {
            bodyWidth () {
            },
            isShowLoading () {
                let self = this;
                if (self.id) {
                    clearTimeout(self.id);
                }
                if (!self.isShowLoading) {
                    self.id = setTimeout(() => {
                        self.tempShow = false;
                    }, 444);
                    self.tempShow = true;
                }
            }
        },
        methods: {
            ...mapActions(['toggleLoading']),
            start () {
                let self = this;
                setInterval(() => {
                    if (self.isShowLoading || self.tempShow) {
                        self.deg = (self.deg + 15) % 360;
                    }
                }, 1000 / 24);
            }
        },
        computed: {
            ...mapGetters({
                bodyWidth: 'bodyWidth',
                isShowLoading: 'isShowLoading'
            })
        },
        components: {}
    };
</script>
<style lang="scss" scoped>
    @import '../scss/default.scss';
    @import '../assets/css/common/material-design.css';

    .loadingLayout {
        background-color: rgba(0, 0, 0, .7);
        z-index: 998;
    }

    .sk-cube-grid {
        width: $s80;
        height: $s80;
        margin: 64% auto 0;
    }

    .spinner {
        width: $s80;
        height: $s80;
        margin: 64% auto 0;
        text-align: center;
        font-size: $s20;
    }

    .spinner > div {
        height: 100%;
        width: $s10;
        background-color: white;
        display: inline-block;
        -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
        animation: sk-stretchdelay 1.2s infinite ease-in-out;
    }

    .spinner .rect2 {
        -webkit-animation-delay: -1.1s;
        animation-delay: -1.1s;
    }

    .spinner .rect3 {
        -webkit-animation-delay: -1.0s;
        animation-delay: -1.0s;
    }

    .spinner .rect4 {
        -webkit-animation-delay: -0.9s;
        animation-delay: -0.9s;
    }

    .spinner .rect5 {
        -webkit-animation-delay: -0.8s;
        animation-delay: -0.8s;
    }

    @-webkit-keyframes sk-stretchdelay {
        0%,
        40%,
        100% {
            -webkit-transform: scaleY(0.4)
        }
        20% {
            -webkit-transform: scaleY(1.0)
        }
    }

    @keyframes sk-stretchdelay {
        0%,
        40%,
        100% {
            transform: scaleY(0.4);
            -webkit-transform: scaleY(0.4);
        }
        20% {
            transform: scaleY(1.0);
            -webkit-transform: scaleY(1.0);
        }
    }

    .spinner img {
        width: 70%;
        max-width: 70%;
        height: 70%;
    }

    .t0 {
        transform: rotate(0deg);
    }

    .t15 {
        transform: rotate(15deg);
    }

    .t30 {
        transform: rotate(30deg);
    }

    .t45 {
        transform: rotate(45deg);
    }

    .t60 {
        transform: rotate(60deg);
    }

    .t75 {
        transform: rotate(75deg);
    }

    .t90 {
        transform: rotate(90deg);
    }

    .t105 {
        transform: rotate(105deg);
    }

    .t120 {
        transform: rotate(120deg);
    }

    .t135 {
        transform: rotate(135deg);
    }

    .t150 {
        transform: rotate(150deg);
    }

    .t165 {
        transform: rotate(165deg);
    }

    .t180 {
        transform: rotate(180deg);
    }

    .t195 {
        transform: rotate(195deg);
    }

    .t210 {
        transform: rotate(210deg);
    }

    .t225 {
        transform: rotate(225deg);
    }

    .t240 {
        transform: rotate(240deg);
    }

    .t255 {
        transform: rotate(255deg);
    }

    .t270 {
        transform: rotate(270deg);
    }

    .t285 {
        transform: rotate(285deg);
    }

    .t300 {
        transform: rotate(300deg);
    }

    .t315 {
        transform: rotate(315deg);
    }

    .t330 {
        transform: rotate(330deg);
    }

    .t345 {
        transform: rotate(345deg);
    }
</style>