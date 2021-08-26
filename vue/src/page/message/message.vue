<template>
<div>
    <div class="block">
        <el-form ref="form" :model="form" label-width="80px" style="width:450px;">
            <el-form-item label="消息类型">
                <el-select v-model="form.msgtype" placeholder="请选择消息类型">
                <el-option label="文本消息" value="text"></el-option>
                <el-option label="图文消息" value="image"></el-option>
                <el-option label="语音消息" value="voice"></el-option>
                <el-option label="视频消息" value="video"></el-option>
                <el-option label="文件消息" value="file"></el-option>
                <el-option label="文本卡片消息" value="textcard"></el-option>
                <el-option label="图文消息" value="news"></el-option>
                <el-option label="Markdown 消息" value="markdown"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="接收成员">                
                <ContactsPicker
                
                ></ContactsPicker>
            </el-form-item>

            <el-form-item label="接收部门">
                <el-input v-model="form.toparty"></el-input>
            </el-form-item>

            <el-form-item label="接收标签">
                <el-input v-model="form.totag"></el-input>
            </el-form-item>
            <el-form-item label="保密消息">
                <el-switch v-model="form.safe"></el-switch>
            </el-form-item>
            
            <el-form-item v-if="form.msgtype ==='text'" label="文本内容">
                <el-input type="textarea" v-model="form.text.content"></el-input>
            </el-form-item>
            <el-form-item v-if="form.msgtype ==='image'" label="上传图片">
                <el-upload
                    class="upload-demo"                    
                    drag
                    :data="{type:this.form.msgtype}"
                    action="api/media/upload"
                    :on-success="eventUploadSuccess"                    
                    name="media">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">发送</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>    
</template>

<script>
import ContactsPicker from '../../components/contactsPicker.vue'
import {post} from 'axios';
export default {
  
    props:{
        userid:String
    },
    components:{
        ContactsPicker
    },
    data(){
       return {
        form: {
          msgtype: 'text',
          touser: '',
          toparty: '',
          totag: '',
          safe: false,          
          text: {
              content:''
          },
          image:{
              media_id:''
          },
          voice:{
              media_id:''
          },
          video:{
              media_id:'',
              title:'',
              description:''
          },
          file:{
              media_id:''
          }
        },
        media_id:{}
        }
    },
    
    methods:{
        async onSubmit() {

            console.log(this.form);
            let {data} = await post('api/message/send',{            
                form:this.form
                
            })
            console.log(data);
            
        },
        eventUploadSuccess(response){
            try{
                let {media_id,type} = response;
                this.form[type]['media_id'] = media_id;
            }
            catch{
                this.$message.error('上传失败');
            }
            
        }
    }
    
}
</script>


<style scoped>
</style>