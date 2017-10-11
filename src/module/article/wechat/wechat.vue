<template>
    <section class="wrap w100 bg-default">
        <HeaderLayout></HeaderLayout>
        <section class="w c-h pdt5">
            <ArticleLayout :articleList="wechat"></ArticleLayout>
        </section>
    </section>
</template>
<script>
    import wechat from '../../../resource/wechat.json';
    import { HeaderLayout, ArticleLayout } from '../../../../utils/web/Components';
    import {} from '../../../../utils/web/Utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {
                wechat
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
            ...mapActions([])
        },
        computed: {
            ...mapGetters({
                bodyWidth: 'bodyWidth'
            })
        },
        components: {
            HeaderLayout,
            ArticleLayout
        }
    };
</script>
<style lang="scss" scoped>
    @import '../../../scss/default.scss';
    @import '../../../assets/css/common/material-design.css';

    .wrap {
        margin-top: 49px;
    }

</style>