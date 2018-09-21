<template>
  <div class="KARMA">
    <header>
      <div>Account：{{userName}}</div>
      <p>Total：{{total}} KARMA</p>
      <p>Powered Up：{{powerUp}} KARMA</p>
      <p>Refunding：{{refunding}} KARMA</p>
    </header>

    <main>
      <van-tabs v-model="active">
        <van-tab title="Power up" class="karma-tab">
          <div class="karma-title">
            Power Up your KARMA -
            <small>Earn more KARMA!</small>
          </div>

          <van-cell-group>
            <van-field type="number" v-model="powerUpQuantity" required clearable label="Quantity"/>
          </van-cell-group>

          <div>
            <p>By executing this action you are agreeing to the EOS constitution and this action's associated ricardian contract. The ricardian contract may be viewed in the Scatter approval prompt.</p>
          </div>

          <div class="txc">
            <van-button class="karma-btn" type="default" @click="submitPowerUp">POWER UP</van-button>
          </div>
        </van-tab>

        <van-tab title="Power down" class="karma-tab">
          <div class="karma-title">
            Power Down your KARMA -
            <small>You don't want more KARMA?</small>
          </div>

          <van-cell-group>
            <van-field type="number" v-model="powerDownQuantity" required clearable label="Quantity"/>
          </van-cell-group>

          <div>
            <p>By executing this action you are agreeing to the EOS constitution and this action's associated ricardian contract. The ricardian contract may be viewed in the Scatter approval prompt.</p>
          </div>

          <div class="txc">
            <van-button class="karma-btn" type="default" @click="submitPowerDown">POWER DOWN</van-button>
          </div>

        </van-tab>
      </van-tabs>
    </main>

  </div>
</template>

<script>
  import GlobalMethods from '../mixins/GlobalMethos';

  export default {
    name: "KARMA",
    mixins: [GlobalMethods],
    data() {
      return {
        data: {},
        active: 0,
        address: '',
        userName: 'wangsitu2134',
        powerUpQuantity: '',
        powerDownQuantity: '',
        permission: 'active',
        total: '0.0000',
        powerUp: '0.0000',
        refunding: '0.0000'
      }
    },

    computed: {
      'powerUpData'() {
        return {
          actions: {
            account: 'therealkarma',
            name: 'powerup',
            authorization: [
              {
                actor: this.userName,
                permission: this.permission
              }
            ],
            data: {
              owner: this.userName,
              quantity: `${this.powerUpQuantity} KARMA`
            },
          },
          address: this.address,
          account: this.userName
        }
      },

      'powerDownData'() {
        return {
          actions: {
            account: 'therealkarma',
            name: 'powerdown',
            authorization: [
              {
                actor: this.userName,
                permission: this.permission
              }
            ],
            data: {
              owner: this.userName,
              quantity: `${this.powerDownQuantity} KARMA`
            },
          },
          address: this.address,
          account: this.userName
        }
      }
    },

    methods: {
      quantityCheck(quantity, type) {
        if (quantity === '') {
          Dialog.init(`${type}数量不能为空`);
          return false;
        }

        if (quantity <= 0) {
          Dialog.init(`${type}数量必须大于0`);
          return false;
        }

        if (quantity > this.total && type === '抵押') {
          Dialog.init(`${type}不能大于${this.total}`);
          return false;
        }

        if (quantity > this.powerUp && type === '赎回') {
          Dialog.init(`${type}不能大于${this.powerUp}`);
          return false;
        }

        return true
      },

      submitPowerUp() {
        if (this.quantityCheck(this.powerUpQuantity, '抵押')) {
          this.powerUpQuantity = Number(this.powerUpQuantity).toFixed(4);
          console.log(this.powerUpData);
          this.$tp.pushEosAction(this.powerUpData).then(res => {
            res.result ? Dialog.init('抵押操作成功') : Dialog.init('抵押操作失败');
          });
        }
      },

      submitPowerDown() {
        if (this.quantityCheck(this.powerDownQuantity, '赎回')) {
          this.powerDownQuantity = Number(this.powerDownQuantity).toFixed(4);
          this.$tp.pushEosAction(this.powerDownData).then(res => {
            res.result ? Dialog.init('赎回操作成功') : Dialog.init('赎回操作失败');
          });
        }
      },

      // 退回状态
      getRefundingTable() {
        this.$tp.getTableRows({
          json: true,
          code: 'therealkarma',
          scope: this.userName,
          table: 'refunding',
          lower_bound: "10",
          limit: 500
        }).then(res => {
          if (res.result) {
            if (res.data.rows.length > 0) {
              this.refunding = res.data.rows[0].quantity.replace(' KARMA', '');
            }
          }
        });
      },

      // 抵押状态
      getPowerTable() {
        this.$tp.getTableRows({
          json: true,
          code: 'therealkarma',
          scope: this.userName,
          table: 'power',
          lower_bound: "10",
          limit: 500
        }).then(res => {
          if (res.result) {
            // console.log(res, 2222);
            if (res.data.rows.length > 0) {
              this.powerUp = res.data.rows[0].quantity.replace(' KARMA', '');
            }
          }
        });
      },

      // 获取当前余额
      getBalance() {
        this.$tp.getEosBalance({
          account: this.userName,
          contract: 'therealkarma',
          symbol: 'KARMA'
        }).then(res => {
          if (res.result) {
            // console.log(res, 3333);
            if (res.data.balance.length > 0) {
              this.total = res.data.balance[0].replace(' KARMA', '');
            }
          }
        });
      }
    },

    created() {
      this.$tp.getCurrentWallet().then(res => {
        if (res.result) {
          this.address = res.data.address;
          this.userName = res.data.name;
          this.getBalance();
          this.getRefundingTable();
          this.getPowerTable();
        }
      });
    }
  }
</script>

<style lang="scss" scoped>
  header {
    margin: 15px;
    background: #434343;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 1px 1px 2px 1px #434343;
    div {
      color: #c1c1c1;
      margin-bottom: 5px;
    }

    p {
      color: #fff;
      font-size: 18px;
      margin: 10px 0 0;
    }
  }

  main {
    .karma-tab {
      padding: 0 15px;
    }

    .karma-title {
      margin: 15px 0;
    }

    .karma-btn {
      background: #e91e63;
      color: #fff;
    }
  }
</style>
