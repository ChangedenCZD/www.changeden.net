<template>
    <section class="articlePublishLayout h100 w100 bg-default global-layout bg-w">
        <ChildPageHeader title="文章发布" :logo="Icons.setting"></ChildPageHeader>
        <section class="articlePublishArea h100 w100 overscroll pd20">
            <h3 class="title">文章标题</h3>
            <input class="input titleInput" maxlength="50" v-model="title" placeholder="标题（7~50位）"/>
            <h3 class="title">文章内容</h3>
        </section>
    </section>
</template>
<script>
    import { ChildPageHeader } from '../../../../utils/web/Components';
    import { Icons } from '../../../../utils/web/Utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {
                Icons,
                title: '',
                content: ''
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
        components: {ChildPageHeader}
    };
</script>
<style lang="scss" scoped>
    @import '../../../scss/default';
    @import '../../../assets/css/common/material-design.css';

    .articlePublishArea {
        padding-top: $s100;
    }
</style>