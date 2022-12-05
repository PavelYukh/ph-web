<template>
  <div class="wrapper">
    <p>{{error.load}}</p>
    <div class="data" v-if="teacher">
    <div class="basic-info">


      <RedactField  :error="error.surname" :img-width="'25px'" :input-width="'100px'"
                   :name="'Прізвище'" :model="teacher.surname"
                   @change="this.teacher.surname = $event.target.value"></RedactField>
      <RedactField :error="error.name"  :img-width="'25px'" :input-width="'100px'"
                   :name="'Ім\'я'" :model="teacher.name"
                   @change="this.teacher.name = $event.target.value"></RedactField>
      <RedactField :error="error.email"  :img-width="'25px'" :input-width="'150px'"
                   :name="'Eмаіл'" :model="teacher.email"
                   @change="this.teacher.email = $event.target.value"></RedactField>
      <RedactField :error="error.phone"  :img-width="'25px'" :input-width="'150px'"
                   :name="'Телефон'" :model="teacher.phone" is-phone="true"
                   @change="this.teacher.phone = $event.target.value"></RedactField>

    </div>
    <div class="done-section">
      <p>Завершити редагування</p>
      <button style="width: 40px" @click="updateObj(teacher)" class="edit"><img src="../../assets/imgs/done.png" alt=""></button>
    </div>
    <button class="delete" @click="deleteOne()">Видалити</button>
     </div>
  </div>
</template>

<script>
import request from "axios";
import ScheduleCard from "@/components/Schedule/ScheduleCard.vue";
import RedactField from "@/components/global/RedactField.vue";
import * as http from '../httpService';
export default {
  name: "SingleTeacher",
  components: {ScheduleCard, RedactField},
  data: () => ({

    teacher: '',
    error: {},
  }),
  methods: {
    async deleteOne(){
      try{
      await http.deleteOne("teacher/" + this.$route.params.id);
      this.$router.replace({path:'/'});
      } catch (ex){
        this.error = JSON.parse(ex.message);
      }
    },
       async updateObj(teacher) {
      try{
      await http.updateOne("teacher/" + this.$route.params.id, teacher);
      this.$router.go()
      } catch (ex){
        this.error = JSON.parse(ex.message);
      }
    }

  },
  async created() {
    try {
      const data = await http.getOne("teacher/" + this.$route.params.id);
      this.teacher = data.data;
      try {

        this.teacher.schedules
            = (await http.getAll("schedule", {params: {teacher: this.$route.params.id}}))
            .data;
        this.error='';
      } catch (ex) {
        if (error.response.status === 400) {
          this.error.load = 'Цей викладач поки не веде дисциплін'
          this.teacher = '';
        }
      }
    } catch (ex) {
      if (ex.response.status === 400) {
        this.error.load = 'Вчителя з таким id не існує'
        this.teacher = '';
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