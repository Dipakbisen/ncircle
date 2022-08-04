import Vue from "vue";
import Vuex from "vuex";
import post from "./posts.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    postList: [],
    selectedPost: {},
  },
  getters: {
    getAllPost(state) {
      return state.postList;
    },
    getSelectedPost(state) {
      return state.selectedPost;
    },
  },
  mutations: {
    setInitalPost(state, post) {
      state.postList = post;
    },
    setCreatedPost(state, data) {
      state.postList.splice(0, 0, data);
    },
    editPost(state, data) {
      const index = state.postList.findIndex((p) => p.id == data.id);
      state.postList.splice(index, 1, data);
    },
    deletePost(state, id) {
      const index = state.postList.findIndex((p) => p.id == id);
      if (index >= 0) {
        state.postList.splice(index, 1);
        alert("Post Deleted");
      } else {
        alert("Post not Found");
      }
    },
    setSelectedPost(state, id) {
      const data = state.postList.find((post) => post.id == id);
      state.selectedPost = data;
    },
  },
  actions: {
    fetchInitalPost({ commit }) {
      commit("setInitalPost", post);
    },
    createPost({ commit }, data) {
      commit("setCreatedPost", data);
    },
    editPost({ commit }, data) {
      commit("editPost", data);
    },
    deletePost({ commit }, id) {
      commit("deletePost", id);
    },
    selectedPost({ commit }, id) {
      commit("setSelectedPost", id);
    },
  },
  modules: {},
});
