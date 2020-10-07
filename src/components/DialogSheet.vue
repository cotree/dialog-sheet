<template lang="pug">
.view-index
  el-form(v-if='template' ref='myForm' label-position='top' :model='submitData' :rules='validateRules')
    //- group(カード)
    ui-card(v-for='group in template.templateGroups' :key='group.key' v-if='!group.condition || (group.condition && checkCondition(group.condition) === true)')
      h2(v-if='group.title').uk-heading-line
        span {{ group.title }}
      pre(v-if='group.detail' v-html='group.detail')

      //- item(質問)
      template(
        v-for='item in group.templateItems'
        v-if='!item.condition || (item.condition && checkCondition(item.condition) === true)'
      )
        h4.uk-heading-bullet(v-if='item.title' v-bind:id='item.key') {{ item.title }}
          ui-annotation(v-if='isRequired(item.key)') *必須
        el-button(v-if='item.hideButton' type='primary' @click='item.hideButton = null') {{ item.hideButton }}
        el-form-item(
          v-else
          :prop='item.key'
          :required='isRequired(item.key)'
          :ref='item.key'
        )
          p(v-if='item.detail').uk-text-small.uk-text-muted {{ item.detail }}
          el-input(v-if='item.type=="text"' v-model='submitData[item.key]' :placeholder='item.placeholder || "ここに記入してください"' :readonly='readMode')
          compoment(v-else
            :is='`form-${item.type}`'
            :_key='item.key'
            v-model='submitData[item.key]'
            :labels='item.labels'
            :listArray='item.listArray'
            :type='item.styleType'
            :disabled='readMode'
            @change='onChangeData'
            :options='item.options'
          )

</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import UiCard from "./ui/card.vue";
import UiAnnotation from "./ui/annotation.vue";
import FormBoolean from "./form/boolean.vue";
import FormCheckbox from "./form/checkbox.vue";
import FormListTextarea from "./form/list-textarea.vue";
import FormRadio11 from "./form/radio-11.vue";
import FormRadio6 from "./form/radio-6.vue";
import FormRadio from "./form/radio.vue";
import FormSlider from "./form/slider.vue";
import FormSortableChoice from "./form/sortable-choice.vue";
import FormSortable from "./form/sortable.vue";
import FormTextarea from "./form/textarea.vue";
import { Form, Button, FormItem, Input } from "element-ui";
import { ValidateCallback } from "element-ui/types/form";
import VueScrollTo from 'vue-scrollto';


// TODO: set type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ValidateRules = any;

@Component({
  components: {
    UiCard,
    UiAnnotation,
    FormBoolean,
    FormCheckbox,
    FormListTextarea,
    "form-radio-11": FormRadio11,
    "form-radio-6": FormRadio6,
    FormRadio,
    FormSlider,
    FormSortableChoice,
    FormSortable,
    FormTextarea,
    "el-form": Form,
    "el-button": Button,
    "el-form-item": FormItem,
    "el-input": Input,
  },
})
export default class DialogSheet extends Vue {
  @Prop({ type: Object, required: true })
  private template!: Template;

  @Prop({ type: Object, default: {} })
  private value!: DialogSheetAnswers;

  @Prop({ type: Boolean, default: false })
  private readMode!: boolean;

  private reservationId!: number;
  private valid = false;

  private answerData: object = {};

  scrollTo(invalidFields: object): void {
    let firstInvalidField = "";

    // 最初にバリデーション対象となっている項目を特定するための処理
    this.template.templateGroups.forEach((group) => {
      if (firstInvalidField !== "") return;
      group.templateItems.forEach((item) => {
        if (firstInvalidField !== "") return;
        if (Object.keys(invalidFields).includes(item.key)) {
          firstInvalidField = item.key;
        }
      });
    });
    VueScrollTo.scrollTo("#" + firstInvalidField, 2000, {easing: 'linear'});
  }

  get submitData(): DialogSheetAnswers {
    return this.value;
  }

  set submitData(v: DialogSheetAnswers) {
    this.$emit("input", v);
  }

  private isRequired(key: string): boolean {
    return this.validateRules[key] && this.validateRules[key].required;
  }

  get validateRules(): ValidateRules {
    const validateRules: ValidateRules = {};

    // see https://element.eleme.io/#/en-US/component/form#validation
    // 全共通デフォルト
    const defaultValidateRule = { required: true, message: "※必須項目です" };
    // タイプ別デフォルト
    const defaultValidateRulesByType: ValidateRules = {
      "radio-6": { type: "number", min: 1, max: 6, message: "※値が不正です" },
      'sortable-choice': { type: 'array', message: '※値が不正です' },
      sortable: { type: "array", message: "※値が不正です" },
      slider: { type: "number", min: 0, max: 10, message: "※値が不正です" },
      checkbox: { type: "array", message: "※値が不正です" },
    };
    this.template.templateGroups.forEach((group) => {
      group.templateItems.forEach((item) => {
        let validation: ValidateRules = Object.assign({}, defaultValidateRule);
        if (defaultValidateRulesByType[item.type]) {
          validation = Object.assign(defaultValidateRulesByType[item.type], validation);
        }
        if (item.validation) {
          // TODO: 必須の上書き前提なので、別のルール組みたいときはロジックを変える
          Object.assign(validation, item.validation);
        }
        validateRules[item.key] = validation;
      });
    });

    return validateRules;
  }
  private onChangeData(key: string, value: DialogSheetAnswer, componentName: string): void {
    if (componentName === "form-radio-6" || componentName === 'form-radio-11') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const itemEl: any = this.$refs[key] as any;
      if (itemEl) itemEl[0].clearValidate();
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  get validate(): {(callback: ValidateCallback): void} {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this.$refs.myForm as any).validate;
  }
  // TODO: 動作が正しいかチェック
  private getFirstValueOfArray<T>(array: T[]|T): T|string {
    if (!array||!Array.isArray(array)) return "";
    return array[0];
  }
  // TODO: コンポーネント化
  private checkCondition(condition: Condition): boolean {
    if (!condition.key || !condition.method) {
      return false;
    }
    switch (condition.method) {
    case "equal":
      if (this.submitData[condition.key] === condition.value) {
        return true;
      }
      break;
    case "smaller":
      if (this.submitData[condition.key] < condition.value) {
        return true;
      }
      break;
    case "bigger":
      if (this.submitData[condition.key] > condition.value) {
        return true;
      }
      break;
    case "first_equal":
      if (
        this.getFirstValueOfArray(this.submitData[condition.key]) ===
          condition.value
      ) {
        return true;
      }
      break;
    case "exist_value":
      if (this.submitData[condition.key]) {
        return true;
      }
      break;
    }
    return false;
  }
}
</script>
<style scoped lang="sass">
@import '../assets/sass/element-variables.sass'

.c-backLink
  color: #ccc
  margin-bottom: -20px
.el-form
  max-width: 700px
  margin: auto
pre
  white-space: pre-wrap
</style>
