<template>
    <section class="imageToBase64Layout mg20 pd10 bg-white">
        <h4 class="toolLayoutTitle pdl10 pdr10">图片转Base64</h4>
        <section class="toolLayoutBody mgt10" style="display: none;">
            <p>
                <button class="shadow mg10" type="orange" @click="choose">选择图片</button>
            </p>
            <p class="mgt10 mgl10">注：图片太大可能需要长时间等待，如果转换失败，请更新浏览器或选择Chrome。</p>
            <section class="toolLayoutInfo mg10" v-if="imageData">
                <p><img class="preview" :src="imageData"/></p>
                <p><textarea class="result w100 pd5" v-model="imageData"></textarea></p>
                <p><span>数据长度：{{imageData.length}}</span></p>
            </section>
            <input class="hidden" type="file" name="imageFile" accept="image/*" v-on:change="parse"/>
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
                imageData: ''
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
            choose () {
                this.$el.querySelector('input').click();
            },
            parse (e) {
                let self = this;
                let file = self.imageFile = e.target.files[0];
                let reader = new window.FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = function () {
                    self.imageData = this.result;
                };
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

    .imageToBase64Layout button {
        width: rem(120px);
        height: rem(40px);
    }

    .imageToBase64Layout .preview {
        max-width: rem(300px);
        display: table-cell;
    }

    .imageToBase64Layout .result {
        height: 240px;
        display: table-cell;
    }

    .toolLayoutInfo p {
        margin-top: $s10;
    }

</style>