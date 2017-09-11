<template>
	<div 
		class="area"
		:style="{ height: areaHeight + 'px' }">
      <div 
      	 class="select-area">
      	 <div 
          class="select-btns">
      	 	<a 
      	 	  href="javascript:;"
      	 	  class="cancel"
      	 	  @click='cancel'>
  	 		    取消
      	 	</a>
      	 	<a 
      	 	  href="javascript:;"
      	 	  class="confirm"
      	 	  @click='confirm'>
  	 		    确定
      	 	</a>
      	 </div>
         <div 
          class="select-list">
          <div
            class='pros'>
              <ul class="scroll-list"
                  ref="pros">
                <li v-for=" (item, index) in options"
                    :class="{ active : index === pros }">
                  {{item.label}}
                </li>
              </ul>
          </div>
          <div
            class='city'>
              <ul class="scroll-list"
                  ref="city">
                <li v-for=" (item, index) in options[pros].children"
                    :class="{ active : index === city }">
                  {{item.label}}
                </li>
              </ul>
            </div>
          <div
            class='districts'>
              <ul class="scroll-list"
                  ref="districts">
                <li v-for=" (item, index) in options[pros].children[city].children"
                    :class="{ active : index === districts }">
                  {{item.label}}
                </li>
              </ul>
            </div>
         </div>
      </div>
	</div>
</template>
<script >
export default{
  mounted () {
    let that = this
    this.areaHeight = document.body.scrollHeight || document.documentElement.scrollHeight
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
    that.ratio = parseFloat(document.getElementsByTagName('html')[0].style.fontSize)
    window.addEventListener(resizeEvt, function () {
      that.areaHeight = document.body.scrollHeight || document.documentElement.scrollHeight
      that.ratio = parseFloat(document.getElementsByTagName('html')[0].style.fontSize)
    })
    this.$nextTick(() => {
      this.bindScrollEvent()
    })
  },
  data () {
    return {
      areaHeight: 0,
      options: [{
        value: 'zhinan',
        label: '北京',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '北京',
          children: [{
            value: 'cexiangdaohang',
            label: '东城区'
          }, {
            value: 'dingbudaohang',
            label: '海淀区'
          }]
        }]
      }, {
        value: 'zujian',
        label: '河北',
        children: [{
          value: 'bao ding',
          label: '保定市',
          children: [{
            value: 'layout',
            label: '徐水区'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '山东',
        children: [{
          value: 'axure',
          label: '青岛'
        }, {
          value: 'sketch',
          label: '济南'
        }, {
          value: 'jiaohu',
          label: '潍坊'
        }]
      }, {
        value: 'zhinan',
        label: '山西',
        children: [{
          value: 'shejiyuanze',
          label: '太原',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '陕西',
        children: [{
          value: 'basic',
          label: '西安',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '宁夏',
        children: [{
          value: 'axure',
          label: '银川'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }, {
        value: 'ziyuan',
        label: '内蒙古',
        children: [{
          value: 'axure',
          label: '呼和浩特'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }, {
        value: 'ziyuan',
        label: '辽宁',
        children: [{
          value: 'axure',
          label: '沈阳'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }, {
        value: 'ziyuan',
        label: '吉林',
        children: [{
          value: 'axure',
          label: '长春'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }, {
        value: 'ziyuan',
        label: '黑龙江',
        children: [{
          value: 'axure',
          label: '哈尔滨'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }, {
        value: 'ziyuan',
        label: '江苏',
        children: [{
          value: 'axure',
          label: '南京'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }, {
        value: 'ziyuan',
        label: '安徽',
        children: [{
          value: 'axure',
          label: '合肥'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }, {
        value: 'ziyuan',
        label: '浙江',
        children: [{
          value: 'axure',
          label: '杭州'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      pros: 0,
      city: 0,
      districts: 0,
      ratio: 0
    }
  },
  computed: {
    address () {
      let pros = this.options[this.pros]
      let city = pros.children[this.city] ? pros.children[this.city] : pros.children[0]
      let districts = city.children ? city.children[this.districts] : ''
      return {
        pros: pros,
        city: city,
        districts: districts
      }
    }
  },
  methods: {
    cancel () {
      this.$store.commit('setIsShow', false)
    },
    confirm () {
      this.$store.commit('setIsShow', false)
      this.$store.commit('setAddress', this.address)
    },
    bindScrollEvent () {
      const bindFuntion = (type) => {
        this.$refs[`${type}`].onscroll = (e) => this.handleScroll(type, e)
      }
      bindFuntion('pros')
      bindFuntion('city')
      bindFuntion('districts')
    },
    handleScroll (type, e) {
      this[type] = Math.min(Math.floor((e.target.scrollTop) / (0.32 * this.ratio)), Math.floor((e.target.scrollTop) / (0.32 * this.ratio) + 1))
    }
  }
}
</script>
<style scoped>
	.area{
		position: absolute;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.3);
		top: 0;
	}
	.select-area{
		height: 3rem;
		background: rgb(237,237,237);
		width: 100%;
		bottom: 0;
    position: absolute;
	}
	.select-btns{
		font-size: 0.16rem;
		padding:0.1rem;
		color:#2c3e50;
	}
	.select-btns a{
		text-decoration: none;
		color:#2c3e50;
	}
	.select-btns .cancel{
		float: left;
	}
	.select-btns .confirm{
		float: right;
	}
  .select-list{
    position: absolute;
    font-size: 0.16rem;
    top:0.36rem;
    width: 100%;
    bottom: 0;
  }
  .select-list div{
    float: left;
    width: 33.33%;
    height: 100%;
    position: relative;
    background: rgb(237,237,237);
  }
  .select-list:after,.select-list:before{
    content: "";
    top: 50%;
    color: #fff;
    position: absolute;
    line-height: 0.16rem;
    border-top:1px solid gray;
    border-bottom:1px solid gray;
    height: 0.32rem;
    z-index: 0;
    left: 0;
    right: 0;
    box-sizing: border-box;
    padding:0.06rem 0;
    text-align: left;
  }
  .scroll-list{
    overflow-y: auto;
    height: 100%;
    margin-right: -17px;
    overflow-x: hidden;
  }
  .scroll-list:before{
    content: "";
    height: 1.32rem;
    display: block;
    width: 100%;
  }
  .scroll-list:after{
    content: "";
    height: 1.04rem;
    display: block;
    width: 100%;
  }
  .scroll-list li{
    display: block;
    height: 0.32rem;
    line-height: 0.32rem;
  }
  .scroll-list li.active{
    color: red;
  }
</style>