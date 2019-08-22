<template>
  <div class="tariff-options">
    <div class="header">
      <div class="header__left">
        <i class="left" @click.prevent="back"></i>
      </div>
      <div class="header__right">
        <span>Тариф "{{ tariff.title }}"</span>
      </div>
    </div>

    <div class="tariff-options__tariffs" v-for="row in tariff.tarifs" v-bind:key="row.ID">
      <router-link :to="{ name: 'details', params: {id: row.ID } }">
        <h2 class="tariff-options__pay-period">{{row.pay_period}} месяц</h2>
      </router-link>
      <div class="tariff-options__short-desc">
        <h2 class="tariff-options__short-desc__price">{{row.price}} Р/мес</h2>
        <p class="tariff-options__short-desc__single-payment">разовый платеж - {{ row.price }} Р/мес</p>
        <p
          v-if="!minIds.includes(row.ID)"
          class="tariff-options__short-desc__dicount"
        >скидка - {{ row.discount }} Р</p>
        <router-link :to="{ name: 'details', params: {id: row.ID } }">
          <i class="right"></i>
        </router-link>
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
  data() {
    return {
      tariff: {
        type: Array,
        required: true
      },
      minIds: null
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    setDiscounts() {
      this.tariffs.map(item => {
        const { tarifs } = item;

        const ids = tarifs.map(elem => elem.ID);
        const minId = Math.min.apply(null, ids);
        const defaultPrice = tarifs.filter(elem => elem.ID === minId)[0].price;

        item.tarifs
          .filter(elem => elem !== minId)
          .map(elem => {
            elem["discount"] = elem.price - defaultPrice;
            return elem;
          });

        return item;
      });
    },
    getMinId() {
      this.minIds = this.tariffs.map(item => {
        const { tarifs } = item;

        const ids = tarifs.map(elem => elem.ID);
        const minId = Math.min.apply(null, ids);

        return minId;
      });
    }
  },
  created() {
    this.tariff = this.tariffs.filter(
      item => item.title == this.$route.params.title
    )[0];
    this.setDiscounts();
    this.getMinId();
  }
};
</script>

<style lang="scss">
.tariff-options {
  display: grid;
  grid-gap: 20px;
  max-width: 640px;
  margin: 0 auto;

  .right {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    position: relative;
    left: calc(100% - 3em);
    bottom: 2em;
    cursor: pointer;
  }

  &__tariffs {
    border-radius: 3px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding-left: 1em;
    background-color: #ffffff;
  }

  &__pay-period {
    color: #8cc637;
    border-bottom: 1px solid #ddd;
    margin: 0;
    line-height: 50px;
    cursor: pointer;
  }

  &__short-desc__price {
    margin: 10px 0;
  }
}
</style>