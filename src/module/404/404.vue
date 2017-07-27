<template>
    <section class="h100 w100 bg-default global-layout pd20">
        <h3 class="mgb5">抱歉：</h3>
        <p class="mgb5">该页面（<span class="text-orange">{{from}}</span>）不知何年何月被何许人也删掉了！</p>
        <p>不要问我“何许人也”是谁，我也想知道。</p>
        <a :href="origin">返回 -> <span class="text-orange">兔子人网</span></a>
    </section>
</template>
<script>
    import {} from '../../../utils/web/Components';
    import {} from '../../../utils/web/Utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {
                from: '',
                origin: ''
            };
        },
        created () {
            this.origin = window.location.origin;
            this.from = this.origin + this.$route.query.from;
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
        components: {}
    };
</script>
<style lang="scss" scoped>
    @import '../../scss/default.scss';
    @import '../../assets/css/common/material-design.css';
</style>