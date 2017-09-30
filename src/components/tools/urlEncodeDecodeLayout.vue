<template>
    <section class="timeParserLayout mg20 pd10 bg-white">
        <h4 class="toolLayoutTitle pdl10 pdr10">Url编码/解码</h4>
        <section class="toolLayoutBody mgt10" style="display: none;">
            <table class="w100 mgl10 mgr10">
                <tr>
                    <th>编码前</th>
                    <th>编码后</th>
                </tr>
                <tr>
                    <td><textarea class="w100 pd5" v-model="specialEncodeInput"></textarea></td>
                    <td><textarea class="w100 pd5" contenteditable="false" v-model="specialEncodeResult"></textarea>
                    </td>
                </tr>
                <tr>
                    <th>解码前</th>
                    <th>解码后</th>
                </tr>
                <tr>
                    <td><textarea class="w100 pd5" v-model="specialDecodeInput"></textarea></td>
                    <td><textarea class="w100 pd5" contenteditable="false" v-model="specialDecodeResult"></textarea>
                    </td>
                </tr>
            </table>
        </section>
    </section>
</template>
<script>
    import {} from '../../../utils/web/Components';
    import {} from '../../../utils/web/Utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {
                specialEncodeInput: '',
                specialEncodeResult: '',
                specialDecodeInput: '',
                specialDecodeResult: ''
            };
        },
        created () {
        },
        updated () {
        },
        watch: {
            bodyWidth () {
            },
            specialEncodeInput () {
                this.specialEncodeResult = encodeURIComponent(this.specialEncodeInput);
            },
            specialDecodeInput () {
                this.specialDecodeResult = decodeURIComponent(this.specialDecodeInput);
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

    .toolLayoutTitle {
        cursor: pointer;
    }

    .toolLayoutBody th {
        text-align: left;
        padding-bottom: $s10;
    }

    .toolLayoutBody td {
        padding-right: $s20;
    }

    .toolLayoutBody textarea {
        height: 100px;
    }
</style>