import { getMessageList, 
  getMessageListForPaging, 
  addMessageInfo, 
  delMessageInfo
} from '@/api/message.js'
import { formatDate } from '../../../utils/date.js'
import Header from '@/common/components/header'
import {mapGetters} from 'vuex'
// import {cookie} from '@/common/service/common.service.js'
export default {
  created () {
    this.getMessage()
    this.getMessageForPaging()
    // console.log(this.userInfo.userName);
  },
  computed: {
    baseUrl () {
      return process.env.API_BASE_URL
    },
    ...mapGetters(['userInfo'])
  },
  data () {
    return {
      messageInput: {
        userName: '',
        content:'',
        createTime: '',
        userId: ''
      },
      pageInput: {
        currPage: 1,
        maxResultCount: 3
      },
      messageList: [],
      myMessageList: [],
      allMsgList: [],
      totalCount: 0
      // userInfo: {}
    }
  },
  components: { 'my-header': Header },
  methods: {
    // 获取子组件传递过来的userName
    getUserInfo (info) {
    //   this.messageInput.userName = info.userInfo.userName
    //   this.messageInput.userId = info.userInfo._id
    },
    // 获取留言信息
    getMessage () {
      getMessageList().then(res => {
        this.myMessageList = []
        this.allMsgList = res.data
        if (this.userInfo) {
          this.allMsgList.forEach(value => {
            if (value.userId === this.userInfo._id) {
              this.myMessageList.push(value)
            }
          })
        }
        
      })
    },
    // 获取分页数据
    getMessageForPaging () {
      getMessageListForPaging(this.pageInput).then(res => {
        this.messageList = res.data.result
        this.totalCount = res.data.totalCount
      })
    },
    // 分页器 
    handleCurrentChange (val) {
      this.pageInput.currPage = val
      this.getMessageForPaging()
    },
    // 新增留言
    recordMsg () {
      if (this.userInfo) {
        this.messageInput.userName = this.userInfo.userName
        this.messageInput.userId = this.userInfo._id
      }
      let nowTime = new Date()
      this.messageInput.createTime = nowTime
      addMessageInfo(this.messageInput).then(res => {
        if (res.data.status) {
          this.$message.success('留言成功！')
          this.getMessageForPaging()
          this.getMessage ()
          // let msgResult = res.data.result
          // if (this.messageList.length >= 3){
          //   this.messageList.pop()
          // }
          // this.messageList.unshift(msgResult)
          this.cleanInput()
        }
      })
    },
    // 根据id删除留言
    deleteMsg (id, index) {
      delMessageInfo(id).then(res =>{
        if (res.data.status) {
          this.$message.success('删除成功！')
          this.getMessageForPaging()
          this.getMessage ()
          // this.messageList.splice(index, 1)
        }
      })
    },
    // 清空输入框
    cleanInput () {
      this.messageInput = {
        name: '',
        content:''
      }
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  }
}