<template>
  <div class="wrapper">
    <CreateField
        :name="'Ім\'я'" input-width="150px" @input="this.teacher.name=$event.target.value" :error="error.name">
    </CreateField>
  <CreateField
        :name="'Прізвище'" input-width="150px" @input="this.teacher.surname=$event.target.value" :error="error.surname">
    </CreateField>
  <CreateField
        :name="'Емайл'" input-width="150px" @input="this.teacher.email=$event.target.value" :error="error.email">
    </CreateField>
  <CreateField
      is-phone="true"
        :name="'Телефон'" input-width="150px" @input="this.teacher.phone=$event.target.value" :error="error.phone">
    </CreateField>
     <button class="create" @click="createOne()">Створити</button>

  </div>

</template>

<script>
import CreateField from "@/components/global/CreateField.vue";
import {createOne, getAll} from "@/components/httpService";

export default {
  name: "TeacherCreate",
  components: {CreateField},
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