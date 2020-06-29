<template lang="pug">
.form-checkbox
  el-checkbox-group(v-model="myValue" :disabled='disabled')
    el-checkbox(v-for="element in myListArray" :key="element.id" :label='element.id' border) {{ element.label }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import draggable from "vuedraggable";
import { CheckboxGroup, Checkbox } from "element-ui";

@Component({
  components: {
    draggable,
    "el-checkbox-group": CheckboxGroup,
    "el-checkbox": Checkbox,
  },
})
export default class FormCheckbox extends Vue {
  @Prop() private value!: number[];
  get myValue(): number[] {
    return this.value || [];
  }
  set myValue(newValue) {
    this.$emit("input", newValue);
  }

  @Prop() private listArray!: object[];
  private myListArray: object[] = this.listArray;
  @Prop({ default: false }) private disabled!: boolean;
}
</script>
<style lang="sass">
@import '@/assets/sass/element-variables.sass'
.form-checkbox
  .el-checkbox.is-bordered
    cursor: pointer
    display: flex
    line-height: 1.5
    margin-left: 0 !important
    margin-bottom: 5px
    padding-bottom: 5px
    width: 100%
    height: auto
    padding-top: 12px
    padding-bottom: 10px
    &.is-checked
      background-color: $--color-primary
      .el-checkbox__label
        font-weight: bold
        color: #fff
      .el-checkbox__inner
        border-color: rgba(256,256,256,0.8)
    &.is-disabled.is-checked
      border-color: $--color-primary

  .el-checkbox__input
    margin-top: 2px
    &.is-disabled.is-checked
      .el-checkbox__inner
        background-color: $--color-primary
        border-color: rgba(256,256,256,0.8)
        color: #fff
      + span.el-radio__label
        color: #fff
  .el-checkbox__label
    white-space: normal
</style>
