<template>
    <section class="h100 w100 bg-default global-layout">
    </section>
</template>
<script>
    import {} from '../../utils/Components';
    import {} from '../../utils/Utils';
    import { mapActions, mapGetters } from 'vuex';
    export default {
        props: [],
        data () {
            return {};
        },
        created () {},
        updated () {},
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