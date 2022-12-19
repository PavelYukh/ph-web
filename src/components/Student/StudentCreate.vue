<template>
  <div class="wrapper">
    <RefCreateField :error="error.group"
                 :name="'Група'"
                 v-model="student.group"
                 :link-conditions="{list:groups}"></RefCreateField>

    <SimpleCreateField :error="error.name"
                 :name="'Ім\'я'"
                 v-model="student.name"></SimpleCreateField>

    <SimpleCreateField :error="error.email"
                 :name="'Емайл'"
                 v-model="student.email"></SimpleCreateField>

    <PhoneCreateField :error="error.phone"
                 :name="'Телефон'"
                 v-model="student.phone"></PhoneCreateField>

    <button class="create" @click="createOne()">Створити</button>

  </div>

</template>

<script>
import CreateField from "@/components/global/CreateField.vue";
import {createOne, getAll} from "@/components/httpService";
import RefCreateField from "@/components/global/CreateFields/RefCreateField.vue";
import SimpleCreateField from "@/components/global/CreateFields/SimpleCreateField.vue";
import PhoneCreateField from "@/components/global/CreateFields/PhoneCreateField.vue";

export default {
  name: "StudentCreate",
  components: {PhoneCreateField, SimpleCreateField, RefCreateField, CreateField},
  data: () => ({
    student: {},
    groups:'',
    error: {}
  }), methods: {
    async createOne() {
      try {
        const res = (await createOne("student", this.student)).data;
        this.$router.push("students/" + res.id);
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    }

  },
  async created() {
    this.groups =  (await getAll("group")).data;
  }
}
</script>

<style scoped>
.wrapper {
  flex-direction: column;
  align-items: center;
}

</style>