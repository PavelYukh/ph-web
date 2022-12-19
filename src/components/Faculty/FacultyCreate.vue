<template>
  <div class="wrapper">
    <SimpleCreateField
        :name="'Назва'" input-width="150px" v-model="faculty.name" :error="error.name">
    </SimpleCreateField>
    <SimpleCreateField
        :name="'Cкорочена назва'" input-width="150px"  v-model="faculty.shortName" :error="error.shortName">
    </SimpleCreateField>
    <button class="create" @click="createOne()">Створити</button>

  </div>
</template>

<script>
import CreateField from "@/components/global/CreateField.vue";
import {createOne, getAll} from "@/components/httpService";
import SimpleCreateField from "@/components/global/CreateFields/SimpleCreateField.vue";

export default {
  name: "FacultyCreate",
  components: {SimpleCreateField, CreateField},
  data: () => ({
    faculty: {},
    error: {}
  }), methods: {
    async createOne() {
      try {
        const res = (await createOne("faculty", this.faculty)).data;
        this.$router.push("faculties/" + res.id);
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