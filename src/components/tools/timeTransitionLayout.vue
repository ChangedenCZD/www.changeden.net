<template>
    <section class="timeParserLayout mgt20 mgb20 mgl10 mgr10 pd10 bg-white shadow">
        <h4 class="toolLayoutTitle pdl10 pdr10">时间转换</h4>
        <section class="toolLayoutBody mgt10" style="display: none;">
            <div class="mgl10">
                <p>
                    <span>当前时间：{{format(currentDate, defaultFormatStr)}}</span>
                </p>
                <p>
                    <span>当前时间戳：{{snapShotTime ? snapShotTime : currentTime}}</span>
                    <span class="snapShot mgl20" @click="snapShot">{{snapShotTime ? '刷新' : '暂停'}}</span>
                </p>
            </div>
            <div class="mgt10">
                <p class="mgl10">时间戳转日期</p>
                <p><input class="shadow mg10 pd5" type="number" maxlength="13"
                          v-model="formatTime" placeholder="输入时间戳" title="输入时间戳"/><span>{{formatResult}}</span></p>
            </div>
            <div class="mgt10">
                <p class="mgl10">日期转时间戳（yyyy-MM-dd HH:mm:ss.SSS）</p>
                <p><input class="shadow mg10 pd5"
                          v-model="parseDate" placeholder="输入日期" title="日期格式 yyyy-MM-dd HH:mm:ss.SSS"/><span>{{parseResult}}</span>
                </p>
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
                parseResult: '',
                snapShotTime: ''
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
            },
            snapShot () {
                if (this.snapShotTime) {
                    this.snapShotTime = '';
                } else {
                    this.snapShotTime = this.currentTime;
                }
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

    .toolLayoutBody {
        font-size: 14px;
        input {
            width: rem(200px);
        }
        span {
            -webkit-touch-callout: default;
            -webkit-user-select: text;
            -khtml-user-select: default;
            -moz-user-select: text;
            -ms-user-select: text;
            user-select: text;
        }
        .snapShot {
            cursor: pointer;
        }
    }
</style>