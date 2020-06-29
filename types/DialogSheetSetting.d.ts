declare interface DialogSheetSetting {
  apiUrl: string;
  getPath: string;
  postPath: string;
  postKeys?: string;
  finishBtnUrl: string;
  enableDeviseTokenSetter: boolean;
  isRequireAuthorization: boolean;
  signInUrl: string;
}

interface Window {
  DialogSheetSetting?: DialogSheetSetting;
}
