<template>
  <v-app>
    <Navbar />
    <v-main>
      <v-container class="grey lighten-5">
        <v-col cols="12" sm="12" md="12">
          <v-select
            @change="FilterByCountry"
            v-model="select"
            :hint="`${select.Country}, ${select.CountryCode}`"
            :items="CountryList"
            item-text="Country"
            item-value="CountryCode"
            label="Select"
            persistent-hint
            return-object
            single-line
          ></v-select>
        </v-col>

        <CovidCasesGlobal
          :TotalConfirmed="TotalConfirmed"
          :TotalDeaths="TotalDeaths"
          :TotalRecovered="TotalRecovered"
          :NewConfirmed="NewConfirmed"
          :NewDeaths="NewDeaths"
          :NewRecovered="NewRecovered"
        />

        <v-col cols="12" sm="12" md="12">
          <Barchart :labels="labels" :data="data" />
        </v-col>

        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title>
                COVID CASES PER COUNTRY
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <Table
                :headers="headers"
                :CovidCasesPerCountry="CovidCasesPerCountry"
                :search="search"
              />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import CovidCasesGlobal from "./components/CovidCasesGlobal";
import Barchart from "./components/Barchart";

export default {
  name: "App",
  components: {
    Navbar,
    Table,
    CovidCasesGlobal,
    Barchart
  },

  data() {
    return {
      search: "",
      TotalCovidCases: "",
      TotalConfirmed: "",
      TotalDeaths: "",
      TotalRecovered: "",
      NewConfirmed: "",
      NewDeaths: "",
      NewRecovered: "",
      CovidCasesPerCountry: [],
      CountryList: [
        {
          Country: "All",
          CountryCode: "all"
        }
      ],
      select: { Country: "Philippines", CountryCode: "PH" },
      headers: [
        { text: "COUNTRY", value: "Country" },
        { text: "NEW CONFIRMED", value: "NewConfirmed" },
        { text: "NEW DEATHS", value: "NewDeaths" },
        { text: "NEW RECOVERED", value: "NewRecovered" },
        { text: "TOTAL CONFIRMED", value: "TotalConfirmed" },
        { text: "TOTAL DEATHS", value: "TotalDeaths" },
        { text: "TOTAL RECOVERED", value: "TotalRecovered" }
      ],
      labels: [],
      data: []
    };
  },
  methods: {
    getCovidSummary() {
      this.$api
        .get("/summary")
        .then(res => {
          res.data.Countries.forEach(data => {
            this.CovidCasesPerCountry.push({
              Country: data.Country,
              NewConfirmed: data.NewConfirmed.toLocaleString("en"),
              NewDeaths: data.NewDeaths.toLocaleString("en"),
              NewRecovered: data.NewRecovered.toLocaleString("en"),
              TotalConfirmed: data.TotalConfirmed.toLocaleString("en"),
              TotalDeaths: data.TotalDeaths.toLocaleString("en"),
              TotalRecovered: data.TotalRecovered.toLocaleString("en")
            });

            this.CountryList.push({
              Country: data.Country,
              CountryCode: data.CountryCode
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCovidStatus(code) {
      var num = [];

      this.labels.length = 0; //RESET LABEL
      this.data.length = 0; // RESET DATA

      this.$api
        .get("/summary")
        .then(res => {
          if (code == "all") {
            this.TotalCovidCases = res.data.Global;
            this.TotalConfirmed = res.data.Global.TotalConfirmed.toLocaleString(
              "en"
            );
            this.TotalDeaths = res.data.Global.TotalDeaths.toLocaleString("en");
            this.TotalRecovered = res.data.Global.TotalRecovered.toLocaleString(
              "en"
            );
            this.NewConfirmed = res.data.Global.NewConfirmed.toLocaleString(
              "en"
            );
            this.NewDeaths = res.data.Global.NewDeaths.toLocaleString("en");
            this.NewRecovered = res.data.Global.NewRecovered.toLocaleString(
              "en"
            );

            this.labels.push(
              "Total Confirmed",
              "Total Deaths",
              "Total Recovered"
            );
            this.data.push(
              res.data.Global.TotalConfirmed,
              res.data.Global.TotalDeaths,
              res.data.Global.TotalRecovered
            );
            return false;
          }

          res.data.Countries.forEach(data => {
            if (code == data.CountryCode) {
              this.TotalConfirmed = data.TotalConfirmed.toLocaleString("en");
              this.TotalDeaths = data.TotalDeaths.toLocaleString("en");
              this.TotalRecovered = data.TotalRecovered.toLocaleString("en");

              this.NewConfirmed = data.NewConfirmed.toLocaleString("en");
              this.NewDeaths = data.NewDeaths.toLocaleString("en");
              this.NewRecovered = data.NewRecovered.toLocaleString("en");

              num.push(
                data.TotalConfirmed,
                data.TotalDeaths,
                data.TotalRecovered,
                data.NewConfirmed,
                data.NewDeaths,
                data.NewRecovered
              );
            }
          });

          this.labels.push(
            "Total Confirmed",
            "Total Deaths",
            "Total Recovered"
          );
          this.data.push(num[0], num[1], num[2]);
        })
        .catch(err => {
          console.log(err);
        });
    },

    FilterByCountry(CountryList) {
      let code = CountryList.CountryCode;

      this.getCovidStatus(code);
    }
  },

  mounted() {
    this.getCovidSummary();
    this.getCovidStatus("PH");
  }
};
</script>
