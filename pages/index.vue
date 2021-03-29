<template>
  <div class="container">
    <c-video-player :data="content.video" :experiences="experiences" />
  </div>
</template>

<script>
export default {
  async asyncData({ store }) {
    return { content: store.state.content, experiences: store.state.experiences }
  },
  head() {
    return {
      title: this.content.meta.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: this.content.meta.description,
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
