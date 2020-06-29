<template lang="pug">
.ui-annotation
  span.ui-annotation__text.uk-text-danger
    slot
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class UIAnnotation extends Vue {}
</script>
<style lang="sass">
@import '@/assets/sass/element-variables.sass'
.ui-annotation
  display: inline-block
  margin-left: 5px
  &__text
    font-size: 11px
</style>
