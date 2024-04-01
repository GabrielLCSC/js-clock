export default class Clock {
  constructor(scene) {
    this.scene = scene;
    this.context = scene.context;
    this.radius = (Math.min(this.scene.width, this.scene.height) / 2) * 0.9;
  }

  drawClock(
    clockSize,
    clockColor,
    hourHandColor,
    minuteHandColor,
    secondHandColor
  ) {
    this.context.clearRect(0, 0, this.scene.width, this.scene.height); // Effacer le canevas avant de redessiner

    this.context.save();
    this.context.translate(this.scene.width / 2, this.scene.height / 2);
    this.context.beginPath();
    this.context.arc(0, 0, this.radius, 0, 2 * Math.PI);
    this.context.strokeStyle = clockColor;
    this.context.lineWidth = clockSize;
    this.context.stroke();
    this.context.closePath();

    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI) / 6;
      const x = this.radius * Math.cos(angle);
      const y = this.radius * Math.sin(angle);
      this.context.beginPath();
      this.context.arc(x, y, 5, 0, 2 * Math.PI);
      this.context.fillStyle = "black";
      this.context.fill();
      this.context.closePath();
    }

    const now = new Date();
    const hour = now.getHours() % 12;
    const minute = now.getMinutes();
    const second = now.getSeconds();
    const hourAngle =
      (hour * Math.PI) / 6 +
      (minute * Math.PI) / (6 * 60) +
      (second * Math.PI) / (3600 * 12);
    this.drawHand(hourAngle, this.radius * 0.5, 6, hourHandColor);

    const minuteAngle =
      (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
    this.drawHand(minuteAngle, this.radius * 0.8, 4, minuteHandColor);

    const secondAngle = (second * Math.PI) / 30;
    this.drawHand(secondAngle, this.radius * 0.8, 2, secondHandColor);

    this.context.restore();
  }

  drawHand(angle, length, width, color) {
    this.context.save();
    this.context.rotate(angle);
    this.context.beginPath();
    this.context.moveTo(0, 0);
    this.context.lineTo(0, -length);
    this.context.strokeStyle = color;
    this.context.lineWidth = width;
    this.context.stroke();
    this.context.restore();
  }
}
