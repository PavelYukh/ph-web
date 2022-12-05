<template>
  <div class="wrapper">
    <h2>Усі Студенти:</h2>
    <Table :data="students" :link="link" :fields="fields"></Table>
    <button class="create-move" @click="$router.push('/students-create')">Створити</button>

  </div>
</template>

<script>
import Table from "../global/Table.vue";
import request from "axios";
import * as http from '../httpService';

export default {
  name: "Students",
  components: {Table},
  data:()=>({
    students:'',
    fields:[
      {name:'Ім\'я',value:'name'},
      {name:'Телефон',value:'phone'},
      {name:'Емайл',value:'email'},
      {name:'Група',value:['group', 'name'], ref:{isRef:true, refLink:'groups'}},
    ],
    link:'students'
  }),
  async created(){
    const students = await http.getAll('student')
    this.students = students.data;

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