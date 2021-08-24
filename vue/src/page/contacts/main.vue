<template>
    <div class="contacts block">
        <div class="tree">
        <el-tree      
        lazy
        :load="eventLoadNode"
        :props ="props"
        @node-click="eventNodeClick"
         >
         <span class="node-item" slot-scope="{node,data}">
             <i v-if="data.type == 'department'" class="node-icon el-icon-folder"></i>
             <i v-if="data.type == 'user'" class="node-icon el-icon-user"></i>
             <span class="node-title">{{node.label}}</span>
         </span>
         </el-tree>
         </div>
         <div class="content">
             <userprofile :userid="userid"></userprofile>
         </div>
    </div>
</template>
<script>
import {get} from 'axios';
import userprofile from './userprofile.vue'
export default {
    name: 'contextManage',
    components: {
        userprofile
    },
    data() {
        return {
            props:{
                label:'name',
                isLeaf:'leaf'
            },
            userid:''
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
            console.log(data);
            if(data.type == 'user'){
                this.userid = data.id || ''
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
        width:200px;
    }
.content{
    flex: 1;
    /* background:#f1f1f1; */
    
}

.node-item{
    color:#555;
    padding:2px 0;
    font-size: 14px;
}
.node-title{
    padding-left:4px;
}



</style>