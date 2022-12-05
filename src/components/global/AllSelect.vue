<template>
  <div class="wrapper">
<RouterLink to="/schedules">Всі Заняття</RouterLink>
<RouterLink to="/disciplines">Всі Предмети</RouterLink>
<RouterLink to="/teachers">Всі Викладачі</RouterLink>
<RouterLink to="/students">Всі Студенти</RouterLink>
<RouterLink to="/groups">Всі Групи</RouterLink>
<RouterLink to="/departments">Всі Спеціальності</RouterLink>
<RouterLink to="/faculties">Всі Факультети</RouterLink>
  </div>
</template>

<script>
export default {
  name: "AllSelect"
}
</script>

<style scoped>

.wrapper{
  flex-direction: column;
  align-items: center;
  font-size: 160%;
}
</style>