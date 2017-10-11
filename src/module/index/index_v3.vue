<template>
    <section class="wrap w100 bg-default">
        <HeaderLayout></HeaderLayout>
        <section class="w c-h pdt5">
            <ul>
                <li class="article-item shadow mg10 bg-white" v-for="item in icons">
                    <a class="article-item-header clickable"
                       :href="item.masterHref" target="_blank">
                        <img :src="item.icon"/>
                    </a>
                    <div class="article-item-content clickable">
                        <h2>
                            <a :href="article(item).href" target="_blank">{{article(item).title}}</a>
                        </h2>
                        <p class="mgt10" v-if="article(item).desc">
                            <span>{{article(item).desc}}</span>
                        </p>
                        <p class="mgt10 text-gray" v-if="article(item).ref||article(item).lang">
                            <span v-if="article(item).ref"
                                  class="pdr20"><em
                                    style="background-color: #0366D6;"></em>来源：{{article(item).ref === 'source' ? '站内项目' : '站外大牛'}}</span>
                            <span v-if="article(item).lang" class="pdl20"><em style="background-color: #B07219;"></em>语言：{{article(item).lang}}</span>
                        </p>
                        <div class="image mgt10" v-if="article(item).image">
                            <img :src="article(item).image"/>
                        </div>
                        <p class="mgt10 text-gray">
                            <span>{{article(item).create}}</span>
                        </p>
                    </div>
                    <a class="article-item-footer clickable" :href="item.href">查看更多</a>
                </li>
            </ul>
        </section>
    </section>
