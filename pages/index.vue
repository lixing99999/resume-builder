<template>
  <div>
    <h1 class="page-title">Dashboard</h1>
    <el-row :gutter="16">
      <el-col :xs="24" :sm="12" :md="8">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-label">Resumes</div>
          <div class="stat-value">0</div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-label">Templates</div>
          <div class="stat-value">—</div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-label">Last updated</div>
          <div class="stat-value stat-value--sm">Today</div>
        </el-card>
      </el-col>
    </el-row>
    <el-card shadow="never" class="mt-3">
      <p class="mb-0 text-muted">
        Use the sidebar to navigate. This shell uses Element UI
        <code>el-container</code>, <code>el-header</code>, <code>el-aside</code>, and
        <code>el-menu</code> with <code>router</code> mode.
      </p>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'dashboard'
}
</script>

<style scoped>
.page-title {
  margin: 0 0 16px;
  font-size: 20px;
  font-weight: 600;
  color: #303133;
}

.stat-card {
  margin-bottom: 16px;
}

.stat-label {
  font-size: 13px;
  color: #909399;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 28px;
  font-weight: 600;
  color: #303133;
}

.stat-value--sm {
  font-size: 18px;
}

.mt-3 {
  margin-top: 8px;
}

.mb-0 {
  margin-bottom: 0;
}

.text-muted {
  color: #606266;
  font-size: 14px;
  line-height: 1.6;
}
</style>
