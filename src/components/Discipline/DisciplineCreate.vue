  <template>
  <div class="wrapper">
  <SimpleCreateField
      :name="'Назва'" input-width="150px" v-model="discipline.name" :error="error.name">
  </SimpleCreateField>
    <button class="create" @click="createOne()">Створити</button>

  </div>

</template>

<script>
import CreateField from "@/components/global/CreateField.vue";
import {createOne, getAll} from "@/components/httpService";
import SimpleCreateField from "@/components/global/CreateFields/SimpleCreateField.vue";

export default {
  name: "DisciplineCreate",
  components: {SimpleCreateField, CreateField},
  data: () => ({
    discipline: {},
    error:{}
  }), methods: {
    async createOne() {
      try {
        const res = (await createOne("discipline", this.discipline)).data;
        this.$router.push("disciplines/"+res.id);
      } catch (ex) {
        this.error = JSON.parse(ex.message);
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