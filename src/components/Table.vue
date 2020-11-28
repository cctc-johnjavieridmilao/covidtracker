<template>
  <v-data-table
    :headers="headers"
    :items="CovidCasesPerCountry"
    :items-per-page="10"
    :search="search"
    item-key="name"
    class="elevation-1"
    :footer-props="{
      showFirstLastPage: true,
      firstIcon: 'mdi-arrow-collapse-left',
      lastIcon: 'mdi-arrow-collapse-right',
      prevIcon: 'mdi-minus',
      nextIcon: 'mdi-plus'
    }"
  ></v-data-table>
</template>

<script>
export default {
  name: "Table",
  props: ["headers", "CovidCasesPerCountry", "search"]
};
</script>