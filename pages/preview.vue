<template>
  <div class="preview-page">
    <div class="toolbar">
      <div class="toolbar__left">
        <h1 class="page-title">Preview & export</h1>
        <p class="page-lead">
          Pick a layout, then download a print-ready PDF (A4). The editor shows this preview side by side too.
        </p>
      </div>
      <div class="toolbar__actions">
        <el-button icon="el-icon-edit-outline" @click="$router.push('/editor')">
          Back to editor
        </el-button>
      </div>
    </div>

    <ResumePreviewPanel
      :resume="draftResume"
      variant="page"
      :show-full-preview-link="false"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PreviewPage',
  layout: 'dashboard',
  ssr: false,
  computed: {
    ...mapState('resume', ['draft']),
    draftResume() {
      return this.draft || {}
    }
  },
  mounted() {
    this.$store.dispatch('resume/loadFromStorage')
  }
}
</script>

<style scoped>
.preview-page {
  max-width: 100%;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 8px;
}

.toolbar__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.page-title {
  margin: 0 0 6px;
  font-size: 20px;
  font-weight: 600;
  color: #303133;
}

.page-lead {
  margin: 0;
  font-size: 14px;
  color: #606266;
  line-height: 1.5;
}
</style>
