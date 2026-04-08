<template>
  <div class="resume-preview-panel" :class="`resume-preview-panel--${variant}`">
    <div v-if="variant === 'inline'" class="panel-top">
      <h2 class="panel-title">Live preview</h2>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-download"
        :loading="pdfLoading"
        @click="downloadPdf"
      >
        PDF
      </el-button>
    </div>

    <div v-if="variant === 'page'" class="page-toolbar">
      <el-button
        type="primary"
        icon="el-icon-download"
        :loading="pdfLoading"
        @click="downloadPdf"
      >
        Download PDF
      </el-button>
    </div>

    <el-radio-group
      v-if="variant === 'inline'"
      class="template-rg"
      :value="templateId"
      size="small"
      @input="selectTemplate"
    >
      <el-radio-button label="executive">Executive</el-radio-button>
      <el-radio-button label="aurora">Aurora</el-radio-button>
      <el-radio-button label="slate">Slate</el-radio-button>
    </el-radio-group>

    <div v-if="variant === 'page'" class="picker">
      <div
        v-for="opt in templateOptions"
        :key="opt.id"
        role="button"
        tabindex="0"
        class="picker-card"
        :class="{ 'picker-card--active': templateId === opt.id }"
        @click="selectTemplate(opt.id)"
        @keydown.enter.prevent="selectTemplate(opt.id)"
      >
        <div class="picker-card__swatch" :class="`picker-card__swatch--${opt.id}`" />
        <div class="picker-card__body">
          <span class="picker-card__name">{{ opt.name }}</span>
          <span class="picker-card__desc">{{ opt.blurb }}</span>
        </div>
        <i v-if="templateId === opt.id" class="el-icon-check picker-card__check" />
      </div>
    </div>

    <div class="theme-row">
      <span class="theme-row__label">Accent color</span>
      <el-color-picker
        v-model="primaryPicker"
        size="small"
        :predefine="predefineColors"
      />
      <span class="theme-row__hint">Section titles &amp; highlights use this color. Body text stays a fixed neutral gray for readability.</span>
    </div>

    <el-alert
      v-if="!hasContent"
      title="Add a name, title, or summary to see a richer preview."
      type="info"
      :closable="false"
      show-icon
      class="alert-block"
    />

    <p class="preview-hint">{{ hintText }}</p>
    <div class="preview-scroll" :style="scrollStyle">
      <div ref="pdfRoot" class="pdf-root resume-theme" :style="themeCssVars">
        <component :is="activeTemplate" :resume="displayResume" />
      </div>
    </div>

    <nuxt-link v-if="variant === 'inline' && showFullPreviewLink" class="full-link" to="/preview">
      Open full preview page
    </nuxt-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { normalizeResume } from '~/utils/resumeDefaults'
import {
  DEFAULT_PRIMARY,
  RESUME_SECONDARY,
  normalizeHex,
  primarySurfaceTint,
  PREDEFINE_COLORS
} from '~/utils/resumeTheme'
import ResumeTemplateExecutive from '~/components/resume-templates/ResumeTemplateExecutive.vue'
import ResumeTemplateAurora from '~/components/resume-templates/ResumeTemplateAurora.vue'
import ResumeTemplateSlate from '~/components/resume-templates/ResumeTemplateSlate.vue'

