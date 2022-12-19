<template>
  <div class="wrapper">
    <SimpleCreateField
        :name="'Ім\'я'" input-width="150px" v-model="teacher.name" :error="error.name">
    </SimpleCreateField>
  <SimpleCreateField
        :name="'Прізвище'" input-width="150px" v-model="teacher.surname" :error="error.surname">
    </SimpleCreateField>
  <SimpleCreateField
        :name="'Емайл'" input-width="150px" v-model="teacher.email" :error="error.email">
    </SimpleCreateField>
  <PhoneCreateField
      is-phone="true"
        :name="'Телефон'" input-width="150px" v-model="teacher.phone" :error="error.phone">
    </PhoneCreateField>
     <button class="create" @click="createOne()">Створити</button>

  </div>

</template>

<script>
import CreateField from "@/components/global/CreateField.vue";
import {createOne, getAll} from "@/components/httpService";
import SimpleCreateField from "@/components/global/CreateFields/SimpleCreateField.vue";
import PhoneCreateField from "@/components/global/CreateFields/PhoneCreateField.vue";


export default {
  name: "TeacherCreate",
  components: {PhoneCreateField, SimpleCreateField, CreateField},
  data: () => ({
    teacher: {},
    error:{}
  }), methods: {
    async createOne() {
      try {
        const res = (await createOne("teacher", this.teacher)).data;
        this.$router.push("teachers/"+res.id);
      } catch (ex) {
        this.error = JSON.parse(ex.message);
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