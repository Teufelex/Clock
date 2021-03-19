"use strict"
class ClockViewSVG {
  constructor(size, value) {
    this.model = null;
    this.size = size;
    this.radius = size / 2;
    this.numberSize = size / 8;
    this.hours = 12;
    this.delta = Math.PI * 2 / 12;
    this.clock = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.hour = null;
    this.minute = null;
    this.second = null;
    this.time = null;
    this.hourArrow = document.createElementNS("http://www.w3.org/2000/svg",'line');
    this.minArrow = document.createElementNS("http://www.w3.org/2000/svg",'line');
    this.secArrow = document.createElementNS("http://www.w3.org/2000/svg",'line');
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
    let circle = document.createElementNS("http://www.w3.org/2000/svg",'circle');

    this.clock.position = "relative";

    circle.setAttribute("cx", `${this.radius}`);
    circle.setAttribute("cy", `${this.radius}`);
    circle.setAttribute("r", `${this.radius}`);
    circle.setAttribute("stroke", `rgba(255, 255, 255, 0.959)`);
    circle.setAttribute("fill", `rgba(255, 255, 255, 0.959)`);

    this.clock.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    this.clock.setAttribute("width", `${this.size}`);
    this.clock.setAttribute("height", `${this.size}`);
    this.clock.appendChild(circle);
    document.body.appendChild(this.clock);

    this.getTimeModel();
    this.addHours();
    this.addTime();
    this.addArrows();
    this.makeWrapper();
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
    let cy = this.radius,
        cx = this.radius,
        numberRadius = this.numberSize / 2,
        numCircRad = this.radius * 0.8,
        delta = Math.PI * 2 / this.hours,
        angle = 0;

    for (let i = 0; i < this.hours; i++) {
      let circle = document.createElementNS("http://www.w3.org/2000/svg",'circle'),
      text = document.createElementNS("http://www.w3.org/2000/svg",'text'),
      x = cx + (numCircRad * Math.cos(angle)),
      y = cy + (numCircRad * Math.sin(angle)),
      textY = y + numberRadius / 2;

      text.innerHTML = (i <= 9) ? i + 3 : i - 9;
      text.setAttribute("x", `${x}`);
      text.setAttribute("y", `${textY}`);
      text.setAttribute("text-anchor", `middle`);
      text.style.fontSize = this.numberSize * 0.75;

      circle.setAttribute("cx", `${x}`);
      circle.setAttribute("cy", `${y}`);
      circle.setAttribute("r", `${numberRadius}`);
      circle.setAttribute("stroke", `rgba(0, 0, 0, 0.171)`);
      circle.setAttribute("fill", `rgba(0, 0, 0, 0.171)`);

      angle += this.delta;

      this.clock.appendChild(circle);
      this.clock.appendChild(text);
    }
  }

  addArrows() {
    let cy = this.radius,
        cx = this.radius,
        ny, 
        hourArrow = this.hourArrow,
        minArrow = this.minArrow,
        secArrow = this.secArrow,
        arr = [hourArrow, minArrow, secArrow],
        minAtHour = 60,
        secAtMin = 60,
        heightFromRad = 0.2,
        numCircRad,
        deltaHour = Math.PI * 2 / this.hours,
        deltaMin = Math.PI * 2 / minAtHour,
        deltaSec = Math.PI * 2 / secAtMin;


    hourArrow.setAttribute("stroke-width", `${this.radius / 10}`);
    minArrow.setAttribute("stroke-width", `${this.radius / 15}`);
    secArrow.setAttribute("stroke-width", `${this.radius / 30}`);

    hourArrow.classList.add("clock__arrow--hour");
    minArrow.classList.add("clock__arrow--min");
    secArrow.classList.add("clock__arrow--sec");

    arr.forEach(b => {
      heightFromRad += 0.2;
      numCircRad = this.radius * heightFromRad;
      ny = cy - numCircRad;

      b.setAttribute("x1", `${cx}`);
      b.setAttribute("x2", `${cx}`);
      b.setAttribute("y1", `${cy}`);
      b.setAttribute("y2", `${ny}`);
      b.setAttribute("stroke", "black");
      b.setAttribute("stroke-linecap", "round");
      b.style.transformOrigin = `${cx}px ${cy}px`;
    });

    this.clock.appendChild(hourArrow);
    this.clock.appendChild(minArrow);
    this.clock.appendChild(secArrow);
  }

  rotateArrows() {
    this.hourArrow.style.transform = `rotate(${this.hour * (360 / 12) + (360 / 12 / 60 * this.minute)}deg)`;
    this.minArrow.style.transform = `rotate(${this.minute * (360 / 60)}deg)`;
    this.secArrow.style.transform = `rotate(${this.second * (360 / 60)}deg)`;
  }

  addTime() {
    let cy = this.radius,
        cx = this.radius,
        timer = document.createElementNS("http://www.w3.org/2000/svg",'text');
        
    cy -= this.radius / 4;

    timer.innerHTML = this.time;
    timer.style.fontSize = this.numberSize * 0.75;
    timer.setAttribute("text-anchor", `middle`);
    timer.setAttribute("x", `${cx}`);
    timer.setAttribute("y", `${cy}`);
    timer.classList.add("clock__timer");

    this.clock.appendChild(timer);
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

