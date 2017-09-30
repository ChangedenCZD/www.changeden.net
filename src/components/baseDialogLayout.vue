<template>
    <section class="baseDialogLayout h100 w100 bg-default global-layout" v-if="isShow" @click.self="bodyClick">
        <section class="dialogArea bg-w shadow"
                 :style="{'margin-top':dialogAreaTop}">
            <h4 class="title" v-if="title">{{title}}</h4>
            <p class="content" v-if="content">
                <span>{{content}}</span>
            </p>
            <ul class="itemList overScroll" v-if="itemList&&itemList.length>0">
                <li class="itemListCell clickable"
                    v-for="(item,index) in itemList"
                    @click="onItemSelected(item,index)"
                    :class="[itemSelected[index + '']?'itemSelected':'']"
                >
                    <span>{{item}}</span>
                </li>
            </ul>
            <section class="inputArea pdl20 pdr20" v-else-if="isInput">
                <input class="input w100 mgb10"
                       :placeholder="inputHint"
                       :maxlength="inputMaxLength"
                       v-model="inputContent"
                />
                <p class="inputLength mgb20 text-orange">
                    <span>{{inputContent.length + '/' + inputMaxLength}}</span>
                </p>
            </section>
            <section class="btnArea" v-if="!this.onSingleSelected">
                <span v-if="positiveText" @click="invoke('onPositive')"
                      :style="{opacity:(!isInput||(isInput&&isInputContentPass)?1:0.6)}">{{positiveText}}</span>
                <span v-if="negativeText" @click="invoke('onNegative')">{{negativeText}}</span>
                <span v-if="neutralText" @click="invoke('onNeutral')">{{neutralText}}</span>
            </section>
        </section>
    </section>
