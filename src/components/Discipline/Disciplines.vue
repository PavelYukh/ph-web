<template>
  <div class="wrapper">
    <h2>Усі предмети:</h2>
    <Table :data="discipline" :link="link" :fields="fields"></Table>
    <button class="create-move" @click="$router.push('/disciplines-create')">Створити</button>

  </div>

</template>

<script>
import Table from "../global/Table.vue";
import request from "axios";
import {getAll} from "@/components/httpService";
export default {
  name: "Disciplines",
  components: {Table},
  data:()=>({
    discipline:'',
    fields:[
      {name:'Назва',value:'name'},],
    link:'disciplines'
  }),
  async created(){

    const discipline = await getAll('discipline')
    this.discipline = discipline.data;

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