<template>
  <table>
    <thead>
    <th v-for="field of fields">{{ field.name }}</th>
    <th></th>

    </thead>
    <tbody>
    <tr v-for="entity of data">
      <td v-for="field of fields">

        <RouterLink v-if="field.ref?.isRef" :to="`/${field.ref.refLink}\/${entity[field.value[0]].id}`">{{
            field?.ref?.multipleValue ? entity[field.value[0]][field.value[1][0]] + ' ' +entity[field.value[0]][field.value[1][1]]:
                entity[field.value[0]][field.value[1]]
          }}
        </RouterLink>
        <p v-else>{{ entity[field.value] }}</p>
      </td>
      <td>
        <RouterLink :to="'/'+link+'/' + entity.id">Детальніше</RouterLink>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "Table",
  props: ['fields', 'data', 'link']
}
</script>

<style scoped>


a {
  font-size: 105%;
}

</style>