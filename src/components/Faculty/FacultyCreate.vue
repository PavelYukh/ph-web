<template>
  <div class="wrapper">
    <CreateField
        :name="'Назва'" input-width="150px" @input="this.faculty.name=$event.target.value" :error="error.name">
    </CreateField>
    <CreateField
        :name="'Cкорочена назва'" input-width="150px" @input="this.faculty.shortName=$event.target.value" :error="error.shortName">
    </CreateField>
    <button class="create" @click="createOne()">Створити</button>

  </div>
</template>

<script>
import CreateField from "@/components/global/CreateField.vue";
import {createOne, getAll} from "@/components/httpService";

export default {
  name: "FacultyCreate",
  components: {CreateField},
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