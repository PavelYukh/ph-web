<template>
  <div class="field">
    <div class="field-general">
    <h2>{{ name }}: </h2>
    <template v-if="!linkConditions">
      <h2 v-if="!editCondition"> {{ model }}</h2>
      <template v-else>
      <input v-if="isPhone" v-mask="'+38(0##)###-##-##'" :style="{width:inputWidth}" type="text" :value="model"
             @change="$emit('change', $event.target.value)">
<!--    <input v-else  :style="{width:inputWidth}" type="text" :value="model"-->
<!--             @change="$emit('change', $event.target.value)">-->
      </template>
    </template>
    <template v-else>
      <template v-if="!linkConditions.isLink">

        <select autocomplete="on" v-if="editCondition" @change="$emit('change', $event.target.value)">
          <option value="" disabled selected>Оберіть {{ name }}</option>
          <option v-for="option of linkConditions.list" :value="option.value">{{ option.name }}</option>
        </select>
        <h2 v-else>{{ linkConditions.additionalShow || model }}</h2>
      </template>

      <template v-else>
<!--        <RouterLink style="font-size: 120%" v-if="!editCondition" @change="$emit('change', $event.target.value)"-->
<!--                    :to="linkConditions.link">-->
<!--          {{ linkConditions.listConditions ? linkConditions.listConditions.name.map(el => model[el]).join(" ") : model.name }}-->
<!--        </RouterLink>-->
<!--        <select autocomplete="on" v-else @change="$emit('change', $event.target.value)">-->
<!--          <option value="" disabled selected></option>-->
<!--          <option v-for="option of linkConditions.list" :value="option.id">-->
<!--            {{-->
<!--              linkConditions.listConditions ? linkConditions.listConditions.name.map(el => option[el]).join(" ") : option.name-->
<!--            }}-->
<!--          </option>-->
<!--        </select>-->
      </template>
    </template>
    <div @click="editCondition=!editCondition" :style="{width:imgWidth}" class="edit"><img
        src="../../assets/imgs/edit.png" alt=""></div>
    </div>
    <p class="error">{{ error }}</p>

  </div>
</template>

<script>
import request from "axios";
import {mask} from 'vue-the-mask';
export default {
  name: "RedactField",
  directives:{mask},
  model: {
    prop: 'checked',
    event: 'change'
  },
  methods:{
    convertPhone(val){
        return val.replaceAll(/[^\d+]/g,'')
    }
  },

  data: () => ({editCondition: false}),
  props: ['model', 'name', 'imgWidth', 'isPhone', 'inputWidth', 'linkConditions', 'additionalShow', 'listConditions', 'error']
}
</script>

<style scoped>


.edit img {
  width: 100%;
}
.error{
  color: red;
  font-size: 105%;
  padding-left: 5px;
}


.field, .field-general {
  display: flex;
  align-items: center;
  flex-direction: row;
}

@media screen and (max-width: 500px) {
  .field {
    flex-direction: column;
  }
}

</style>