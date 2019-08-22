import Tariffs from "./components/Tariffs.vue";
import TariffOptions from "./components/TariffOptions.vue";
import TariffDetails from "./components/TariffDetails.vue";

import * as service from "./services";

const routes = [
  {
    path: "/",
    component: Tariffs,
    name: "tariffs",
    props: { tariffs: service.default.tarifs }
  },
  {
    path: "/options/:title",
    component: TariffOptions,
    name: "options",
    props: { tariffs: service.default.tarifs }
  },
  {
    path: "/details/:id",
    component: TariffDetails,
    name: "details",
    props: { tariffs: service.default.tarifs }
  }
];

export default routes;
