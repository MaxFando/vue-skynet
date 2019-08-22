<template>
  <div class="tariff-details">
    <div class="header">
      <div class="header__left">
        <i class="left" @click.prevent="back"></i>
      </div>
      <div class="header__right">
        <span>Выбор тарифа</span>
      </div>
    </div>

    <div class="tariff-details__desc">
      <h2 class="tariff-details__desc-title">Тариф "{{ tariff.title }}"</h2>
      <div class="tariff-details__desc-body">
        <h2
          class="tariff-details__desc-body__payment-period"
        >Период оплаты - {{ tariff.pay_period }} месяцев</h2>
        <h2 class="tariff-details__desc-body__price">{{ tariff.price }} Р/мес</h2>
        <br />
        <div class="tariff-details__desc-body__payment-desc">
          <p>разовый платеж - {{ tariff.price * tariff.pay_period }} Р/мес</p>
          <p>со счета спишется - {{ tariff.price * tariff.pay_period }} Р</p>
        </div>
        <br />
        <div class="tariff-details__desc-body-period">
          <p>вступит в силу - сегодня</p>
          <p>активно до - {{setPeriodDuration(tariff.pay_period)}}</p>
        </div>
      </div>
      <button class="choose">
        <span>Выбрать</span>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "TariffDetails",
  props: {
    tariffs: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      tariff: null
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getTariff() {
      this.tariffs.forEach(item => {
        item.tarifs.map(elem => {
          if (elem.ID == this.$route.params.id) {
            this.tariff = elem;
          }
        });
      });
    },
    setPeriodDuration(months) {
      const date = new Date();
      const newDate = new Date(
        date.setMonth(date.getMonth() + parseInt(months))
      );

      return `${newDate.getDate()}.${newDate.getMonth()}.${newDate.getFullYear()}`;
    }
  },
  created() {
    this.getTariff();
  }
};
</script>

<style lang="scss">
.tariff-details {
  display: grid;
  grid-gap: 10px;
  max-width: 640px;
  margin: 0 auto;

  &__header {
    background-color: #ffffff;
  }

  &__desc {
    background-color: #ffffff;
    padding: 10px 0 10px 20px;

    h2,
    p {
      margin: 0;
    }

    &-title {
      color: #83c227;
    }

    &-body {
      &-period {
        color: #bababa;
      }

      border-bottom: 1px solid #dddddd;
      border-top: 1px solid #dddddd;
      margin: 10px 0;
      padding: 10px 0;
    }

    .choose {
      background-color: #83c227;
      border: none;
      color: #ffffff;
      width: calc(100% - 20px);
      font-size: 25px;
      padding: 1rem 0;
    }
  }
}
</style>