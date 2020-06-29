<template lang="pug">
.form-boolean
  el-radio-group(v-model='myValue' :disabled='disabled')
    el-radio-button(:label='true') {{ labels[0] }}
    el-radio-button(:label='false') {{ labels[1] }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { RadioGroup, RadioButton } from "element-ui";

@Component({
  components: {
    "el-radio-group": RadioGroup,
    "el-radio-button": RadioButton,
  },
})
export default class FormBoolean extends Vue {
  @Prop() private disabled = false;
  @Prop() private value!: boolean;
  @Prop({ default: () => ["ある", "ない"] }) private labels!: string[];
  get myValue(): boolean {
    return this.value;
  }
  set myValue(newValue) {
    this.$emit("input", newValue);
  }
}
</script>
<style scoped lang="sass"></style>
