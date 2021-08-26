<template>
  <el-popover
    placement="bottom-start"
    v-model="visible"
    width="344"
    height="260"
    :visible-arrow="false"  
    popper-class="contacts-picker"
    trigger="click">
      <ContactsTree        
        @onContactSelected="eventContactSelected"
       ></ContactsTree>
       <ContactsTag slot="reference" ></ContactsTag>
      
  </el-popover>    
</template>

<script>
import ContactsTree from './contactsTree.vue';
import ContactsTag from './contactsTag.vue';
export default {
  data(){
    return {
      visible:false,
      user:''
    }
  },
    components:{
      ContactsTree,
      ContactsTag
    },
    methods:{
      eventContactSelected(data){
        console.log(data);
        this.user = data.name;
        this.visible = false;
        
      }
    }
}
</script>


<style>
.contacts-picker{
  
  height: 300px;
  overflow: auto;
  margin-top: 0px !important;
}
</style>