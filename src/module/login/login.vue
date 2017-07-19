<template>
    <section class="h100 w100 bg-default global-layout">
        <PcHeader></PcHeader>
        <section class="loginLayout h100 w100">
            <section class="loginArea bg-w shadow" :style="{'margin-top':loginAreaTop}">
                <h4>账号</h4>
                <input class="input account w100 mgt10 mgb10" type="text"
                       placeholder="请输入账号"
                       :maxlength="accountMaxLength"
                       v-model="account"/>
                <p class="length mgb20 text-orange">
                    <span>{{account.length + '/' + accountMaxLength}}</span>
                </p>
                <h4>密码</h4>
                <input class="input password w100 mgt10 mgb10" type="password"
                       placeholder="请输入登录密码"
                       :maxlength="passwordMaxLength"
                       v-model="password"/>
                <p class="length mgb20 text-orange">
                    <span>{{password.length + '/' + passwordMaxLength}}</span>
                </p>
                <button class="submit shadow w100" type="orange"
                        :style="{opacity: (isValid?1:0.5)}"
                        @click="signIn"
                >登录
                </button>
            </section>
        </section>
        <BaseDialogLayout :isShow="isShowDialog" :options="dialogOptions"></BaseDialogLayout>
        <LoadingLayout></LoadingLayout>
        <ToastLayout></ToastLayout>
    </section>
</template>
<script>
    import { PcHeader, BaseDialogLayout, LoadingLayout, ToastLayout } from '../../utils/Components';
    import Numbers from '../../../secret/number.json';
    import {} from '../../utils/Utils';
    import * as UsersUtils from '../../../utils/UsersUtils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {
                account: '',
                password: '',
                accountMaxLength: 10,
                passwordMaxLength: 10,
                loginAreaTop: 'auto',
                dialogOptions: {},
                isShowDialog: false
            };
        },
        created () {
            this.accountMaxLength = Numbers.accountMaxLength;
            this.passwordMaxLength = Numbers.passwordMaxLength;
            this.fixAreaTop();
            this.showToast('1231321asdf');
        },
        updated () {
            this.fixAreaTop();
        },
        watch: {
            bodyWidth () {
            }
        },
        methods: {
            ...mapActions(['showToast', 'toggleLoading']),
            fixAreaTop () {
                this.$nextTick(() => {
                    let rootEl = this.$el.querySelector('.loginLayout');
                    let rootPdt = parseFloat(window.getComputedStyle(rootEl)['paddingTop']);
                    this.loginAreaTop = (rootEl.offsetHeight - this.$el.querySelector('.loginArea').offsetHeight) / 2 - rootPdt + 'px';
                });
            },
            signIn () {
                let accountResult = UsersUtils.checkAccountLength(this.account);
                let passwordResult = UsersUtils.checkPasswordLength(this.password);
                if (!accountResult.pass) {
                    console.log(accountResult.message);
                    this.showDialog(accountResult.message);
                } else if (!passwordResult.pass) {
                    console.log(passwordResult.message);
                    this.showDialog(passwordResult.message);
                } else {
                    console.log('signIn');
                }
            },
            showDialog (msg) {
                this.isShowDialog = true;
                this.dialogOptions = {
                    title: '提醒',
                    content: msg,
                    onHide: (target) => {
                        this.isShowDialog = false;
                        console.log(target);
                    },
                    onPositive: (target, inputContent) => {
                        console.log(target, inputContent);
                    }
                };
            }
        },
        computed: {
            ...mapGetters({
                bodyWidth: 'bodyWidth'
            }),
            isValid () {
                return UsersUtils.checkAccountLength(this.account).pass && UsersUtils.checkPasswordLength(this.password).pass;
            }
        },
        components: {
            PcHeader,
            BaseDialogLayout,
            LoadingLayout,
            ToastLayout
        }
    };
</script>
<style lang="scss" scoped>
    @import '../../scss/default.scss';
    @import '../../assets/css/common/material-design.css';

    .loginLayout {
        position: absolute;
        left: 0;
        top: 0;
        padding-top: $s60;
    }

    .loginArea {
        padding: rem(40px);
        max-width: rem(500px);
        border-radius: rem(10px);
        margin: auto auto;
        font-size: rem(22px);
    }

    .input {
        padding: 0 rem(10px);
        height: $s60;
        border-bottom: 1px solid $orange;
        font-size: rem(20px);
    }

    .submit {
        height: $s60;
        font-size: rem(22px);
    }

    .length {
        text-align: right;
    }
</style>