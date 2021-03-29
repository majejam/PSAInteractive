import data from '@/static/data/content.json'
import experiences from '@/static/data/experiences.json'
export const state = () => ({
  content: [],
  experiences: [],
})

export const mutations = {
  setContent(state, data) {
    state.content = data
  },
  setExperiences(state, data) {
    state.experiences = data
  },
}

export const actions = {
  async nuxtServerInit({ commit }) {
    commit('setContent', data)
    commit('setExperiences', experiences)
  },
}
