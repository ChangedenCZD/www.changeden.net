<template>
    <section class="wrap h100 w100 bg-default">
        <NavigationBar></NavigationBar>
        <section class="body h100 w100">
            <div class="aboutArea pd20 font-s6 bg-white shadow mg20">
                <p class="mgb10">Changeden.net注册于2016年9月，是一个坚持以开源精神进行运营网站。</p>
                <p class="mgb10">站内以提供与互联网、科学、教育相关的内容为主要目的。
                    同时提供很多由本站开发的免费软件服务，如近期推出的<a href="https://bunnydb.changeden.net">动态数据库</a>服务。
                </p>
                <p class="mgb10">口号：致力于打造成为多种编程语言的开源网站。</p>
                <p class="mgb10">创办人：Changeden Chan</p>
            </div>
            <div class="aboutArea pd20 font-s6 bg-white shadow mg20">
                <p>捐赠所得皆用于建设网站</p>
                <div class="mgt20">
                    <img class="donateImage mgr20" src="http://files.changeden.net/images/donate_qrcode_alipay.png"/>
                    <img class="donateImage mgl20" src="http://files.changeden.net/images/donate_qrcode_wxpay.png"/>
                </div>
            </div>
        </section>
    </section>
</template>
<script>
    import { NavigationBar } from '../../../utils/web/Components';
    import {} from '../../../utils/web/Utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {};
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
            ...mapActions([])
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

    .donateImage {
        width: 180px;
        height: 180px;
        display: inline-block;
    }
</style>