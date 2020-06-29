<template lang="pug">
.form-list-textarea
  input(v-for='(text, idx) in myValue' @keydown.enter="addInput(idx)" @keydown.delete="checkDeleteInput(idx)" :value='text' :disabled='disabled')
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class FormListTextarea extends Vue {
  @Prop() private value!: string[];
  get myValue(): string[] {
    return this.value;
  }
  set myValue(newValue) {
    this.$emit("input", newValue);
  }
  @Prop({ default: false }) private disabled!: boolean;

  private addInput(idx: number):void {
    this.myValue.push("");
  }
  private checkDeleteInput(idx: number):void {
    console.log(idx);
    if (this.myValue[idx] === "") {
      this.myValue.splice(idx, 1);
    }
  }
}
</script>
<style scoped lang="sass"></style>
