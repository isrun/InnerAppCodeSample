<template>
  <div class="app">
    <el-container>
      <el-header class="header">
          <h1 class="logo"><img src="./assets/logo.png" /><span class="title">CodeSamples</span></h1>
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
              default-active="2"
              class="el-menu-vertical-demo"
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
                  <el-menu-item index="contacts">组织架构</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
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
        <el-main><router-view></router-view></el-main>
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
.app {
  font-family:  Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.header{
    display: flex;
    justify-content: space-between;    
    border-bottom: 1px solid #e7e7e7;
    align-items: center;
    box-sizing: content-box;
}
.navigation{
    border:0 none  !important
    
}
.logo{
    display: flex;
    align-items: center;
    font-weight: 600;
}
.logo img{
    width: 44px;
}
.logo .title{
    font-family:Avenir;
    color:#0085dd;
    font-size: 24px;
    padding-left: 5px;
}
</style>
