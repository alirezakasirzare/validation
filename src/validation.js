class validation {
  // varibles
  formElement;
  defaultOptions = {
    lazy: true,
    required: true,
  };
  emailValidation = [];
  // constructor
  constructor(form) {
    this.formElement = this._$_(form);
  }
  // email validate
  email(input, option = {}) {
    const item = {
      element: this._$_(input),
      lazy: this._option_(option, "lazy"),
      required: this._option_(option, "required"),
    };

    this.emailValidation.push(item);
  }
  // init the events
  init() {
    this.formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    // this.emailValidation.forEach(item=>{
    // })
  }
  // select element method
  _$_(selector) {
    if (typeof selector === "string") {
      return document.querySelector(selector);
    } else {
      return selector;
    }
  }
  // get custom option
  _option_(option, item) {
    // console.log(item in option);
    return item in option ? option[item] : this.defaultOptions[item];
  }
}
