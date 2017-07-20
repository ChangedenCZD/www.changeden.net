<template>
    <section class="toastLayout h100 w100 bg-default global-layout" v-if="isShowToast">
        <span class="toastArea" :style="{opacity:(isFixed?1:0),'margin-top':top,'margin-left':left}">
            <span>{{toastInfo.toastContent}}</span>
        </span>
    </section>
</template>
<script>
    import {} from '../../utils/web/Components';
    import {} from '../../utils/web/Utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {
                id: null,
                isShowToast: false,
                isFixed: false,
                left: 0,
                top: 0
            };
        },
        created () {
            if (this.toastInfo && this.toastInfo.toastContent) {
                this.toast();
            }
        },
        updated () {},
        watch: {
            bodyWidth () {
            },
            toastInfo () {
                this.toast();
            }
        },
        methods: {
            ...mapActions(['showToast']),
            toast () {
                let self = this;
                if (self.id) {
                    clearTimeout(self.id);
                }
                self.isShowToast = true;
                self.isFixed = false;
                self.$nextTick(() => {
                    let el = self.$el.querySelector('.toastArea');
                    let root = el.offsetParent;
                    let rootWidth = root.offsetWidth;
                    let rootHeight = root.offsetHeight;
                    let width = el.offsetWidth;
                    let height = el.offsetHeight;
                    self.left = parseInt((rootWidth - width) * 0.5) + 'px';
                    self.top = parseInt((rootHeight - height) * 0.6) + 'px';
                    self.$nextTick(() => {
                        self.isFixed = true;
                        self.id = setTimeout(() => {
                            self.isShowToast = false;
                        }, 1000);
                    });
                });
            }
        },
        computed: {
            ...mapGetters({
                bodyWidth: 'bodyWidth',
                toastInfo: 'toastInfo'
            })
        },
        components: {}
    };
</script>
<style lang="scss" scoped>
    @import '../scss/default.scss';
    @import '../assets/css/common/material-design.css';

    .toastLayout {
        background-color: transparent;
        z-index: 998;
    }

    .toastArea {
        display: inline-block;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        padding: rem(10px) rem(20px);
        transition: opacity 0.3s;
        -webkit-transition: opacity 0.3s;
        -moz-transition: opacity 0.3s;
        -ms-transition: opacity 0.3s;
    }
</style>