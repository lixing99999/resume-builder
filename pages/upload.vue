<template>
  <div>
    <h1 class="page-title">Upload files</h1>
    <p class="page-lead">
      Drag resumes here or browse. Wire <code>httpRequest</code> in this page to your API when ready.
    </p>

    <el-card shadow="never" class="upload-card">
      <el-upload
        ref="upload"
        class="upload-area"
        drag
        multiple
        :limit="8"
        :on-exceed="onExceed"
        :before-upload="beforeUpload"
        :http-request="httpRequest"
        :on-remove="onRemove"
        action="/"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
        <div slot="tip" class="el-upload__tip">
          PDF or Word · max 10 MB per file · up to 8 files
        </div>
      </el-upload>
    </el-card>
  </div>
</template>

<script>
const MAX_BYTES = 10 * 1024 * 1024

export default {
  name: 'UploadPage',
  layout: 'dashboard',
  methods: {
    onExceed() {
      this.$message.warning('You can add at most 8 files at a time.')
    },
    beforeUpload(file) {
      const ok =
        file.size > 0 &&
        file.size <= MAX_BYTES
      if (!ok) {
        this.$message.error('File must be non-empty and at most 10 MB.')
        return false
      }
      return true
    },
    /**
     * Replace this stub with your API, e.g.:
     * const fd = new FormData()
     * fd.append('file', option.file)
     * return this.$axios.post('/api/upload', fd).then((res) => option.onSuccess(res.data))
     */
    httpRequest(option) {
      const { file, onSuccess, onError } = option
      const timer = window.setTimeout(() => {
        try {
          onSuccess({ ok: true, name: file.name })
          this.$message.success(`Ready: ${file.name} (stub — connect your backend)`)
        } catch (e) {
          onError(e)
        }
      }, 350)
      return { abort: () => window.clearTimeout(timer) }
    },
    onRemove() {
      this.$message.info('File removed from list.')
    }
  }
}
</script>

<style scoped>
.page-title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 600;
  color: #303133;
}

.page-lead {
  margin: 0 0 20px;
  font-size: 14px;
  color: #606266;
  line-height: 1.5;
}

.upload-card {
  max-width: 520px;
}

.upload-area >>> .el-upload {
  width: 100%;
}

.upload-area >>> .el-upload-dragger {
  width: 100%;
}

.el-upload__tip {
  margin-top: 8px;
  color: #909399;
  font-size: 13px;
}
</style>
