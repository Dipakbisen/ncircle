<template>
  <div>
    <div class="show-content">
      <p>{{ author }}</p>
      <p>{{ title }}</p>
      <p>{{ content }}</p>
      <div class="btn-div">
        <button @click="goBack" class="btns">Go Back</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "PostView",
  data() {
    return {
      author: "",
      title: "",
      content: "",
    };
  },
  computed: {
    ...mapGetters({ post: "getSelectedPost" }),
  },
  watch: {
    post(value) {
      if (value) {
        this.author = value.author;
        this.title = value.title;
        this.content = value.content;
        this.edit = this.$route.query.edit;
      }
    },
  },
  created() {
    this.$store.dispatch("fetchInitalPost");
    const query = this.$route.query;
    if (query.id) {
      this.$store.dispatch("selectedPost", query.id);
    }
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped lang="scss">
.show-content {
  max-width: 500px;
  margin: 20px auto;
}
.btn-div {
  text-align: center;
  margin-top: 100px;

  .btns {
    background: #4caf50;
    border: none;
    border-radius: 5px;
    padding: 5px 8px;
    color: white;
    font-size: 19px;
    width: 100%;
    cursor: pointer;
  }
}
</style>
