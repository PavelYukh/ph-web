<template>
<div class="wrapper">
<h2>Усі викладачі:</h2>
<Table :data="teachers" :link="link" :fields="fields"></Table>
  <button class="create-move" @click="$router.push('/teachers-create')">Створити</button>

</div>
</template>

<script>
import request from "axios";
import Table from "@/components/global/Table.vue";
import {getAll} from "@/components/httpService";

export default {
  name: "Teachers",
  components: {Table},
  data:()=>({
    teachers:'',
    fields:[
      {name:'Прізвище',value:'surname'},
      {name:'Ім\`я',value:'name'},
      {name:'Телефон',value:'phone'},
      {name:'Емайл',value:'email'},
    ],
    link:'teachers'
  }),
  async created(){
    const teachers = await getAll('teacher')
    this.teachers = teachers.data;

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