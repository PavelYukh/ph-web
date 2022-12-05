<template>
  <div class="wrapper">
    <CreateField :error="error.group"
                 :name="'Група'"
                 @input="this.student.group = this.groups.find(el=>el.id==$event.target.value)"
                 :link-conditions="{isLink:true,list:groups}"></CreateField>

    <CreateField :error="error.name"
                 :name="'Ім\'я'"
                 @input="this.student.name = $event.target.value"></CreateField>

    <CreateField :error="error.email"
                 :name="'Емайл'"
                 @input="this.student.email = $event.target.value"></CreateField>

    <CreateField :error="error.phone"
                 :name="'Телефон'"
                 :is-phone="true"
                 is-phone="true"
                 @input="this.student.phone = $event.target.value"></CreateField>

    <button class="create" @click="createOne()">Створити</button>

  </div>

</template>

<script>
import CreateField from "@/components/global/CreateField.vue";
import {createOne, getAll} from "@/components/httpService";

export default {
  name: "StudentCreate",
  components: {CreateField},
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