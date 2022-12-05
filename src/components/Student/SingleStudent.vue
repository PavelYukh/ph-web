<template>
<div class="wrapper">
  <div class="data" v-if="student">

  {{error.load}}
  <RedactField :error="error.group" class="field" :img-width="'25px'"
               :name="'Група'" :model="student.group"
               @change="this.student.group = this.groups.find(el=>el.id==$event.target.value)"
               :link-conditions="{isLink:true,list:groups, link:'/groups/'+student.group.id}"></RedactField>

  <RedactField :error="error.name" class="field" :img-width="'25px'"
               :name="'Ім\'я'" :model="student.name"
               @change="this.student.name = $event.target.value"></RedactField>

  <RedactField :error="error.email" class="field" :img-width="'25px'"
               :name="'Емайл'" :model="student.email"
               @change="this.student.email = $event.target.value"></RedactField>

  <RedactField is-phone="true" :error="error.phone" class="field" :img-width="'25px'"
               :name="'Телефон'" :model="student.phone"
               @change="this.student.phone = $event.target.value"></RedactField>
  <div class="done-section">
    <p>Завершити редагування</p>
    <button style="width: 40px" @click="updateObj(student)" class="edit"><img src="../../assets/imgs/done.png"
                                                                               alt=""></button>
  </div>
  <button class="delete" @click="deleteOne()">Видалити</button>
</div>
</div>
</template>

<script>
import RedactField from "../global/RedactField.vue";
import request from "axios";
import * as http from "../httpService"

export default {
  name: "SingleStudent",
  components: {RedactField},
  data: () => ({
    error: {},
    groups: '',
    student: ''
  }),
  methods: {
    async deleteOne() {
      try {
        await http.deleteOne("student/" + this.$route.params.id);
        this.$router.replace({path: '/'});
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    },

    async updateObj(student) {
      try {
        http.updateOne("student/" + this.$route.params.id, student).catch(e=>console.log(e));
        this.$router.go()
      } catch (e) {
        this.error = JSON.parse(e.message);
      }
    }

  },
  async created() {
    try {
      const data = await http.getOne("student/" + this.$route.params.id);
      this.groups = (await http.getOne("group")).data;
      this.student = data.data;


    } catch (ex) {
      if (ex.response.status === 400) {
        this.error.load = 'Група з таким id не існує'
        this.student = '';
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