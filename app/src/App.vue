<template>
  <div id="app">
    <router-view>
      <Tariffs :tariffs="tariffs" />
    </router-view>
  </div>
</template>

<script>
import * as service from "./services";
import Tariffs from "./components/Tariffs";

export default {
  name: "app",
  data() {
    return {
      tariffs: []
    };
  },
  components: {
    Tariffs
  },
  created() {
    this.tariffs = service.default.tarifs;
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
body {
  background-color: #f0f0f4;
}
.header {
  border-bottom: 1px solid #ddd;
  background-color: #ffffff;
  height: 3em;
  line-height: 50px;

  display: grid;
  grid-template-columns: 40px 1fr;
  justify-items: center;

  span {
    font-size: 24px;
    color: #4c565c;
    font-weight: 700;
  }

  i {
    border: solid #8cc637;
    border-width: 0 5px 5px 0;
    display: inline-block;
    padding: 6px;
    margin-left: 1em;
  }

  .left {
    transform: rotate(45deg);
    -webkit-transform: rotate(135deg);
    cursor: pointer;
  }
}
h2,
p {
  margin: 0;
  color: #4c565c;
}
a {
  text-decoration: none;
  color: #8cc637;
}
</style>
