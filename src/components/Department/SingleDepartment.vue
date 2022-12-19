<template>
  <div class="wrapper">
  <p>{{error.load}}</p>
  <div class="data" v-if="department">

    <SimpleRedactField :error="error['name']" :img-width="'25px'" :input-width="'300px'"
                 :name="'Назва'" v-model="department.name"></SimpleRedactField>
   <SimpleRedactField :error="error['shortName']" :img-width="'25px'" :input-width="'150px'"
                 :name="'Скорочена назва'" v-model="department.shortName"></SimpleRedactField>
    <RefRedactField :error="error['faculty']" :img-width="'25px'" :input-width="'300px'" name="Факультет"
                v-model="department.faculty"
                 :link-conditions="{list:faculties, link:'/faculties/'+department.faculty.id, label:'name'}"
    ></RefRedactField>
    <div class="done-section">
      <p>Завершити редагування</p>
      <button style="width: 40px" @click="updateObj(department)" class="edit"><img src="../../assets/imgs/done.png" alt=""></button>
    </div>
    <button class="delete" @click="deleteOne()">Видалити</button>

  </div>

  </div>
</template>
<script>

import RedactField from '../global/RedactField.vue';
import ScheduleCard from "@/components/Schedule/ScheduleCard.vue";
import * as http from "@/components/httpService";
import SimpleRedactField from "@/components/global/RedactFields/SimpleRedactField.vue";
import RefRedactField from "@/components/global/RedactFields/RefRedactField.vue";
export default {
  name: "SingleDepartment",
  components: {SimpleRedactField, RefRedactField},
  data: () => ({
    department: '',
    faculties:'',
    error: {},
  }),
  methods: {
    async deleteOne() {
      try {
        await http.deleteOne("department/" + this.$route.params.id);
        this.$router.replace({path: '/'});
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    },
    async updateObj(discipline) {
      try {
        await http.updateOne("department/" + this.$route.params.id, discipline);
        this.$router.go()
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    }

  },
  async created() {
    try {
      const data = await http.getOne("department/" + this.$route.params.id);
      this.faculties = (await http.getAll("faculty")).data;
      this.department = data.data;
    } catch (ex) {
      if (ex.response.status === 400) {
        this.error.load = 'Спеціальність  з таким id не існує'
        this.department = '';
      }
    }
  }

}
</script>

<style scoped>
.disciplines > * {
  margin: 10px;
}


.wrapper {
  flex-direction: column;
  align-items: center;
}
</style>