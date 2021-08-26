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
        <el-dialog title="新增部门名" :visible="isCreate">
            <el-input v-model="partyname" placeholder="请输入新部门名"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isCreate = false">取 消</el-button>
                <el-button type="primary" @click="onConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isCreate: false,
            partyname: '新建部门'
        }
    },
    methods: {
        onCreate() {
            this.isCreate = true;
        },
        onConfirm() {
            console.log('edit');
            this.partyname = '新建部门'
        },
        onDelete() {
            console.log('delete');
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
</style>