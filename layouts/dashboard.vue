<template>
  <el-container class="dashboard-root dashboard-root--dark">
    <el-header height="56px" class="dashboard-header">
      <div class="header-left">
        <el-tooltip
          :content="sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
          placement="bottom"
        >
          <el-button
            type="text"
            class="sidebar-toggle"
            :icon="sidebarCollapsed ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
            circle
            @click="toggleSidebar"
          />
        </el-tooltip>
        <span class="brand">Resume Builder</span>
      </div>
      <div class="header-right">
        <el-dropdown trigger="click" @command="onHeaderCommand">
          <span class="header-user">
            <i class="el-icon-user-solid" />
            Account
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="profile">Profile</el-dropdown-item>
            <el-dropdown-item command="signout" divided>Sign out</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>

    <el-container class="dashboard-body">
      <el-aside :width="asideWidth" class="dashboard-aside">
        <el-menu
          :default-active="activeMenu"
          :collapse="sidebarCollapsed"
          :collapse-transition="true"
          router
          background-color="#121212"
          text-color="rgba(255,255,255,0.72)"
          active-text-color="#1db954"
          class="dashboard-menu"
        >
          <el-menu-item index="/">
            <i class="el-icon-s-home" />
            <span slot="title">Dashboard</span>
          </el-menu-item>
          <el-menu-item index="/editor">
            <i class="el-icon-edit-outline" />
            <span slot="title">Editor</span>
          </el-menu-item>
          <el-menu-item index="/preview">
            <i class="el-icon-view" />
            <span slot="title">Preview & PDF</span>
          </el-menu-item>
          <el-menu-item index="/upload">
            <i class="el-icon-upload2" />
            <span slot="title">Upload</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main class="dashboard-main">
        <nuxt />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
const SIDEBAR_KEY = 'dashboard-sidebar-collapsed'

export default {
  name: 'DashboardLayout',
  data() {
    return {
      sidebarCollapsed: false
    }
  },
  computed: {
    activeMenu() {
      return this.$route.path
    },
    asideWidth() {
      return this.sidebarCollapsed ? '64px' : '220px'
    }
  },
  watch: {
    sidebarCollapsed(val) {
      if (typeof window === 'undefined') {
        return
      }
      try {
        window.localStorage.setItem(SIDEBAR_KEY, val ? '1' : '0')
      } catch (e) {
        // ignore
      }
    }
  },
  mounted() {
    if (typeof window === 'undefined') {
      return
    }
    try {
      this.sidebarCollapsed = window.localStorage.getItem(SIDEBAR_KEY) === '1'
    } catch (e) {
      // ignore
    }
  },
  methods: {
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    },
    onHeaderCommand(cmd) {
      if (cmd === 'profile') {
        this.$message.info('Profile is not wired yet.')
      } else if (cmd === 'signout') {
        this.$message.info('Sign out is not wired yet.')
      }
    }
  }
}
</script>

<style scoped>
.dashboard-root {
  height: 100vh;
}

.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background: #fff;
  border-bottom: 1px solid #ebeef5;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.brand {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.header-user {
  cursor: pointer;
  color: #606266;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
}

.header-user:hover {
  color: #409eff;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 4px;
}

.sidebar-toggle {
  font-size: 18px;
  color: #606266;
  padding: 8px;
  margin-right: 4px;
}

.sidebar-toggle:hover {
  color: #409eff;
}

.dashboard-body {
  overflow: hidden;
}

.dashboard-aside {
  background-color: #121212;
  overflow-x: hidden;
  transition: width 0.28s ease;
}

.dashboard-menu {
  border-right: none;
  height: 100%;
}

.dashboard-main {
  background: transparent;
  padding: 20px;
  overflow-y: auto;
}
</style>
