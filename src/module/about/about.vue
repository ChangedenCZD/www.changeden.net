<template>
    <section class="h100 w100 bg-default global-layout">
        <PcHeader></PcHeader>
        <section class="bodyLayout">
            <div class="aboutArea pd20 font-s5 bg-white shadow mg20">
                <h3 class="mgb10">关于我们：</h3>
                <p class="pdb5">本网站坚持以开源精神进行运营。</p>
                <p class="pdb5">致力于打造成为多种编程语言的开源网站。</p>
                <p class="pdb5">目前由Changeden独立开发与维护，希望有更多程序猿加入成为一份子。</p>
                <h3 class="mgt20 mgb10">联系我们：</h3>
                <p class="pdb5">电子邮箱：<span>changeden520@gmail.com</span></p>
                <p>Github：
                    <a href="javascript:" @click="open">{{github}}</a>
                </p>
            </div>
        </section>
    </section>
</template>
<script>
    import { PcHeader } from '../../../utils/web/Components';
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
        components: {PcHeader}
    };
</script>
<style lang="scss" scoped>
    @import '../../scss/default.scss';
    @import '../../assets/css/common/material-design.css';
</style>