<template>
    <div class="partyinfo">
        <div class="partyinfo-banner">
            <div class="partyinfo-title">部门详情</div>                 
            <div class="">
                <el-link type="danger" size="mini" @click="onDelete">删除</el-link>
            </div>
        </div>
        <div class="partyinfo-content">
            <slot></slot>
            <el-button @click="onCreateUser">新建成员</el-button>
            <el-button type="primary" @click="onCreateParty">新建部门</el-button>
        </div>
        <el-dialog title="创建" :visible="isCreate">
            <div class="dialog-body">
                <div
                v-if="currentType === 'user'"
                class="dialog-userinfo-wrapper"
                >
                <el-form ref="form" :model="userinfo" label-width="80px">
                    <el-form-item label="userid">
                        <el-input v-model="userinfo.userid"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="userinfo.name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="userinfo.mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="userinfo.email"></el-input>
                    </el-form-item>
                </el-form>
                </div>
                <el-input 
                    v-if="currentType === 'department'" 
                    v-model="partyname" 
                    placeholder="请输入新部门名">
                </el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="onCancel">取 消</el-button>
                <el-button type="primary" @click="onConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
const initUserInfo = {
    userid: '',
    name: '',
    department: [],
    mobile: '',
    email: ''
}
import { post, get } from 'axios';
export default {
    props: {
        partyid: Number
    },
    data() {
        return {
            isCreate: false,
            partyname: '新建部门',
            options: [{
                value: 'department',
                label: '部门'
            }, {
                value: 'user',
                label: '成员'
            }],
            currentType: '',
            userinfo: Object.assign({}, initUserInfo)
        }
    },
    methods: {
        initDialoginfo() {
            this.currentType = '';
            this.partyname = '新建部门';
            this.userinfo = Object.assign({}, initUserInfo);
        },
        onCreateUser() {
            this.currentType = 'user';
            this.isCreate = true;
            this.userinfo.department = [this.partyid];
        },
        onCreateParty() {
            this.currentType = 'department';
            this.isCreate = true;
        },
        async onConfirm() {
            this.isCreate = false;
            if(this.currentType === 'department') {
                await post('api/department/create', {
                    parentid: this.partyid,
                    name: this.partyname
                });
            }else if(this.currentType === 'user') {
                await post('api/user/create', {
                    ...this.userinfo
                });
            }
            window.location.reload();
            this.initDialoginfo();
        },
        async onDelete() {
            this.initDialoginfo();
            try {
                await this.$confirm('确认是否删除该部门？（注：不能删除根部门；不能删除含有子部门、成员的部门）', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })

                try {
                const  {data: { errcode }} = await get('api/department/delete', {
                    params:{
                        id: this.partyid
                    }
                });
                if(errcode) {
                    throw new Error('' + errcode);
                }
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                setTimeout(window.location.reload, 1000);
                } catch(err) {
                    this.$message({
                        type: 'error',
                        message: '' + err
                    });
                }
            } catch(err) {
                console.log(err);
            } 
        },
        onCancel() {
            this.initDialoginfo();
            this.isCreate = false;
        }
    },
}
</script>
<style lang="css" scoped>
    .partyinfo-banner {
        padding:10px 20px;
        margin-bottom: 15px;
        background: #f7f7f7;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .partyinfo-content {
        height: 300px;
        width: 100%;
        text-align: center;
        line-height: 300px;
    }
    .dialog-body {
        margin-top: 20px;
    }
</style>