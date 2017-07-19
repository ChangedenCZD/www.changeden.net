<template>
    <section class="toastLayout h100 w100 bg-default global-layout" v-if="isShowToast">
    </section>
</template>
<script>
    import {} from '../utils/Components';
    import {} from '../utils/Utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {
                id: null,
                isShowToast: false
            };
        },
        created () {
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
                self.id = setTimeout(() => {
                    self.isShowToast = false;
                }, 1000);
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
        background-color: rgba(0, 0, 0, .7);
        z-index: 998;
    }
</style>