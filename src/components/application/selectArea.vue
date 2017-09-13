<template>
	<transition name="picker-fade">
    <div class="picker" 
         @touchmove.prevent 
         @click="cancel"
         v-show="state===1">
      <transition name="picker-move">
        <div class="picker-panel" @click.stop>
          <div class="picker-choose border-bottom-1px">
            <span class="cancel" @click="cancel">取消</span>
            <span class="confirm" @click="confirm">确定</span>
            <h1 class="picker-title">地址选择</h1>
          </div>
          <div class="picker-content">
            <div class="mask-top"></div>
            <div class="mask-bottom"></div>
            <div class="wheel-wrapper" ref="wheelWrapper">
              <div class="wheel" v-for="data in pickerData">
                <ul class="wheel-scroll">
                  <li v-for="item in data" class="wheel-item">{{item.text}}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="picker-footer"></div>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script >
import BScroll from 'better-scroll'
import { provinceList, cityList, areaList } from './areaData'
export default {
  data () {
    return {
      tempIndex: [0, 0, 0],
      pickerData: [],
      state: 0
    }
  },
  watch: {
    pickerData (val) {
      if (this.wheels) {
        for (let i = 0; i < val.length; i++) {
          this.wheels[i].refresh()
        }
      }
    }
  },
  methods: {
    cancel () {
      this.state = 0
      // this.$store.commit('setIsShow', false)
    },
    confirm () {
      this.state = 0
      // this.$store.commit('setIsShow', false)
      this.$emit('select', {
        pros: this.pickerData[0][this.tempIndex[0]],
        city: this.pickerData[1][this.tempIndex[1]],
        districts: this.pickerData[2][this.tempIndex[2]]
      })
      // this.$store.commit('setAddress', {
      //   pros: this.pickerData[0][this.tempIndex[0]],
      //   city: this.pickerData[1][this.tempIndex[1]],
      //   districts: this.pickerData[2][this.tempIndex[2]]
      // })
    },
    show () {
      this.state = 1
      if (!this.wheels) {
        this.$nextTick(() => {
          this.wheels = []
          let wheelWrapper = this.$refs.wheelWrapper
          for (let i = 0; i < this.pickerData.length; i++) {
            this.creatWheel(wheelWrapper, i)
          }
        })
      } else {
        for (let i = 0; i < this.pickerData.length; i++) {
          this.wheels[i].enable()
          this.wheels[i].wheelTo(this.tempIndex[i])
        }
      }
    },
    getData () {
      const provinces = provinceList
      const cities = cityList[provinces[this.tempIndex[0]].value]
      const areas = areaList[cities[this.tempIndex[1]].value]
      this.pickerData = [provinces, cities, areas]
    },
    creatWheel (wheelWrapper, i) {
      this.wheels[i] = new BScroll(wheelWrapper.children[i], {
        wheel: {
          selectedIndex: 0,
          rotate: 2,
          adjustTime: 400
        },
        probeType: 3
      })
      this.wheels[i].on('scrollEnd', () => {
        this.tempIndex[i] = this.wheels[i].getSelectedIndex()
        this.getData()
      })
      return this.wheels[i]
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style scoped>
	.picker{
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-align: center;
    font-size: 15px;
    background-color: rgba(37,38,45,0.4);
  }
  .picker-fade-enter, .picker-fade-leave-active{
    opacity: 0;
  }
  .picker-fade-enter-active, .picker-fade-leave-active{
    transition: all .3s ease-in-out;
  }
  .picker-panel{
    position: absolute;
    z-index: 600;
    bottom: 0;
    width: 100%;
    height: 273px;
    background: white;
  }
  .picker-move-enter, .picker-move-leave-active{
    transform: translate3d(0, 273px, 0);
  }
  .picker-move-enter-active, .picker-move-leave-active{
    transition: all .3s ease-in-out;
  }
  .picker-choose{
    position: relative;
    height: 60px;
    color: grey;
  }
  .picker-title{
    margin: 0;
    line-height: 60px;
    font-weight: normal;
    text-align: center;
    font-size: 15px;
    color: grey;
  }
  .confirm, .cancel{
    position: absolute;
    top: 6px;
    padding: 16px;
    font-size: 15px;
  }
  .confirm{
    right: 0;
    color: red;
  }
  .confirm.active{
    color: red;
  }
  .cancel{
    left: 0;
  }
  .cancel.active{
    color:gray;
  }
  .picker-content{
    position: relative;
    top: 20px;
  }
  .mask-top, .mask-bottom{
    z-index: 10;
    width: 100%;
    height: 68px;
    pointer-events: none;
    transform: translateZ(0);
  }
  .mask-top{
    position: absolute;
    top: 0;
    background: linear-gradient(to top, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8));
    border-bottom: 1px solid #eee;
  }
  .mask-bottom{
    position: absolute;
    bottom: 1px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8));
    border-top: 1px solid #eee;
  }
  .wheel-wrapper{
    display: flex;
    padding: 0 16px;
  }
  .wheel{
    height: 173px;
    overflow: hidden;
    font-size: 18px;
    width:33%;
  }
  .wheel-scroll{
    padding: 0;
    margin-top: 68px;
    line-height: 36px;
    list-style: none;
  }
  .wheel-item{
    list-style: none;
    height: 36px;
    overflow: hidden;
    white-space: nowrap;
    color: grey;
  }
  .picker-footer{
    height: 20px;
  }
</style>