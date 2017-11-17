<template>
    <section class="timeParserLayout mg20 pd10 bg-white">
        <h4 class="toolLayoutTitle pdl10 pdr10">生成短链</h4>
        <section class="toolLayoutBody mgt10" style="display: none;">
            <table class="w100 mgl10 mgr10">
                <tr>
                    <th>输入源</th>
                    <th></th>
                    <th>结果</th>
                </tr>
                <tr>
                    <td><textarea class="w100 pd5" v-model="srcUrl"></textarea></td>
                    <td>
                        <div class="operationArea" @click="onClick">
                            <button id="encode" class="shadow w100 mgb5" type="orange">生成短链</button>
                            <button id="decode" class="shadow w100" type="orange">解析短链</button>
                        </div>
                    </td>
                    <td><textarea class="w100 pd5" contenteditable="false" v-model="result"></textarea>
                    </td>
                </tr>
            </table>
        </section>
    </section>
</template>
<script>
    import {} from '../../../utils/web/Components';
    import { co, Apis } from '../../../utils/web/Utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {
                srcUrl: '',
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
                let self = this;
                co(function* () {
                    let data = yield Apis.shortUrlEncode(self.srcUrl);
                    self.result = JSON.stringify(data.result);
                });
            },
            decode () {
                let self = this;
                co(function* () {
                    let data = yield Apis.shortUrlDecode(self.srcUrl);
                    self.result = JSON.stringify(data.result);
                });
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
        th {
            text-align: left;
            padding-bottom: $s10;
        }
        td {
            padding-right: $s20;
        }
        textarea {
            height: 100px;
        }
        .operationArea {
            button {
                height: 36px;
            }
        }
    }

</style>