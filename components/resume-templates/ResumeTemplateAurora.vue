<template>
  <div class="sheet">
    <aside class="side">
      <h1 class="side__name">{{ resume.fullName || 'Your name' }}</h1>
      <p class="side__role">{{ resume.jobTitle || 'Headline' }}</p>

      <div class="side__block">
        <h3 class="side__title">Contact</h3>
        <ul class="side__list">
          <li v-if="resume.contact && resume.contact.email">{{ resume.contact.email }}</li>
          <li v-if="resume.contact && resume.contact.phone">{{ resume.contact.phone }}</li>
          <li v-if="resume.contact && resume.contact.linkedin">{{ resume.contact.linkedin }}</li>
        </ul>
      </div>

      <div v-if="resume.skills" class="side__block">
        <h3 class="side__title">Skills</h3>
        <p class="side__body">{{ resume.skills }}</p>
      </div>

      <div v-if="resume.languages && resume.languages.trim()" class="side__block">
        <h3 class="side__title">Languages</h3>
        <p class="side__body">{{ resume.languages }}</p>
      </div>

      <div v-if="lineItems(resume.certifications).length" class="side__block">
        <h3 class="side__title">Certifications</h3>
        <ul class="side__list">
          <li v-for="(c, i) in lineItems(resume.certifications)" :key="i">{{ c }}</li>
        </ul>
      </div>
    </aside>

    <main class="body">
      <section v-if="resume.summary" class="block">
        <h2 class="block__title">Profile</h2>
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
            <div>
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

      <section
        v-if="resume.education && resume.education.some(e => e.school || e.degree)"
        class="block"
      >
        <h2 class="block__title">Education</h2>
        <div
          v-for="edu in resume.education"
          v-show="edu.school || edu.degree"
          :key="edu._id"
          class="entry entry--tight"
        >
          <p class="entry__primary">{{ edu.degree }}</p>
          <p class="entry__secondary">{{ edu.school }}</p>
          <p v-if="edu.details" class="entry__meta">{{ edu.details }}</p>
        </div>
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
          class="entry entry--tight"
        >
          <p class="entry__primary">{{ proj.name || 'Project' }}</p>
          <a
            v-if="proj.url"
            class="proj__link"
            :href="linkHref(proj.url)"
            target="_blank"
            rel="noopener noreferrer"
          >{{ proj.url }}</a>
          <p v-if="proj.stack" class="entry__secondary">{{ proj.stack }}</p>
          <p v-if="proj.description" class="block__text">{{ proj.description }}</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import resumeTemplate from '~/mixins/resumeTemplate'

export default {
  name: 'ResumeTemplateAurora',
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
  display: flex;
  align-items: stretch;
  background: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 9.5pt;
  line-height: 1.45;
  box-sizing: border-box;
}

.side {
  width: 32%;
  min-width: 32%;
  padding: 24px 16px 24px 18px;
  background: var(--resume-surface, rgba(26, 54, 93, 0.1));
  border-right: 3px solid var(--resume-primary, #1a365d);
  box-sizing: border-box;
}

.side__name {
  margin: 0 0 6px;
  font-size: 16pt;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--resume-primary, #1a365d);
}

.side__role {
  margin: 0 0 20px;
  font-size: 9.5pt;
  font-weight: 500;
  color: var(--resume-secondary, #4a4a4a);
  line-height: 1.35;
}

.side__block {
  margin-bottom: 16px;
}

.side__title {
  margin: 0 0 6px;
  font-size: 7.5pt;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--resume-primary, #1a365d);
}

.side__list {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 8.5pt;
  line-height: 1.5;
  color: var(--resume-secondary, #4a4a4a);
}

.side__list li {
  margin-bottom: 4px;
  word-break: break-word;
}

.side__body {
  margin: 0;
  font-size: 8.5pt;
  color: var(--resume-secondary, #4a4a4a);
}

.body {
  flex: 1;
  min-width: 0;
  padding: 24px 22px 28px 20px;
  background: #fff;
}

.block {
  margin-bottom: 18px;
  break-inside: avoid;
}

.block__title {
  margin: 0 0 10px;
  font-size: 8.5pt;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--resume-primary, #1a365d);
  padding-left: 10px;
  border-left: 3px solid var(--resume-primary, #1a365d);
}

.block__text {
  margin: 0;
  color: var(--resume-secondary, #4a4a4a);
}

.entry {
  margin-bottom: 14px;
}

.entry--tight {
  margin-bottom: 12px;
}

.entry__row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: flex-start;
  margin-bottom: 6px;
}

.entry__primary {
  margin: 0;
  font-weight: 700;
  font-size: 10pt;
  color: var(--resume-primary, #1a365d);
}

.entry__secondary {
  margin: 2px 0 0;
  font-size: 9.5pt;
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
  margin: 0;
  padding-left: 16px;
  color: var(--resume-secondary, #4a4a4a);
}

.entry__list li {
  margin-bottom: 3px;
}

.proj__link {
  display: inline-block;
  margin-top: 4px;
  font-size: 8pt;
  color: var(--resume-primary, #1a365d);
  word-break: break-all;
  text-decoration: underline;
  text-underline-offset: 2px;
}
</style>
