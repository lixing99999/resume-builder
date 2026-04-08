<template>
  <div class="d-flex justify-content-center align-self-center">
    <div class="me-2 col-6">
      <div class="editor-page">
        <div class="editor-header">
          <div class="editor-header__row">
            <h1 class="page-title">Resume editor</h1>
            <el-button
              type="warning"
              plain
              icon="el-icon-document-copy"
              @click="fillTestData"
            >
              Fill test data
            </el-button>
          </div>
          <p class="page-lead">
            Edit on the left — the live preview updates as you type. Pick a template and download PDF on the right.
          </p>
        </div>

        <el-form :model="resume" label-position="top" class="editor-form">
          <!-- Essential -->
          <el-card shadow="never" class="section-card section-card--essential">
            <div slot="header" class="card-header">
              <span class="card-title">Name + job title</span>
              <el-tag type="danger" size="mini" effect="plain">Essential</el-tag>
            </div>
            <p class="section-why">First thing the recruiter sees.</p>
            <el-row :gutter="16">
              <el-col :xs="24" :md="12">
                <el-form-item label="Full name">
                  <el-input v-model="resume.fullName" placeholder="Jane Doe" clearable />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :md="12">
                <el-form-item label="Target job title">
                  <el-input v-model="resume.jobTitle" placeholder="Senior Software Engineer" clearable />
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>

      <el-card shadow="never" class="section-card section-card--essential">
        <div slot="header" class="card-header">
          <span class="card-title">Contact info</span>
          <el-tag type="danger" size="mini" effect="plain">Essential</el-tag>
        </div>
        <p class="section-why">Email, phone, LinkedIn — how they reach you.</p>
        <el-row :gutter="16">
          <el-col :xs="24" :md="8">
            <el-form-item label="Email">
              <el-input v-model="resume.contact.email" placeholder="you@email.com" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="8">
            <el-form-item label="Phone">
              <el-input v-model="resume.contact.phone" placeholder="+1 …" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="8">
            <el-form-item label="LinkedIn">
              <el-input v-model="resume.contact.linkedin" placeholder="linkedin.com/in/…" clearable />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>

      <el-card shadow="never" class="section-card section-card--essential">
        <div slot="header" class="card-header">
          <span class="card-title">Professional summary</span>
          <el-tag type="danger" size="mini" effect="plain">Essential</el-tag>
        </div>
        <p class="section-why">Two or three lines that sell you instantly.</p>
        <el-form-item label="Summary">
          <el-input
            v-model="resume.summary"
            type="textarea"
            :rows="4"
            maxlength="600"
            show-word-limit
            placeholder="Who you are, what you excel at, and what role you're seeking."
          />
        </el-form-item>
      </el-card>

      <el-card shadow="never" class="section-card section-card--essential">
        <div slot="header" class="card-header">
          <span class="card-title">Work experience</span>
          <el-tag type="danger" size="mini" effect="plain">Essential</el-tag>
        </div>
        <p class="section-why">Usually the most important section — show impact and results.</p>
        <div
          v-for="(job, index) in resume.jobs"
          :key="job._id"
          class="repeat-block"
        >
          <div class="repeat-block__toolbar">
            <span class="repeat-block__label">Role {{ index + 1 }}</span>
            <el-button
              v-if="resume.jobs.length > 1"
              type="text"
              class="repeat-block__remove"
              @click="removeJob(index)"
            >
              Remove
            </el-button>
          </div>
          <el-row :gutter="16">
            <el-col :xs="24" :md="12">
              <el-form-item label="Company">
                <el-input v-model="job.company" placeholder="Company" clearable />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :md="12">
              <el-form-item label="Title">
                <el-input v-model="job.title" placeholder="Your title" clearable />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :md="12">
              <el-form-item label="Start">
                <el-input v-model="job.start" placeholder="Jan 2022" clearable />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :md="12">
              <el-form-item label="End">
                <el-input v-model="job.end" placeholder="Present" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="Achievements (one bullet per line)">
                <el-input
                  v-model="job.bullets"
                  type="textarea"
                  :rows="4"
                  placeholder="Led migration to …&#10;Reduced latency by …"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-button type="primary" plain icon="el-icon-plus" @click="addJob">
          Add role
        </el-button>
      </el-card>

      <el-card shadow="never" class="section-card section-card--essential">
        <div slot="header" class="card-header">
          <span class="card-title">Skills</span>
          <el-tag type="danger" size="mini" effect="plain">Essential</el-tag>
        </div>
        <p class="section-why">ATS systems scan for keywords — match the job description where honest.</p>
        <el-form-item label="Skills & tools">
          <el-input
            v-model="resume.skills"
            type="textarea"
            :rows="4"
            placeholder="Languages, frameworks, cloud, tools — comma or line separated."
          />
        </el-form-item>
      </el-card>

      <el-card shadow="never" class="section-card section-card--essential">
        <div slot="header" class="card-header">
          <span class="card-title">Education</span>
          <el-tag type="danger" size="mini" effect="plain">Essential</el-tag>
        </div>
        <p class="section-why">Required by most employers — keep it concise.</p>
        <div
          v-for="(edu, index) in resume.education"
          :key="edu._id"
          class="repeat-block"
        >
          <div class="repeat-block__toolbar">
            <span class="repeat-block__label">School {{ index + 1 }}</span>
            <el-button
              v-if="resume.education.length > 1"
              type="text"
              class="repeat-block__remove"
              @click="removeEducation(index)"
            >
              Remove
            </el-button>
          </div>
          <el-row :gutter="16">
            <el-col :xs="24" :md="12">
              <el-form-item label="School">
                <el-input v-model="edu.school" placeholder="University or institution" clearable />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :md="12">
              <el-form-item label="Degree & field">
                <el-input v-model="edu.degree" placeholder="B.S. Computer Science" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="Dates / honors (optional)">
                <el-input v-model="edu.details" placeholder="2018 – 2022 · Dean's list …" clearable />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-button type="primary" plain icon="el-icon-plus" @click="addEducation">
          Add education
        </el-button>
      </el-card>

      <h2 class="nice-heading">Nice to have</h2>
      <p class="nice-lead">Strengthens your profile when space and relevance allow.</p>

      <el-card shadow="never" class="section-card">
        <div slot="header" class="card-header">
          <span class="card-title">Languages</span>
          <el-tag type="info" size="mini" effect="plain">Optional</el-tag>
        </div>
        <el-form-item label="Languages">
          <el-input
            v-model="resume.languages"
            type="textarea"
            :rows="2"
            placeholder="English (native), Spanish (professional) …"
          />
        </el-form-item>
      </el-card>

      <el-card shadow="never" class="section-card">
        <div slot="header" class="card-header">
          <span class="card-title">Certifications</span>
          <el-tag type="info" size="mini" effect="plain">Optional</el-tag>
        </div>
        <el-form-item label="Certifications">
          <el-input
            v-model="resume.certifications"
            type="textarea"
            :rows="3"
            placeholder="AWS Solutions Architect — 2024&#10;…"
          />
        </el-form-item>
      </el-card>

      <el-card shadow="never" class="section-card">
        <div slot="header" class="card-header">
          <span class="card-title">Projects</span>
          <el-tag type="success" size="mini" effect="plain">Great for developers</el-tag>
        </div>
        <p class="section-why">Very important for developers — shows how you ship.</p>
        <div
          v-for="(proj, index) in resume.projects"
          :key="proj._id"
          class="repeat-block"
        >
          <div class="repeat-block__toolbar">
            <span class="repeat-block__label">Project {{ index + 1 }}</span>
            <el-button
              v-if="resume.projects.length > 1"
              type="text"
              class="repeat-block__remove"
              @click="removeProject(index)"
            >
              Remove
            </el-button>
          </div>
          <el-row :gutter="16">
            <el-col :xs="24" :md="12">
              <el-form-item label="Name">
                <el-input v-model="proj.name" placeholder="Open source CLI / side project" clearable />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :md="12">
              <el-form-item label="Link">
                <el-input v-model="proj.url" placeholder="https://…" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="Tech stack">
                <el-input v-model="proj.stack" placeholder="Vue, Nuxt, Node …" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="What you built / impact">
                <el-input
                  v-model="proj.description"
                  type="textarea"
                  :rows="3"
                  placeholder="Problem, your role, outcome."
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-button type="primary" plain icon="el-icon-plus" @click="addProject">
          Add project
        </el-button>
      </el-card>
    </el-form>
      </div>
    </div>
    <aside class="ms-2 col-6">
      <ResumePreviewPanel :resume="resume" variant="inline" />
    </aside>
  </div>
