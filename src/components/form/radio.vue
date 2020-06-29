<template lang="pug">
.form-radio
  el-radio-group(v-model='myValue' :disabled='disabled')
    template(v-if='type === "horizonal"')
      el-radio-button(v-for='element in myListArray' :key='element.id' :label='element.id') {{ element.label }}
    template(v-else)
      el-radio(v-for='element in myListArray' :key='element.id' :label='element.id' border) {{ element.label }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { RadioGroup, RadioButton, Radio } from "element-ui";
@Component({
  components: {
    "el-radio-group": RadioGroup,
    "el-radio-button": RadioButton,
    "el-radio": Radio,
  },
})
export default class FormRadio extends Vue {
  @Prop() private value!: number[];
  get myValue(): number[] {
    return this.value;
  }
  set myValue(newValue) {
    this.$emit("input", newValue);
  }
  @Prop() private listArray!: object[];
  private myListArray: object[] = this.listArray;
  @Prop({ default: "" }) private type!: string;
  @Prop({ default: false }) private disabled!: boolean;
}
</script>
<style lang="sass">
@import '@/assets/sass/element-variables.sass'
.form-radio
  .el-radio-group
    width: 100%
  .el-radio.is-bordered
    display: flex
    line-height: 1.5
    margin-left: 0 !important
    margin-bottom: 5px
    padding-bottom: 5px
    width: 100%
    height: auto
    padding-bottom: 10px
    &.is-disabled.is-checked
      border-color: $--color-primary
    &.is-checked
      background-color: $--color-primary
      .el-radio__label
        font-weight: bold
        color: #fff
      .el-radio__inner
        border-color: rgba(256,256,256,0.8)
      // .el-radio__label
      //   font-weight: bold
  .el-radio__label
    white-space: normal
    display: inline-block
    padding-left: 10px
  .el-radio__input
    margin-top: 3px
    &.is-disabled.is-checked
      .el-radio__inner
        background-color: $--color-primary
        border-color: rgba(256,256,256,0.8)
        color: #fff
      + span.el-radio__label
        color: #fff
</style>
