<template>
    <section class="footerLayout w100">
        <section class="footerArea">
            <p class="mgt5">
                <span>兔子人网致力于打造成为多种编程语言的开源网站。</span>
            </p>
            <p class="mgt5">
                <span>Powered by Changeden</span>
            </p>
            <p class="mgt5">
                <span>转载内容版权归作者及来源网站所有，本站原创内容转载请注明来源，商业媒体及纸媒请先联系：changeden520@gmail.com</span>
            </p>
        </section>
    </section>
</template>
<script>
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
        components: {}
    };
</script>
<style lang="scss" scoped>
    @import '../../scss/default.scss';
    @import '../../assets/css/common/material-design.css';

    .footerArea {
        font-size: 12px;
        padding: 16px;
    }

</style>