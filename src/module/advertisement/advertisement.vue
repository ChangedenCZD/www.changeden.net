<template>
    <section class="h100 w100 bg-default global-layout">
        <PcHeader></PcHeader>
        <section class="bodyLayout">
            <div class="aboutArea pd20 font-s5 bg-white shadow mg20">
                <p class="pdb5" style="text-align: center">--暂无推广内容--</p>
                <h3 class="mgt20 mgb10">联系我们：</h3>
                <p class="pdb5">电子邮箱：<span>changeden520@gmail.com</span></p>
                <p>邮件请注明推广投放</p>
            </div>
        </section>
    </section>
</template>
<script>
    import { PcHeader } from '../../../utils/web/Components';
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
        components: {PcHeader}
    };
</script>
<style lang="scss" scoped>
    @import '../../scss/default.scss';
    @import '../../assets/css/common/material-design.css';
</style>