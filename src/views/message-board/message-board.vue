<template>
  <div class="message-container">
    <!--<p>留言板</p>-->
    <my-header @passToName="getUserInfo"></my-header>
    <div class="input-container">
      <div class="message-input">
        <el-form ref="messageInput" :model="messageInput" label-width="100px">
          <!--<el-form-item label="姓名：">
            <el-input v-model="messageInput.name"></el-input>
          </el-form-item>-->
          <el-form-item label="留言信息：">
            <el-input type="textarea" v-model="messageInput.content"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="cleanInput">重置</el-button>
            <el-button type="primary" @click="recordMsg">发表留言</el-button>
            <!--<a :href="baseUrl+'/api/exportExcel'" download="message.xls">下载数据</a>-->
            <!--<a :href="baseUrl+'/api/excelExport'" download="message.xls">下载数据2</a>-->
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="content-container">
      <div class="message-content">
        <div class="msg-cate">
          全部留言
        </div>
        <ul v-for="(item, i) in messageList" :key="i">
          <li class="msg-time">
              <span>创建时间：</span>
              <span>{{item.createTime | formatDate}}</span>
          </li>
          <li class="msg-name">
              <span>创建人：</span>
              <span>{{item.userName || '游客同志'}}</span>
          </li>
          <li class="msg-content">
            <span>内容：</span>
            <span>{{item.content}}</span>
          </li>
          <!-- <div class="del-btn">
            <el-button type="primary">修改</el-button>
            <el-button type="primary" @click="deleteMsg(item._id, i)">删除</el-button>
          </div> -->
        </ul>
      </div>
      <div class="my-msg-content">
        <div class="msg-cate">
          我的留言
        </div>
        <ul v-for="(item, i) in myMessageList" :key="i">
          <li class="msg-time">
              <span>创建时间：</span>
              <span>{{item.createTime | formatDate}}</span>
          </li>
          <li class="msg-name">
              <span>创建人：</span>
              <span>{{item.userName || '游客同志'}}</span>
          </li>
          <li class="msg-content">
            <span>内容：</span>
            <span>{{item.content}}</span>
          </li>
          <div class="del-btn">
            <el-button type="primary">修改</el-button>
            <el-button type="primary" @click="deleteMsg(item._id, i)">删除</el-button>
          </div>
        </ul>
        <div class="no-msg" v-if="!myMessageList.length">
          暂无留言~
        </div>
      </div>
    </div>
    <div class="block">
      <el-pagination
        background
        @current-change="handleCurrentChange" 
        :page-size="pageInput.maxResultCount"
        layout="prev, pager, next"
        :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script src="./message-board.js"></script>
<style lang="scss">
@import './message-board.scss';
</style>
