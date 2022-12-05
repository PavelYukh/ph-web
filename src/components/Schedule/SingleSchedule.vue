<template>
  <div class="wrapper">
    <p>{{ error.load }}</p>
    <div class="data" v-if="schedule">

      <RedactField :error="error.discipline" style="font-size: 140%" :img-width="'25px'" name="Предмет" :model="schedule.discipline"
                   @change="this.schedule.discipline = this.disciplines.find(el=>el.id==$event.target.value)"
                   :link-conditions="{isLink:true,list:disciplines, link:'/disciplines/'+schedule.discipline.id,}"
      ></RedactField>
      <hr>

      <div class="info">
        <RedactField :img-width="'25px'"
                     :error="error.teacher"
                     :name="'Викладач'" :model="schedule.teacher"
                     @change="this.schedule.teacher = this.teachers.find(el=>el.id==$event.target.value)"
                     :link-conditions="{isLink:true,list:teachers, link:'/teachers/'+schedule.teacher.id,
                    listConditions:{name:['name', 'surname']}
                     }"></RedactField>
             <RedactField :error="error.group" :img-width="'25px'" name="Група" :model="schedule.group"
                       @change="this.schedule.group = this.groups.find(el=>el.id==$event.target.value)"
                       :link-conditions="{isLink:true,list:groups, link:'/groups/'+schedule.group.id,}"
          ></RedactField>
           <RedactField class="field" :img-width="'25px'" :error="error.time"
                     :name="'День тижня'" :model="schedule.time"
                     @change="this.schedule.time = $event.target.value" :link-conditions="{isLink:false,list:[
                       {value:schedule.time.replace(/^./, 0), name:'Понеділок'},
                       {value:schedule.time.replace(/^./, 1), name:'Вівторок'},
                       {value:schedule.time.replace(/^./, 2), name:'Середа'},
                       {value:schedule.time.replace(/^./, 3), name:'Четвер'},
                       {value:schedule.time.replace(/^./, 4), name:'П\'ятниця'},
                       {value:schedule.time.replace(/^./, 5), name:'Субота'},
                       {value:schedule.time.replace(/^./, 6), name:'Неділя'}],
                       additionalShow:date}"></RedactField>

        <RedactField class="field" :img-width="'25px'" :error="error.time"
                     :name="'Час'" :model="schedule.time"
                     @change="this.schedule.time = $event.target.value" :link-conditions="{isLink:false,list:[
                       {value:schedule.time.replace(/.$/, 1), name:'8:30'},
                       {value:schedule.time.replace(/.$/, 2), name:'10:25'},
                       {value:schedule.time.replace(/.$/, 3), name:'12:20'},
                       {value:schedule.time.replace(/.$/, 4), name:'14:15'},
                       {value:schedule.time.replace(/.$/, 5), name:'16:10'},
                       {value:schedule.time.replace(/.$/, 6), name:'18:30'}],
                       additionalShow:time}"></RedactField>

        <RedactField :model="schedule.classroom" :error="error.classroom" :img-width="'25px'" :name="'Кабінет'"
                     @change="this.schedule.classroom = $event.target.value"></RedactField>
          </div>
    <div class="done-section">
      <p>Завершити редагування</p>
      <button style="width: 40px" @click="updateObj(schedule)" class="edit"><img src="../../assets/imgs/done.png"
                                                                                 alt=""></button>
    </div>
    <button class="delete" @click="deleteOne()">Видалити</button>
  </div>
  </div>
</template>

<script>
import request from "axios";
import RedactField from '../global/RedactField.vue';
import * as http from '../httpService'
export default {
  name: "SingleSchedule",
  components: {RedactField},
  data: () => ({
    schedule: '',
    disciplines:'',
    date: '',
    time: '',
    teachers: '',
    groups:'',
    error: {},
    weekDays: {
      '0': 'Понеділок',
      '1': 'Вівторок',
      '2': 'Середа',
      '3': 'Четвер',
      '4': "П'ятниця",
      '5': 'Субота',
      '6': 'Неділя',
    },
    timePairs: {
      '1': '8:30',
      '2': '10:25',
      '3': '12:20',
      '4': '14:15',
      '5': '16:10',
      '6': '18:30',
    },
  }),
  methods: {
    async deleteOne() {
      try {
        await http.deleteOne("schedule/" + this.$route.params.id);
        this.$router.replace({path: '/'});
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    },
    parseDateTime() {
      const split = this.schedule.time.split("-");
      this.date = this.weekDays[split[0]] || '';
      this.time = this.timePairs[split[1]] || '';
    },
    async updateObj(schedule) {
      try {
        await http.updateOne("schedule/" + this.$route.params.id, schedule);
        this.$router.go()
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    }

  }, watch: {
    'schedule.time': {
      handler(val) {
        this.parseDateTime();
      },
    }
  },
  async created() {
    try {
      this.teachers = (await http.getAll("teacher")).data;
      this.groups = (await http.getAll("group")).data;
      this.disciplines = (await http.getAll("discipline")).data;
      const data = await (http.getAll("schedule/" + this.$route.params.id));
      this.schedule = data.data;

      this.parseDateTime();
    } catch (ex) {
      if (ex.response.status === 400) {
        this.error.load = 'Заняття з таким id не існує'
        this.schedule = '';
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