</template>
<script>
    import project from '../../resource/project.json';
    import toutiao from '../../resource/toutiao.json';
    import wechat from '../../resource/wechat.json';
    import { HeaderLayout } from '../../../utils/web/Components';
    import {} from '../../../utils/web/Utils';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        props: [],
        data () {
            return {
                icons: [
                    {
                        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAPFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQLyYwAAAAE3RSTlMAwEDwEICgYDCQsCBQ4N9wz9BvmYPdhgAABBVJREFUeNrtmtl2nDAMhmXLO8vA6P3ftU1P0jQFIWzLk5t8lwxn/CNrBUMbNvpijFnpN6sxpvho4UVYb1Y6ZTV+tIr0LCRQngkGMfmVbrH6CdRx0VAFJjrd5T1SJej1JEyBWsA8DV5eJihI8Egd4LM36DfqZLM9vpdJgeyaHx9JBWw0gic1WjzBFVKkVG9DWkmVNUEVEUkZnKvWpwFErfXHK3jSIJ6Dw0/moW9//V2YaShiLCSkoWAS1x8MTnDFRsPZ4IJMLyBrOaC+Izo8CVxnHwGpCQzROngcr3Ol0Rxv/TBNoWrCx4Me5Rs45UEHgtwby1NB4PKRvAE0NzaI3l2nVnQ3I+DrfckcbPnG8erXUJ/uRUKiI8shTJDeQOOj/ZLSrI3ZINN5IB1JjAdKzuLKnmcHDFMMe3Ftfx2ZlKFBuVMXVzrBgwqeZBNYerUAssI2DRdgeAPoCxBNUIYKYJJoYVIFY6UODJ0zMVXgkw1UQLFHXonBgQKT2Bul+tZBZ85LYiMWdHyQI0s7sOhsARIDfiYBzkQKyAt4olFpQNrjx2WY7qCFW+gqFxEJqXJgIFztkAFF9ouH9HwOGG8Cz7vAAqogb+aVSxKqBD4bj8wB8tjJFgIEXfjntEIMDI6DGTznnspkbp3AJUllPOfrRkiDg73QvEyA/RHAZSL6XgH0I+BlAmZWwPcmIgL83lSMXBgWUMYIeWB4NdwqBRAoQ5yA8JqOyLLTp39NGHi2LY6sNFUKnRNZ2yBo4vjxa6LvHEzIAeAr9qBc2NkQwwRa8GY2jH9qz0aBGPzVpzJ0ww1A8+WvQa8OcDhmZtFtCmbiWIS3dOvgt2SUmTStWhPdRpKJiSfoRICQbctIBYF4yp1v1sV12d/cOtCB0hmoMcfh8GAmBt9oBCf8bzh8NeVYY99BWLnpWuiTYq315n8Jz6ky+DOSwM6U6/fdMwdvjO726s+t9kzRcmwGH3Rgy7NoiBTDSndY2MML/vJID5rAOWXyZms91uXw5Pt/qh3bAt0H3UXbjOmqkzMtdVd+iuVMQals1RJxyO/C45mBHDLpo3sTomQ+w4ZC0jiLZ2TzReaRlprvAnW9Vj710lBXn0vHcTK3nLpprhpa/S0PdHdG6PXv5S+VYro/htc3u5lx1Dksf4TfKAe27zzf3t2RJhLZgcdh91hwPwfLFtyGCEgVg7wfICBWvVCM6gJyZSMflQWE6rcZxWkKCA3dNEY9AcU1jVMYPk8QprlDQOgY6NC8sRFRu4Cg8HK9R0CGKqKGgI544lvitlqASW2ybqqGxkELXkuAh0bSriFgT9CO7xfgoYup9AkoE/RiF66fkwUsFjSI/0pI9wUsEbSYTX0iMjNoYgPeS+jhvYBZ0MbFnZbsxNvyQnt0cJdfksYMyLH9y7IAAAAASUVORK5CYII=',
                        articles: project,
                        href: '/article/project.html',
                        masterHref: 'https://github.com/ChangedenCZD'
                    },
                    {
                        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAQlBMVEUAAADZHATYHgbYHQXfEADYHQXYHgbXGADYHgXaGwXYHgXYHQbXHQXYHgXYHAXZHQXYHgXZHQPYHQXYHgXYHQXYHgbbGJcaAAAAFXRSTlMAP4DAEGDgIPAw77Cgz5CfcE/Qb4/MFc2JAAAD2klEQVR42u2Z7ZKrIAxAA1EQ0frR8v6vetlqTSkUcFe7d2Y5/zqDzSFGCQiFQqFQKBQKhcKfRjLG4GNIZrlyC1p6swLnoGywiVsGtAjznkOiPeZ2o2jZfC+T29xa81P23bcTAKJilpqifQZYUml+DTD7KAJFoAjE6LrfFRAVSN78osAEliqkINDCLTVjDM4S0LBSa7zwLyZmqeCFswQaCWGOFRCIswkywskCHYMFZkLMcLYAh6iAglxYrgDiDoELHCegt8qtulwB8VLr1dZJ8Ue3wfIzMMEGZgpQd39DYeIpkkmBVtJMmiwBDQ94+BG9yKfspGugp4SqHIFmGy/bUHju3KA6owgHGj5mCIxPt6yudTR8xbPWgho2uqQA0uTuoyQX78O3mYuRomvmlICWj6EtPsZ0TSC8HPJXw5aulE2yCPvrffjFSPKu9ZwMTwI+PWywnDehnoDRGMILnxagQpTLTunWRgUIkRf+8LWAEFcJAdiwuyNCxI5zzBYgdO11IFU9xwRid7/OFiDEBD7yIiICkZfAZa+AqOENU5cQCK/tmBZIh6cnMyXgvwSqxhfIDC8Z8x2+ulTuCcTKQPkCWeHr/msmgwIfTyDe4IxJgQax4y/hxTaXukoKpFej9GLkhSfaYfqGQOusRnsEKDzR3lSmACHc1SgtQOGDCC4zBaiolrZSY5+bAQov7rtA5XaVyO//iOKgtaBBRFegFr4T+h3a9wXo8FI+/33P7lzpjx0BxHWvyixqxy3A9coxtMUlgVdmRM1riBATwHG1TEMCzX3fH9LcL8BhH+jm+w8K9B8WoA8hmj4WpAToHH69UOQI0IVAsNaEwEBAejVhu+eUbLh73p6mN8KGbAVbqJyde08fbCzmjpvvy/KYALDdXbF2bzhzOhUftHSzL0A9XkwgcfAwuNnmxmWmDZonYBR57xNQboccSwGjkL4AideZAl4BKDuvWApwE2s9AafBQU8gqwAqWwDRFDC6yyEB6nOVJ5BVANpYIino6ATIE6ABZJgloNzONJoC+dJB+pbsTfFAVgGEXztjOAFhAWr1pzyBjgJVwr3bG8JPgC/gTwhjAjNixy0TEPptC+gn4L0A1aF8L3ABwsl0PAXSUw1VqmYLVy52rYbMezpeU9D5Q5eflsHESQtUbWzbJJ4ToHqSNMQPBTB8FqSYZTlEaRHxqM92OtC+nAwEK/zR+HBtToQEiJxs/r9fTotAESgCRSCDBi2PT/vK+5R8Vrh1Z+ZxtMCMazsVPi45XGA9RFpP5L7N3umNNL1jeB9OP7Ip4RxIQLi1WSgUCoVCoVAofJR/OyNP6sF8xV8AAAAASUVORK5CYII=',
                        articles: toutiao,
                        href: '/article/toutiao.html',
                        masterHref: 'http://files.changeden.net/images/toutiao_qrcode.png'
                    },
                    {
                        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAP1BMVEUAAAAAzwAAxwAAxwAAxwAAxwAAxwAAxwAAxwAAygAAxwAAxgAAxwAAxgAAxgAAxgAAxwAAxgAAxwAAyAAAxwDza8MhAAAAFHRSTlMAEPCAwGBA0CAwoJBQcLDg36+fbwhHrjIAAAOVSURBVHja7dpZbuMwDABQUrss7+H9zzofKcpOR5YrUa4xgN+vW5CxqI0JPB6Px+O/EhzCHdxLG0OfVrNpG+F34Jg85Rnt4GLhtVGR2ixcx3H0ArVf9B7sSj/l7U3h2do5hXGlWuvYsfQ2amEC9PFS1Ea9usz7ndoZBKnoSUI5aXxFQlY2+UguCePL7e2zn/rY28f/1gyCLL68Ej11FKGapp4UQiVHOWZy0U0LHRlGF1zKjd0GldbSsjZQlg8fq3du9Co3xykXn3e3Oft6eP9Q0kFAVf4MkTKwXEBaWoEKvlCZ8QfmpHWo8m+YmZNPKNwULJ0l4MsJBMrBpinAAv8B5uYAsFG2HsbTfdVSuUiH/DRtm4PMlrcJFc+20SjdBbb4rnFFefo9Si86MMGPIB1bN72vdMzv2ig6MrdsA3KLSfpDQwnIqHlq2IiHXp88fQse4GcM9TA7bqckw3VtjLbh+gSGjxgxmYM+BpY2Aqk5vKMXJ4w5zIGE/PvlW08nVApXJJCwoqGxh94JKFfZ0EjY6zzOx0LcqlIe+8wC7gdYRXU27JAAn8oSVVsjfJWokeEjuejuZlvHHzl+tRewQE0Ux2+xi5fCyPGlnZSZGkziC7XlImgswJ1kRskYxA4dHYXtRxLN98l2fPdxLblvJDe1LoY6n/RiEaJWuQfAD3KDEKkOZnP2yP2K4gOW2qpgyL+AcNBtUHjchghNPTqXXTsG3l3OHjDdcjlYAEKxJeKOHujCVDRVi+hEpTegT98As9wmqlnBfKmphetpDbC54YqIfJ/NFvt+cATCbNr15wJzuAr7ESDY9eDBSx1VdGUhzn37ulP1NVXzJOxhqL4ojzxlejDVX9o4wV3mvJVlGxIQgr85dXMCgOamBJi+pwYYnibge8+CqkJ0wml43kycT5eudMFKyLBhN+76DZ89H7RI3aiTETBL9l+W7lsBw2/tP3R69t9f2kC9uNwIcPhPbtTJGONJGTPygUBsyYwAhy9YrpsDHL5EX/YC7Gl4Pl/KjZkR4PBF+qJlGDl8GS4kpiL8I4Rf/MXJBCKzfBuSkA+CR7j1Z1cqgJgVFqCcFcaXs8L4cva++HyPqOY7xm/pWM8IfWnhGUgumIYueV92aXgDd6Wg4CJuaDiH9oV2VpSljOZSTXAlN83fBsMP759VhIHeVrhcdJN+cxGYM9yhvolb2k5CnWeLgTuhVoRwKxwsPB6Px+PxxR/F9me9wWp6ggAAAABJRU5ErkJggg==',
                        articles: wechat,
                        href: '/article/wechat.html',
                        masterHref: 'http://files.changeden.net/images/wechat_qrcode.png'
                    }
                ]
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
            article (item) {
                return item.articles[0];
            }
        },
        computed: {
            ...mapGetters({
                bodyWidth: 'bodyWidth'
            })
        },
        components: {
            HeaderLayout
        }
    };
</script>
<style lang="scss" scoped>
    @import '../../scss/default.scss';
    @import '../../assets/css/common/material-design.css';

    .wrap {
        margin-top: 49px;
    }

    .article-item {
        max-width: 800px;
        margin: $s10 auto;
    }

    .article-item-header img {
        width: 36px;
        height: 36px;
        display: table-cell;
    }

    .article-item-header,
    .article-item-content,
    .article-item-footer {
        padding: 12px;
        border-bottom: $borderStyle;
        display: block;
    }

    .article-item-content {
        h2 {
            padding: 5px 0;
        }
        em {
            width: 7px;
            height: 7px;
            margin-right: 7px;
            display: inline-block;
            border-radius: 50%;
        }
        .image {
            text-align: center;
        }
    }

    .article-item-footer {
        font-size: 12px;
        padding: 6px 12px;
    }

</style>