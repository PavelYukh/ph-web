<template>
  <div class="wrapper">

    <p>{{ error.load }}</p>
    <div class="data" v-if="group">

      <RedactField :error="error.discipline" :img-width="'25px'" name="Cпеціальність" :model="group.department"
                   @change="this.group.department = this.departments.find(el=>el.id==$event.target.value)"
                   :link-conditions="{isLink:true,list:departments, link:'/departments/'+group.department.id,}"
      ></RedactField>

      <RedactField :error="error.name"  :img-width="'25px'" :input-width="'60px'"
                   :name="'Назва'" :model="group.name"
                   @change="this.group.name = $event.target.value"></RedactField>

        <RedactField :error="error.course"  :img-width="'25px'"
                     :name="'Курс'" :model="group.course"
                     @change="this.group.course = $event.target.value" :link-conditions="{isLink:false,list:[
                       {value:1,name:1},
                       {value:2,name:2},
                       {value:3,name:3},
                       {value:4,name:4},
                       {value:5,name:5},
                       {value:6,name:6},
                         ]}"></RedactField>



      <div class="done-section">
        <h3>Завершити редагування</h3>
        <button style="width: 40px" @click="updateObj(group)" class="edit"><img src="../../assets/imgs/done.png" alt="">
        </button>
      </div>
      <button class="delete" @click="deleteOne()">Видалити</button>
    </div>
  </div>
</template>

<script>
import request from "axios";
import RedactField from "@/components/global/RedactField.vue";
import * as http from "@/components/httpService";

export default {
  name: "SingleGroup",
  components: {RedactField},
  data: () => ({
    group: '',
    error: {},
    editName: '',
    editCourse: '',
    departments: ''
  }),
  methods: {
    async deleteOne() {
      try {
        await http.deleteOne("group/" + this.$route.params.id);
        this.$router.replace({path: '/'});
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    },
    async updateObj(group) {
      try {
        await http.updateOne("group/" + this.$route.params.id, group);
        this.$router.go()
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    }


  },
  async created() {
    try {
      const data = await http.getOne("group/" + this.$route.params.id);
      this.group = data.data;
      this.departments = (await http.getAll("department")).data;
    } catch (ex) {
      if (ex.response.status === 400) {
        this.error.load = 'Група з таким id не існує'
        this.group = '';
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