<template>
  <div class="CLoader u-flex-center">
    <div class="CLoader__images u-flex-center">
      <img class="CLoader__images__hetic" src="images/hetic_logo.png" alt="Logo d'hetic" />
      <img class="CLoader__images__psa" src="images/psa_logo.png" alt="Logo de PSA" />
    </div>
    <span class="CLoader__pourcent" v-if="Math.round(pourcent) !== 100"
      >{{ Math.round(pourcent) }} %</span
    >
    <button v-if="Math.round(pourcent) === 100" class="CLoader__start" @click="$emit('start')">
      Commencer l'expérience
    </button>
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
      pourcent: 100,
      toLoad: 0,
      count: 0,
    }
  },
  mounted() {
    console.log(this.data)
    this.toLoad = this.data.url.length
    /*        
    this.data.url.forEach(url => {
      var req = new XMLHttpRequest()
      req.open('GET', url, true)
      req.responseType = 'blob'

      req.onload = _e => {
        console.log(_e.srcElement)
        this.count++
        this.pourcent = (this.count / this.toLoad) * 100
        console.log(this.count / this.toLoad)
      }

      req.send()
    }) */
  },
}
</script>

<style lang="scss">
.CLoader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  background: var(--psa-blue);

  &__images {
    &__hetic {
      width: auto;
      height: 100px;
      object-fit: contain;
      margin: 0 90px;
    }

    &__psa {
      object-fit: contain;
      margin: 0 100px;
      width: auto;
      height: 60px;
    }
  }

  &__pourcent {
    color: white;
    position: absolute;
    bottom: 300px;
    left: 50%;
    transform: translate(-50%, 0);
  }

  &__start {
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translate(-50%, 0);
    padding: 20px 50px;
    border: solid white 1px;
    color: white;
    cursor: pointer;
    border-radius: 4px;
    transition: 0.3s ease-in-out all;

    &:hover {
      color: var(--psa-blue);
      background: white;
    }
  }
}
</style>
