<template>
    <div class="partyinfo">
        <div class="partyinfo-banner">
            <div class="partyinfo-title">部门详情</div>                 
            <div class="">
                <el-link style="margin-right:10px;" type="primary" size="mini" @click="onCreate">新增</el-link>
                <el-link type="danger" size="mini" @click="onDelete">删除</el-link>
            </div>
        </div>
        <div class="partyinfo-content">
            <slot></slot>
        </div>
        <el-dialog title="创建" :visible="isCreate">
            <el-select v-model="currentType" placeholder="请选择新建类型">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
            </el-select>
            <div class="dialog-body">
                <ContactsPicker
                v-if="currentType === 'user'"
                mode="user"
                @onContactsChanged='eventUsersChanged'
                ></ContactsPicker>
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
import { post, get } from 'axios';
import ContactsPicker from '../../components/contactsPicker.vue';
export default {
    components: {
        ContactsPicker
    },
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
            currentType: ''
        }
    },
    methods: {
        eventUsersChanged(data) {
            console.log(data);
        },
        onCreate() {
            this.isCreate = true;
        },
        async onConfirm() {
            this.partyname = '新建部门';
            this.isCreate = false;
            if(this.currentType === 'department') {
                await post('api/department/create', {
                params:{
                    parentid: this.partyid,
                    name: this.partyname
                }
            });
            }
            window.location.reload();
        },
        async onDelete() {
            try {
                const result = await this.$confirm('确认是否删除该部门？（注：不能删除根部门；不能删除含有子部门、成员的部门）', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                console.log(result);
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
            this.currentType = '';
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
        height: calc(680px - 57px);
        width: 100%;
        text-align: center;
        line-height: calc(680px - 57px);
    }
    .dialog-body {
        margin-top: 20px;
    }
</style>