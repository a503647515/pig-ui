<template>
  <div class="sidebar-container pt30" :class="{'is-active':isCollapse}">
<!--    <logo :isCollapse="isCollapse"></logo>-->
    <el-menu unique-opened
             :default-active="nowTagValue"
             class="el-menu-vertical-demo"
             mode="vertical"
             :show-timeout="200"
             background-color="rgb(48, 65, 86)"
             text-color="hsla(0,0%,100%,.65)"
             active-text-color="#409eff"
             :collapse="isCollapse">
      <sidebar-item :menu="menu" :isCollapse="isCollapse"></sidebar-item>
    </el-menu>
  </div>
</template>

<script>
import { setUrlPath } from "@/util/util";
import { mapGetters } from "vuex";
import SidebarItem from "./sidebarItem";
import logo from "./logo";
import { validatenull } from "@/util/validate";
import { initMenu } from "@/util/util";
export default {
  name: "sidebar",
  components: { SidebarItem, logo },
  computed: {
    ...mapGetters(["menu", "tag", "isCollapse"]),
    nowTagValue: function() {
      return setUrlPath(this.$route);
    }
  },
  data() {
    return {};
  },
  created() {
    if (validatenull(this.menu)) {
      //如果缓存中的菜单是空的，请求后台
      this.$store.dispatch("GetMenu").then(data => {
          // debugger;
        initMenu(this.$router, data);
      });
    }
  },
};
</script>
<style lang="scss" scoped>
</style>

