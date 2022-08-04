<template>
  <div>
    <div class="form-div">
      <input
        type="text"
        v-model="author"
        class="form-control input"
        placeholder="Author Name"
      />
      <input
        type="text"
        v-model="title"
        class="form-control input"
        placeholder="Post Title"
      />
      <textarea
        v-model="content"
        cols="32"
        rows="5"
        class="form-control textarea"
        placeholder="Post Content"
      ></textarea>
      <div class="btn-div">
        <button @click="savePost" class="btns">
          {{ edit ? "Update" : "Create" }} Post
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { v4 as uuidv4 } from "uuid";
export default {
  name: "CreatePost",
  data() {
    return {
      author: "Author Name",
      title: "",
      content: "",
      edit: false,
    };
  },
  computed: {
    ...mapGetters({ post: "getSelectedPost" }),
  },
  watch: {
    post(value) {
      this.author = value.author;
      this.title = value.title;
      this.content = value.content;
      this.edit = this.$route.query.edit;
    },
  },
  created() {
    this.$store.dispatch("fetchInitalPost");
    const query = this.$route.query;
    if (query.edit) {
      this.$store.dispatch("selectedPost", query.id);
    }
  },
  methods: {
    savePost() {
      if (this.title && this.author && this.content) {
        const data = {
          title: this.title,
          author: this.author,
          content: this.content,
          id: this.edit ? this.post.id : uuidv4(),
        };
        if (this.edit) {
          this.$store.dispatch("editPost", data);
        } else {
          this.$store.dispatch("createPost", data);
        }
        this.$router.push("/");
      } else {
        alert("All fields are required");
      }
    },
  },
};
</script>

<style scoped lang="scss">
.form-div {
  max-width: 500px;
  margin: 40px auto 10px auto;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 9px 3px gray;
}
.form-control {
  width: 97%;
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid gray;
}
.form-control:focus {
  outline: none;
  box-shadow: none;
}
.input {
  height: 30px;
  font-size: 15px;
}
.textarea {
  font-size: 15px;
}
.btn-div {
  text-align: center;

  .btns {
    background: #4caf50;
    border: none;
    border-radius: 5px;
    padding: 5px 8px;
    color: white;
    font-size: 19px;
  }
}
</style>
