"use strict"
const CLOCK_MINSK_DOM = new Clock(3);
const ViewDOMMinsk = new ClockViewDOM(250, "Минск (GMT+3)");
const CTR_MINSK = new ClockControllerButtons();
CLOCK_MINSK_DOM.start(ViewDOMMinsk);
ViewDOMMinsk.start(CLOCK_MINSK_DOM);
ViewDOMMinsk.makeClock();
CTR_MINSK.start(ViewDOMMinsk.getField(), CLOCK_MINSK_DOM);

const CLOCK_NY_DOM = new Clock(-5);
const ViewDOMNY = new ClockViewDOM(250, "Нью-Йорк (GMT-5)");
const CTR_NY = new ClockControllerButtons();
CLOCK_NY_DOM.start(ViewDOMNY);
ViewDOMNY.start(CLOCK_NY_DOM);
ViewDOMNY.makeClock();
CTR_NY.start(ViewDOMNY.getField(), CLOCK_NY_DOM);

const CLOCK_LONDON_SVG = new Clock(0);
const ViewSVGLondon = new ClockViewSVG(250, "Лондон (GMT)");
const CTR_LONDON = new ClockControllerButtons();
CLOCK_LONDON_SVG.start(ViewSVGLondon);
ViewSVGLondon.start(CLOCK_LONDON_SVG);
ViewSVGLondon.makeClock();
CTR_LONDON.start(ViewSVGLondon.getField(), CLOCK_LONDON_SVG);

const CLOCK_TOKIO_SVG = new Clock(9);
const ViewSVGTokio = new ClockViewSVG(250, "Токио (GMT+9)");
const CTR_TOKIO = new ClockControllerButtons();
CLOCK_TOKIO_SVG.start(ViewSVGTokio);
ViewSVGTokio.start(CLOCK_TOKIO_SVG);
ViewSVGTokio.makeClock();
CTR_TOKIO.start(ViewSVGTokio.getField(), CLOCK_TOKIO_SVG);

const CLOCK_BERLIN_CVS = new Clock(1);
const ViewCVSBerlin = new ClockViewCANVAS(250, "Берлин (GMT+1)");
const CTR_BERLIN = new ClockControllerButtons();
CLOCK_BERLIN_CVS.start(ViewCVSBerlin);
ViewCVSBerlin.start(CLOCK_BERLIN_CVS);
ViewCVSBerlin.setTimer();
CTR_BERLIN.start(ViewCVSBerlin.getField(), CLOCK_BERLIN_CVS);


const CLOCK_VLADI_CVS = new Clock(10);
const ViewCVSVladi = new ClockViewCANVAS(250, "Владивосток (GMT+10)");
const CTR_VLADI = new ClockControllerButtons();
CLOCK_VLADI_CVS.start(ViewCVSVladi);
ViewCVSVladi.start(CLOCK_VLADI_CVS);
ViewCVSVladi.setTimer();
CTR_VLADI.start(ViewCVSVladi.getField(), CLOCK_VLADI_CVS);