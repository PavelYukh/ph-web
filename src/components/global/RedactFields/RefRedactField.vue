<template>
  <div class="field">
    <div class="field-general">
      <h2>{{ name }}: </h2>
      <div class="fields">
      <RouterLink style="font-size: 120%" v-if="!editCondition" @change="$emit('change', $event.target.value)"
                  :to="linkConditions.link">
        {{modelValue[linkConditions.label||'name']}}
      </RouterLink>
      <v-select class="v-select" :style="{'min-width': inputWidth}"  v-else @update:modelValue="$emit('update:modelValue', $event)"
                :options="linkConditions.list" :label="linkConditions.label||'name'">
      </v-select>

      <div @click="editCondition=!editCondition" :style="{width:imgWidth}" class="edit"><img
          src="../../../assets/imgs/edit.png" alt=""></div>
    </div>
    </div>
    <p class="error">{{ error }}</p>
  </div>
</template>
<script>
import 'vue-select/dist/vue-select.css'
import vSelect from 'vue-select';
export default {
  name: "RefRedactField",
  components:{vSelect},
  data: () => ({editCondition: false}),
  props: ['modelValue', 'name', 'imgWidth', 'inputWidth', 'error', 'linkConditions'],
  emits: ['update:modelValue']

}
</script>

<style scoped>

.edit img {
  width: 100%;
}

.error {
  color: red;
  font-size: 105%;
  padding-left: 5px;
}


.field, .field-general {
  display: flex;
  align-items: center;
  flex-direction: row;
}

.fields{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
@media screen and (max-width: 500px) {
  .field-general {
    flex-direction: column;
    text-align: center;
  }
  .fields{
    flex-direction: column;
    align-items: center;
  }
}


</style>