<template>
    <section class="h100 w100 bg-default global-layout">
        <PcHeader></PcHeader>
    </section>
</template>
<script>
    import { PcHeader } from '../../utils/Components';
    import { mapActions, mapGetters } from 'vuex';
    export default {
        props: [],
        data () {
            return {};
        },
        created () {},
        watch: {},
        methods: {
            ...mapActions([])
        },
        computed: {
            ...mapGetters({})
        },
        components: {
            PcHeader
        }
    };
</script>
<style lang="scss" scoped>
    @import '../../scss/default.scss';
    @import '../../assets/css/common/material-design.css';
</style>