  <template>

  <div class="field">
    <div class="field-general">
      <h2>{{name}}:</h2>
      <template v-if="!linkConditions">
      <input v-if="isPhone" v-mask="'+38(0##)###-##-##'" :style="{width:inputWidth}" type="text"
             @input="$emit('input', $event.target.value)">
      <input v-else  :style="{width:inputWidth}" type="text"
             @input="$emit('input', $event.target.value)">
      </template>
      <template v-else>
        <template v-if="!linkConditions.isLink">

          <select autocomplete="on" @change="$emit('change', $event.target.value)">
            <option value="" disabled selected>Оберіть {{ name }}</option>
            <option v-for="option of linkConditions.list" :value="option.value">{{ option.name }}</option>
          </select>
        </template>
        <template v-else>
          <select autocomplete="on"  @change="$emit('change', $event.target.value)">
            <option value="" disabled selected></option>
            <option v-for="option of linkConditions.list" :value="option.id">
              {{
                linkConditions.listConditions ? linkConditions.listConditions.name.map(el => option[el]).join(" ") : option.name
              }}
            </option>
          </select>
        </template>
      </template>
    </div>
    <p class="error">{{ error }}</p>
  </div>
</template>
<script>
import {mask} from'vue-the-mask';
export default {
  name: "CreateField",
  props: ['name', 'linkConditions','inputWidth', 'error', 'isPhone'],
  directives:{mask},
  model: {
    prop: 'checked',
    event: 'change'
  },
  data: () => ({})
}
</script>

<style scoped>

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

@media screen and (max-width: 500px) {
  .field {
    flex-direction: column;
  }
}
</style>