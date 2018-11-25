
function AnimateDrawing(xpos, ypos, speed) {

    this.time = 0
    this.segmentIndex = 0;
    this.speed = speed;
    this.pg = createGraphics(width, height)
    this.pg.pixelDensity(1)
    this.xpos = xpos;
    this.ypos = ypos;

    this.animateDrawing = function (col, w) {
        this.time += 1


        var d = dist(this.xpos[this.segmentIndex], this.ypos[this.segmentIndex], this.xpos[this.segmentIndex + 1], this.ypos[this.segmentIndex + 1])
        var res = 100
        var pointsInc = map(frameCount % this.speed, 0, this.speed - 1, 0, res)

        if (this.time % this.speed > this.speed - 2 && this.segmentIndex < this.xpos.length - 1) {
            this.segmentIndex += 1
        }

        this.pg.push()
        this.pg.translate(width / 2, height / 2)

        this.pg.stroke(col)
         this.pg.strokeWeight(w)

        var x = curvePoint(this.xpos[this.segmentIndex], this.xpos[this.segmentIndex], this.xpos[this.segmentIndex + 1], this.xpos[this.segmentIndex + 1], pointsInc / res)
        var y = curvePoint(this.ypos[this.segmentIndex], this.ypos[this.segmentIndex], this.ypos[this.segmentIndex + 1], this.ypos[this.segmentIndex + 1], pointsInc / res)


        this.pg.line(this.xpos[this.segmentIndex], this.ypos[this.segmentIndex], this.xpos[this.segmentIndex + 1], this.ypos[this.segmentIndex + 1])


        this.pg.pop()

        image(this.pg, 0, 0, width, height)

    }


    this.resetDrawing = function () {
        this.time = 0
        this.segmentIndex = 0
        this.pg = createGraphics(width, height)
        this.pg.pixelDensity(1)

    }



}
