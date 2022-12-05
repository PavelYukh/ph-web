<template>
  <div class="wrapper">
    <h2>Усі Заняття:</h2>
    <Table :data="schedules" :fields="fields" :link="link"></Table>
    <button class="create-move" @click="$router.push('/schedules-create')">Створити</button>

  </div>
</template>

<script>
import Table from "../global/Table.vue";
import request from "axios";
import * as http from '../httpService'
export default {
  name: "Schedules",
  components: {Table},
  data: () => ({

    schedules: '',
    fields: [
      {name: 'Викладач', value: ['teacher', ['name', 'surname']], ref: {isRef: true, multipleValue:true, refLink: 'teachers'}},
      {name: 'Предмет', value: ['discipline', 'name'], ref: {isRef: true,  refLink: 'disciplines'}},
      {name: 'Група', value: ['group', 'name'], ref: {isRef: true, refLink: 'groups'}},
    ],
    link: 'schedules'
  }),
  async created() {
    const schedules = await http.getAll('schedule')
    this.schedules = schedules.data;
    this.schedules.sort((a, b) => a.name.localeCompare(b.name));

  }
}
</script>

<style scoped>
.wrapper{
  display: block;
}
h2{
  text-align: center;
}
Table{
  width: 100%;
}
</style>