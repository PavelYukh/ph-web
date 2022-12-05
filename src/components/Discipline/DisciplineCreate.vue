<template>
  <div class="wrapper">
  <CreateField
      :name="'Назва'" input-width="150px" @input="this.discipline.name=$event.target.value" :error="error.name">
  </CreateField>
    <button class="create" @click="createOne()">Створити</button>

  </div>

</template>

<script>
import CreateField from "@/components/global/CreateField.vue";
import {createOne, getAll} from "@/components/httpService";

export default {
  name: "DisciplineCreate",
  components: {CreateField},
  data: () => ({
    discipline: {},
    error:{}
  }), methods: {
    async createOne() {
      try {
        const res = (await createOne("discipline", this.discipline)).data;
        this.$router.push("disciplines/"+res.id);
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