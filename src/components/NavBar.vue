<template>
  <div class="main">
    <div class="navbar">
      <div class="brand">
        <span>nCircle</span>
      </div>
      <div class="nav">
        <nav>
          <router-link to="/">Home</router-link> |
          <router-link to="/createpost">Create Post</router-link>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.main {
  padding: 0 30px;
}
.navbar {
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(117, 117, 117, 0.384);

  .brand {
    padding: 30px;
  }
}
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
