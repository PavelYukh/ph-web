<template>
  <div class="wrapper">

    <p>{{ error.load }}</p>
    <div class="data" v-if="group">

      <RefRedactField :error="error.department" :img-width="'25px'" name="Cпеціальність"
                   v-model="this.group.department" :input-width="'250px'"
                   :link-conditions="{label:'name',list:departments, link:'/departments/'+group.department.id,}"
      ></RefRedactField>

      <SimpleRedactField :error="error.name"  :img-width="'25px'" :input-width="'60px'"
                   :name="'Назва'" v-model="group.name"></SimpleRedactField>

        <SelectRedactField :error="error.course"  :img-width="'25px'"
                     :name="'Курс'" v-model="group.course" :link-conditions="{label:'name',list:[
                       {value:1,name:1},
                       {value:2,name:2},
                       {value:3,name:3},
                       {value:4,name:4},
                       {value:5,name:5},
                       {value:6,name:6},
                         ]}"></SelectRedactField>



      <div class="done-section">
        <h3>Завершити редагування</h3>
        <button style="width: 40px" @click="updateObj(group)" class="edit"><img src="../../assets/imgs/done.png" alt="">
        </button>
      </div>
      <button class="delete" @click="deleteOne()">Видалити</button>
    </div>
  </div>
</template>

<script>
import request from "axios";
import RedactField from "@/components/global/RedactField.vue";
import * as http from "@/components/httpService";
import SimpleRedactField from "@/components/global/RedactFields/SimpleRedactField.vue";
import RefRedactField from "@/components/global/RedactFields/RefRedactField.vue";
import SelectRedactField from "@/components/global/RedactFields/SelectRedactField.vue";

export default {
  name: "SingleGroup",
  components: {SelectRedactField, RefRedactField, SimpleRedactField, RedactField},
  data: () => ({
    group: '',
    error: {},
    editName: '',
    editCourse: '',
    departments: ''
  }),
  methods: {
    async deleteOne() {
      try {
        await http.deleteOne("group/" + this.$route.params.id);
        this.$router.replace({path: '/'});
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    },
    async updateObj(group) {
      try {
        await http.updateOne("group/" + this.$route.params.id, group);
        this.$router.go()
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    }


  },
  async created() {
    try {
      const data = await http.getOne("group/" + this.$route.params.id);
      this.group = data.data;
      this.departments = (await http.getAll("department")).data;
    } catch (ex) {
      if (ex.response.status === 400) {
        this.error.load = 'Група з таким id не існує'
        this.group = '';
      }
    }
  }
}
</script>

<style scoped>

.wrapper {
  flex-direction: column;
  align-items: center;

}



</style>