<template>
    <section class="timeParserLayout mg20 pd10 bg-white">
        <h4 class="toolLayoutTitle pdl10 pdr10">时间转换</h4>
        <section class="toolLayoutBody mgt10" style="display: none;">
            <div class="mgl10">
                <p>当前时间：<span>{{format(currentDate, defaultFormatStr)}}</span></p>
                <p>当前时间戳：<span>{{currentTime}}</span></p>
            </div>
            <div class="mgt10">
                <p class="mgl10">时间戳转日期</p>
                <p><input class="shadow mg10 pd5" type="number" maxlength="13"
                          v-model="formatTime"/><span>{{formatResult}}</span></p>
            </div>
            <div class="mgt10">
                <p class="mgl10">日期转时间戳（yyyy-MM-dd HH:mm:ss.SSS）</p>
                <p><input class="shadow mg10 pd5"
                          v-model="parseDate"/><span>{{parseResult}}</span></p>
            </div>
        </section>
    </section>
</template>
<script>
    import {} from '../../../utils/web/Components';
    import { DateUtils } from '../../../utils/web/Utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {
                currentDate: '',
                defaultFormatStr: 'yyyy-mm-dd HH:MM:ss',
                formatTime: '',
                formatResult: '',
                parseDate: '',
                parseResult: ''
            };
        },
        created () {
            this.start();
        },
        updated () {
        },
        watch: {
            bodyWidth () {
            },
            formatTime () {
                let time = parseInt(this.formatTime);
                if (!isNaN(time)) {
                    if (time.toString().length <= 10) {
                        time *= 1000;
                    }
                    this.formatResult = this.format(new Date(time), 'yyyy-mm-dd HH:MM:ss.l');
                }
            },
            parseDate () {
                if (this.parseDate) {
                    let time = Date.parse(this.parseDate);
                    this.parseResult = isNaN(time) ? '时间格式有误' : time;
                }
            }
        },
        methods: {
            ...mapActions([]),
            start () {
                setInterval(() => {
                    this.currentDate = new Date();
                }, 1000);
            },
            format (date, formatStr) {
                return DateUtils.format(date, formatStr);
            }
        },
        computed: {
            ...mapGetters({
                bodyWidth: 'bodyWidth'
            }),
            currentTime () {
                if (!this.currentDate) {
                    this.currentDate = new Date();
                }
                return this.currentDate.getTime();
            }
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
        width: rem(200px);
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