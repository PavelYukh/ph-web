<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/global/Header.vue';
import Footer from "@/components/global/Footer.vue";
</script>

<template>
  <div class="wrap">
    <Header></Header>
    <RouterView class="main" />
    <Footer class="footer"></Footer>

  </div>
</template>

<style scoped>

.main{
flex: 1 1 auto;
  margin-top: 20px;
  margin-bottom: 20px;
}
.footer{

}
.wrap{
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 80%;
}
</style>
