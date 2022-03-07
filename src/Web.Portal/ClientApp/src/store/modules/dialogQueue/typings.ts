export interface DialogQueueState {
  option: Options;
  queue: Options[];
  visible: boolean;
}

export interface Options {
  payload: Payload;
  setting: Setting;
}

export interface Payload {
  title: string;
  subTitle: string;
  msg: string;
  closeAction: Function | undefined;
  buttons: Button[];
}

export interface Button {
  title: string;
  action: Function;
}

export interface Setting {
  titleAlign: string;
  contentClass: string;
  hideOverlay: boolean;
  noBodyPadding: boolean;
  separator: boolean;
  persistent: boolean;
  noClickAnimation: boolean;
  hideCloseButton: boolean;
  hideActionButtons: boolean;
  maxWidth: string | number;
  width: string | number;
  closeOnClickOutside: boolean;
}
