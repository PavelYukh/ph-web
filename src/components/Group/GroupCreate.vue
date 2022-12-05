<template>
  <div class="wrapper">

    <CreateField
        :name="'Назва'" input-width="150px" @input="this.group.name=$event.target.value" :error="error.name">
    </CreateField>

    <CreateField :error="error.course"
                 :name="'Курс'"
                 @input="this.group.course = $event.target.value" :link-conditions="{isLink:false,list:[
                       {value:1,name:1},
                       {value:2,name:2},
                       {value:3,name:3},
                       {value:4,name:4},
                       {value:5,name:5},
                       {value:6,name:6},
                         ]}"></CreateField>


    <CreateField :error="error.department" name="Спеціальність"
                 @input="this.group.department = this.departments.find(el=>el.id==$event.target.value)" :link-conditions="{isLink: true, list:departments}"></CreateField>
    <button class="create" @click="createOne()">Створити</button>
  </div>
</template>

<script>
import CreateField from "@/components/global/CreateField.vue";
import {createOne, getAll} from "@/components/httpService";

export default {
  name: "GroupCreate",
  components: {CreateField},
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