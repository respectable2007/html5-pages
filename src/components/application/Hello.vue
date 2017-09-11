<template>
  <div class="hello">
    <div class="head">
      <el-button 
        type="primary" 
        icon="arrow-left"
        :plain="true">
      </el-button>
      填写申请信息
    </div>
    <div class="content">
      <el-row>
        <el-col :span="24" >
          <el-card :body-style="{ padding: '0px' }">
            <img src="../../assets/logo.png" class="image">
            <div >
              <div class="bottom clearfix">
                <p>
                 多芬洗发水 100ml
                </p>
                <p>
                  <small>
                   多芬 滋养水润洗发乳洗发水100ml新老包装
                  </small>
                </p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-form label-position="top" 
               label-width="80px" 
               :model="userInfo"
               :rules='rule'
               ref="user">
        <el-form-item label="姓名"
                      prop="name">
          <el-input 
            placeholder="请输入收货人姓名"
            v-model="userInfo.name">
          </el-input>
        </el-form-item>
        <el-form-item label="手机号码"
                      prop="phone">
          <el-input
           placeholder="请输入11位手机号码"
           v-model.number="userInfo.phone">
          </el-input>
        </el-form-item>
        <el-form-item label="收货地址"
                      prop="addresses">
          <el-input
           placeholder="请选择省市区"
           icon="arrow-right"
           v-model="userInfo.addresses"
           @click="showList">
          </el-input>
        </el-form-item>
        <el-form-item prop="addressDetail">
          <el-input 
            type="textarea"
            :rows="4"
            resize="none"
            placeholder="请填写详细收货地址" 
            v-model="userInfo.addressDetail">
        </el-input>
        </el-form-item>
        <el-form-item>
          <el-button 
            type="primary"
            @click='submitForm'>
            申请试用
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <selectArea
         v-show="isShowList"
         >
    </selectArea>
  </div>
</template>

<script>
import {setDPR, remChange} from './remChange'
import SelectArea from './selectArea'
setDPR()
remChange()
export default {
  name: 'H5',
  components: {
    selectArea: SelectArea
  },
  data () {
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入手机号码'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else if (value.toString().length !== 11) {
          callback(new Error('手机号码必须是11位'))
        } else {
          callback()
        }
      })
    }
    return {
      userInfo: {
        name: '',
        phone: '',
        addresses: 'dd',
        addressDetail: ''
      },
      rule: {
        name: [
          {required: true, message: '请输入用户名称', trigger: 'blur'}
        ],
        phone: [{
          required: true, validator: checkPhone, trigger: 'blur'
        }],
        addresses: [
          {required: true, message: '请选择省市区', trigger: 'blur'}
        ]
      }
    }
  },
  computed: {
    isShowList () {
      let obj = this.$store.getters.getAddress
      if (obj) {
        this.userInfo.addresses = obj.pros.label + '省' + obj.city.label + '市' + (obj.districts ? (obj.districts.label + '区') : '')
      } else {
        this.userInfo.addresses = ''
      }
      return this.$store.getters.getIsShow
    }
  },
  methods: {
    showList () {
      if (this.isShowList) {
        this.$store.commit('setIsShow', false)
      } else {
        this.$store.commit('setIsShow', true)
      }
    },
    submitForm () {
      this.$refs['user'].validate((valid) => {
        if (valid) {
          this.$message({
            message: '您的申请已经提交\n我们将尽快为您发货',
            type: 'success'
          })
          this.$refs['user'].resetFields()
        } else {
          this.$message({
            message: '您已经提交过申请\n请勿重复提交申请',
            type: 'warning'
          })
          return false
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.head{
  height: 0.5rem;
  background-color: rgb(206,206,206);
  font-size: 0.16rem;
  line-height: 0.5rem;
}
.head .el-button{
  /*padding: 0;*/
}
.el-button--primary.is-plain {
    background: transparent;
    border: 1px solid transparent;
    color: #1f2d3d;
    position: absolute;
    left: 0;
    top: 0.08rem;
}
.content{
  padding: 0.12rem;
}
.el-card{
  box-shadow: none;
  border:none;
  border-bottom: 1px dotted gray;
}
.el-card p{
  font-size: 0.16rem;
  text-align: left;
}
form{
  margin-top: 0.2rem;
}
.el-form-item {
    font-size: 0.1rem;
    text-align: left;
}
.el-form-item .el-button.el-button--primary{
  width: 100%;
}
</style>
