<template>
  <div class="tariffs">
    <div class="tariffs__list">
      <div class="tariffs__item" v-for="row in tariffs" v-bind:key="row.title">
        <div class="tariffs__item-label">
          <router-link :to="{ name: 'options', params: {title: row.title } }">
            <h1>Тариф "{{row.title}}"</h1>
          </router-link>
        </div>
        <div class="tariffs__content">
          <div class="tariffs__item-speed" v-bind:style="{ background: row.main_color }">
            <span>{{row.speed}} Мбит/c</span>
          </div>
          <span class="tariffs__item-price">{{ row.min_price }} - {{ row.max_price }} Р/мес</span>
          <router-link :to="{ name: 'options', params: {title: row.title } }">
            <i class="right"></i>
          </router-link>
        </div>
        <a class="link" href="www.sknt.ru">узнать подробнее на сайте www.sknt.ru</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tariffs: {
      type: Array,
      required: true
    }
  },
  methods: {
    getPrices() {
      this.tariffs.map(item => {
        const { tarifs } = item;

        const ids = tarifs.map(elem => elem.ID);
        const maxId = Math.max.apply(null, ids);
        const minId = Math.min.apply(null, ids);

        item["max_price"] = tarifs.filter(elem => elem.ID === minId)[0].price;
        item["min_price"] =
          tarifs.filter(elem => elem.ID === maxId)[0].price / 12;

        return item;
      });
    },
    getMainColor() {
      this.tariffs.map(item => {
        if (this.findWord("Земля", item.title)) {
          item["main_color"] = "#705f3c";

          return item;
        } else if (this.findWord("Вода", item.title)) {
          item["main_color"] = "#017eff";

          return item;
        } else if (this.findWord("Огонь", item.title)) {
          item["main_color"] = "#e84601";

          return item;
        }
      });
    },
    findWord(word, str) {
      return str.split(" ").some(function(w) {
        return w === word;
      });
    }
  },
  created() {
    this.getPrices();
    this.getMainColor();
  }
};
</script>

<style lang="scss">
i {
  border: solid #e8e8ea;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
}

.tariffs {
  height: 100vh;

  .right {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    position: relative;
    left: calc(100% - 8em);
    bottom: 1em;
    cursor: pointer;
  }

  &__list {
    display: grid;
    list-style-type: none;
  }

  &__content {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding-top: 15px;
    padding-bottom: 15px;
    font-size: 23px;

    p {
      margin: 20px 0 0 0;
    }
  }

  &__item {
    display: grid;
    background-color: #ffffff;

    &-price {
      font-weight: 700;
      color: #4c565c;
    }

    &-label {
      color: #8cc637;
    }

    &-speed {
      width: 7em;
      height: 2em;
      text-align: center;
      vertical-align: middle;
      color: #ffffff;
      font-weight: 600;
      position: relative;
      right: 10px;
      margin-bottom: 10px;

      span {
        line-height: 50px;
      }
    }

    .link {
      line-height: 60px;
      font-size: 20px;
      text-decoration: none;
      color: #017eff;
    }
  }
}

@media screen and (max-width: 640px) {
  .tariffs {
    &__list {
      grid-gap: 10px;
      grid-template-rows: repeat(auto-fit, minmax(200px, 1fr));
    }
  }
}

@media screen and (min-width: 641px) and (max-width: 1023px) {
  .tariffs {
    &__list {
      grid-gap: 10px;
      grid-template-rows: repeat(auto-fit, minmax(100px, 1fr));
      grid-template-columns: repeat(2, 1fr);
    }

    &__item {
      border-radius: 3px;
      padding: 10px;
    }
  }
}

@media screen and (min-width: 1024px) {
  .tariffs {
    &__list {
      grid-gap: 10px;
      grid-template-rows: repeat(auto-fit, minmax(100px, 1fr));
      grid-template-columns: repeat(3, 1fr);
    }

    &__item {
      border-radius: 3px;
      padding: 10px;
    }
  }
}
</style>