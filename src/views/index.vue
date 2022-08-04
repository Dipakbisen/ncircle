<template>
  <div class="main-list">
    <div class="grid" @mouseup="mouseup">
      <div class="column-left">
        <div v-for="(post, i) in postlist" :key="i" class="post-card">
          <div class="avatar-author">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="avatar"
              height="30"
              width="30"
              class="avatar"
            />
            <div class="author">
              <span>{{ post.author }}</span>
            </div>
            <div>
              <span @click="editPost(post.id)" class="btns edit">Edit</span>
            </div>
            <div>
              <span @click="deletePost(post.id)" class="btns delete"
                >Delete</span
              >
            </div>
          </div>
          <div class="main-containt" @click="viewPost(post.id)">
            <div class="sub-content">
              <h2 class="title">{{ post.title }}</h2>
              <p class="content">{{ post.content }}</p>
            </div>
            <div class="image">
              <img
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt="avatar"
                height="100"
                width="100"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="column-right">Right column</div>
    </div>

    <div>
      <div
        v-show="showTools"
        class="tools"
        :style="{ left: `${x}px`, top: `${y}px` }"
        @mousedown.prevent=""
      >
        <span class="item" @mousedown.prevent="handleAction">
          <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
            <path
              fill="#000000"
              d="M18.5,1.15C17.97,1.15 17.46,1.34 17.07,1.73L11.26,7.55L16.91,13.2L22.73,7.39C23.5,6.61 23.5,5.35 22.73,4.56L19.89,1.73C19.5,1.34 19,1.15 18.5,1.15M10.3,8.5L4.34,14.46C3.56,15.24 3.56,16.5 4.36,17.31C3.14,18.54 1.9,19.77 0.67,21H6.33L7.19,20.14C7.97,20.9 9.22,20.89 10,20.12L15.95,14.16"
            />
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "PostList",
  data() {
    return {
      showTools: false,
      x: 0,
      y: 0,
    };
  },
  computed: {
    ...mapGetters({ postlist: "getAllPost" }),
  },
  created() {
    this.$store.dispatch("fetchInitalPost");
  },
  methods: {
    viewPost(id) {
      const text = window.getSelection().toString();
      if (text || this.showTools) {
        console.log(text, this.showTools);
      } else {
        this.$router.push({
          path: "/view",
          query: { id: id },
        });
      }
    },
    editPost(id) {
      this.$router.push({
        path: "/createpost",
        query: { edit: true, id: id },
      });
    },
    deletePost(id) {
      this.$store.dispatch("deletePost", id);
    },
    mouseup() {
      const text = window.getSelection().toString();
      if (text) {
        const { x, y, width } = window
          .getSelection()
          .getRangeAt(0)
          .getBoundingClientRect();

        this.x = x + width / 2;
        this.y = y + window.scrollY - 10;
        this.showTools = true;
      } else {
        this.x = 0;
        this.y = 0;
        this.showTools = false;
      }
    },
    handleAction() {
      var selection = window.getSelection().getRangeAt(0);
      var selectedText = selection.extractContents();
      var span = document.createElement("span");
      span.style.backgroundColor = "yellow";
      span.addEventListener("mouseover", (event) => {
        this.x = event.x;
        this.y = event.y - event.target.offsetHeight;
        this.showTools = true;
      });
      span.appendChild(selectedText);
      selection.insertNode(span);
      span.addEventListener("click", () => {
        this.showTools = true;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.tools {
  height: 30px;
  padding: 5px 10px;
  background: #333;
  border-radius: 3px;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -100%);
  transition: 0.2s all;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tools:after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -5px;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #333;
}

.item {
  color: #fff;
  cursor: pointer;
}
.item path {
  fill: #fff;
}
.item:hover path {
  fill: #1199ff;
}
.item:hover {
  color: #1199ff;
}
.item + .item {
  margin-left: 10px;
}
//
.main-list {
  padding: 10px 20px;
}
.grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  width: 100%;
  grid-gap: 10px;

  .column-left {
    margin: 20px 2rem;
  }
  .column-right {
    margin: 20px 20px;
    border: 1px solid red;
    text-align: center;
    padding: 30px 20px;
  }
}
.post-card {
  border-bottom: 1px solid rgba(117, 117, 117, 0.384);
  margin-bottom: 12px;
  padding: 10px;
}
.avatar-author {
  display: flex;
  align-items: center;

  .author {
    margin-left: 10px;
  }
}
.avatar-author img {
  border-radius: 100%;
}
.btns {
  display: inline-block;
  // border: 1px solid black;
  padding: 5px;
  font-size: 12px;
  color: white;
  margin: 0 2px;
  border-radius: 3px;
  cursor: pointer;
}
.edit {
  background: #1867c0;
  margin-left: 20px;
}
.delete {
  background: #ff5252;
}
.main-containt {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}
</style>
