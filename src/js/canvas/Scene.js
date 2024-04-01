import * as dat from "dat.gui";
import GlobalContext from "../GlobalContext";
import DomElement from "../utils/DomElement";
import Clock from "../utils/Clock";

export default class Scene {
  constructor(id = "canvas-scene") {
    this.globalContext = new GlobalContext();

    this.params = {
      clockColor: "#000000",
      clockSize: 2,
      hourHandColor: "red",
      minuteHandColor: "blue",
      secondHandColor: "green",
    };
    this.debug = this.globalContext.debug;

    this.domElement = new DomElement(id);
    this.canvas = this.domElement.instance;
    this.canvas.width = this.domElement.width;
    this.canvas.height = this.domElement.height;
    this.context = this.canvas.getContext("2d");

    this.clock = new Clock(this);

    this.setupGUI();

    this.startClockUpdate();
  }

  updateClock() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.clock.drawClock(
      this.params.clockSize,
      this.params.clockColor,
      this.params.hourHandColor,
      this.params.minuteHandColor,
      this.params.secondHandColor
    );
  }

  startClockUpdate() {
    this.updateClock();

    setInterval(() => {
      this.updateClock();
    }, 1000);
  }

  setupGUI() {
    const gui = new dat.GUI();
    gui.addColor(this.params, "clockColor").onChange(() => this.updateClock());
    gui.add(this.params, "clockSize", 1, 40).onChange(() => this.updateClock());
    gui
      .addColor(this.params, "hourHandColor")
      .onChange(() => this.updateClock());
    gui
      .addColor(this.params, "minuteHandColor")
      .onChange(() => this.updateClock());
    gui
      .addColor(this.params, "secondHandColor")
      .onChange(() => this.updateClock());
  }

  get width() {
    return this.domElement.width;
  }

  get height() {
    return this.domElement.height;
  }

  get position() {
    return this.domElement.position;
  }
}
