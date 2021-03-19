"use strict"
class Clock {
  constructor(timezone) {
    this.timezone = timezone;
    this.hour = 0;
    this.minute = 0;
    this.second = 0;
    this.time = "";
    this.view = null;
  }

  start(view) {
    this.view = view;
  }

  updateView(e) {
    (e) ? this.view.setTimer() : this.view.stopTimer();
  }

  updateTime() {
    let date = new Date(),
        hour, min, sec;
    this.hour = (date.getUTCHours() + this.timezone < 24) ?
    date.getUTCHours() + this.timezone :
    date.getUTCHours() + this.timezone - 24;
    this.hour = (this.hour < 0) ?
    24 + date.getUTCHours() + this.hour : this.hour;
    hour = (this.hour < 10) ? "0" + this.hour : this.hour;
    this.minute = date.getUTCMinutes();
    min = (this.minute < 10) ? "0" + this.minute : this.minute;
    this.second = date.getUTCSeconds();
    sec = (this.second < 10) ? "0" + this.second : this.second;

    this.time = `${hour} : ${min} : ${sec}`;
    return {
      hour: this.hour, 
      minute: this.minute, 
      second: this.second,
      time: this.time
    }
  }
}

