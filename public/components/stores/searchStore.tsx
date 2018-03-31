import {observable, action, createTransformer} from 'mobx';
import {computed} from "mobx/lib/mobx";

/**
 * Test class in order
 * to check typescript
 */
class RoomEditorStore {
  @observable inProgress: boolean = false;
  @observable errors: any = undefined;
  @observable isFloat: boolean = true;
  @observable text: string = '';
  @observable history = observable.map();
  @observable isFocused: boolean = false;
  @observable radioButtonType: string = "all";

  @action setText(text: string) {
    this.text = text;
  }

  @action setFloat(float: boolean) {
    this.isFloat = float;
  }

  @action setFocused(focused: boolean) {
    this.isFocused = focused;
  }

  @action addHistory(text: string) {
    this.history.set(text, text);
  }

  @action setRadioButtonEnabled(type: string) {
    this.radioButtonType = type;
  }


  @computed get historyArr() {
    return this.history.toJS();
  }

  isRadioButtonEnabled = createTransformer((type: string): boolean => {
    return this.radioButtonType === type;
  });
}

export default new RoomEditorStore();
