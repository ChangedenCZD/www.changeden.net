<template>
    <section class="wrap h100 w100 bg-default">
        <NavigationBar></NavigationBar>
        <section class="body h100 w100">
            <section class="h100 w100 overScroll">
                <section class="w100 toolLayout">
                    <ImageToBase64Layout></ImageToBase64Layout>
                    <TimeTransitionLayout></TimeTransitionLayout>
                    <UrlEncodeDecodeLayout></UrlEncodeDecodeLayout>
                    <ColorTransitionLayout></ColorTransitionLayout>
                </section>
            </section>
        </section>
    </section>
</template>
<script>
    import {
        NavigationBar,
        ImageToBase64Layout,
        TimeTransitionLayout,
        UrlEncodeDecodeLayout,
        ColorTransitionLayout
    } from '../../../utils/web/Components';
    import { BrowserUtils } from '../../../utils/web/Utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {};
        },
        created () {
            this.$nextTick(() => {
                let toolLayout = this.$el.querySelector('.toolLayout');
                toolLayout.onclick = (e) => {
                    let target = e.target;
                    if (target.className.indexOf('toolLayoutTitle') >= 0) {
                        let el = target.offsetParent.querySelector('.toolLayoutBody');
                        el.style.display = el.style.display === 'none' ? 'block' : 'none';
                    }
                };
            });
        },
        updated () {
        },
        watch: {
            bodyWidth () {
            }
        },
        methods: {
            ...mapActions([]),
            open (url) {
                BrowserUtils.open(url);
            }
        },
        computed: {
            ...mapGetters({
                bodyWidth: 'bodyWidth'
            })
        },
        components: {
            NavigationBar,
            ImageToBase64Layout,
            TimeTransitionLayout,
            UrlEncodeDecodeLayout,
            ColorTransitionLayout
        }
    };
</script>
<style lang="scss" scoped>
    @import '../../scss/default.scss';
    @import '../../assets/css/common/material-design.css';

    .wrap {
        position: relative;
    }

    .body {
        position: absolute;
        left: 0;
        top: 0;
        padding-left: rem(120px);
        font-size: .6rem;
    }

</style>