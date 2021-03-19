"use strict"
class ClockControllerButtons {
  constructor() {
    this.field = null;
    this.model = null;
  }

  start(field, model) {
    this.field = field;
    this.model = model;

    let btn = field.querySelectorAll("button");
    for(let i = 0; i < btn.length; i++) {
      (btn[i].innerHTML === "Start") ?
      btn[i].addEventListener("click", this.startClock.bind(this)) :
      btn[i].addEventListener("click", this.stopClock.bind(this));
    }
  }

  stopClock() {
    this.model.updateView(false);
  }

  startClock() {
    this.model.updateView(true);
  }
} 

