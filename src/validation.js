class validation {
  // varibles
  formElement;
  defaultOptions = {
    lazy: false,
    required: true,
    validStyle: null,
    invalidStyle: null,
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
      validStyle: this._option_(option, "validStyle"),
      invalidStyle: this._option_(option, "invalidStyle"),
      valid: false,
    };

    this.emailValidation.push(item);
  }
  // init the events
  init() {
    // add submit event to form
    this.formElement.addEventListener("submit", (e) => {
      // remove default event and send falsy validation events
      let notValidYet = false;
      this.emailValidation.forEach((item) => {
        if (item.valid == false) {
          notValidYet = true;
          item.element.dispatchEvent(this.validitionFalseEvent);
        }
      });
      if (notValidYet) {
        e.preventDefault();
        this.formElement.dispatchEvent(this.validitionFalseEvent);
      }
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
        );
    };
    this.emailValidation.forEach((item) => {
      // varibles
      const element = item.element;
      const lazy = item.lazy;
      const required = item.required;
      // edd event to input
      element.addEventListener(lazy ? "focusout" : "input", () => {
        const testValidEmail = validateEmail(element.value);
        if (testValidEmail || (!element.value.length && !required)) {
          // add style
          if (item.validStyle) {
            element.classList.remove(item.invalidStyle);
            element.classList.add(item.validStyle);
          }
          // send event
          item.valid = true;
          const customEventSendin = {
            email: testValidEmail[0],
            username: testValidEmail[1],
            domainname: testValidEmail[5],
            topleveldomain: testValidEmail[5].substring(
              testValidEmail[5].lastIndexOf(".") + 1
            ),
            secondleveldomain: testValidEmail[5].substring(
              0,
              testValidEmail[5].lastIndexOf(".")
            ),
          };
          console.log(testValidEmail);
          // console.log(customEventSendin);
          const validitionTrueEvent = new CustomEvent("validitiontrue", {
            detail: customEventSendin,
          });
          element.dispatchEvent(validitionTrueEvent);
        } else {
          // add style
          if (item.validStyle) {
            element.classList.remove(item.validStyle);
            element.classList.add(item.invalidStyle);
          }
          // send event
          item.valid = false;
          const validitionFalseEvent = new CustomEvent("validitionfalse");
          element.dispatchEvent(validitionFalseEvent);
        }
      });
    });
  }
}
