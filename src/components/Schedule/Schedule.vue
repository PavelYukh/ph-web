<template>
  <div class="wrapper">

    <select required v-model="searchBy" class="chooseGroup">
      <option disabled value="">Шукати за:</option>
      <option value="groups">Групою</option>
      <option value="teachers">Викладачем</option>
      <option value="disciplines">Предметом</option>
    </select>
    <select required v-if="searchBy==='groups'" v-model="chosen" class="chooseGroup">
      <option disabled value="">Оберіть групу</option>
      <option v-for="group of groups" :value="group.id">{{ group.name }}</option>
    </select>

    <select required v-else-if="searchBy==='teachers'" v-model="chosen" class="chooseGroup">
      <option disabled value="">Оберіть викладача</option>
      <option v-for="teacher of teachers" :value="teacher.id">{{ teacher.name }} {{ teacher.surname }}</option>
    </select>

    <select required v-else-if="searchBy==='disciplines'" v-model="chosen" class="chooseGroup">
      <option disabled value="">Оберіть предмет</option>
      <option v-for="discipline of disciplines" :value="discipline.id">{{ discipline.name }}</option>

    </select>

    <p>{{ error }}</p>
    <div class="cards">
      <ScheduleCard v-for="sched of schedule" :schedule="sched"></ScheduleCard>
       </div>
  </div>
</template>

<script>
import request from 'axios';
import ScheduleCard from './ScheduleCard.vue';
import * as http from "@/components/httpService";

export default {
  name: "Schedule",
  components: {ScheduleCard},

  data: () => ({
    searchOptions: {
      group: {}
    },
    searchBy: '',
    groups: '',
    teachers: '',
    disciplines: '',
    chosen: '',
    schedule: '',
    error: ''
  }),
  watch: {
    searchBy: {
      handler(val) {
        this.chosen = '';
      }
    },

  chosen: {
    async handler(val) {
      if(val==='') return;
      this.error='';
      if (this.searchBy === 'groups') {
        try {
          const schedules = await http.getAll("schedule", {params: {group: this.chosen}});
          this.schedule = schedules.data;

          this.error = ''
        } catch (error) {
          if (error.response.status === 400) {
            this.error = 'Для цієї групи немає графіків'
            this.schedule = '';
          }
        }
      } else if (this.searchBy === 'teachers') {
        try {
          const schedules = await http.getAll("schedule", {params: {teacher: this.chosen}});
          this.schedule = schedules.data;

          this.error = ''
        } catch (error) {
          if (error.response.status === 400) {
            this.error = 'Для цього викладача немає графіків'
            this.schedule = '';
          }
        }
      } else if (this.searchBy === "disciplines") {
        try {
          const schedules = await http.getAll("schedule", {params: {discipline: this.chosen}});
          this.schedule = schedules.data;

          this.error = ''
        } catch (error) {
          if (error.response.status === 400) {
            this.error = 'Для цього предмету немає графіків'
            this.schedule = '';
          }
        }
      }
    },
    immediate: true
  }},
  async created() {
    const groups = await http.getAll('group')
    const teachers = await http.getAll('teacher')
    const disciplines = await http.getAll('discipline')
    this.groups = groups.data;
    this.teachers = teachers.data;
    this.disciplines = disciplines.data;

  }
}
</script>

<style scoped>
.cards {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 50px;
}

.cards > * {
  margin: 5px;
}

.wrapper {
  flex-direction: column;
  align-items: center;

}

.chooseGroup {
  margin-top: 20px;
  font-size: 120%;
}
</style>