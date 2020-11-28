<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="4">
        <v-card>
          <v-card-title>TOTAL CONFIRMED</v-card-title>
          <v-card-text>{{TotalConfirmed}}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-card>
          <v-card-title>TOTAL DEATHS</v-card-title>
          <v-card-text>{{TotalDeaths}}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-card>
          <v-card-title>TOTAL RECEVORED</v-card-title>
          <v-card-text>{{TotalRecovered}}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-card>
          <v-card-title>NEW CONFIRMED</v-card-title>
          <v-card-text :style="styling">+ {{NewConfirmed}}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-card>
          <v-card-title>NEW DEATHS</v-card-title>
          <v-card-text :style="styling">+ {{NewDeaths}}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-card>
          <v-card-title>NEW RECEVORED</v-card-title>
          <v-card-text :style="styling">+ {{NewRecovered}}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      colorRed: "red"
    };
  },
  props: [
    "TotalConfirmed",
    "TotalDeaths",
    "TotalRecovered",
    "NewConfirmed",
    "NewDeaths",
    "NewRecovered"
  ],
  computed: {
    styling() {
      return {
        color: this.colorRed
      };
    }
  }
};
</script>

<style>
</style>