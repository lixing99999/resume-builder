export default {
  methods: {
    lineItems(text) {
      if (!text || typeof text !== 'string') {
        return []
      }
      return text.split(/\n/).map((l) => l.trim()).filter(Boolean)
    },
    skillTags(text) {
      if (!text || typeof text !== 'string') {
        return []
      }
      return text.split(/[,，\n]/).map((s) => s.trim()).filter(Boolean)
    },
    jobBullets(job) {
      return this.lineItems(job && job.bullets)
    },
    linkHref(url) {
      if (!url || typeof url !== 'string') {
        return '#'
      }
      const t = url.trim()
      if (!t) {
        return '#'
      }
      if (/^https?:\/\//i.test(t)) {
        return t
      }
      return `https://${t}`
    },
    hasProjectContent(p) {
      return Boolean(
        p &&
          (String(p.name || '').trim() ||
            String(p.description || '').trim() ||
            String(p.stack || '').trim())
      )
    }
  }
}
