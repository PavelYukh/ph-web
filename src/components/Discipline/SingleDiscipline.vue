<template>
  <div class="wrapper">
    <p>{{error.load}}</p>
    <div class="data" v-if="discipine">

      <RedactField :error="error.name" :img-width="'25px'" :input-width="'150px'"
                   :name="'Назва'" :model="discipine.name" @change="this.discipine.name = $event.target.value"></RedactField>
      <div class="done-section">
        <p>Завершити редагування</p>
        <button style="width: 40px" @click="updateObj(discipine)" class="edit"><img src="../../assets/imgs/done.png" alt=""></button>
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
export default {
  name: "SingleDiscipline",
  components: {ScheduleCard, RedactField},
  data: () => ({
    discipine: '',
    error: {},
  }),
  methods: {
    async deleteOne() {
      try {
        await http.deleteOne("discipline/" + this.$route.params.id);
        this.$router.replace({path: '/'});
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    },
    async updateObj(discipline) {
      try {
        await http.updateOne("discipline/" + this.$route.params.id, discipline);
        this.$router.go()
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    }

  },
  async created() {
    try {
      const data = await http.getOne("discipline/" + this.$route.params.id);
      this.discipine = data.data;
    } catch (ex) {
      if (ex.response.status === 400) {
        this.error.load = 'Предмет з таким id не існує'
        this.discipline = '';
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