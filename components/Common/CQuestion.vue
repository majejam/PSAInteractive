<template>
  <transition name="question_fade" appear mode="out-in">
    <div v-if="show" :key="step.main_question" class="CQuestion u-flex-center">
      <span v-if="step.main_question" class="CQuestion__MainQuestion">{{
        questionName(step.main_question)
      }}</span>
      <div class="CQuestion__choices u-flex-center" v-if="step.choices">
        <div
          v-for="(choice, index) in step.choices"
          class="CQuestion__choices--single"
          :key="index"
        >
          <input
            type="checkbox"
            :id="index"
            :value="choice.value"
            @change="checkedValues"
            v-model="checkedChoices"
          />
          <label :for="index">{{ choice.name }}</label>
        </div>
      </div>
      <div class="u-flex-center">
        <button
          v-for="(path, index) in step.paths"
          :key="index"
          class="CQuestion__Button"
          @click="$emit('changeVideo', path.step)"
        >
          {{ path.question }}
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    step: {
      required: true,
      type: Object,
    },
    show: {
      required: true,
      type: Boolean,
    },
    experience: {
      required: true,
      type: String,
      default: '',
    },
  },
  data() {
    return {
      checkedChoices: [],
    }
  },
  methods: {
    checkedValues() {
      this.$emit('checkedValues', this.checkedChoices)
    },
    removeAll() {
      this.checkedChoices = []
      this.$emit('checkedValues', this.checkedChoices)
    },
    questionName(question) {
      if (this.experience !== '' && question) {
        return question.replace('[[value]]', this.experience)
      } else return question
    },
  },
  computed: {},
}
</script>

<style lang="scss">
.CQuestion {
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  padding: 32px;
  flex-flow: column;
  background: var(--psa-blue);

  &__choices {
    margin-bottom: 32px;
    label {
      color: white;
    }

    &--single {
      margin: 0 10px;
    }
  }

  &__MainQuestion {
    font-size: 1.12em;
    margin-bottom: 32px;
  }

  &__Button {
    cursor: pointer;
    margin: 0 45px;
    padding: 16px 32px;
    border-radius: 4px;
    background: var(--psa-blue);
    color: white;
    border: 1px white solid;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: var(--psa-blue);
      background: white;
      border: 1px var(--psa-blue) solid;
    }
  }
}

.question_fade-enter-active {
  transition: all 0.5s ease-in-out;
}

.question_fade-leave-active {
  transition: all 0.7s ease-in-out 0.2s;
}
.question_fade-enter, .question_fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(100%);
}
</style>
