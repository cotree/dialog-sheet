<template lang="pug">
.form-radio-11(:disabled='disabled')
  .form-radio-11__group
    label.form-radio-11__label(v-for='num in numbersArray' :key='num')
      input.form-radio-11__radio(type='radio' :value='num' v-model='myValue' :disabled='disabled')
      span.form-radio-11__span(:class='getlabelClass(num)')
        span.form-radio-11__num(v-if='showNumber') {{ num }}
  .form-radio-11__texts
    span.form-radio-11__text.form-radio-11__text--left ◀︎ {{ labels[0] }}
    span.form-radio-11__text.form-radio-11__text--right {{ labels[1] }} ▶︎
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

interface Options {
  showNumber?: boolean;
}

@Component
export default class FormRadio11 extends Vue {
  @Prop({ default: () => ["0", "10"] }) private labels!: string[]; // v-modelの値
  @Prop() private value!: number[];
  // tslint:disable variable-name
  @Prop() private _key!: string;

  @Prop({ default: () => null }) private options!: Options;
  private showNumber = false;

  private componentName = "form-radio-11"; // TODO: this.$options._componentTag で本当は取りたいが要型拡張
  get myValue(): number[] {
    return this.value;
  }
  set myValue(newValue) {
    this.$emit("input", newValue);
    this.$emit("change", this._key, newValue, this.componentName);
  }
  @Prop({ default: false }) private disabled!: boolean;
  private numbersArray: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  private getlabelClass(num: number): string {
    const baseClass = "form-radio-11__span";
    return `${baseClass}--${num}`;
  }

  private created(): void {
    if (this.options && this.options.showNumber) {
      this.showNumber = true;
    }
  }
}
</script>
<style lang="sass">
@import '@/assets/sass/element-variables.sass'
@import '@/assets/sass/mixins.sass'
.form-radio-11
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
      color: $--color-primary
      text-align: right
    &--left
      color: $--color-primary
  &__group
    display: flex
    align-items: center
    text-align: center
    width: 100%
    justify-content: space-between
    align-items: flex-end
    // justify-content: stretch
    line-height: 1.0
  &__span
    border: $--color-primary 2px solid
    background-color: #fff
    border-radius: 5px
    // border-radius: 50%
    display: inline-block
    width: 20px
    height: 20px
    cursor: pointer
    transition: background-color .2s
    &:hover
      background-color: rgba($--color-primary, 0.5)
      .form-radio-11__num
        color: $--color-primary
    &--1
      height: 23px
    &--2
      height: 26px
    &--3
      height: 29px
    &--4
      height: 32px
    &--5
      height: 35px
    &--6
      height: 38px
    &--7
      height: 41px
    &--8
      height: 44px
    &--9
      height: 47px
    &--10
      height: 50px
      .form-radio-11__num
        left: -1px
  &__num
    position: absolute
    bottom: 8px
    left: 0
    width: 100%
    text-align: center
    font-size: 12px
    color: $--color-primary
  &__radio
    opacity: 0
    position: absolute
    &:checked + .form-radio-11__span
      background-color: $--color-primary
    &:checked + .form-radio-11__span .form-radio-11__num
      color: #fff

.form-radio-11[disabled]
  .form-radio-11__span
    cursor: not-allowed
    &:hover
      background-color: #fff
      .form-radio-11__num
        color: $--color-primary
  .form-radio-11__radio:checked + .form-radio-11__span
    background-color: $--color-primary
</style>
