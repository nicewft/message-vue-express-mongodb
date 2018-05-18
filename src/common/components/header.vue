<template>
  <div class="header-container">
    <p class="header-box">
      <span>留言板</span>
      <span class="welcome-tip" v-if="userInfo.isLogined">
        <span>欢迎你：{{userInfo.userName}}</span>&nbsp;&nbsp;
        <span @click="toLogout">退出登录</span>
      </span>
      <span class="handle-right" v-if="!userInfo.isLogined">
        <span @click="loginDialogVisible = true">登录</span>
        <span @click="registerDialogVisible = true">注册</span>
      </span>
    </p>
    <div class="login-dialog">
      <el-dialog title="登录" :visible.sync="loginDialogVisible" width="30%" center>
        <el-form  ref="loginInput" :model="loginInput" :rules="loginRules"label-width="100px">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="loginInput.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginInput.password" type="password"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="loginDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="toTogin('loginInput')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="register-dialog">
      <el-dialog @close="closeRegister" title="注册" :visible.sync="registerDialogVisible" width="30%" center>
        <el-form ref="registerInput" :model="registerInput" :rules="registerRules" label-width="100px">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="registerInput.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="registerInput.password" type="password"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="registerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="toRegister('registerInput')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {getLoginStatus, userLogin, userLogout, addUser} from '@/api/user'
import {cookie} from '@/common/service/common.service.js'
export default {
  data() {
    return {
      userInfo: {
        userName: '',
        isLogined: false
      },
      registerInput: {
        userName: '',
        password: '',
        createTime: ''
      },
      registerRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      loginInput: {
        userName: '',
        password: ''
      },
      loginRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      loginDialogVisible: false,
      registerDialogVisible: false
    };
  },
  created () {
    this._getLoginStatus()
  },
  methods: {
    // 获取登录状态
    _getLoginStatus () {
      getLoginStatus().then(res => {
        this.userInfo.userName = res.data.result.userInfo.userName
        this.userInfo.isLogined = res.data.result.isLogined
        console.log(this.userInfo.isLogined);
        if (!this.userInfo.isLogined) {
          cookie.delete('userInfo')
        }
        this.$emit('passToName', res.data.result)
      })
    },
    // 注册用户
    toRegister(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let nowTime = new Date()
          this.registerInput.createTime = nowTime
          addUser(this.registerInput).then(res => {
            if (res.data.status) {
              console.log(res.data);
              this.$message.success('注册成功')
              this.registerDialogVisible = false
              this.$store.commit('SET_USERINFO', res.data.result)
              cookie.set('userInfo', JSON.stringify(res.data.result), 1)
              window.location.reload()
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 登录
    toTogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          userLogin(this.loginInput).then(res => {
            if (res.data.result.status) {
              this.$message.success('登录成功')
              this.loginDialogVisible = false
              this.$store.commit('SET_USERINFO', res.data.result.user)
              cookie.set('userInfo', JSON.stringify(res.data.result.user), 1)
              window.location.reload()
            } else {
              this.$message.warning(res.data.result.message)
              this.loginDialogVisible = false
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    // 登出
    toLogout() {
      userLogout().then(res => {
        if (res.data.result.status) {
          this.$message.success('退出成功')
          cookie.delete('userInfo')
          window.location.reload()
        }
      }).catch(err => {
        console.log(err);
      })
      // setTimeout(function() {
      //   window.location.reload()
      // }, 2000);
    },
    closeRegister () {
      this.registerInput = {
        userName: '',
        password: '',
        createTime: ''
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.header-container {
  .header-box {
    width: 100%;
    height: 40px;
    background-color: #D0D0D0;
    padding-left: 20px;
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .welcome-tip{
      span:nth-child(2){
        cursor: pointer;
        font-size: 14px;
      }
    }
    .handle-right{
      span{
        display: inline-block;
        width: 60px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
</style>

