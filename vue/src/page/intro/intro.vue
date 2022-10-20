<template>
    <div class="intro">
        <h2 style="margin:1em 0">基本信息</h2>
        <t-table
            stripe
            bordered
            row-key="title"
            :data="cells"
            :columns="columns"
      />
    </div>    
</template>

<script>
import {get} from 'axios';


export default {
    data(){
        return {
            columns:[
                {
                    colKey:'title',
                    title:'Title',
                    width:150
                },
                {
                    colKey:'value',
                    title:'Value'
                }
            ],
            cells:[]
        }
    },
    methods:{
        initData(){
            const globalData = window.globalData             
            this.cells = [
                {
                   title:'CorpID',
                    value:globalData.config.corp_id
                },
                {
                   title:'AgentID',
                    value:globalData.config.agent_id
                },

                {
                   title:'AppSecret',
                    value:globalData.config.app_secret
                },
                {
                   title:'AccessToken',
                   value:globalData.access_token
                },
                {
                   title:'ExpireTime',
                   value:globalData.expire_time
                },
            ]
        }
    },

    async mounted(){
        const {data} = await get('api/config');        
        window.globalData = data;
        this.initData();
    }
}
</script>

<style>
.intro{
    padding:40px;
}
</style>