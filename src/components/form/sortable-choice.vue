<template lang="pug">
.form-sortable-choice
  el-checkbox-group(v-model="myValue" :disabled='disabled')
    el-checkbox(v-for="element in myListArray" :key="element.id" :label='element.id' border)
      span.form-sortable-choice__number(:class="'form-sortable-choice__number--'+getOrder(element.id)") {{ getOrder(element.id) }}
      span.form-sortable-choice__label {{ element.label }}
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
export default class FormSortableChoice extends Vue {
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

  private getOrder(id: number): number|string {
    const order: number = this.myValue.indexOf(id) + 1;
    if (order === 0) return "-";
    return order;
  }
}
</script>
<style lang="sass">
@import '@/assets/sass/element-variables.sass'
@import '@/assets/sass/mixins.sass'
.form-sortable-choice
  &__number
    display: inline-block
    width: 25px
    height: 25px
    border-radius: 50%
    background-color: silver
    text-align: center
    padding-top: 4px
    box-sizing: border-box
    color: silver
  .el-checkbox-group
    .el-checkbox
      margin-bottom: 5px
      height: auto
      margin-left: 0 !important
      margin-right: 0 !important
      width: 100%
      padding: 10px 12px 7px
      box-sizing: border-box
      &__input
        display: none
      &__inner
        display: none
      &__label
        width: 100%
        padding-left: 0px
        white-space: normal
        box-sizing: border-box
        display: flex
        align-items: center
        justify-content: flex-start
        .form-sortable-choice__number
          margin-right: 12px
          flex-shrink: 0
        > span
          white-space: normal
      &.is-checked
        //反転
        // background-color: $--color-primary
        // .el-checkbox__label
        //   font-weight: bold
        //   color: #fff
        // .el-checkbox__inner
        //   border-color: rgba(256,256,256,0.8)
        // .form-sortable-choice__number
        //   background-color: #fff
        //   color: $--color-primary
        //   font-weight: bold
        //not反転
        .el-checkbox__label
          font-weight: bold
        .form-sortable-choice__number
          background-color: $--color-primary
          color: #fff
          // font-weight: bold
        // .form-sortable-choice__number--1
        //   font-size: 16px
</style>
