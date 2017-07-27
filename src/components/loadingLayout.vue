<template>
    <section class="loadingLayout h100 w100 bg-default global-layout" v-if="isShowLoading||tempShow">
        <div class="spinner" v-if="supportCss3" :style="{'margin-top':top}">
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
        </div>
        <div class="spinner" v-else :style="{'margin-top':top}">
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
        updated () {
        },
        watch: {
            bodyWidth () {
            },
            isShowLoading () {
                let self = this;
                let el = self.$el.querySelector('.spinner');
                this.top = (el.offsetParent.offsetHeight - el.offsetHeight) / 2 + 'px';
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

    .spinner {
        width: $s80;
        height: $s80;
        margin: auto;
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

</style>