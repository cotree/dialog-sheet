<template lang="pug">
.form-sortable(:disabled='disabled')
  draggable(
    v-model="myListArray" 
    group="people" 
    @start="drag=true" 
    @end="drag=false" 
    @change="checkMove" 
    :animation="300" 
    ghost-class="ghost" 
    :disabled='disabled'
  )
    transition-group(type="transition" name='flip-list')
      .form-sortable__item(v-for="(element, idx) in myListArray" :key="element.id" :class='`form-sortable__rank-${idx}`')
        span.form-sortable__number {{ idx+1 }}
        span.form-sortable__content {{ element.label }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import draggable from "vuedraggable";
interface ListItem {
  id: number;
  label: string;
}
@Component({
  components: {
    draggable,
  },
})
export default class FormSortable extends Vue {
  @Prop() private listArray!: ListItem[];
  private myListArray: ListItem[] = this.listArray;

  @Prop() private value!: number[];
  get myValue(): number[] {
    return this.value;
  }
  set myValue(newValue) {
    this.$emit("input", newValue);
  }
  @Prop({ default: false }) private disabled!: boolean;

  private created(): void {
    if (this.value && this.value.length > 0) {
      const myListArray: ListItem[] = [];
      this.value.forEach((id) => {
        const listItem = this.myListArray.find(
          (item) => item.id === id
        ) as ListItem;
        myListArray.push(listItem);
      });
      this.myListArray = myListArray;
    }
    this.setMyValue();
  }

  private checkMove(val: any): void {
    this.setMyValue();
  }
  private setMyValue(): void {
    this.myValue = this.myListArray.map((item) => item.id);
  }
}
</script>
<style scoped lang="sass">
@import '@/assets/sass/element-variables.sass'
.form-sortable
  &__item
    margin-bottom: 2px
    padding: 2px 15px 0
    border-radius: 3px
    box-shadow: 0 1px 2px rgba($--color-primary,0.4)
    vertical-align: middle
    display: flex
    align-items: center
    cursor: grab
    padding: 10px 12px 8px
    color: #fff
    background-color: rgba($--color-primary,0.6)
    transition: opacity .1s
    &:hover
      opacity: 0.9
    &.sortable-chosen
      cursor: grabbing
  &__content
    line-height: 1.5
    flex: 1
    padding-left: 10px
  &__number
    display: inline-block
    color: #fff
    height: 15px
    width: 15px
    line-height: 1.0
    border-radius: 5px
    text-align: center
    padding-top: 2px
    font-weight: bold
    border: 1px solid #fff
  &__rank-0
    background-color: rgba($--color-primary,1)
    .form-sortable__number
      background-color: #fff
      color: rgba($--color-primary,1)
  &__rank-1
    background-color: rgba($--color-primary,0.9)
  &__rank-2
    background-color: rgba($--color-primary,0.8)
  &__rank-3
    background-color: rgba($--color-primary,0.7)

.form-sortable[disabled]
  .form-sortable__item
    cursor: not-allowed
    &:hover
      opacity: 1

//transition
// .flip-list-move
//   transition: transform 0.5s
// .no-move
//   transition: transform 0s
// .ghost
//   opacity: 0.5
//   background: rgba($--color-primary,0.3)
</style>
