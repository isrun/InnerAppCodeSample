<template>
    <div class="tags-container">
        <div class="tags">
            <el-tag class="tag" type = 'primary' size = 'small'>斯内普</el-tag>
            <el-tag class="tag" type = 'primary' size = 'small'>斯内普</el-tag>
            <el-tag class="tag" type = 'primary' size = 'small'>斯内普</el-tag>
            
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.tags-container{
    border:1px solid #e7e7e7;
    padding:5px;
}
.tags{
    overflow: hidden;
    margin-top: -4px;
}
.tag{
    margin-top: 4px;
    cursor: pointer;
    float: left;
    background: rgba(0, 121, 222, 0.1);
    border-radius: 3px;
    align-items: center;
    padding: 3px 7px;
    color:#2F88D3;
    font-size: 13px;
    line-height: 18px;
    margin-right: 4px;
}

.tag-remove{
    display: none;
    margin-left:3px;
    position: relative;
    width:9px;
    height:9px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    cursor: pointer;
}
.tag-remove::before{
    content : ''!important;
    position: absolute;
    left:4px;
    top:0;
    width:1px;
    height:9px;
    background:#2F88D3;
}
.tag-remove::after{
    content : ''!important;
    position: absolute;
    left:0px;
    top:4px;
    width:9px;
    height:1px;
    background:#2F88D3;
}
</style>