<template>
  <div class="container">
    <section class="top">
      <img class="imgs" :src="baseUrl + goods.img">
      <span class="tips">现货</span>
      <span class="amounts">1/1</span>
    </section>
    <section class="info">
      <div class="info-items">{{goods.title}}</div>
      <div class="info-items" style="color: red">¥<span class="price">{{goods.price}}</span></div>
      <div class="info-items">货号：{{goods.no}}&nbsp;|&nbsp;品牌：{{goods.brand}}</div>
    </section>
    <section class="main">
      <div class="main-wrap">
        <div class="main-title">商品信息</div>
        <div class="main-items">
          <div class="main-items-title">颜色</div>
          <div class="main-items-value">{{colors}}</div>
        </div>
        <div class="main-items">
          <div class="main-items-title">尺寸</div>
          <div class="main-items-value">{{sizes}}</div>
        </div>
      </div>
    </section>
    <section class="btns" @click="handleBuy">立即购买</section>
    <section class="select-modal" v-if="selectFlag" @click="closeModal"></section>
    <section :class="[{'select-cont-show': selectFlag}, 'select-cont-hide']">
      <section class="select-main">
        <section class="select-top">
          <div class="select-title">立即下单</div>
          <div class="select-price">单价:{{goods.price}}元/件</div>
        </section>
        <section class="select-mid">
          <ul class="select-mid-head">
            <li v-for="item in selectHead" :key="item">{{item}}</li>
          </ul>
          <ul v-for="(sku, index) in goods.sku" :key="index" class="select-mid-row">
            <li>{{sku.name}}</li>
            <li v-for="(item, index) in sku.size" :key="index">
              <input @blur="amountsChange(sku, goods.sku, item, $event)" type="tel" v-model="item.selected" class="select-input" :placeholder="item.remain">
            </li>
            <li>{{sku.amounts}}</li>
          </ul>
        </section>
      </section>
      <ul class="select-bottom">
        <li class="select-bottom-num">合计：{{totalAmount}}件</li>
        <li class="select-bottom-price">总价：<span style="color: red">¥{{totalPrice}}</span></li>
        <li @click="pay" :class="[{'select-bottom-pay': canPay}, 'select-bottom-btn']">立即下单</li>
      </ul>
    </section>
  </div>
</template>

<script type='text/ecmascript-6'>
import { getProd, baseUrl } from '@/api/api.js'

export default {
  name: '',
  data () {
    return {
      goods: {},
      baseUrl,
      colors: [],
      sizes: [],
      selectFlag: false,
      selectHead: ['尺寸', 'S', 'M', 'L', '小计'],
      totalAmount: 0,
      totalPrice: '0.00',
      canPay: false
    }
  },
  watch: {
    totalAmount (val) {
      /* eslint-disable */
      if (val <= 0) {
        this.canPay = false
      } else {
        this.canPay = true
      }
      /* eslint-enable */
    }
  },
  methods: {
    // 获取商品详情
    getGoods () {
      getProd().then(response => {
        let res = response.data
        this.goods = res.result
        for (let item of this.goods.sku) {
          this.colors.push(item.name)
        }
        this.colors = this.colors.join(', ')
        this.sizes = this.goods.size.join(', ')
      })
    },
    // 显示sku选择框
    handleBuy () {
      this.selectFlag = true
    },
    // 关闭sku选择框
    closeModal () {
      this.selectFlag = false
    },
    // 数量改变
    amountsChange (sku, allSku, currentItem, e) {
      if (currentItem.selected > currentItem.remain) {
        e.srcElement.setAttribute('style', 'border: 1px solid red;border-radius: 5px;')
        alert('输入值大于库存量')
        return
      }
      e.srcElement.setAttribute('style', '')
      let total = 0
      let allTotal = 0
      for (let item in sku.size) {
        total += parseInt(sku.size[item].selected || 0)
      }
      sku.amounts = total
      for (let item in allSku) {
        allTotal += parseInt(allSku[item].amounts)
      }
      this.totalAmount = allTotal
      this.totalPrice = (this.totalAmount * this.goods.price).toFixed(2)
    },
    // 立即下单
    pay () {
      if (this.canPay) {
        alert('下单成功!')
      }
    }
  },
  mounted () {
    this.getGoods()
  }
}
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
.tips-amounts
  position absolute
  bottom 10px
  color #fff
  background rgba(112, 109, 106, 0.5)
  padding 3px 10px

.container
  font-size 12px
  background #F7F7F7
  .top
    position relative
    width 100%
    padding-top 100%
    overflow hidden
    .imgs
      position absolute
      top 0
      left 0
      width 100%
      height 100%
    .tips
      @extend .tips-amounts
      left 10px
      border-radius 2px
    .amounts
      @extend .tips-amounts
      right 10px
      border-radius 10px
  .info
    background #fff
    display flex
    flex-direction column
    align-items center
    .info-items
      flex 1
      padding 10px 0
      .price
        font-size 20px
  .main
    margin 10px 0 0 0
    background #fff
    overflow hidden
    padding 0 0 50px 0
    .main-wrap
      margin: 0 10px
      .main-title
        margin 10px auto 20px auto
        padding 8px 0
        width 50%
        text-align center
        background #F7F7F7
      .main-items
        display: flex
        padding: 8px 0
        border 1px solid #f7f7f7
        border-width 0 0 1px 0
        &:last-child
          border-width 0
        .main-items-title
          width 80px
          color #cdcdcd
        .main-items-value
          flex 1
  .btns
    position fixed
    left 0
    bottom 0
    right 0
    background #FF6666
    color #fff
    height 45px
    line-height 45px
    text-align center
    z-index 200
  .select-modal
    z-index 300
    position fixed
    bottom 0
    left 0
    right 0
    top 0
    background rgba(40, 44, 52, 0.7)
  .select-cont-hide
    position fixed
    z-index 400
    left 0
    right 0
    bottom 0
    height 0
    background #fff
    transition height 0.3s ease
    display flex
    flex-direction column
  .select-cont-show
    height 60%
    transition height 0.3s ease
.select-main
  flex 1
  .select-top
    padding 8px 8px 14px 8px
    display flex
    justify-content space-between
    align-items center
    .select-price
      color red
      font-size 14px
  .select-mid
    .select-mid-head
      display flex
      background #F7F7F7
      &>li
        flex 1
        text-align center
        padding 10px 0
    .select-mid-row
      display flex
      &>li
        flex 1
        text-align center
        padding 13px 0
        .select-input
          width 80%
          outline none
          text-outline none
          text-align center
          border 1px solid #C1C1C1
          border-width 0 0 1px 0
          border-radius 0
.select-bottom
  height 40px
  display flex
  background #F7F7F7
  align-items center
  .select-bottom-num
    flex 1
    padding 0 0 0 8px
  .select-bottom-price
    flex 1
    text-align right
    padding 0 8px 0 0
  .select-bottom-btn
    background #999999
    width 100px
    line-height 40px
    color #fff
    text-align center
  .select-bottom-pay
    background #FF6666
</style>
