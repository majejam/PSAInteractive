<template>
  <div class="CVideoPlayer">
    <c-text tag="h2" type="bold" :text="currentStep.name" />
    <video
      v-show="!ended"
      ref="video_player"
      class="CVideoPlayer__video"
      controls
      @ended="onVideoEnd()"
      :src="this.currentStep.src"
    ></video>
    <button v-if="ended" @click="restart()">restart ?</button>
    <transition name="fade">
      <div v-if="questionShow" class="CVideoPlayer__questions u-flex-center">
        <button
          v-for="(path, index) in this.currentStep.paths"
          :key="index"
          @click="setCurrentVideo(path.step)"
        >
          {{ path.question }}
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      currentStep: this.data.step,
      questionShow: false,
      ended: false,
    }
  },
  mounted() {},
  methods: {
    setCurrentVideo(step) {
      console.log('Video selected ! Loading the video...')
      this.$refs.video_player.pause()
      this.currentStep = step
      this.questionShow = false
      this.$refs.video_player.load()
      this.$refs.video_player.play()
    },
    onVideoEnd() {
      console.log('Video ended, checking next videos...')
      if (!this.currentStep.paths) this.ended = true
      else this.questionShow = true
    },
    restart() {
      console.log('Restarting...')
      this.ended = false
      this.questionShow = false
      this.currentStep = this.data.step
    },
  },
}
</script>

<style lang="scss">
.CVideoPlayer {
  &__video {
    width: 100%;
    height: auto;
  }

  &__questions {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: black;

    button {
      margin: 0 45px;
      cursor: pointer;
      color: white;
      text-decoration: underline;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
