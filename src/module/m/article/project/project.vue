<template>
    <section class="wrap w100 bg-default">
        <HeaderLayout></HeaderLayout>
        <section class="w100 c-h pdt5">
            <ArticleLayout :articleList="project"></ArticleLayout>
        </section>
        <FooterLayout></FooterLayout>
    </section>
</template>
<script>
    import project from '../../../../resource/project.json';
    import HeaderLayout from '../../../../components/m/header.vue';
    import FooterLayout from '../../../../components/m/footer.vue';
    import { ArticleLayout } from '../../../../../utils/web/Components';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {
                project
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
            ArticleLayout,
            FooterLayout
        }
    };
</script>
<style lang="scss" scoped>
    @import '../../../../scss/default.scss';
    @import '../../../../assets/css/common/material-design.css';

    .wrap {
        margin-top: 49px;
    }

</style>