"use strict"
class ClockViewDOM {
  constructor(size, value) {
    this.model = null;
    this.size = size;
    this.radius = size / 2;
    this.numberSize = size / 8;
    this.hours = 12;
    this.delta = Math.PI * 2 / 12;
    this.clock = document.createElement("div");
    this.hour = null;
    this.minute = null;
    this.second = null;
    this.time = null;
    this.hourArrow = document.createElement("div");
    this.minArrow = document.createElement("div");
    this.secArrow = document.createElement("div");
    this.val = value;
    this.wr = null;
    this.timer = 0;
  }

  start(model) {
    this.model = model;
  }

  getTimeModel() {
    let val = this.model.updateTime();
    this.hour = val.hour;
    this.minute = val.minute;
    this.second = val.second;
    this.time = val.time;
  }

  makeClock() {
    this.clock.innerHTML = "";
    this.clock.classList.add("clock");
    this.clock.style.width = `${this.size}px`;
    this.clock.style.height = `${this.size}px`;

    this.getTimeModel();
    this.addHours();
    this.addTime();
    this.addArrows();
    this.makeWrapper();
    this.timerPos();
    this.rotateArrows();
    this.setTimer();
  }

  makeWrapper() {
    this.wr = document.createElement("div");
    let startBtn = document.createElement("button"),
        stopBtn = document.createElement("button"),
        span = document.createElement("span");

    startBtn.innerHTML = "Start";
    stopBtn.innerHTML = "Stop";
    span.innerHTML = this.val;

    this.wr.appendChild(startBtn);
    this.wr.appendChild(stopBtn);
    this.wr.appendChild(span);
    this.wr.appendChild(this.clock);
    document.body.appendChild(this.wr);
  }

  addHours() {
    let numberRadius = this.numberSize / 2,
        indent = this.radius - this.numberSize, 
        transition = this.radius - numberRadius, 
        angle = 0;
    
    for (let i = 0; i < this.hours; i++) {
      let hour = document.createElement("div");
      hour.classList.add("clock__number");
      hour.innerHTML = (i <= 9) ? i + 3 : i - 9;
      hour.style.position = 'absolute';
      hour.style.left =  indent * Math.cos(angle) + transition + 'px';
      hour.style.top = indent * Math.sin(angle) + transition + 'px';
      hour.style.width = this.numberSize + "px";
      hour.style.height = this.numberSize + "px";
      hour.style.fontSize = this.numberSize * 0.75 + "px";
      this.clock.appendChild(hour);

      angle += this.delta;
    }
  }

  addArrows() {
    let hourArrow = this.hourArrow;
    let minArrow = this.minArrow;
    let secArrow = this.secArrow;
    let arrowArr = [hourArrow, minArrow, secArrow];

    hourArrow.style.width = this.radius / 10 + "px";
    hourArrow.style.height = this.radius * 0.5 + "px";
    hourArrow.style.left = this.radius - (this.radius / 10) / 2 + "px";

    minArrow.style.width = this.radius / 15 + "px";
    minArrow.style.height = this.radius * 0.7 + "px";
    minArrow.style.left = this.radius - (this.radius / 15) / 2 + "px";

    secArrow.style.width = this.radius / 30 + "px";
    secArrow.style.height = this.radius * 0.9 + "px";
    secArrow.style.left = this.radius - (this.radius / 30) / 2 + "px";

    arrowArr.forEach(b => {
      let transformTrans = this.size / 20;
      b.classList.add("clock__arrow");
      b.style.top = this.radius - transformTrans + "px";
      b.style.transformOrigin = `center ${transformTrans}px`;
    });

    this.clock.appendChild(hourArrow);
    this.clock.appendChild(minArrow);
    this.clock.appendChild(secArrow);
  }

  rotateArrows() {
    this.hourArrow.style.transform = `rotate(${180 + this.hour * (360 / 12) + (360 / 12 / 60 * this.minute)}deg)`;
    this.minArrow.style.transform = `rotate(${180 + this.minute * (360 / 60)}deg)`;
    this.secArrow.style.transform = `rotate(${180 + this.second * (360 / 60)}deg)`;
  }

  addTime() {
    let wrapper = document.createElement("div");
    wrapper.classList.add("clock__timer");
    wrapper.style.fontSize = this.numberSize * 0.75 + "px";
    wrapper.innerHTML = this.time;

    this.clock.appendChild(wrapper);
  }

  timerPos() {
    let timer = this.clock.querySelector(".clock__timer"),
        timerWidth = timer.offsetWidth,
        timerHeight = timer.offsetWidth;
    
    timer.style.top = this.radius - timerHeight / 2 + "px";
    timer.style.left = this.radius - timerWidth / 2 + "px"; 
  }

  update() {
    this.getTimeModel();
    this.rotateArrows();
    this.clock.querySelector(".clock__timer").innerHTML = this.time;
  }

  setTimer() {
    this.stopTimer();
    this.update();
    this.timer = setInterval(() => {this.update()}, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
    this.timer = 0;
  }

  getField() {
    return this.wr;
  }
}

