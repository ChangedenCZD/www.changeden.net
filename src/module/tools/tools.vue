<template>
    <section class="wrap h100 w100 bg-default">
        <HeaderLayout></HeaderLayout>
        <section class="w c-h pdt5" :style="{minHeight:minHeight+'px'}">
            <section class="w100 toolLayout">
                <ImageToBase64Layout></ImageToBase64Layout>
                <ShortUrlLayout></ShortUrlLayout>
                <TimeTransitionLayout></TimeTransitionLayout>
                <UrlEncodeDecodeLayout></UrlEncodeDecodeLayout>
                <ColorTransitionLayout></ColorTransitionLayout>
                <AtobAndbtoaLayout></AtobAndbtoaLayout>
            </section>
        </section>
        <FooterLayout></FooterLayout>
        <AdsLayout></AdsLayout>
    </section>
</template>
<script>
    import {
        HeaderLayout,
        ImageToBase64Layout,
        TimeTransitionLayout,
        UrlEncodeDecodeLayout,
        ColorTransitionLayout,
        AtobAndbtoaLayout,
        FooterLayout,
        AdsLayout,
        ShortUrlLayout
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
                toolLayout.querySelectorAll('.toolLayoutTitle')[0].click();
            });
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
                bodyWidth: 'bodyWidth',
                minHeight: 'minHeight'
            })
        },
        components: {
            HeaderLayout,
            ImageToBase64Layout,
            TimeTransitionLayout,
            UrlEncodeDecodeLayout,
            ColorTransitionLayout,
            AtobAndbtoaLayout,
            FooterLayout,
            AdsLayout,
            ShortUrlLayout
        }
    };
</script>
<style lang="scss" scoped>
    @import '../../scss/default.scss';
    @import '../../assets/css/common/material-design.css';

    .wrap {
        margin-top: 49px;
    }

    .toolLayout {
        max-width: 800px;
        margin: auto;
    }
</style>