</template>

<script>
import {
  defaultResume,
  emptyJob,
  emptyEducation,
  emptyProject,
  buildSampleResume
} from '~/utils/resumeDefaults'

export default {
  name: 'EditorPage',
  layout: 'dashboard',
  ssr: false,
  data() {
    return {
      resume: defaultResume()
    }
  },
  mounted() {
    this.$store.dispatch('resume/loadFromStorage')
    const d = this.$store.state.resume.draft
    if (d) {
      this.resume = JSON.parse(JSON.stringify(d))
    }
  },
  beforeRouteLeave(_to, _from, next) {
    this.$store.commit('resume/setDraft', this.resume)
    next()
  },
  methods: {
    addJob() {
      this.resume.jobs.push(emptyJob())
    },
    removeJob(index) {
      this.resume.jobs.splice(index, 1)
    },
    addEducation() {
      this.resume.education.push(emptyEducation())
    },
    removeEducation(index) {
      this.resume.education.splice(index, 1)
    },
    addProject() {
      this.resume.projects.push(emptyProject())
    },
    removeProject(index) {
      this.resume.projects.splice(index, 1)
    },
    fillTestData() {
      this.$confirm(
        'Replace every field with sample resume content? Your current entries will be overwritten.',
        'Fill test data',
        {
          confirmButtonText: 'Replace with samples',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      )
        .then(() => {
          this.resume = buildSampleResume()
          this.$store.commit('resume/setDraft', this.resume)
          this.$message.success('Sample data loaded for testing.')
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped>
.workspace {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 24px;
  width: 100%;
  max-width: 100%;
}

.workspace__editor {
  flex: 1;
  min-width: 0;
  max-width: min(720px, 100%);
}

.workspace__preview {
  flex: 0 0 400px;
  width: 400px;
  max-width: 100%;
  position: sticky;
  top: 8px;
  align-self: flex-start;
}

.editor-page {
  max-width: 100%;
}

@media (max-width: 1180px) {
  .workspace {
    flex-direction: column;
  }

  .workspace__editor {
    max-width: 100%;
  }

  .workspace__preview {
    position: relative;
    top: 0;
    flex: none;
    width: 100%;
  }
}

.editor-header__row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.page-title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 600;
  color: #303133;
}

.editor-header__row .page-title {
  margin-bottom: 0;
}

.page-lead {
  margin: 0 0 20px;
  font-size: 14px;
  color: #606266;
  line-height: 1.5;
}

.editor-form >>> .el-card__header {
  padding: 14px 20px;
  border-bottom: 1px solid #ebeef5;
}

.section-card {
  margin-bottom: 16px;
}

.section-card--essential >>> .el-card__header {
  background: #fafafa;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  color: #303133;
}

.section-why {
  margin: 0 0 16px;
  font-size: 13px;
  color: #909399;
  line-height: 1.5;
}

.repeat-block {
  padding: 16px;
  margin-bottom: 16px;
  background: #fafafa;
  border-radius: 4px;
  border: 1px solid #ebeef5;
}

.repeat-block__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.repeat-block__label {
  font-size: 13px;
  font-weight: 600;
  color: #606266;
}

.repeat-block__remove {
  padding: 0;
  color: #f56c6c;
}

.nice-heading {
  margin: 28px 0 8px;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.nice-lead {
  margin: 0 0 16px;
  font-size: 13px;
  color: #909399;
}
</style>
