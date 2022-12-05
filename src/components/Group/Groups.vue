<template>
  <div class="wrapper">
    <h2>Усі Групи:</h2>
    <Table :data="groups" :fields="fields" :link="link"></Table>
    <button class="create-move" @click="$router.push('/groups-create')">Створити</button>

  </div>
</template>

<script>
import Table from '../global/Table.vue';
import request from "axios";
import {getAll} from "@/components/httpService";
export default {
  name: "Groups",
  components:{Table},
  data: ()=>({

    groups:'',
    fields:[
      {name:'Назва',value:'name'},
      {name:'Курс',value:'course'},
      {name:'Спеціальність',value:['department','name'], ref:{isRef: true, refLink: 'departments'}},
    ],
    link:'groups'
  }),
  async created(){
    const groups = await getAll('group')
    this.groups = groups.data;

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