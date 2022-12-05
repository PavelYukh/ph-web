<template>
  <div class="wrapper">

    <CreateField
        :name="'Назва'" input-width="150px" @input="this.department.name=$event.target.value" :error="error.name">
    </CreateField>
    <CreateField
        :name="'Скорочена Назва'" input-width="150px"
        @input="this.department.shortName=$event.target.value" :error="error.shortName">
    </CreateField>
    <CreateField :error="error.faculty" name="Факультет" @input="this.department.faculty = this.faculties.find(el=>el.id==$event.target.value)" :link-conditions="{isLink: true, list:faculties}"></CreateField>
      <button class="create" @click="createOne()">Створити</button>
  </div>
</template>

<script>
import CreateField from "@/components/global/CreateField.vue";
import {createOne, getAll} from "@/components/httpService";

export default {
  name: "DepartmentCreate",
  components: {CreateField},
  data: () => ({
    department: {},
    faculties: '',
    error:{}
  }), methods: {
    async createOne() {
      try {
        const res = (await createOne("department", this.department)).data;
        this.$router.push("departments/"+res.id);
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    }

  },
  async created() {
    this.faculties = (await getAll("faculty")).data;
  }
}
</script>

<style scoped>
.wrapper {
  flex-direction: column;
  align-items: center;
}
</style>