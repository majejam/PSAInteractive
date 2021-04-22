<template>
  <div class="CVideoPlayer">
    <span class="currentVideo" v-if="false"
      >{{ currentStep.name }}
      <span v-if="experience"> - {{ experience.experience_name }}</span></span
    >
    <button class="skipVideo" v-if="false" @click="skipVideo">next video</button>
    <video
      v-show="!ended"
      ref="video_player"
      class="CVideoPlayer__video"
      @ended="onVideoEnd()"
      :src="currentStep.src"
    ></video>
    <transition name="fade" appear mode="out-in">
      <div v-if="ended" class="CVideoPlayer__restart u-flex-center">
        <span class="CVideoPlayer__restart--legend"
          >Vous pouvez maintenant retenter l’expérience en modifiant vos choix et en découvrant les
          autres points d'intérêts !</span
        >
        <button @click="restart()">Recommencer</button>
      </div>
    </transition>
    <c-question
      :step="currentStep"
      :show="questionShow"
      :experience="experience.experience_name"
      @changeVideo="setCurrentVideo"
      @checkedValues="updateChecked"
    />
  </div>
</template>

<script>
import CQuestion from './CQuestion.vue'
export default {
  components: { CQuestion },
  props: {
    data: {
      required: true,
      type: Object,
    },
    experiences: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      currentStep: this.data.step,
      questionShow: false,
      experience: {
        experience_name: '',
      },
      ended: false,
      checkedChoices: [],
    }
  },
  mounted() {
    this.$refs.video_player.play()
  },
  methods: {
    updateChecked(_e) {
      this.checkedChoices = _e
    },
    setCurrentVideo(step) {
      console.log('Video selected ! Loading the video...', step)
      this.$refs.video_player.pause()
      if (step.experience_starting) {
        /**
         * Switch tree
         */
        step = this.experiences.step
      }

      if (this.checkedChoices.length === 0 && this.currentStep.choices) {
        /**
         * If no choice selected
         */
        this.currentStep = this.data.no_choice
      } else if (step.condition) {
        this.getNextExperience(step)
      } else {
        if (typeof step.return == 'undefined') {
          /**
           * If in normal path & no choice condition
           */
          this.currentStep = step
        } else if (step.return) {
          /**
           * If in bias path and selected to show experience
           */
          this.currentStep = this.experience
        } else {
          /**
           * If in bias path & selected to skip experience
           */
          this.getNextExperience(this.experience.paths[0].step)
          //this.currentStep = step
        }
      }

      this.questionShow = false
      this.$refs.video_player.load()
      setTimeout(() => {
        this.$refs.video_player.play()
      }, 100)
    },
    skipVideo() {
      if (this.$refs.video_player) {
        this.$refs.video_player.currentTime = this.$refs.video_player.duration - 0.5
      }
    },
    getNextExperience(step) {
      if (this.checkCondition(step.condition)) {
        /**
         * Go to bias tree
         */
        this.currentStep = this.data.check_poi
        this.experience = step
        //this.currentStep = step
      } else if (!step.condition) {
        this.experience = {
          experience_name: '',
        }
        this.currentStep = step
        console.log('No more experience, connecting to normal path')
      } else {
        this.currentStep = step.paths[0].step
        this.getNextExperience(this.currentStep)
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
      this.checkedChoices = []
      this.currentStep = this.data.step
      this.$refs.video_player.load()
      setTimeout(() => {
        this.$refs.video_player.play()
      }, 100)
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

    &__choices {
      label {
        color: white;
      }

      &--single {
        margin: 0 10px;
      }
    }

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
    flex-flow: column;

    &--legend {
      margin-bottom: 24px;
      line-height: 1.5;
      text-align: center;
      width: 30%;
    }

    button {
      padding: 20px 50px;
      border: solid white 1px;
      border-radius: 4px;
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
    transition: all 0.5s ease-in-out;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}

.currentVideo {
  position: fixed;
  top: 10px;
  left: 10px;
  width: 100%;
}

.skipVideo {
  position: fixed;
  top: 40px;
  left: 10px;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid white;
  cursor: pointer;
  z-index: 100;
}
</style>
