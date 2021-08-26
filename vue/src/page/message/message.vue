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
                    mode="user"
                    @onContactsChanged='eventUsersChanged'
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
                    :multiple='false'
                    :data="{type:this.form.msgtype}"
                    action="api/media/upload"
                    :on-success="eventUploadSuccess"                    
                    name="media">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div class="el-upload__tip" slot="tip">单个图片不超过 2MB，支持JPG,PNG格式</div>
                </el-upload>
            </el-form-item>
            <el-form-item v-else-if="form.msgtype ==='voice'" label="上传音频">
                <el-upload
                    class="upload-demo"                    
                    :multiple='false'
                    :data="{type:this.form.msgtype}"
                    action="api/media/upload"
                    :on-success="eventUploadSuccess"                    
                    name="media">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div class="el-upload__tip" slot="tip">单个文件不超过 2MB，播放长度不超过60s，仅支持AMR格式</div>
                </el-upload>
            </el-form-item>
            <el-form-item v-else-if="form.msgtype ==='video'" label="上传视频">
                <el-upload
                    class="upload-demo"                    
                    :multiple='false'
                    :data="{type:this.form.msgtype}"
                    action="api/media/upload"
                    :on-success="eventUploadSuccess"                    
                    name="media">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div class="el-upload__tip" slot="tip">单个文件不超过 10MB，支持MP4格式</div>
                </el-upload>
            </el-form-item>
            <el-form-item v-else-if="form.msgtype ==='file'" label="上传文件">
                <el-upload
                    class="upload-demo"                    
                    :multiple='false'
                    :data="{type:this.form.msgtype}"
                    action="api/media/upload"
                    :on-success="eventUploadSuccess"                    
                    name="media">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div class="el-upload__tip" slot="tip">单个文件不超过 20MB</div>
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
        media_id:'',
        user_list:[]
        }
        
    },
    
    methods:{
        async onSubmit() {

            console.log(this.form);
            try{
                let {data:{errcode,errmsg}} = await post('api/message/send',{            
                    form:this.form
                });
                if(errcode == '0'){
                    this.$message.success('发送成功');
                }
                else{
                    let msgcontent = errmsg.split(',')[0];
                    this.$message.error(msgcontent);
                }
            }
            catch(err){
                this.$message.error('发送失败');
            }
            
            
        },
        eventUploadSuccess(response){
            try{
                
                let {media_id,type,errcode,errmsg} = response;
                if(errcode == '0'){
                    this.form[type]['media_id'] = media_id;
                    this.$message.success('上传成功');                    
                }
                else{
                    let msgcontent = errmsg.split(',')[0];
                    this.$message.error(msgcontent);
                }
                
            }
            catch(error){
                this.$message.error('上传失败');
            }
            
        },
        eventUsersChanged(items){            
            this.form.touser = items.map( item => {return item.id}).join('|');
        }
    }
    
}
</script>


<style scoped>
</style>