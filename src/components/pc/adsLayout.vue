<template>
    <section class="adsLayout">
        <ul>
            <li v-for="item in ads">
                <a :href="item.href" :title="item.title" target="_blank">
                    <img :src="item.image"/>
                </a>
                <span class="close" @click="close">×</span>
            </li>
        </ul>
    </section>
</template>
<script>
    import ads from '../../resource/ads.json';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {
                ads
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
            ...mapActions([]),
            close (e) {
                e.target.offsetParent.style.display = 'none';
            }
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

    .adsLayout {
        position: fixed;
        top: 0;
        right: 0;
        margin: 60px 20px;
        li {
            position: relative;
            margin-bottom: 4px;
            img {
                width: 100px;
                max-width: 100px;
                max-height: 100px;
            }
            .close {
                position: absolute;
                right: 0;
                top: 0;
                background-color: rgba(0, 0, 0, .7);
                font-size: 12px;
                line-height: 1;
                padding: 0 1px;
                color: wheat;
                cursor: pointer;
            }
        }
    }

</style>