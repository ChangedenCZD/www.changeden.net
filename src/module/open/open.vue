<template>
    <section class="h100 w100 bg-default global-layout">
        <PcHeader></PcHeader>
    </section>
</template>
<script>
    import { PcHeader } from '../../../utils/web/Components';
    import { co, Apis } from '../../../utils/web/Utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {};
        },
        created () {
            this.checkToken();
        },
        updated () {
        },
        watch: {
            bodyWidth () {
            }
        },
        methods: {
            ...mapActions([]),
            checkToken () {
                console.log('checkToken');
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