<template>
  <div class="app">
    <el-container class="wrap">
      <el-header class="header">
          <h1 class="logo"><img src="./assets/logo.svg" /><span class="title">CodeSamples</span></h1>
          <el-menu 
          class="navigation el-menu-demo" 
          mode="horizontal" 
          >
            <el-menu-item index="1">开发者中心</el-menu-item>
            <el-submenu index="2">
              <template slot="title">开发文档</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>              
            </el-submenu>
            <el-menu-item index="3">开发者工具</el-menu-item>
            <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">Github</a></el-menu-item>
          </el-menu>
      </el-header>
      <el-container>
        <el-aside width="200px">            
            <el-menu
              class="left-menu"
              :router="true"
              >
              <el-menu-item index="intro">
                <i class="el-icon-monitor"></i>
                <span slot="title">概览</span>
              </el-menu-item>
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-user"></i>
                  <span>通讯录管理</span>
                </template>
                <el-menu-item-group>                  
                  <el-menu-item index="contacts">组织架构树</el-menu-item>
                  <el-menu-item index="tags">标签管理</el-menu-item>
                </el-menu-item-group>
                           
              </el-submenu>
              
              <el-menu-item index="message">
                <i class="el-icon-message"></i>
                <span slot="title">消息推送</span>
              </el-menu-item>
              <el-menu-item index="3">
                <i class="el-icon-service"></i>
                <span slot="title">客户联系</span>
              </el-menu-item>
              
              <el-menu-item index="robot">
                <i class="el-icon-coordinate"></i>
                <span slot="title">群机器人</span>
              </el-menu-item>
              <el-menu-item index="scanqr">
                <i class="el-icon-mobile"></i>
                <span slot="title">扫码登录</span>
              </el-menu-item>
              <el-menu-item index="scanqr">
                <i class="el-icon-box"></i>
                <span slot="title">应用管理</span>
              </el-menu-item>
              <el-menu-item index="scanqr">
                <i class="el-icon-picture-outline"></i>
                <span slot="title">素材管理</span>
              </el-menu-item>
              <el-menu-item index="OA">
                <i class="el-icon-folder-opened"></i>
                <span slot="title">OA 应用</span>
              </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main style="padding:0;">
          <div class="content-header">
            <h1 class="content-header-title">组织架构树</h1>
            <div class="content-header-intro">分割线是一个呈线状的轻量化组件，起到分割、组织、细化的作用，用于有逻辑的组织元素内容和页面结构。</div>
          </div>
          <div class="content-body">
            <router-view ></router-view>
          </div>
          
        </el-main>
      </el-container>
    </el-container>
    
    
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
*{
  margin:0;
  padding:0;
}
html,body{
  height: 100%;
  background:rgb(245, 245, 245);
}
.app {
  font-family:  Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;;
}
.wrap{
  height: 100%;
}
.header{
    display: flex;
    justify-content: space-between;    
    border-bottom: 1px solid #e7e7e7;
    align-items: center;
    box-sizing: content-box;
    background: #fff;
}
.navigation{
    border:0 none  !important;
    
    
}
.logo{
    display: flex;
    align-items: center;
    font-weight: 600;
}
.logo img{
    width: 32px;
}
.logo .title{
    font-family:Avenir;
    color:#333;
    font-weight: 500;
    font-size: 20px;
    /* color:rgba(0,0,255,0.4); */
    letter-spacing: -0.5px;
    padding-left: 5px;
}
.left-menu{
  min-height: 100%;
  
}

.left-menu .el-menu-item{
  margin:5px;
  height:40px;
  line-height: 40px;
  padding-left:10px!important;
  border-radius: 3px;
  color: #333;
}
/* .left-menu .el-menu-item:hover{
  background: #f3f3f3;
  color:#333;
} */

.left-menu .el-submenu .el-menu-item{
  min-width: 0!important;
}
.left-menu .el-submenu__title{
  margin:5px;
  height:40px;
  line-height: 40px;
  padding-left:10px!important;
  border-radius: 3px;
}
.left-menu .el-menu-item-group{
  margin:5px;
  min-width: none;  
}
.left-menu .el-menu-item-group .el-menu-item{
  padding-left: 33px!important;
}
.left-menu .el-menu-item-group__title:empty{
  display: none;
}
.content-header{
  padding: 80px 24px 48px 60px;
  border-bottom: 1px solid #e7e7e7;
  background: #fff;
}
.content-header-title{
  font-size: 48px;
  text-align: left;
  line-height: 56px;
  color:#333;
}
.content-header-intro{
  margin-top: 16px;
    font-size: 14px;
    color: rgba(0,0,0,0.6);
    line-height: 22px;
    
}
.content-body{
  padding:60px;
  
}
.block{
    padding:20px;
    border:1px solid rgb(220,220,220);
    background:#fff;
    min-height: 680px;
    overflow: auto;
}

.el-menu-item.is-active {
  background:rgb(0, 82, 217);
  color:#fff;
}
.el-tree-node{
  margin:3px 0;
}
.el-tree-node__content{
  height:28px;
}
</style>
