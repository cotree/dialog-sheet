<template lang="pug">
.form-number
  el-input(
    v-model.number='myValue' 
    type='number' 
    :placeholder='placeholder' 
    :readonly='disabled'
  )
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Input } from "element-ui";

@Component({
  components: {
    "el-input": Input,
  },
})
export default class FormNumber extends Vue {
  @Prop() private value!: number[];
  @Prop({ default: "20" }) private placeholder!: string;
  get myValue(): number[] {
    return this.value;
  }
  set myValue(newValue) {
    this.$emit("input", newValue);
  }
  @Prop({ default: false }) private disabled!: boolean;
}
</script>
<style lang="sass">
.form-number
  .el-number__inner
    padding: 10px 15px
    &[readonly]
      border-color: #DCDFE6
  .el-number.is-disabled .el-number__inner
    color: #85888e
</style>
