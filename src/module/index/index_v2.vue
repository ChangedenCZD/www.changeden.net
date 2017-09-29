<template>
    <section class="wrap h100 w100 bg-default">
        <NavigationBar></NavigationBar>
        <section class="body h100 w100">
            <section class="column h100 w100">
                <ColumnLayout v-for="(item,index) in columns" :class="[isActive(index)]"
                              :title="item.title"
                              :target="index"
                              :datas="item.datas"
                              :qrcode="item.qrcode"
                              :titleClick="columnChange"
                              :style="{'z-index':computeIndex(index)}"
                ></ColumnLayout>
            </section>
        </section>
    </section>
</template>
<script>
    import columns from '../../resource/index_columns.json';
    import { NavigationBar, ColumnLayout } from '../../../utils/web/Components';
    import {} from '../../../utils/web/Utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {
                columns,
                currentColumn: 0
            };
        },
        created () {
            this.$nextTick(() => {
                let columns = this.$el.querySelectorAll('.columnLayout');
                let parentNode = this.$el.querySelector('.column');
                let height = parentNode.offsetHeight - (60 / 24) * window.fontSize;
                let width = Math.min(parentNode.offsetWidth, 600);
                columns.forEach((item, index) => {
                    item.style.left = (index * 8 + 0.5) + 'rem';
                    item.style.height = height + 'px';
                    item.style.width = width + 'px';
                });
            });
        },
        updated () {
        },
        watch: {
            bodyWidth () {
                /* function trim (str) {
                 str = str.replace(/[ | ]*\n/g, '\n');
                 str = str.replace(/\n[\s| | ]*\r/g, '\n');
                 str = str.replace(/ /ig, '');
                 return str.replace(/[\r\n]/g, '');
                 }

                 let els = document.querySelectorAll('#user-repositories-list .public');
                 let array = [];
                 els.forEach((item) => {
                 let a = item.querySelector('a') || {};
                 let title = trim(a.innerHTML || '');
                 let href = 'https://github.com' + a.href;
                 let p = item.querySelector('p') || {};
                 let desc = trim(p.innerHTML || '');
                 let m = item.querySelector('.mt-2 .mr-3') || {};
                 let lang = trim(m.innerHTML || '');
                 let ref = item.classList[item.classList.length - 1];
                 let t = item.querySelector('relative-time') || {};
                 let create = trim(t.getAttribute('title') || '');
                 array.push({
                 title: title,
                 desc: desc,
                 lang: lang,
                 ref: ref,
                 href: href,
                 create: create
                 });
                 });
                 console.log(array); */
            }
        },
        methods: {
            ...mapActions([]),
            isActive (column) {
                return column === this.currentColumn ? 'active' : '';
            },
            columnChange (column) {
                this.currentColumn = column;
            },
            computeIndex (column) {
                let currentColumn = this.currentColumn;
                let length = this.columns.length;
                switch (currentColumn) {
                case 0:
                    return length - column;
                case 1:
                    return column === currentColumn ? 2 : 1;
                case 2:
                    return column + 1;
                }
            }
        },
        computed: {
            ...mapGetters({
                bodyWidth: 'bodyWidth'
            })
        },
        components: {
            NavigationBar,
            ColumnLayout
        }
    };
</script>
<style lang="scss" scoped>
    @import '../../scss/default.scss';
    @import '../../assets/css/common/material-design.css';

    .wrap {
        position: relative;
    }

    .body {
        position: absolute;
        left: 0;
        top: 0;
        padding-left: rem(120px);
    }

    .columnLayout {
        position: absolute;
        top: $s70;
        animation: hidden 0.2s linear alternate;
    }

    .columnLayout:hover,
    .columnLayout:active,
    .columnLayout.active {
        top: $s60;
        animation: active 0.2s linear alternate;
    }

    .columnLayout.active {
        z-index: 10;
    }

    @keyframes active {
        0% {
            top: rem(70px);
        }
        25% {
            top: rem(68px);
        }
        50% {
            top: rem(65px);
        }
        75% {
            top: rem(62px);
        }
        100% {
            top: rem(60px);
        }
    }

    @keyframes hidden {
        0% {
            top: rem(60px);
        }
        25% {
            top: rem(62px);
        }
        50% {
            top: rem(65px);
        }
        75% {
            top: rem(68px);
        }
        100% {
            top: rem(70px);
        }
    }
</style>