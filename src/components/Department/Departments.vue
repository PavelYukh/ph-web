<template>
  <div class="wrapper">
    <h2>Усі спеціальності:</h2>
    <Table :data="departments" :link="link" :fields="fields"></Table>
    <button class="create-move" @click="$router.push('/departments-create')">Створити</button>
  </div>

</template>

<script>
import Table from "../global/Table.vue";
import {getAll} from "@/components/httpService";
export default {
  name: "Departments",
  components: {Table},
  data:()=>({
    departments:'',
    fields:[
      {name: 'Факультет', value: ['faculty', 'name'], ref: {isRef: true, refLink: 'faculties'}},
      {name:'Назва', value: 'name'},
      {name:'Скорочена назва', value: 'shortName'},

    ],
    link:'departments'
  }),
  async created(){

    const department = await getAll('department')
    this.departments = department.data;

  }
}
</script>

<style scoped>
.wrapper{
  display: block;
}
.create-move{
  display: block;
  margin: 40px auto;
}
h2{
  text-align: center;
}
Table{
  width: 100%;
}
</style>