<template>
  <div class="top">
    <div class="top-button is-left">
      <div class="tags-breadcrumb">
        <i class="el-icon-s-fold tag-collapse f24 pointer" :class="[{ 'tag-collapse_right': isCollapse }]" @click="showCollapse"></i>
      </div>
    </div>
    <h1 class="top-title">
    </h1>
    <div class="top-button is-right pr10">
      <el-tooltip class="item" effect="dark" content="用户头像" placement="bottom">
        <div class="user-head mr10 white"><i class="el-icon-user-solid"></i></div>
      </el-tooltip>
      <el-dropdown>
        <span class="el-dropdown-link pointer">
          {{userInfo.username}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/">首页</router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/info/index">修改信息</router-link>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout" divided>退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
  import {mapState, mapGetters} from "vuex";

  export default {
    name: "top",
    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo
      }),
      ...mapGetters(["isFullScren", "isCollapse"])
    },
    methods: {
      showCollapse() {
        this.$store.commit("SET_COLLAPSE");
      },
      logout() {
        this.$confirm("是否退出系统, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$store.dispatch("LogOut").then(() => {
            this.$router.push({path: "/login"});
          });
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .user-head {
    /*border: 1px dashed black;*/
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #409EFF;
  }
</style>

