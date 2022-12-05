<template>
  <div class="wrapper">
    <CreateField :error="error.discipline" style="font-size: 140%" name="Предмет"
                 @input="this.schedule.discipline = this.disciplines.find(el=>el.id==$event.target.value)"
                 :link-conditions="{isLink:true,list:disciplines}"
    ></CreateField>
    <hr>

    <div class="info">
      <CreateField
                   :error="error.teacher"
                   :name="'Викладач'"
                   @input="this.schedule.teacher = this.teachers.find(el=>el.id==$event.target.value)"
                   :link-conditions="{isLink:true,list:teachers,
                    listConditions:{name:['name', 'surname']}
                     }"></CreateField>
      <CreateField :error="error.group"  name="Група"
                   @input="this.schedule.group = this.groups.find(el=>el.id==$event.target.value)"
                   :link-conditions="{isLink:true,list:groups}"
      ></CreateField>
      <CreateField :error="error.time"
                   :name="'День тижня'"
                   @input="this.schedule.time = $event.target.value" :link-conditions="{isLink:false,list:[
                       {value:schedule.time.replace(/^./, 0), name:'Понеділок'},
                       {value:schedule.time.replace(/^./, 1), name:'Вівторок'},
                       {value:schedule.time.replace(/^./, 2), name:'Середа'},
                       {value:schedule.time.replace(/^./, 3), name:'Четвер'},
                       {value:schedule.time.replace(/^./, 4), name:'П\'ятниця'},
                       {value:schedule.time.replace(/^./, 5), name:'Субота'},
                       {value:schedule.time.replace(/^./, 6), name:'Неділя'}]}"></CreateField>

      <CreateField  :error="error.time"
                   :name="'Час'"
                   @input="this.schedule.time = $event.target.value" :link-conditions="{isLink:false,list:[
                       {value:schedule.time.replace(/.$/, 1), name:'8:30'},
                       {value:schedule.time.replace(/.$/, 2), name:'10:25'},
                       {value:schedule.time.replace(/.$/, 3), name:'12:20'},
                       {value:schedule.time.replace(/.$/, 4), name:'14:15'},
                       {value:schedule.time.replace(/.$/, 5), name:'16:10'},
                       {value:schedule.time.replace(/.$/, 6), name:'18:30'}]}"></CreateField>

      <CreateField  :error="error.classroom"  :name="'Кабінет'"
                   @input="this.schedule.classroom = $event.target.value"></CreateField>
    </div>    <button class="create" @click="createOne()">Створити</button>
  </div>
</template>

<script>
import CreateField from "@/components/global/CreateField.vue";
import {createOne, getAll} from "@/components/httpService";

export default {
  name: "ScheduleCreate",
  components: {CreateField},
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
  }
}
</script>

<style scoped>
.wrapper {
  flex-direction: column;
  align-items: center;
}
</style>