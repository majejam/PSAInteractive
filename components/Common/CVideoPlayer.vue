<template>
  <div class="CVideoPlayer">
    <span>{{ this.currentStep.name }}</span>
    <video
      v-show="!ended"
      controls
      ref="video_player"
      class="CVideoPlayer__video"
      @ended="onVideoEnd()"
      :src="this.currentStep.src"
    ></video>
    <div class="CVideoPlayer__restart u-flex-center">
      <button v-if="ended" @click="restart()">restart ?</button>
    </div>
    <transition name="fade">
      <div v-show="questionShow" class="CVideoPlayer__questions u-flex-center">
        <button
          v-for="(path, index) in this.currentStep.paths"
          :key="index"
          @click="setCurrentVideo(path.step)"
        >
          {{ path.question }}
        </button>
        <div v-if="this.currentStep.choices">
          <div v-for="(choice, index) in this.currentStep.choices" :key="index">
            <input type="checkbox" :id="index" :value="choice.value" v-model="checkedChoices" />
            <label :for="index">{{ choice.name }}</label>
          </div>
          <div @click="checkedChoices = []">Remove all</div>
          <br />
          <span>Choix cochés : {{ checkedChoices }}</span>
        </div>
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
      checkedChoices: [],
    }
  },
  mounted() {
    this.$refs.video_player.play()
  },
  methods: {
    setCurrentVideo(step) {
      console.log('Video selected ! Loading the video...')
      this.$refs.video_player.pause()
      if (step.condition) {
        this.getNextExperience(step)
      } else {
        this.currentStep = step
      }
      this.questionShow = false
      this.$refs.video_player.load()
      this.$refs.video_player.play()
    },
    getNextExperience(step) {
      if (this.checkCondition(step.condition)) this.currentStep = step
      else if (!step.condition) {
        console.log('NO MORE EXPERIENCE')
      } else {
        console.log(step.paths[0].step)
        this.currentStep = step.paths[0].step
        this.getNextExperience(this.currentStep)
      }
    },
    jumpExp(step) {
      while (!step.paths[0].step.condition && !this.checkCondition(step.paths[0].step.condition)) {
        console.log('nothiiing')
      }
    },
    onVideoEnd() {
      console.log('Video ended, checking next videos...')
      if (!this.currentStep.paths) this.ended = true
      else this.questionShow = true
    },
    checkCondition(condition) {
      const found = this.checkedChoices.find(element => element == condition)
      return typeof found !== 'undefined'
    },
    restart() {
      console.log('Restarting...')
      this.ended = false
      this.questionShow = false
      this.currentStep = this.data.step
      this.$refs.video_player.load()
      this.$refs.video_player.play()
    },
  },
}
</script>

<style lang="scss">
.CVideoPlayer {
  width: 100%;
  height: 100%;
  background: var(--psa-blue);
  span {
    color: white;
  }

  &__video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__questions {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: var(--psa-blue);

    button {
      margin: 0 45px;
      cursor: pointer;
      color: white;
      text-decoration: underline;
    }
  }

  &__restart {
    width: 100%;
    height: 100%;

    button {
      padding: 20px 50px;
      border: solid white 1px;
      color: white;
      cursor: pointer;
      transition: 0.3s ease-in-out all;

      &:hover {
        color: var(--psa-blue);
        background: white;
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(100%);
  }
}
</style>
