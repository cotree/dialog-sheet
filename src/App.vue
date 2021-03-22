<template>
  <div>
    <dialog-sheet
      ref="dialogSheet"
      v-model="answer"
      :template="formTemplate"
    />
    <button
      style="display: block;margin: 20px auto;height: 30px;width: 200px;"
      @click="onClick"
    >
      送信
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DialogSheet from '@/components/DialogSheet.vue';
import example from './assets/templates/example';

@Component({
  components: { DialogSheet },
})
export default class Sample extends Vue {
  private formTemplate!: Template
  private answer = {}
  private isDialogSheetValid = true;

  private created(): void {
    this.formTemplate = example;
  }

  private async validateCheck(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.isDialogSheetValid = await new Promise(
      (this.$refs.dialogSheet as DialogSheet).validate
    );
  }

  private async onClick(): Promise<void> {
    await this.validateCheck();
    if (this.isDialogSheetValid) {
      alert(JSON.stringify(this.answer));
    } else {
      alert('Validation Error');
    }
  }
}
</script>
