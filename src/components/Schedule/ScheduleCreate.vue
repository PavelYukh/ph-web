<template>
  <div class="wrapper">
    <RefCreateField :error="error.discipline" style="font-size: 120%" name="Предмет"
                v-model="schedule.discipline"
                 :link-conditions="{list:disciplines}"
    ></RefCreateField>
    <hr>

    <div class="info">
      <RefCreateField
                   :error="error.teacher"
                   :name="'Викладач'"
                  v-model="schedule.teacher"
                   :link-conditions="{list:teachers, label:'fullName'}"
                     ></RefCreateField>
      <RefCreateField :error="error.group"  name="Група"
                  v-model="schedule.group"
                   :link-conditions="{list:groups}"
      ></RefCreateField>
      <SelectCreateField :error="error.time"
                   :name="'День тижня'"
                   v-model="schedule.time" :link-conditions="{list:[
                       {value:schedule.time.replace(/^./, 0), name:'Понеділок'},
                       {value:schedule.time.replace(/^./, 1), name:'Вівторок'},
                       {value:schedule.time.replace(/^./, 2), name:'Середа'},
                       {value:schedule.time.replace(/^./, 3), name:'Четвер'},
                       {value:schedule.time.replace(/^./, 4), name:'П\'ятниця'},
                       {value:schedule.time.replace(/^./, 5), name:'Субота'},
                       {value:schedule.time.replace(/^./, 6), name:'Неділя'}]}"></SelectCreateField>

      <SelectCreateField  :error="error.time"
                   :name="'Час'"
                   v-model="schedule.time" :link-conditions="{isLink:false,list:[
                       {value:schedule.time.replace(/.$/, 1), name:'8:30'},
                       {value:schedule.time.replace(/.$/, 2), name:'10:25'},
                       {value:schedule.time.replace(/.$/, 3), name:'12:20'},
                       {value:schedule.time.replace(/.$/, 4), name:'14:15'},
                       {value:schedule.time.replace(/.$/, 5), name:'16:10'},
                       {value:schedule.time.replace(/.$/, 6), name:'18:30'}]}"></SelectCreateField>

      <SimpleCreateField  :error="error.classroom"  :name="'Кабінет'"
                   v-model="schedule.classroom"></SimpleCreateField>
    </div>    <button class="create" @click="createOne()">Створити</button>
  </div>
</template>

<script>
import CreateField from "@/components/global/CreateField.vue";
import {createOne, getAll} from "@/components/httpService";
import RefCreateField from "@/components/global/CreateFields/RefCreateField.vue";
import SelectCreateField from "@/components/global/CreateFields/SelectCreateField.vue";
import SimpleCreateField from "@/components/global/CreateFields/SimpleCreateField.vue";

export default {
  name: "ScheduleCreate",
  components: {SimpleCreateField, SelectCreateField, RefCreateField, CreateField},
  data: () => ({
    schedule: {time:'0-0'},
    groups: '',
    disciplines: '',
    teachers: '',
    error:{}
  }), methods: {
    async createOne() {
      try {
        const res = (await createOne("schedule", this.schedule)).data;
        this.$router.push("schedules/"+res.id);
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    }

  },
  async created() {
    this.groups = (await getAll("group")).data;
    this.disciplines = (await getAll("discipline")).data;
    this.teachers = (await getAll("teacher")).data;
    this.teachers.forEach(teacher => teacher.fullName = teacher.name + ' ' + teacher.surname);
  }
}
</script>

<style scoped>
.wrapper {
  flex-direction: column;
  align-items: center;
}
</style>