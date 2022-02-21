class validation {
  // varibles
  formElement;
  defaultOptions = {
    lazy: true,
    required: true,
  };
  in;
  // constructor
  constructor(form) {
    this.formElement = this._$_(form);
  }
  // email validate
  // email(inputId, option) {}
  // select element method
  _$_(selector) {
    if (typeof selector === "string") {
      return document.querySelector(selector);
    } else {
      return selector;
    }
  }
}
