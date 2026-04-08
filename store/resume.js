import { normalizeHex, DEFAULT_PRIMARY } from '~/utils/resumeTheme'

export const namespaced = true

const STORAGE_KEY = 'resume-builder-v1'

function persist(state) {
  if (typeof window === 'undefined') {
    return
  }
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        draft: state.draft,
        templateId: state.templateId,
        primaryColor: state.primaryColor
      })
    )
  } catch (e) {
    // ignore quota / private mode
  }
}

export const state = () => ({
  draft: null,
  templateId: 'executive',
  primaryColor: DEFAULT_PRIMARY
})

export const mutations = {
  setDraft(state, draft) {
    state.draft = JSON.parse(JSON.stringify(draft))
    persist(state)
  },
  setTemplate(state, id) {
    state.templateId = id
    persist(state)
  },
  setPrimaryColor(state, hex) {
    state.primaryColor = normalizeHex(hex || DEFAULT_PRIMARY)
    persist(state)
  },
  hydrate(state, saved) {
    if (saved.draft) {
      state.draft = saved.draft
    }
    if (saved.templateId) {
      state.templateId = saved.templateId
    }
    if (saved.primaryColor) {
      state.primaryColor = normalizeHex(saved.primaryColor)
    }
  }
}

export const actions = {
  loadFromStorage({ commit }) {
    if (typeof window === 'undefined') {
      return
    }
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (!raw) {
        return
      }
      const parsed = JSON.parse(raw)
      if (
        parsed &&
        (parsed.draft ||
          parsed.templateId != null ||
          parsed.primaryColor != null)
      ) {
        commit('hydrate', parsed)
      }
    } catch (e) {
      // ignore
    }
  }
}
