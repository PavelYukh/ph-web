<template>

<div class="card">
  <p><RouterLink :to="`/disciplines/${schedule.discipline.id}`">{{schedule.discipline.name}}</RouterLink></p>
  <hr>

  <div class="info">
    <p><RouterLink :to="'/teachers/'+schedule.teacher.id">{{schedule.teacher.name +' '+ schedule.teacher.surname}}</RouterLink></p>
    <p>{{schedule.group.name}}</p>
    <p>{{date}} - {{time}}</p>
    <p>{{schedule.classroom}}</p>
    <h5 style="margin: 5px"> <RouterLink :to="`/schedules/${schedule.id}`">Детальніше</RouterLink></h5>
  </div>
</div>
</template>

<script>

// @ts-ignore
export default {
  name: "ScheduleCard",
  props:['schedule'],
  methods:{
    parseDateTime(){
      const split = this.schedule.time.split("-");
      this.date=this.weekDays[split[0]] || '';
      this.time=this.timePairs[split[1]] || '';
    },

  },watch:{
    'schedule.time':{
      handler(val){
        this.parseDateTime();
      },
      immediate:true,
    }
  },
  data: ()=>({
    date:'',
    time:'',
    weekDays:{
      '0': 'Понеділок',
      '1': 'Вівторок',
      '2': 'Середа',
      '3': 'Четвер',
      '4': "П'ятниця",
      '5': 'Субота',
      '6': 'Неділя',
    },
    timePairs:{
      '1':'8:30',
      '2':'10:25',
      '3':'12:20',
      '4':'14:15',
      '5':'16:10',
      '6':'18:30',
    }
  })

}
</script>

<style scoped>

.card{
  background-color: wheat;
  padding: 10px;
  border-radius: 1em;
  width: 220px;
}
h3{
  font-size: 100%;
}
</style>