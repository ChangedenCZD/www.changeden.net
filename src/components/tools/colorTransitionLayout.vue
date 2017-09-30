<template>
    <section class="timeParserLayout mg20 pd10 bg-white">
        <h4 class="toolLayoutTitle pdl10 pdr10">颜色转换</h4>
        <section class="toolLayoutBody mgt10" style="display: none;">
            <section class="mgl10">
                <p>十进制</p>
                <p>
                    <label>红
                        <input class="shadow mg5 pd5 mgt10 mgr20" type="number" maxlength="3" v-model="redSide"/>
                    </label>
                    <label>绿
                        <input class="shadow mg5 pd5 mgt10 mgr20" type="number" maxlength="3" v-model="greenSide"/>
                    </label>
                    <label>蓝
                        <input class="shadow mg5 pd5 mgt10" type="number" maxlength="3" v-model="blueSide"/>
                    </label>
                </p>
                <p class="preview" :style="{'background-color':colorFor16}"><span>{{colorFor16}}</span></p>
            </section>
            <section class="mgl10 mgt10">
                <p>十六进制</p>
                <p>
                    <label>#
                        <input class="shadow mg5 pd5 mgt10" maxlength="6" v-model="normalColor"/>
                    </label>
                </p>
                <p class="preview" :style="{'background-color':colorFor10}"><span>{{colorFor10}}</span></p>
            </section>
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
                redSide: 0,
                greenSide: 0,
                blueSide: 0,
                colorFor16: '#000000',
                colorFor10: 'rgb(0, 0, 0)',
                normalColor: '000000'
            };
        },
        created () {
        },
        updated () {
        },
        watch: {
            bodyWidth () {
            },
            redSide () {
                this.redSide = this.fixNumber(this.redSide);
                this.gen0xColor();
            },
            greenSide () {
                this.greenSide = this.fixNumber(this.greenSide);
                this.gen0xColor();
            },
            blueSide () {
                this.blueSide = this.fixNumber(this.blueSide);
                this.gen0xColor();
            },
            normalColor () {
                let normalColor = this.normalColor.toString().replace(/#/g, '');
                let color = [0, 0, 0];
                if (normalColor.length === 3) {
                    for (let i = 0; i < 3; i++) {
                        color[i] = parseInt(normalColor.charAt(i), 16);
                    }
                } else if (normalColor.length === 6) {
                    for (let i = 0; i < 3; i++) {
                        color[i] = parseInt(normalColor.substr(i * 2, 2), 16);
                    }
                } else {
                    color = null;
                    this.colorFor10 = '';
                }
                if (color) {
                    this.colorFor10 = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
                }
            }
        },
        methods: {
            ...mapActions([]),
            fixNumber (num) {
                return Math.min(255, Math.max(0, num));
            },
            gen0xColor () {
                this.colorFor16 = `#${this.xTo0x(this.redSide)}${this.xTo0x(this.greenSide)}${this.xTo0x(this.blueSide)}`;
            },
            xTo0x (num) {
                let str = num.toString(16);
                return str.length < 2 ? `0${str}` : str;
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

    .toolLayoutBody input {
        width: 100px;
    }

    .toolLayoutBody .preview {
        text-align: center;
        width: 160px;
        height: 50px;
        line-height: 50px;
        border: $borderStyle;
    }

    .toolLayoutBody span {
        -webkit-touch-callout: default;
        -webkit-user-select: text;
        -khtml-user-select: default;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
    }
</style>