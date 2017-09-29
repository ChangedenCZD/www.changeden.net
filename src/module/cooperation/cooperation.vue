<template>
    <section class="wrap h100 w100 bg-default">
        <NavigationBar></NavigationBar>
        <section class="body h100 w100">
            <div class="aboutArea pd20 font-s6 bg-white shadow mg20">
                <p class="mgb10">本站提供项目服务合作与推广合作。如需合作，可选择一下途径进行联系。</p>
                <p class="mgb10">电子邮箱：<span>changeden520@gmail.com</span></p>
                <p class="mgb10">Github开源：
                    <a href="javascript:" @click="open">{{github}}</a>
                </p>
                <p>QQ群：618839726</p>
            </div>
        </section>
    </section>
</template>
<script>
    import { NavigationBar } from '../../../utils/web/Components';
    import { BrowserUtils } from '../../../utils/web/Utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {
                github: 'https://github.com/ChangedenCZD'
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
            open () {
                BrowserUtils.open(this.github);
            }
        },
        computed: {
            ...mapGetters({
                bodyWidth: 'bodyWidth'
            })
        },
        components: {
            NavigationBar
        }
    };
</script>
<style lang="scss" scoped>
    @import '../../scss/default.scss';
    @import '../../assets/css/common/material-design.css';

    .wrap {
        position: relative;
    }

    .body {
        position: absolute;
        left: 0;
        top: 0;
        padding-left: rem(120px);
    }
</style>