export default {
  name: 'ResumePreviewPanel',
  components: {
    ResumeTemplateExecutive,
    ResumeTemplateAurora,
    ResumeTemplateSlate
  },
  props: {
    resume: {
      type: Object,
      required: true
    },
    /** Side column next to editor */
    variant: {
      type: String,
      default: 'inline',
      validator: (v) => ['inline', 'page'].includes(v)
    },
    showFullPreviewLink: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      pdfLoading: false,
      predefineColors: PREDEFINE_COLORS,
      templateOptions: [
        { id: 'executive', name: 'Executive', blurb: 'Classic header band, clear sections.' },
        { id: 'aurora', name: 'Aurora', blurb: 'Sidebar + main column, structured.' },
        { id: 'slate', name: 'Slate', blurb: 'Single column, skills grid, calm.' }
      ]
    }
  },
  computed: {
    ...mapState('resume', ['templateId', 'primaryColor']),
    primaryPicker: {
      get() {
        return normalizeHex(this.primaryColor || DEFAULT_PRIMARY)
      },
      set(v) {
        if (v) {
          this.$store.commit('resume/setPrimaryColor', normalizeHex(v))
        }
      }
    },
    themeCssVars() {
      const primary = normalizeHex(this.primaryColor || DEFAULT_PRIMARY)
      return {
        '--resume-primary': primary,
        '--resume-secondary': RESUME_SECONDARY,
        '--resume-surface': primarySurfaceTint(primary, 0.1),
        '--resume-surface-strong': primarySurfaceTint(primary, 0.18)
      }
    },
    displayResume() {
      return normalizeResume(this.resume)
    },
    activeTemplate() {
      const map = {
        executive: 'ResumeTemplateExecutive',
        aurora: 'ResumeTemplateAurora',
        slate: 'ResumeTemplateSlate'
      }
      return map[this.templateId] || 'ResumeTemplateExecutive'
    },
    hasContent() {
      const r = this.displayResume
      return Boolean(
        (r.fullName && r.fullName.trim()) ||
          (r.jobTitle && r.jobTitle.trim()) ||
          (r.summary && r.summary.trim())
      )
    },
    hintText() {
      return this.variant === 'inline'
        ? 'Updates as you type · PDF matches this view'
        : 'Scroll to see the full page · PDF matches this view'
    },
    scrollStyle() {
      if (this.variant === 'inline') {
        return { maxHeight: 'calc(100vh - 220px)' }
      }
      return { maxHeight: 'calc(100vh - 280px)' }
    }
  },
  methods: {
    selectTemplate(id) {
      this.$store.commit('resume/setTemplate', id)
    },
    async downloadPdf() {
      const el = this.$refs.pdfRoot
      if (!el || typeof window === 'undefined') {
        return
      }
      this.pdfLoading = true
      try {
        const mod = await import('html2pdf.js')
        const html2pdf = mod.default || mod
        const base = (this.displayResume.fullName || 'resume').trim().replace(/\s+/g, '_') || 'resume'
        const filename = `${base}.pdf`
        await html2pdf()
          .set({
            margin: [0, 0, 0, 0],
            filename,
            image: { type: 'jpeg', quality: 0.96 },
            html2canvas: {
              scale: 2,
              useCORS: true,
              logging: false,
              letterRendering: true
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
          })
          .from(el)
          .save()
        this.$message.success('PDF downloaded.')
      } catch (e) {
        this.$message.error('Could not create PDF. Try a shorter resume or another browser.')
      } finally {
        this.pdfLoading = false
      }
    }
  }
}
</script>

<style scoped>
.resume-preview-panel {
  width: 100%;
}

.resume-preview-panel--inline {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.panel-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.panel-title {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: #303133;
}

.template-rg {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.template-rg >>> .el-radio-button__inner {
  padding: 8px 12px;
}

.page-toolbar {
  margin-bottom: 12px;
}

.alert-block {
  margin-bottom: 0;
}

.preview-hint {
  margin: 0;
  font-size: 11px;
  color: #909399;
  line-height: 1.4;
}

.preview-scroll {
  overflow: auto;
  padding: 12px;
  background: #e4e7ed;
  border-radius: 8px;
  border: 1px solid #dcdfe6;
}

.pdf-root {
  display: inline-block;
  min-width: min(210mm, 100%);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.12);
}

.full-link {
  font-size: 12px;
  color: #409eff;
  text-decoration: none;
  align-self: flex-start;
}

.full-link:hover {
  text-decoration: underline;
}

.picker {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.picker-card {
  position: relative;
  display: flex;
  align-items: stretch;
  gap: 12px;
  padding: 14px 14px 14px 12px;
  background: #fff;
  border: 2px solid #ebeef5;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.picker-card:hover {
  border-color: #c0c4cc;
}

.picker-card--active {
  border-color: #409eff;
  box-shadow: 0 0 0 1px rgba(64, 158, 255, 0.2);
}

.picker-card__swatch {
  width: 10px;
  min-width: 10px;
  border-radius: 4px;
}

.picker-card__swatch--executive {
  background: linear-gradient(180deg, #1a365d, #94a3b8);
}

.picker-card__swatch--aurora {
  background: linear-gradient(90deg, #1a365d 40%, #e2e8f0 40%);
}

.picker-card__swatch--slate {
  background: linear-gradient(180deg, #4a4a4a, #cbd5e1);
}

.theme-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 12px;
  margin-bottom: 10px;
  padding: 8px 0;
}

.theme-row__label {
  font-size: 12px;
  font-weight: 600;
  color: #606266;
}

.theme-row__hint {
  font-size: 11px;
  color: #909399;
  line-height: 1.4;
  flex: 1 1 220px;
  min-width: 0;
}

.picker-card__body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.picker-card__name {
  font-weight: 600;
  font-size: 14px;
  color: #303133;
}

.picker-card__desc {
  font-size: 12px;
  color: #909399;
  line-height: 1.4;
}

.picker-card__check {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #409eff;
  font-size: 16px;
}
</style>
