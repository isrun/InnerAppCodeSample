<template>
    <div class="auth">
        <h2 style="margin:1em 0">身份验证</h2>
        <t-table stripe bordered row-key="title" :data="cells" :columns="columns" />
        <h2 style="margin:1em 0">网页授权登录<span style="font-weight:normal;font-size:13px;color:#555">（仅在企业微信中使用）</span></h2>        
        <div>
            <t-button theme="primary" @click="eventLogin" variant="base">登录跳转</t-button>
        </div>

        <h2 style="margin:1em 0">扫码授权登录<span style="font-weight:normal;font-size:13px;color:#555">（仅在浏览器中使用）</span></h2>        
        <div>
            <t-popup :visible="visible" placement="right" showArrow>
                <t-button theme="primary" @click="eventQrLogin" variant="base">扫码跳转</t-button>
                <template #content>
                    <div slot="content" id="qr_login" style="padding:20px 0 10px"></div>
                </template>
            </t-popup>
        </div>


    </div>
</template>

<script>
import { get } from 'axios';


export default {
    data() {
        return {
            columns: [
                {
                    colKey: 'title',
                    title: 'Title',
                    width: 200
                },
                {
                    colKey: 'value',
                    title: 'Value'
                }
            ],
            cells: [],
            globalData: {},
            visible: false
        }
    },
    methods: {
        initData() {
            const globalData = this.globalData
            this.cells = [
                {
                    title: '网站根路径\n(须与可信域名一致)',
                    value: globalData.config.site_base
                },
                // {
                //     title: '应用主页',
                //     value: globalData.config.site_base + globalData.config.home_path
                // },

                {
                    title: '授权后跳转页面\n(在企业微信客户端中打开)',
                    value: globalData.redirect_uri
                },
                {
                    title: '网页授权连接',
                    value: globalData.login_url
                },
            ]
        },
        eventLogin() {
            location.href = this.globalData.login_url
        },
        eventQrLogin() {
            this.visible = !this.visible
            if(!this.visible) return;
            setTimeout(() => {
                window.getQRCode({
                    "id": "qr_login",
                    "appid": this.globalData.config.corp_id,
                    "agentid": this.globalData.config.agent_id,
                    "redirect_uri": encodeURI(this.globalData.redirect_uri),
                    "state": "hellowecom",
                    "href": "",
                    "lang": "zh",
                });
            }, 100);
        }
    },
    async mounted() {
        const { data } = await get('api/config');
        this.globalData = data;
        this.initData();

    }
}
</script>

<style>
.auth {
    padding: 40px;
}
</style>