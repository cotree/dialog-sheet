interface Condition {
  key: string;
  method: string;
  value: string | number | boolean;
}

interface Template {
  id: string;
  title: string;
  detail?: string;
  templateGroups: TemplateGroup[];
}

interface TemplateGroup {
  key: string;
  title?: string;
  detail?: string;
  templateItems: TemplateItem[];
  condition?: Condition;
}

interface TemplateItem {
  key: string;
  type: string;
  title?: string;
  detail?: string;
  listArray?: object;
  labels?: string[];
  placeholder?: string;
  hideButton?: string;
  condition?: Condition;
  styleType?: string;
  validation?: object;
}

type DialogSheetAnswer = string | number | boolean | string[] | number[];

interface DialogSheetAnswers {
  [x: string]: DialogSheetAnswer;
}