<template>
  <div class="wrapper">
    <h2>Усі факультети:</h2>
    <Table :data="faculties" :link="link" :fields="fields"></Table>
    <button class="create-move" @click="$router.push('/faculties-create')">Створити</button>

  </div>

</template>

<script>
import Table from "../global/Table.vue";
import {getAll} from "@/components/httpService";
export default {
  name: "Faculties",
  components: {Table},
  data:()=>({
    faculties:'',
    fields:[
      {name:'Назва', value: 'name'},
      {name:'Скорочена назва', value: 'shortName'},

    ],
    link:'faculties'
  }),
  async created(){

    const faculties = await getAll('faculty')
    this.faculties = faculties.data;

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