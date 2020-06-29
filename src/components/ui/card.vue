<template lang="pug">
.ui-card
  .ui-card__body
    slot
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class UICard extends Vue {}
</script>
<style lang="sass">
@import '@/assets/sass/mixins.sass'
.ui-card
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  border-radius: 4px
  border: 1px solid #EBEEF5
  background-color: #FFFFFF
  overflow: hidden
  color: #303133
  -webkit-transition: 0.3s
  transition: 0.3s
  margin-top: 40px
  &__body
    padding: 30px
    +onlyMobile
      padding: 25px 15px
</style>
