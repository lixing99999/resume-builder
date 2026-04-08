<template>
  <div class="sheet">
    <header class="top">
      <div class="top__main">
        <h1 class="top__name">{{ resume.fullName || 'Your name' }}</h1>
        <p class="top__role">{{ resume.jobTitle || 'Role / discipline' }}</p>
      </div>
      <div class="top__contact">
        <p v-if="resume.contact && resume.contact.email" class="top__line">{{ resume.contact.email }}</p>
        <p v-if="resume.contact && resume.contact.phone" class="top__line">{{ resume.contact.phone }}</p>
        <p v-if="resume.contact && resume.contact.linkedin" class="top__line">{{ resume.contact.linkedin }}</p>
      </div>
    </header>

    <div class="rule" />

    <section v-if="resume.summary" class="block">
      <h2 class="block__title">Summary</h2>
      <p class="block__text">{{ resume.summary }}</p>
    </section>

    <section
      v-if="resume.jobs && resume.jobs.some(j => j.company || j.title)"
      class="block"
    >
      <h2 class="block__title">Experience</h2>
      <div
        v-for="job in resume.jobs"
        v-show="job.company || job.title"
        :key="job._id"
        class="entry"
      >
        <div class="entry__row">
          <p class="entry__line">
            <span class="entry__primary">{{ job.title || 'Title' }}</span>
            <span class="entry__secondary"> — {{ job.company || 'Company' }}</span>
          </p>
          <p class="entry__dates">{{ job.start }} — {{ job.end }}</p>
        </div>
        <ul v-if="jobBullets(job).length" class="entry__list">
          <li v-for="(b, i) in jobBullets(job)" :key="i">{{ b }}</li>
        </ul>
      </div>
    </section>

    <div
      v-if="resume.skills || (resume.education && resume.education.some(e => e.school || e.degree))"
      class="split"
    >
      <section v-if="resume.skills" class="block block--half">
        <h2 class="block__title">Skills</h2>
        <p class="block__text">{{ resume.skills }}</p>
      </section>
      <section
        v-if="resume.education && resume.education.some(e => e.school || e.degree)"
        class="block block--half"
      >
        <h2 class="block__title">Education</h2>
        <div
          v-for="edu in resume.education"
          v-show="edu.school || edu.degree"
          :key="edu._id"
          class="entry entry--tight"
        >
          <p class="entry__primary">{{ edu.school }}</p>
          <p class="entry__secondary">{{ edu.degree }}</p>
          <p v-if="edu.details" class="entry__meta">{{ edu.details }}</p>
        </div>
      </section>
    </div>

    <section v-if="resume.languages && resume.languages.trim()" class="block">
      <h2 class="block__title">Languages</h2>
      <p class="block__text">{{ resume.languages }}</p>
    </section>

    <section v-if="lineItems(resume.certifications).length" class="block">
      <h2 class="block__title">Certifications</h2>
      <ul class="entry__list entry__list--disc">
        <li v-for="(c, i) in lineItems(resume.certifications)" :key="i">{{ c }}</li>
      </ul>
    </section>

    <section
      v-if="resume.projects && resume.projects.some(hasProjectContent)"
      class="block"
    >
      <h2 class="block__title">Projects</h2>
      <div class="proj-grid">
        <div
          v-for="proj in resume.projects"
          v-show="hasProjectContent(proj)"
          :key="proj._id"
          class="proj-card"
        >
          <p class="entry__primary">{{ proj.name || 'Project' }}</p>
          <a
            v-if="proj.url"
            class="proj__link"
            :href="linkHref(proj.url)"
            target="_blank"
            rel="noopener noreferrer"
          >{{ proj.url }}</a>
          <p v-if="proj.stack" class="entry__secondary proj__stack">{{ proj.stack }}</p>
          <p v-if="proj.description" class="block__text proj__desc">{{ proj.description }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import resumeTemplate from '~/mixins/resumeTemplate'

export default {
  name: 'ResumeTemplateSlate',
  mixins: [resumeTemplate],
  props: {
    resume: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.sheet {
  width: 210mm;
  min-height: 297mm;
  margin: 0 auto;
  padding: 28px 32px 32px;
  background: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 9.5pt;
  line-height: 1.5;
  box-sizing: border-box;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.top__name {
  margin: 0;
  font-size: 22pt;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.08;
  color: var(--resume-primary, #1a365d);
}

.top__role {
  margin: 8px 0 0;
  font-size: 11pt;
  font-weight: 500;
  color: var(--resume-secondary, #4a4a4a);
}

.top__contact {
  text-align: right;
  font-size: 8.5pt;
  color: var(--resume-secondary, #4a4a4a);
  line-height: 1.5;
}

.top__line {
  margin: 0 0 2px;
  word-break: break-all;
}

.rule {
  height: 2px;
  background: var(--resume-primary, #1a365d);
  margin: 16px 0 20px;
  opacity: 0.85;
}

.block {
  margin-bottom: 18px;
  break-inside: avoid;
}

.block__title {
  margin: 0 0 8px;
  font-size: 8pt;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--resume-primary, #1a365d);
}

.block__text {
  margin: 0;
  color: var(--resume-secondary, #4a4a4a);
}

.split {
  display: flex;
  gap: 28px;
  margin-bottom: 18px;
}

.block--half {
  flex: 1;
  min-width: 0;
  margin-bottom: 0;
}

.entry {
  margin-bottom: 12px;
}

.entry--tight {
  margin-bottom: 10px;
}

.entry__row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: baseline;
  flex-wrap: wrap;
}

.entry__line {
  margin: 0;
  flex: 1;
  min-width: 0;
}

.entry__primary {
  margin: 0;
  font-weight: 700;
  color: var(--resume-primary, #1a365d);
}

.entry__secondary {
  font-weight: 400;
  color: var(--resume-secondary, #4a4a4a);
}

.entry__dates {
  margin: 0;
  font-size: 8.5pt;
  white-space: nowrap;
  color: var(--resume-secondary, #4a4a4a);
}

.entry__meta {
  margin: 4px 0 0;
  font-size: 8.5pt;
  color: var(--resume-secondary, #4a4a4a);
}

.entry__list {
  margin: 6px 0 0;
  padding-left: 16px;
  color: var(--resume-secondary, #4a4a4a);
}

.entry__list li {
  margin-bottom: 3px;
}

.entry__list--disc {
  list-style: disc;
}

.proj-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.proj-card {
  padding: 12px 14px;
  border: 1px solid var(--resume-surface-strong, rgba(26, 54, 93, 0.18));
  border-radius: 6px;
  background: var(--resume-surface, rgba(26, 54, 93, 0.06));
}

.proj-card .entry__primary {
  margin: 0 0 4px;
  font-size: 10pt;
}

.proj__link {
  display: block;
  font-size: 7.5pt;
  color: var(--resume-primary, #1a365d);
  word-break: break-all;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.proj__stack {
  margin-top: 6px;
}

.proj__desc {
  margin-top: 8px;
}

@media print {
  .proj-grid {
    grid-template-columns: 1fr;
  }
}
</style>
