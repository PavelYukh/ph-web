<template>
<div class="header-wrapper">

  <RouterLink to="/" class="logo">
    <img src="https://kpi.ua/files/images-page/kpi-big-logo.png" alt="*****">
  </RouterLink>
  <div class="links">
    <RouterLink to="/">Головна Сторінка</RouterLink>
    <RouterLink to="/navigation">Навігація</RouterLink>
   </div>
  <div class="hamburger" @click="changeVisibility">
    <div class="img"><img src="../../assets/imgs/menu.png" alt=""></div>
    <div class="ham-links" v-show="show">
      <RouterLink to="/">Головна Сторінка</RouterLink>
      <RouterLink to="/navigation">Навігація</RouterLink>
      </div>
  </div>
</div>
</template>

<script>

export default {
  name: "Header",
  data: ()=>({
    show:false,
  }),
  methods:{
    changeVisibility(){
      this.show=!this.show;
    }
  }
}
</script>

<style scoped>
.hamburger{
  display: none;
  margin-left: auto;
}
.img img{
  height: 100%;
  width: 100%;
}
.img{
  width: 50px;
}
.ham-links{
  display: flex;
  flex-direction: column;
  width: 150px;
  position: absolute;
  margin-top: 10px;

  right: 10%;
}
.ham-links>*{

  border: 0.5px solid black;
  border-left: none;
  border-right: none;
  border-collapse: collapse;
  background-color: lightslategrey;
  padding: 5px 2px;
  margin: 0;
}

@media screen and (max-width: 600px) {
 .hamburger{
   display: block;
 }
  .links{
    display: none;
  }
}
.header-wrapper{
  border-radius: 0.5em;
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px  ;
  padding: 20px 50px;
  background-color: slategray;
}
.logo{
  width: 50px;
  position: relative;
}
.logo img{
  width: 100%;
  height: 100%;
}
.links{
  margin-left: auto;
}
.links>*{
  padding: 0 20px;
  font-size: 120%;
}
a{
  color: black;
  text-decoration: none;
}
a:hover{
  color: azure;
}

</style>