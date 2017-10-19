<template>
    <section class="layout h100 w100 global-layout bg-default">
        <section class="infoLayout bg-white shadow pd20" :style="{marginTop:marginTop+'px'}">
            <h1 class="mgb10 mgt10">抱歉：</h1>
            <p class="mgt10">找不到该页面！</p>
            <p class="mgt5">
                <span class="text-orange">{{from}}</span>
            </p>
            <div class="w100">
                <button type="orange" @click="toHome">返回首页</button>
                <button type="orange" @click="toAbout">关于本站</button>
            </div>
        </section>
    </section>
</template>
<script>
    import {} from '../../../utils/web/Components';
    import { BrowserUtils } from '../../../utils/web/Utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {
                from: '',
                origin: '',
                marginTop: 0
            };
        },
        created () {
            this.origin = window.location.origin;
            this.from = this.origin + (this.$route.query.from || '');
            this.marginTop = (window.screen.availHeight - 400) / 2;
        },
        updated () {
        },
        watch: {
            bodyWidth () {
            }
        },
        methods: {
            ...mapActions([]),
            toHome () {
                BrowserUtils.to('/index.html');
            },
            toAbout () {
                BrowserUtils.to('/about.html');
            }
        },
        computed: {
            ...mapGetters({
                bodyWidth: 'bodyWidth'
            })
        },
        components: {}
    };
</script>
<style lang="scss" scoped>
    @import '../../scss/default.scss';
    @import '../../assets/css/common/material-design.css';

    .layout {
        .infoLayout {
            width: 400px;
            height: 200px;
            margin: auto;
            border-radius: 1px;
            text-align: center;
            position: relative;
        }
        div {
            position: absolute;
            left: 0;
            bottom: 1rem;
            height: 32px;
            button {
                padding: 0 14px;
                height: 32px;
                border-radius: 5px;
                font-size: 12px;
            }
            :first-child {
                float: left;
                margin-left: 80px;
            }
            :last-child {
                float: right;
                margin-right: 80px;
            }
        }
    }
</style>