</template>
<script>
    import {} from '../../utils/web/Components';
    import { TextUtils } from '../../utils/web/Utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: ['options', 'isShow'],
        data () {
            return {
                // 基本内容
                title: '', // 标题
                content: '', // 显示的文本
                // 选择内容
                itemList: [], // 显示的列表
                minSelected: 1, // 最少选择多少个
                // 输入内容
                inputHint: '', // 文本输入框提示
                inputMinLength: 0, // 文本输入框最小输入数
                inputMaxLength: 10, // 文本输入框最大输入数
                inputContent: '', // 文本输入内容
                // 按钮内容
                positiveText: '确认', // positive按钮文字
                negativeText: '', // negative按钮文字
                neutralText: '', // neutral按钮文字
                // 状态
                isSelect: false, // 是否为选择模式
                isMultiple: false, // 是否为多选模式 false为单选模式
                isInput: false, // 是否为输入模式
                isOutsiteDismiss: true, // 点击空白处是否可隐藏,
                isAutoDismiss: true, // 操作后是否自动隐藏
                // 代理方法
                onHide: null, // 隐藏对话框
                onWarn: null,
                onPositive: null, // 确认按钮点击
                onNegative: null, // 取消按钮点击
                onNeutral: null, // 中立按钮点击
                onSingleSelected: null, // 单选模式下有效
                // 标识
                target: null, // 用于标识行为执行者
                // 辅助
                dialogAreaTop: 'auto',
                itemSelected: {}
            };
        },
        created () {
            this.setConfig();
        },
        updated () {
        },
        watch: {
            isShow () {
                this.setConfig();
            },
            options () {
                this.setConfig();
            }
        },
        methods: {
            setConfig () { // 配置分析
                let option = this.options || {};
                // 基本内容
                this.title = option.title || ''; // 标题
                this.content = option.content || ''; // 显示的文本
                // 选择内容
                this.itemList = option.itemList || []; // 显示的列表
                // 输入内容
                this.inputHint = option.inputHint || ''; // 文本输入框提示
                this.inputContent = option.inputDefaultContent || ''; // 文本输入框默认内容
                this.inputMinLength = option.inputMinLength || 0; // 文本输入框最小输入数
                this.inputMaxLength = option.inputMaxLength || 10; // 文本输入框最大输入数
                // 按钮内容
                this.positiveText = option.positiveText || '确认'; // positive按钮文字
                this.negativeText = option.negativeText || ''; // negative按钮文字
                this.neutralText = option.neutralText || ''; // neutral按钮文字
                // 状态
                this.isSelect = this.itemList.length > 0; // 是否为选择模式
                this.isInput = !!this.inputHint; // 是否为输入模式
                this.isOutsiteDismiss = option.outsiteDismiss === undefined ? true : option.outsiteDismiss; // 点击空白处是否可隐藏;
                this.isAutoDismiss = option.autoDismiss === undefined ? true : option.autoDismiss; // 操作后是否自动隐藏
                this.itemSelected = {};
                // 代理方法
                this.onHide = option.onHide || null; // 隐藏对话框
                this.onWarn = option.onWarn || null; // 显示提醒内容
                this.onPositive = option.onPositive || null; // 确认按钮点击
                this.onNegative = option.onNegative || null; // 取消按钮点击
                this.onNeutral = option.onNeutral || null; // 中立按钮点击
                if (this.isSelect) { // 为选择模式
                    this.onSingleSelected = option.onSingleSelected || null; // 单选模式下有效
                    if (this.onSingleSelected) { // 如果实现了 onSingleSelected 则为单选模式
                        this.positiveText = '';
                        this.isMultiple = false;
                    } else { // 为多选模式 false为单选模式
                        this.positiveText = this.positiveText || '确认';
                        this.isMultiple = true;
                        this.minSelected = option.minSelected || 1; // 最少选择数
                    }
                } else {
                    this.isMultiple = false;
                }
                // 标识
                this.target = option.target || null; // 用于标识行为执行者
                this.$nextTick(() => { // 控制对话框位置
                    if (this.$el && this.$el.querySelector) {
                        this.dialogAreaTop = (window.document.body.offsetHeight - this.$el.querySelector('.dialogArea').offsetHeight) / 2 + 'px';
                    }
                });
            },
            onItemSelected (item, index) { // 选项选择事件
                if (this.isMultiple) { // 如果为多选，则变成选中
                    this.itemSelected[index + ''] = !(this.itemSelected[index + ''] ? this.itemSelected[index + ''] : false);
                    this.itemList = JSON.parse(JSON.stringify(this.itemList));
                } else if (this.onSingleSelected) {
                    this.onSingleSelected(this.target, item, index);
                    this.autoHide();
                }
            },
            autoHide () { // 执行自动隐藏事件
                if (this.isAutoDismiss) {
                    this.hide();
                }
            },
            hide () { // 执行隐藏事件
                if (this.onHide) {
                    this.onHide(this.target);
                }
            },
            warn (msg) { // 执行异常警告
                if (this.onWarn) {
                    this.onWarn(this.target, msg);
                }
            },
            invoke (action) { // 执行事件
                let selectedIndexList = [];
                if (action === 'onPositive') { // 点击了确认按钮
                    if (this.isMultiple) { // 如果为多选模式
                        for (let key in this.itemSelected) {
                            if (this.itemSelected[key]) {
                                selectedIndexList.push(parseInt(key));
                            }
                        }
                        if (selectedIndexList.length < this.minSelected) { // 至少选择一个
                            this.warn('最少选择' + this.minSelected + '个选项');
                            return false;
                        }
                    } else if (this.isInput) { // 如果为输入模式
                        if (!this.isInputContentPass) {
                            this.warn('请输入' + this.inputMinLength + '~' + this.inputMaxLength + '个字符');
                            return false;
                        }
                    }
                }
                if (this[action]) {
                    if (action === 'onPositive') {
                        this[action](this.target, this.inputContent, selectedIndexList);
                    } else {
                        this[action](this.target);
                    }
                    this.autoHide();
                } else {
                    console.log('请实现' + action);
                    this.hide();
                }
            },
            bodyClick () {
                if (this.isOutsiteDismiss) {
                    this.hide();
                }
            }
        },
        computed: {
            isInputContentPass () { // 验证文本长度
                return TextUtils.checkLength(this.inputContent, this.inputMinLength, this.inputMaxLength);
            }
        },
        components: {}
    };
</script>
<style lang="scss" scoped>
    @import '../scss/default.scss';
    @import '../assets/css/common/material-design.css';

    .baseDialogLayout {
        background-color: rgba(0, 0, 0, .7);
        z-index: 997;
    }

    .dialogArea {
        padding: rem(20px);
        border-radius: rem(5px);
        margin: auto auto;
        min-width: rem(350px);
        max-width: rem(500px);
    }

    .title {
        margin-bottom: rem(20px);
        font-size: rem(23px);
    }

    .content {
        font-size: rem(20px);
        padding: rem(10px) rem(20px) rem(5px);
        margin-bottom: rem(10px);
    }

    .itemList {
        margin-bottom: rem(10px);
        max-height: rem(260px);
    }

    .itemListCell {
        padding: 0 rem(20px);
        height: rem(50px);
        line-height: rem(50px);
        cursor: pointer;
        border-bottom: 1px solid #f1f1f1;
    }

    .itemListCell.itemSelected {
        color: white;
        background-color: $orange;
        opacity: 0.85;
    }

    .input {
        height: rem(60px);
        line-height: rem(60px);
        padding: 0 rem(5px);
        border-bottom: 1px solid $orange;
        color: #4b4b57;
    }

    .inputLength {
        text-align: right;
        font-size: rem(16px);
    }

    .btnArea {
        height: rem(40px);
        color: $orange;
    }

    .btnArea span {
        float: right;
        height: rem(40px);
        line-height: rem(40px);
        width: rem(60px);
        margin: 0 rem(10px);
        text-align: center;
        cursor: pointer;
    }

</style>