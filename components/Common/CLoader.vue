<template>
  <div class="CLoader u-flex-center">
    <div class="CLoader__images u-flex-center">
      <img class="CLoader__images__hetic" src="images/hetic_logo.png" alt="Logo d'hetic" />
      <img class="CLoader__images__psa" src="images/psa_logo.png" alt="Logo de PSA" />
    </div>
    <button class="CLoader__start" @click="$emit('start')">Commencer l'expérience</button>
  </div>
</template>

<script>
export default {}
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

  &__start {
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translate(-50%, 0);
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
</style>
