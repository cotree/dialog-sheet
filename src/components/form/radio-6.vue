<template lang="pug">
.form-radio-6(:disabled='disabled')
  .form-radio-6__group
    label.form-radio-6__label(v-for='num in numbersArray' :key='num')
      input.form-radio-6__radio(type='radio' :value='num' v-model='myValue' :disabled='disabled')
      span.form-radio-6__span(:class='getlabelClass(num)')
  .form-radio-6__texts
    span.form-radio-6__text.form-radio-6__text--left ◀︎ {{ labels[0] }}
    span.form-radio-6__text.form-radio-6__text--right {{ labels[1] }} ▶︎
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class FormRadio6 extends Vue {
  @Prop({ default: () => ["同意する", "同意しない︎"] })
  private labels!: string[]; // v-modelの値
  @Prop() private value!: number[];
  // tslint:disable variable-name
  @Prop() private _key!: string;
  private componentName = "form-radio-6"; // TODO: this.$options._componentTag で本当は取りたいが要型拡張
  get myValue(): number[] {
    return this.value;
  }
  set myValue(newValue) {
    this.$emit("input", newValue);
    this.$emit("change", this._key, newValue, this.componentName);
  }
  @Prop({ default: false }) private disabled!: boolean;
  private numbersArray: number[] = [1, 2, 3, 4, 5, 6];
  private getlabelClass(num: number): string {
    const baseClass = "form-radio-6__span";
    return `${baseClass}--${num}`;
  }
}
</script>
<style lang="sass">
@import '@/assets/sass/element-variables.sass'
@import '@/assets/sass/mixins.sass'
.form-radio-6
  width: 100%
  max-width: 400px
  margin: 0 auto
  &__label
    position: relative
  &__texts
    margin-top: 3px
    display: flex
    width: 100%
    justify-content: space-between
  &__text
    line-height: 1.5
    +onlyMobile
      max-width: 180px
    +onlyMobileXS
      max-width: 125px
    &--right
      color: $--color-success
      text-align: right
    &--left
      color: $--color-primary
  &__group
    display: flex
    align-items: flex-end
    text-align: center
    width: 100%
    justify-content: space-between
    line-height: 1.0
  &__span
    border: $--color-primary 2px solid
    background-color: #fff
    // border-radius: 50%
    border-radius: 5px
    display: inline-block
    width: 20px
    height: 20px
    cursor: pointer
    transition: background-color .2s
    &:hover
      background-color: rgba($--color-primary, 0.5)
    &--4,&--5,&--6
      border-color: $--color-success
      &:hover
        background-color: rgba($--color-success, 0.5)
    &--1,&--6
      width: 45px
      height: 45px
    &--2,&--5
      width: 30px
      height: 30px
  &__radio
    opacity: 0
    position: absolute
    &:checked + .form-radio-6__span
      background-color: $--color-primary
      &--4,&--5,&--6
        background-color: $--color-success

.form-radio-6[disabled]
  .form-radio-6__span
    cursor: not-allowed
    &:hover
      background-color: #fff
  .form-radio-6__radio:checked + .form-radio-6__span
    background-color: $--color-primary
    &--4,&--5,&--6
      background-color: $--color-success
</style>
