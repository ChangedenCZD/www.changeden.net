<template>
    <section class="atob&btoaLayout mg20 pd10 bg-white">
        <h4 class="toolLayoutTitle pdl10 pdr10">String/Base64转换</h4>
        <section class="toolLayoutBody mgt10" style="display: none;">
            <table class="w100 mgl10 mgr10">
                <tr>
                    <th>原文</th>
                    <th>转换为Base64结果</th>
                </tr>
                <tr>
                    <td><textarea class="w100 pd5" v-model="specialEncodeInput"></textarea></td>
                    <td><textarea class="w100 pd5" contenteditable="false" v-model="specialEncodeResult"></textarea>
                    </td>
                </tr>
                <tr>
                    <th>Base64</th>
                    <th>转换为原文结果</th>
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
    import { Buffer } from 'buffer';

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
                let specialEncodeInput = this.specialEncodeInput;
                this.specialEncodeResult = new Buffer(specialEncodeInput).toString('base64');
            },
            specialDecodeInput () {
                let specialDecodeInput = this.specialDecodeInput;
                let offset = (4 - specialDecodeInput.length % 4) % 4;
                for (let i = 0; i < offset; i++) {
                    specialDecodeInput += '=';
                }
                this.specialDecodeResult = new Buffer(specialDecodeInput, 'base64').toString();
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