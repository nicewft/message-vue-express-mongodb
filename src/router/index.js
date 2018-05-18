import Vue from 'vue'
import Router from 'vue-router'
import MessageBoard from '@/views/message-board/message-board.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/message-board'
    },
    {
      path: '/message-board',
      name: 'MessageBoard',
      component: resolve => require(['@/views/message-board/message-board.vue'], resolve)
      // component: MessageBoard
    }
  ]
})
