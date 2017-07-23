<template>
    <section class="appMain">
        <section class="operationLayout">
            <button type="orange" @click="showAlertDialog(true)">普通对话框(点击外部自动隐藏)</button>
            <button type="orange" @click="showAlertDialog(false)">普通对话框(点击外部不隐藏)</button>
            <button type="orange" @click="showConfirmDialog">确认对话框</button>
            <button type="orange" @click="showInputDialog">文本输入对话框</button>
            <button type="orange" @click="showSingleDialog">单选对话框</button>
            <button type="orange" @click="showMultipleDialog">多（复）选对话框</button>
        </section>
        <BaseDialogLayout :isShow="isShowDialog" :options="dialogOptions"></BaseDialogLayout>
        <ToastLayout></ToastLayout>
    </section>
</template>


<script>
    import { BaseDialogLayout, ToastLayout } from '../../../../utils/web/Components';
    import {} from '../../../../utils/web/Utils';
    import { mapActions } from 'vuex';

    export default {
        data () {
            return {
                dialogOptions: {},
                isShowDialog: false
            };
        },
        created () {
        },
        methods: {
            ...mapActions(['showToast']),
            showAlertDialog (isOutsiteDismiss) {
                this.showDialog({
                    title: '提醒',
                    content: '这是一个普通对话框',
                    onHide: this.hideDialog,
                    onWarn: this.warn,
                    onPositive: (target) => {
                        console.log(target);
                    },
                    outsiteDismiss: isOutsiteDismiss // 点击对话框外部是否自动隐藏
                });
            },
            showConfirmDialog () {
                let self = this;
                this.showDialog({
                    title: '请确认下一步操作',
                    content: '点击下一步按钮或上一步按钮',
                    onHide: this.hideDialog,
                    onWarn: this.warn,
                    positiveText: '下一步',
                    negativeText: '上一步',
                    onPositive: (target) => {
                        console.log(target);
                        self.showToast('点击了下一步按钮');
                    },
                    onNegative: (target) => {
                        console.log(target);
                        self.showToast('点击了上一步按钮');
                    }
                });
            },
            showInputDialog () {
                let self = this;
                this.showDialog({
                    title: '请确认下一步操作',
                    content: '请填写内容',
                    inputHint: '内容为10~20个字',
                    inputMinLength: 10,
                    inputMaxLength: 20,
                    onHide: this.hideDialog,
                    onWarn: this.warn,
                    positiveText: '确认',
                    negativeText: '取消',
                    onPositive: (target, inputContent) => {
                        console.log(target);
                        self.showToast('输入内容：' + inputContent);
                        // do sth. 验证字符串，调用 self.hideDialog() 隐藏对话框
                    },
                    onNegative: (target) => {
                        console.log(target);
                        self.hideDialog();
                    },
                    outsiteDismiss: false,
                    autoDismiss: false // 操作后不自动隐藏
                });
            },
            showSingleDialog () {
                let self = this;
                let itemList = ['选项A', '选项B', '选项C'];
                this.showDialog({
                    title: '选择',
                    content: '选择其中一项',
                    itemList: itemList,
                    onHide: this.hideDialog,
                    onWarn: this.warn,
                    positiveText: '提交',
                    onSingleSelected: (target, item, index) => {
                        console.log(target, item, index);
                        self.showToast('选择了：' + item + '；第' + (index + 1) + '个选项');
                    }
                });
            },
            showMultipleDialog () {
                let self = this;
                let itemList = ['帅气', '魁梧', '有钱'];
                this.showDialog({
                    title: '多选题',
                    content: '以下那一项最符合您的特质',
                    itemList: itemList,
                    onHide: this.hideDialog,
                    onWarn: this.warn,
                    onPositive: (target, inputContent, selectedIndexList) => {
                        console.log(target, inputContent, selectedIndexList);
                        let selectedList = [];
                        selectedIndexList.forEach((item) => {
                            selectedList.push(itemList[item]);
                        });
                        self.showToast('选择了：' + selectedList.join('，'));
                    }
                });
            },
            warn (target, msg) {
                console.log(target, msg);
                this.showToast(msg);
            },
            hideDialog (target) {
                this.isShowDialog = false;
                console.log(target);
            },
            showDialog (dialogOptions) {
                this.dialogOptions = dialogOptions;
                this.isShowDialog = true;
            }
        },
        mounted () {
        },
        components: {BaseDialogLayout, ToastLayout},
        computed: {}
    };
</script>
<style lang="scss" scoped>
    @import '../../../scss/default.scss';
    @import '../../../assets/css/common/material-design.css';

    .operationLayout button {
        height: $s50;
        padding: 0 $s20;
        min-width: $s120;
        margin: $s20;
        display: inline-block;
    }
</style>