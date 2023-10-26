<script setup lang="ts">
import PageBottom from './components/bottom/PageBottom.vue';
import LoginDialog from './components/login/LoginDialog.vue'
import { onMounted } from 'vue';

</script>

<template>
  <div id="app">
    <div class="page-top">
      <PageTop></PageTop>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
    <div class="page-bottom">
      <PageBottom></PageBottom>
    </div>

    <!-- 登陆组件，开局挂载，之后只控制显示与隐藏 -->
    <LoginDialog></LoginDialog>
  </div>
</template>

<style scoped>
#app {
  width: 100%;
}
.page-top{
  width: 76%;
  position: fixed;
  z-index: 999;
  padding: 0 12%;
}
.content{
  padding: 0 12%;
  padding-top: 100px;
}
.page-bottom{
  
}
</style>
