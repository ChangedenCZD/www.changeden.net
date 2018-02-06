<template>
    <section class="timeParserLayout mgt20 mgb20 mgl10 mgr10 pd10 bg-white shadow">
        <h4 class="toolLayoutTitle pdl10 pdr10">Url编码/解码</h4>
        <section class="toolLayoutBody mgt10" style="display: none;">
            <table class="w100 pdl10 pdr10">
                <tr>
                    <th>输入源</th>
                    <th></th>
                    <th>结果</th>
                </tr>
                <tr>
                    <td><textarea class="w100 pd5" v-model="src" title="输入源"></textarea></td>
                    <td>
                        <div class="operationArea mgl10 mgr10" @click="onClick">
                            <button id="encode" class="shadow w100 mgb5" type="orange">Url编码</button>
                            <button id="decode" class="shadow w100" type="orange">Url解码</button>
                        </div>
                    </td>
                    <td><textarea class="w100 pd5" contenteditable="false" v-model="result" title="结果"></textarea>
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
                src: '',
                result: ''
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
            encode () {
                this.result = encodeURIComponent(this.src);
            },
            decode () {
                this.result = decodeURIComponent(this.src);
            },
            onClick (e) {
                switch (e.target.id) {
                case 'encode':
                    this.encode();
                    break;
                case 'decode':
                    this.decode();
                    break;
                }
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

    .toolLayoutTitle {
        cursor: pointer;
    }

    .toolLayoutBody {
        font-size: 14px;
        th {
            text-align: left;
            padding-bottom: $s10;
        }
        textarea {
            height: 100px;
        }
        .operationArea {
            button {
                height: 36px;
                font-size: 14px;
            }
        }
    }
</style>