<template>
  <div class="wrapper">

    <SimpleCreateField
        :name="'Назва'" input-width="150px" v-model="group.name" :error="error.name">
    </SimpleCreateField>

    <SelectCreateField :error="error.course"
                 :name="'Курс'"
                 v-model="group.course" :link-conditions="{list:[
                       {value:1,name:1},
                       {value:2,name:2},
                       {value:3,name:3},
                       {value:4,name:4},
                       {value:5,name:5},
                       {value:6,name:6},
                         ]}"></SelectCreateField>


    <RefCreateField :error="error.department" name="Спеціальність"
                v-model="group.department" :link-conditions="{list:departments}"></RefCreateField>
    <button class="create" @click="createOne()">Створити</button>
  </div>
</template>

<script>
import CreateField from "@/components/global/CreateField.vue";
import {createOne, getAll} from "@/components/httpService";
import SimpleCreateField from "@/components/global/CreateFields/SimpleCreateField.vue";
import SelectCreateField from "@/components/global/CreateFields/SelectCreateField.vue";
import RefCreateField from "@/components/global/CreateFields/RefCreateField.vue";

export default {
  name: "GroupCreate",
  components: {RefCreateField, SelectCreateField, SimpleCreateField, CreateField},
  data: () => ({
    group: {},
    departments: '',
    error:{}
  }), methods: {
    async createOne() {
      try {
        const res = (await createOne("group", this.group)).data;
        this.$router.push("groups/"+res.id);
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    }

  },
  async created() {
    this.departments = (await getAll("department")).data;
  }
}
</script>

<style scoped>
.wrapper {
  flex-direction: column;
  align-items: center;
}
</style>