<template lang="pug">
.form-textarea
  el-input(v-model='myValue' type='textarea' :autosize="{ minRows: 2, maxRows: 8}" :placeholder='placeholder' :readonly='disabled')
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Input } from "element-ui";

@Component({
  components: {
    "el-input": Input,
  },
})
export default class FormTextarea extends Vue {
  @Prop() private value!: number[];
  @Prop({ default: "ここに記入してください" }) private placeholder!: string;
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
.form-textarea
  .el-textarea__inner
    padding: 10px 15px
    &[readonly]
      border-color: #DCDFE6
  .el-textarea.is-disabled .el-textarea__inner
    color: #85888e
</style>
