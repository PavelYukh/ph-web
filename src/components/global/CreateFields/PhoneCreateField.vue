<template>
  <div class="field">
    <div class="field-general">
      <h2>{{ name }}: </h2>
      <div class="fields">
        <input v-mask="'+38(0##)###-##-##'" :style="{width:inputWidth}" type="text" :value="modelValue"
               @input="$emit('update:modelValue', $event.target.value)">
      </div>
    </div>
    <p class="error">{{ error }}</p>
  </div>
</template>

<script>
import {mask} from 'vue-the-mask'
export default {
  name: "PhoneCreateField",
  props: ['modelValue','name', 'imgWidth', 'inputWidth','error'],
  emits: ['update:modelValue'],
  directives:{mask}
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