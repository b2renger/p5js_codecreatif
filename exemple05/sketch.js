// animation 1 - "a"
var kick1
// animation 2 - "z"
var stab1
// animation 3 - "e"
var drone1
var drone1FFT
// animation 4 - "r"
var stab2
var stab2Amp
// animation 5 - "t"
var drone2
var drone2FFT
// animation 6 - "y"
var harp
var harpAmp
// animation 7 - "u"
var stab3
var xpos = []
var ypos = []
var xtarget = []
var ytarget = []


function preload() {

    kick1 = loadSound("../assets/11581__snapper4298__human-beatbox/183384__snapper4298__hit-hat-looper.wav")
    stab1 = loadSound("../assets/137__jovica__stab-pack-01/2345__jovica__stab-020-mastered-16-bit.wav")
    drone1 = loadSound("../assets/217490__jarredgibb__drone-002.wav")
    stab2 = loadSound("../assets/137__jovica__stab-pack-01/2330__jovica__stab-005-mastered-16-bit.wav")
    drone2 = loadSound("../assets/25809__insinger__cluster1-2.wav")
    harp = loadSound("../assets/436128__cunningar0807__harp-glissando-up-edit.wav")
    stab3 = loadSound("../assets/137__jovica__stab-pack-01/2341__jovica__stab-016-mastered-16-bit.wav")
}


function setup() {

    createCanvas(windowWidth, windowHeight);
    background(0);

    // connexion de l'analyseur pour l'animation 3
    drone1FFT = new p5.FFT(0.8, 16)
    drone1FFT.setInput(drone1)

    // connexion de l'analyseur pour l'animation 4
    stab2Amp = new p5.Amplitude()
    stab2Amp.setInput(stab2)

    // connexion de l'analyseur pour l'animation 5
    drone2FFT = new p5.FFT(0.9, 2048)
    drone2FFT.setInput(drone2)

    // connexion de l'analyseur pour l'animation 6
    harpAmp = new p5.Amplitude()
    harpAmp.setInput(harp)
    harpAmp.toggleNormalize()

    // initialisation de tableaux pour l'animation 7
    for (var i = 0; i < 50; i++) {
        xpos.push(random(0, width))
        ypos.push(random(0, -height))
        xtarget.push(random(width))
        ytarget.push(random(height))
    }

}


function draw() {

    background(180)
    noStroke()

    playSound(stab2, 82) //'r' == stab2 / animation 4
    if (stab2.isPlaying() == true) {
        push()
        var amp = stab2Amp.getLevel()
        var whiteLevel = map(amp, 0, 1, 210, 255)
        noStroke()
        fill(whiteLevel)
        rect(0, 0, width, height)
        pop()
    }

    playSound(kick1, 65); // 'a' == kick1 / animation 1
    if (kick1.isPlaying() == true) {
        push()
        var radius = map(kick1.currentTime(), 0, kick1.duration(), 50, width)
        fill(255, 220, 0)
        ellipse(width * 0.5, height * 0.5, radius, radius)
        pop()
    }

    playSound(stab1, 90); // 'z' == stab1 / animation 2
    if (stab1.isPlaying() == true) {
        push()
        var rotation = map(stab1.currentTime(), 0, stab1.duration(), 0, PI)
        fill(255, 180, 180)
        rectMode(CENTER)
        translate(width * 0.5, height * 0.5)
        rotate(rotation)
        rect(0, 0, width * 0.5, width * 0.05)
        pop()
    }

    playSound(drone1, 69); // 'e' == drone1 / animation 3
    if (drone1.isPlaying() == true) {
        push()
        drone1FFT.analyze();
        rectMode(CENTER);
        var nrj1 = drone1FFT.getEnergy("bass")

        push()
        fill(0, 200, 255, nrj1)
        translate(width * 0.25, height * 0.5)
        rotate(PI / 4)
        rect(0, 0, width * 0.2, width * 0.2)
        pop()

        push()
        fill(0, 200, 255, 50)
        translate(width * 0.5, height * 0.5)
        rotate(PI / 4)
        rect(0, 0, nrj1, nrj1)
        pop()

        push()
        fill(0, 200, 255, nrj1)
        translate(width * 0.75, height * 0.5)
        rotate(PI / 4)
        rect(0, 0, width * 0.2, width * 0.2)
        pop()

        pop()
    }

    playSound(drone2, 84) // 't' == drone2 / animation 5
    if (drone2.isPlaying() == true) {
        push()
        var waveform = drone2FFT.waveform();
        noFill();
        beginShape();
        stroke(150, 255, 225, 180);
        strokeWeight(3);
        for (var i = 0; i < waveform.length; i++) {
            var x = map(i, 0, waveform.length, 0, width);
            var y = map(waveform[i], -.59, .59, 0, height);
            curveVertex(x, y);
        }
        endShape();
        pop()
    }

    playSound(harp, 89) // 'y' == harp / animation 6
    if (harp.isPlaying() == true) {
        push()
        colorMode(HSB, 360, 100, 100, 100)
        var lvl = harpAmp.getLevel() * 200;
        var nsegment = 96
        var ncurrentsegment = (map(harp.currentTime(), 0, harp.duration(), 0, nsegment + 10))
        strokeWeight(4)
        for (var i = 0; i < ncurrentsegment; i++) {
            var h = map(i, 0, nsegment, 0, 320)
            stroke(h, 45, 100, lvl + 55)
            var angle = map(i, 0, nsegment, 0, TWO_PI);
            var x = width * 0.5 + height * 0.45 * cos(angle)
            var y = height * 0.5 + height * 0.45 * sin(angle)
            line(width * 0.5, height * 0.5, x, y)
        }
        pop()
    }

    playSound(stab3, 85) // 'u' == stab3 / animation 7
    if (stab3.isPlaying() == true) {
        var t = map(stab3.currentTime(), 0, stab3.duration() * 0.75, 0, 1)
        var grey = map(stab3.currentTime(), stab3.duration() * 0.75, stab3.duration(), 255, 180)
        t = constrain(t, 0, 1)
        grey = constrain(grey, 180, 255)
        push()
        fill(grey)
        for (var i = 0; i < 50; i++) {
            var x = lerp(xpos[i], xtarget[i], t)
            var y = lerp(ypos[i], ytarget[i], t)
            ellipse(x, y, 50, 50)
        }
        pop()
    }



}


function playSound(sound, keyId) {
    if (keyIsDown(keyId) == true && sound.isPlaying() == false) {
        sound.play();
    }

}


function windowResized() {

    resizeCanvas(windowWidth, windowHeight);

}
