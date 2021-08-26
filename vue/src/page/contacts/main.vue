<template>
    <div class="contacts block">
        <div class="tree">
        <ContactsTree 
        @onContactSelected="eventNodeClick"
        mode="user|department"
        ></ContactsTree>
         </div>
         <div class="content">
            <Userprofile 
            v-if="userid"
            :userid="userid">
            </Userprofile>
            <Partyinfo v-else-if="partyid" :partyid="partyid">
                <div class="content_desc">{{partyName}}</div>
            </Partyinfo>
            <div v-else class="content_desc">组织架构树</div>
         </div>
    </div>
</template>
<script>
import {get} from 'axios';
import ContactsTree from '../../components/contactsTree.vue';
import Userprofile from './userprofile.vue';
import Partyinfo from './partyinfo.vue'
export default {
    name: 'contextManage',
    components: {
        ContactsTree,
        Userprofile,
        Partyinfo
    },
    data() {
        return {
            props:{
                label:'name',
                isLeaf:'leaf'
            },
            userid:'',
            partyName: '',
            partyid: ''
        }
    },
    methods: {
        async eventLoadNode(node ,resolve){
            let id ;
            if(node.level === 0){
                id = 1;
            }
            else{
                id = node.data.id;
            }
            let {data} = await get('api/department/list',{
                params:{
                    id
                }
            });
            return resolve(data  || []);        
        },
        eventNodeClick(data){
            this.userid = '';
            this.partyName = '';
            this.partyid = '';
            if(data.type == 'user'){
                this.userid = data.id || ''
            }
            if(data.type === 'department') {
                this.partyName = data.name;
                this.partyid = data.id;
            }
        }
    },
}
</script>
<style  scoped>
.contacts{
    display: flex;
}
.tree{
        border: 1px solid #e9eaeb;
        width:200px;
    }
.content{
    flex: 1;
    border: 1px solid #e9eaeb;
    border-left: 1px solid transparent;
    height: 680px;
}
.content_desc {
    width: 100%;
    font-size: 48px;
    text-align: center;
    line-height: 623px;
    color: #333;
}

.node-item{
    color:#555;
    padding:2px 0;
    font-size: 14px;
}
</style>