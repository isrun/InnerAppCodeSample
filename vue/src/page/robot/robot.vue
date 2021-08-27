<template>
    <div class="">
        <div class="block" style="padding:60px;">
            <div class="block-content">
                <el-form ref="form" label-width="120px"  style="width:600px;">
                    <el-form-item v-model="webhook"
                         label="机器人 Webhook">
                        <el-input placeholder="不填则默认使用 main.config.js 中的配置"></el-input>
                    </el-form-item>
                    <el-form-item label="消息类型">
                        <el-select v-model="form.msgtype" placeholder="请选择类型">
                            <el-option label="文本" value="text"></el-option>
                            <el-option label="markdown" value="markdown"></el-option>
                            <el-option label="图片" value="image"></el-option>
                            <el-option label="文件" value="file"></el-option>
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item v-if="form.msgtype ==='text'" label="文本内容">
                        <el-input type="textarea" 
                            :autosize="{ minRows: 5, maxRows: 10}"
                        v-model="form.text.content"></el-input>
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

                    <el-form-item v-else-if="form.msgtype ==='file'" label="上传文件">
                        <el-upload
                            class="upload-demo"                    
                            :multiple='false'
                            action="api/robot/upload"
                            :data="upload_data"
                            :on-success="eventUploadSuccess"                    
                            name="file">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div class="el-upload__tip" slot="tip">单个文件不超过 20MB</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item v-if="form.msgtype ==='markdown'" label="MarkDown">
                        <el-input type="textarea"
                            :autosize="{ minRows: 5, maxRows: 15}"
                        v-model="form.markdown.content"></el-input>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" size="small"                 
                        @click="onSubmit">发送</el-button>
                    </el-form-item>

                    
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import {post} from 'axios';
export default {
    data(){
        let md = '您的会议室已经预定，稍后会同步到`邮箱` \n >**事项详情** \n>事　项：<font color="info">开会</font> \n>组织者：@miglioguan \n>参与者：@miglioguan、@kunliu、@jamdeezhou、@kanexiong、@kisonwang \n> \n>会议室：<font color="info">广州TIT 1楼 301</font> \n>日　期：<font color="warning">2018年5月18日</font> \n>时　间：<font color="comment">上午9:00-11:00</font> \n> \n>请准时参加会议。 \n> \n>如需修改会议信息，请点击：[修改会议信息](https://work.weixin.qq.com)';
        return {
            form:{
                msgtype:'text',
                text:{
                    content:'Hello！欢迎使用企业微信开发者 CodeSamples',
                    mentioned_list:[],
                    mentioned_mobile_list:[]
                },
                markdown:{
                    content:md
                },
                file:{
                    media_id:''
                }
            },
            webhook:'',
            
        }
    },
    computed:{
        upload_data(){
            return {
                webhook:this.webhook||''
            }
        }
    },
    methods:{
         async onSubmit() {

            console.log(this.form);
            try{
                let {data:{errcode,errmsg}} = await post('api/robot/send',{          
                    webhook:this.webhook,  
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
                
                let {media_id,errcode,errmsg} = response;
                if(errcode == '0'){
                    this.form.file.media_id = media_id;
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
    }
}
</script>

<style scoped>

</style>