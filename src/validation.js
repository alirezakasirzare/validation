class validation {
  // varibles
  formElement;
  defaultOptions = {
    lazy: true,
    required: true,
  };
  emailValidation = [];
  validitionTrueEvent = new CustomEvent("validitiontrue");
  validitionFalseEvent = new CustomEvent("validitionfalse");
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
      valid: false,
    };

    this.emailValidation.push(item);
  }
  // init the events
  init() {
    // add submit event to form
    this.formElement.addEventListener("submit", (e) => {
      // remove default event
      e.preventDefault();
    });
    // email validation init
    this.emailValidationInit();
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
    return item in option ? option[item] : this.defaultOptions[item];
  }
  // init the email validation
  emailValidationInit() {
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
        ? true
        : false;
    };
    this.emailValidation.forEach((item) => {
      // varibles
      const element = item.element;
      const lazy = item.lazy;
      const required = item.required;
      // edd event to input
      element.addEventListener(lazy ? "keyup" : "focusout", () => {
        if (validateEmail(element.value)) {
          element.dispatchEvent(this.validitionTrueEvent);
        } else {
          element.dispatchEvent(this.validitionFalseEvent);
        }
      });
    });
  }
}
