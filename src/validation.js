class validation {
  // varibles
  formElement;
  // constructor
  constructor(formId) {
    this.formElement = this._$_(formId);
  }
  // get element method by id
  _$_(id) {
    return document.getElementById(id);
  }
}
