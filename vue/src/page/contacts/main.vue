<template>
    <div>
        <el-tree         
        lazy
        :load="eventLoadNode"
        :props ="props"        
        icon-class='el-icon-arrow-right'
         ></el-tree>
    </div>
</template>
<script>
import {get} from 'axios';
export default {
    name: 'contextManage',
    components: {
        
    },
    data() {
        return {
            props:{
                label:'name',
                isLeaf:'leaf'
            }
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

            console.log(data);
            return resolve(data  || []);
        
        }
    },
}
</script>