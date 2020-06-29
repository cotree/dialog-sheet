import Vue from "vue";
import DialogSheet from "../src/components/DialogSheet.vue";

const Components = {
  DialogSheet,
};

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name]);
});

export default Components;
