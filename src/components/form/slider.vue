<template lang="pug">
.form-slider
  el-slider.form-slider__slider(v-model="myValue" :step="1" :min="0" :max="stepMax" :show-tooltip='true' :disabled='disabled')
  p.form-slider__p.uk-align-left.uk-flex.uk-flex-middle.uk-text-muted
    span.uk-text-small ◀︎
    span.form-slider__span.uk-text-small {{ labels[0] }}
  p.form-slider__p.uk-align-right.uk-flex.uk-flex-middle.uk-text-muted.uk-flex-right
    span.form-slider__span.uk-text-small.uk-text-right {{ labels[1] }}
    span.uk-text-small ▶︎
    //- i.el-icon-right
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Slider } from "element-ui";
@Component({
  components: {
    "el-slider": Slider,
  },
})
export default class FormSlider extends Vue {
  /**
   * ・Propは初期値入れるとエラー(親から渡った値はreadonlyのため)
   * ・初期値を抜くとinitializeしろと言われるので"!"(エスケープ)で回避 -> 通常あまりよくない回避だが、Propはdefaultで初期値を指定しているので問題ない
   * ・初期値で怒られるかはtsconfigで設定可能
   *  https://stackoverflow.com/questions/49699067/property-has-no-initializer-and-is-not-definitely-assigned-in-the-construc
   */
  @Prop({ default: 5 }) private value!: number; // v-modelの値
  @Prop({ default: () => ["全く満足できなかった", "非常に満足した"] })
  private labels!: string[]; // v-modelの値
  @Prop({ default: 10 }) private stepMax!: number; // v-modelの値
  @Prop({ default: false }) private disabled!: boolean;
  private marks: any = {};
  get myValue(): number {
    return this.value !== undefined ? this.value : 5;
  }
  set myValue(newValue) {
    this.$emit("input", newValue);
  } // v-modelは@inputイベントでupdateされる仕組み

  private created() {
    for (let i = 1; i <= this.stepMax; i++) {
      this.marks[i] = i + "";
    }
  }
}
</script>
<style scoped lang="sass">
@import '@/assets/sass/mixins.sass'
.form-slider
  &__slider
    height: 27px
  &__p
    margin: 0
    border-bottom: 1px solid #eee
    width: 170px
    +onlyMobile
      width: 150px
    +onlyMobileS
      width: 125px
  &__span
    display: inline-block
    padding: 0 2px
</style>
<style lang="sass">
@import '@/assets/sass/element-variables.sass'
.form-slider
  .el-slider__marks-text
    margin-top: 3px
    font-size: 12px
  .el-slider__runway.disabled .el-slider__bar
    background-color: $--color-primary
</style>
