<template>
  <div class="wrapper">

    <SimpleCreateField
        :name="'Назва'" input-width="150px" v-model="department.name" :error="error.name">
    </SimpleCreateField>
    <SimpleCreateField
        :name="'Скорочена Назва'" input-width="150px"
        v-model="department.shortName" :error="error.shortName">
    </SimpleCreateField>
    <RefCreateField :error="error.faculty" name="Факультет"
                    v-model="department.faculty"
                    :input-width="'150px'"
                    :link-conditions="{list:faculties}"></RefCreateField>
      <button class="create" @click="createOne()">Створити</button>
  </div>
</template>

<script>
import CreateField from "@/components/global/CreateField.vue";
import {createOne, getAll} from "@/components/httpService";
import SimpleCreateField from "@/components/global/CreateFields/SimpleCreateField.vue";
import RefCreateField from "@/components/global/CreateFields/RefCreateField.vue";

export default {
  name: "DepartmentCreate",
  components: {RefCreateField, SimpleCreateField, CreateField},
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