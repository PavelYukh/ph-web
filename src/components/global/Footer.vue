<template>
<div class="footer">
  <div class="upper">
<div class="about-us">
  Цей сайт створений студентами групи ІА-12 Факультету ФІОТ Київського Політехніного Інституту Ім. Ігоря Сікорсього з використанням Vue.js
</div>
<div class="contacts">
  <ul>
    <li><a href="">Телеграм Павла</a></li>
    <li><a href="">Телеграм Эвгена</a></li>

  </ul>
</div>
  </div>
<div class="copyright">(C) All rights reserved</div>
</div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
.footer{

  width: 100%;
  border-radius: 0.5em;
  background-color: wheat;
  display: flex;
  flex-direction: column;
  align-items: center;
}
*{
  color: black;
  text-decoration: none;
}
ul{
  list-style-type: none;
}
.upper{
  padding-top: 10px;
  display: flex;
  flex-direction: row;
  width: 90%;
  justify-content: space-evenly;
}
.about-us{
  width: 50%;
}
.contacts{
  font-size: 17px;
  width: 30%;
}
</style>