<template>
  <div class="sheet">
    <header class="masthead">
      <h1 class="masthead__name">{{ resume.fullName || 'Your name' }}</h1>
      <p class="masthead__role">{{ resume.jobTitle || 'Professional headline' }}</p>
      <ul class="masthead__contact">
        <li v-if="resume.contact && resume.contact.email">{{ resume.contact.email }}</li>
        <li v-if="resume.contact && resume.contact.phone">{{ resume.contact.phone }}</li>
        <li v-if="resume.contact && resume.contact.linkedin">{{ resume.contact.linkedin }}</li>
      </ul>
    </header>

    <main class="main">
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
          <div class="entry__head">
            <div class="entry__left">
              <p class="entry__primary">{{ job.title || 'Role' }}</p>
              <p class="entry__secondary">{{ job.company || 'Company' }}</p>
            </div>
            <p class="entry__dates">{{ job.start }} — {{ job.end }}</p>
          </div>
          <ul v-if="jobBullets(job).length" class="entry__list">
            <li v-for="(b, i) in jobBullets(job)" :key="i">{{ b }}</li>
          </ul>
        </div>
      </section>

      <section v-if="resume.skills" class="block">
        <h2 class="block__title">Skills</h2>
        <p class="block__text">{{ resume.skills }}</p>
      </section>

      <section
        v-if="resume.education && resume.education.some(e => e.school || e.degree)"
        class="block"
      >
        <h2 class="block__title">Education</h2>
        <div
          v-for="edu in resume.education"
          v-show="edu.school || edu.degree"
          :key="edu._id"
          class="entry entry--compact"
        >
          <p class="entry__primary">{{ edu.school || 'School' }}</p>
          <p class="entry__secondary">{{ edu.degree }}</p>
          <p v-if="edu.details" class="entry__meta">{{ edu.details }}</p>
        </div>
      </section>

      <section v-if="resume.languages && resume.languages.trim()" class="block">
        <h2 class="block__title">Languages</h2>
        <p class="block__text">{{ resume.languages }}</p>
      </section>

      <section v-if="lineItems(resume.certifications).length" class="block">
        <h2 class="block__title">Certifications</h2>
        <ul class="entry__list entry__list--plain">
          <li v-for="(c, i) in lineItems(resume.certifications)" :key="i">{{ c }}</li>
        </ul>
      </section>

      <section
        v-if="resume.projects && resume.projects.some(hasProjectContent)"
        class="block"
      >
        <h2 class="block__title">Projects</h2>
        <div
          v-for="proj in resume.projects"
          v-show="hasProjectContent(proj)"
          :key="proj._id"
          class="proj"
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
      </section>
    </main>
  </div>
</template>

<script>
import resumeTemplate from '~/mixins/resumeTemplate'

export default {
  name: 'ResumeTemplateExecutive',
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
  background: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  font-size: 10pt;
  line-height: 1.45;
  box-sizing: border-box;
  color: var(--resume-secondary, #4a4a4a);
}

.masthead {
  padding: 24px 28px 20px;
  background: var(--resume-surface, rgba(26, 54, 93, 0.1));
  border-bottom: 3px solid var(--resume-primary, #1a365d);
}

.masthead__name {
  margin: 0 0 6px;
  font-size: 22pt;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: var(--resume-primary, #1a365d);
}

.masthead__role {
  margin: 0 0 14px;
  font-size: 11pt;
  font-weight: 500;
  color: var(--resume-secondary, #4a4a4a);
}

.masthead__contact {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 6px 18px;
  font-size: 9pt;
  color: var(--resume-secondary, #4a4a4a);
}

.main {
  padding: 22px 28px 28px;
}

.block {
  margin-bottom: 20px;
  break-inside: avoid;
}

.block__title {
  margin: 0 0 10px;
  padding-bottom: 6px;
  font-size: 8.5pt;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--resume-primary, #1a365d);
  border-bottom: 1px solid var(--resume-primary, #1a365d);
}

.block__text {
  margin: 0;
  color: var(--resume-secondary, #4a4a4a);
  text-align: left;
}

.entry {
  margin-bottom: 14px;
}

.entry--compact {
  margin-bottom: 12px;
}

.entry__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 6px;
}

.entry__primary {
  margin: 0;
  font-weight: 700;
  font-size: 10.5pt;
  color: var(--resume-primary, #1a365d);
}

.entry__secondary {
  margin: 2px 0 0;
  font-size: 9.5pt;
  font-weight: 400;
  color: var(--resume-secondary, #4a4a4a);
}

.entry__dates {
  margin: 0;
  font-size: 9pt;
  white-space: nowrap;
  color: var(--resume-secondary, #4a4a4a);
}

.entry__meta {
  margin: 4px 0 0;
  font-size: 9pt;
  color: var(--resume-secondary, #4a4a4a);
}

.entry__list {
  margin: 0;
  padding-left: 18px;
  color: var(--resume-secondary, #4a4a4a);
}

.entry__list li {
  margin-bottom: 4px;
}

.entry__list--plain {
  list-style: disc;
}

.proj__link {
  display: inline-block;
  margin-top: 4px;
  font-size: 8.5pt;
  color: var(--resume-primary, #1a365d);
  word-break: break-all;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.proj__stack {
  margin-top: 4px;
}

.proj__desc {
  margin-top: 6px;
}
</style>
