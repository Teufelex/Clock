"use strict"
class ClockViewCANVAS {
  constructor(size, value) {
    this.model = null;
    this.size = size;
    this.radius = size / 2;
    this.numberSize = size / 8;
    this.hours = 12;
    this.delta = Math.PI * 2 / 12;
    this.cvs = document.createElement("canvas");
    this.clock = null;
    this.hour = null;
    this.minute = null;
    this.second = null;
    this.time = null;
    this.val = value;
    this.wr = null;
    this.timer = 0;
  }

  start(model) {
    this.clock = this.cvs.getContext('2d');
    this.model = model;
    this.cvs.style.position = "relative";
    this.cvs.width = this.size;
    this.cvs.height = this.size;
    this.makeWrapper();
  }

  getTimeModel() {
    let val = this.model.updateTime();
    this.hour = val.hour;
    this.minute = val.minute;
    this.second = val.second;
    this.time = val.time;
  }

  makeClock() {
    this.clock.strokeStyle = "white";
    this.clock.fillStyle = "white";
    this.clock.beginPath();
    this.clock.arc(this.radius, this.radius, this.radius, 0, Math.PI*2, false);
    this.clock.fill();

    this.getTimeModel();
    this.addHours();
    this.addTime();
    this.addArrows();
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
    this.wr.appendChild(this.cvs);
    document.body.appendChild(this.wr);
  }

  addHours() {
    let numberRadius = this.numberSize / 2,
        numCircRad = this.radius * 0.8,
        delta = Math.PI * 2 / this.hours,
        angle = 0,
        x, y;

    for (let i = 0; i < this.hours; i++) {
      x = this.radius + (numCircRad * Math.cos(angle));
      y = this.radius + (numCircRad * Math.sin(angle));

      this.clock.fillStyle = "rgba(0, 0, 0, 0.171)";
      this.clock.textAlign = "center";
      this.clock.beginPath();
      this.clock.arc(x, y, numberRadius, 0, Math.PI*2, false);
      this.clock.fill();

      this.clock.fillStyle = "black";
      this.clock.font = `${this.numberSize * 0.75}px Times New Roman`;
      this.clock.fillText(`${(i <= 9) ? i + 3 : i - 9}`, x, y + numberRadius / 2);

      angle += this.delta;
    }
  }

  addArrows() {
    let nx, ny, 
    minAtHour = 60,
    secAtMin = 60,
    numCircRad = this.radius * 0.4,
    deltaHour = Math.PI * 2 / this.hours,
    deltaMin = Math.PI * 2 / minAtHour,
    deltaSec = Math.PI * 2 / secAtMin,
    degToRad90 = 1.57,
    angle = 0;

    this.clock.strokeStyle = "black";
    this.clock.fillStyle = "black";
    this.clock.lineWidth = `${this.radius / 10}`;
    this.clock.lineCap='round';

    angle = deltaHour * (this.hour + 1 / (minAtHour / this.minute)) - degToRad90;
    nx = this.radius + (numCircRad * Math.cos(angle));
    ny = this.radius + (numCircRad * Math.sin(angle));

    this.clock.beginPath();
    this.clock.moveTo(this.radius, this.radius);
    this.clock.lineTo(nx, ny);
    this.clock.stroke();

    this.clock.lineWidth = `${this.radius / 15}`;

    angle = deltaMin * this.minute - degToRad90;
    numCircRad = this.radius * 0.6;
    nx = this.radius + (numCircRad * Math.cos(angle));
    ny = this.radius + (numCircRad * Math.sin(angle));

    this.clock.beginPath();
    this.clock.moveTo(this.radius, this.radius);
    this.clock.lineTo(nx, ny);
    this.clock.stroke();

    this.clock.lineWidth = `${this.radius / 30}`;

    angle = deltaMin * this.second - degToRad90;
    numCircRad = this.radius * 0.8;
    nx = this.radius + (numCircRad * Math.cos(angle));
    ny = this.radius + (numCircRad * Math.sin(angle));

    this.clock.beginPath();
    this.clock.moveTo(this.radius, this.radius);
    this.clock.lineTo(nx, ny);
    this.clock.stroke();
  }

  addTime() {
    let cy = this.radius;
    cy -= this.radius / 4;

    this.clock.fillStyle = "black";
    this.clock.font = `${this.numberSize * 0.75}px Times New Roman`;
    this.clock.fillText(`${this.time}`, this.radius, cy);
    this.clock.textAlign = "center";
  }

  setTimer() {
    this.stopTimer();
    this.makeClock();
    this.timer = setInterval(() => {this.makeClock()}, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
    this.timer = 0;
  }

  getField() {
    return this.wr;
  }
}


