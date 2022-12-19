<template>
  <div class="wrapper">
    <p>{{error.load}}</p>
    <div class="data" v-if="faculty">
      <SimpleRedactField :error="error.name" :img-width="'25px'" :input-width="'300px'"
                   :name="'Назва'" v-model="faculty.name"></SimpleRedactField>
   <SimpleRedactField :error="error.shortName" :img-width="'25px'" :input-width="'50px'"
                   :name="'Скорочена назва'" v-model="faculty.shortName"></SimpleRedactField>
      <div class="done-section">
        <p>Завершити редагування</p>
        <button style="width: 40px" @click="updateObj(faculty)" class="edit"><img src="../../assets/imgs/done.png" alt=""></button>
      </div>
      <button class="delete" @click="deleteOne()">Видалити</button>

    </div>

  </div>
</template>

<script>
import ScheduleCard from "../Schedule/ScheduleCard.vue";
import request from "axios";
import RedactField from '../global/RedactField.vue';
import * as http from '../httpService'
import SimpleRedactField from "@/components/global/RedactFields/SimpleRedactField.vue";
export default {
  name: "SingleDiscipline",
  components: {SimpleRedactField, ScheduleCard, RedactField},
  data: () => ({
    faculty: '',
    error: {},
  }),
  methods: {
    async deleteOne() {
      try {
        await http.deleteOne("faculty/" + this.$route.params.id);
        this.$router.replace({path: '/'});
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    },
    async updateObj(discipline) {
      try {
        await http.updateOne("faculty/" + this.$route.params.id, discipline);
        this.$router.go()
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    }

  },
  async created() {
    try {
      const data = await http.getOne("faculty/" + this.$route.params.id);
      this.faculty = data.data;
    } catch (ex) {
      if (ex.response.status === 400) {
        this.error.load = 'Факультет з таким id не існує'
        this.faculty = '';
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