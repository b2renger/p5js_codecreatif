// déclaration des variables dédiées aux sons
var kick1
var stab1

var drone1
var drone1FFT //cette variable va stocker un objet permettant d' effectuer une analyse audio sur le son 'drone1'

var stab2
var stab2Amp

var drone2
var drone2FFT

var harp
var harpAmp

var stab3

var seed

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
    seed = random(9999)

    // on créee un objet de type FFT (fast fourier transform) pour analyser l'énergie des bandes de fréquence de notre son
    drone1FFT = new p5.FFT(0.8, 16) // premier paramètre est le smoothing, le second est le nombre de bandes de fréquences souhaité.
    drone1FFT.setInput(drone1) // on 'branche' cet analyseur à notre son drone1.

    // on créée un objet de type Amplitude pour analyse le niveau sonore de notre son (comme dans l'exemple02)
    stab2Amp = new p5.Amplitude()
    stab2Amp.setInput(stab2) // on 'branche' cet analyseur à notre son drone1.

    // on créee un objet de type FFT (fast fourier transform) pour obtenir une représentation sous forme de waveform.
    drone2FFT = new p5.FFT(0.9, 2048)
    drone2FFT.setInput(drone2) // on 'branche' cet analyseur à notre son drone2


    harpAmp = new p5.Amplitude()
    harpAmp.setInput(harp)
    harpAmp.toggleNormalize()

}


function draw() {

    background(180)
    noStroke()
    randomSeed(seed)

    playSound(stab2, 82) //'r' == stab2
    if (stab2.isPlaying() == true) { // si le son joue on affiche notre animation.
        push() // pousser un nouveau référentiel de coordonnées et de style (pour éviter que nos changements n'affectent le reste de nos dessin)
        var amp = stab2Amp.getLevel() // obtenir le niveau sonore à l'aide de notre analyseur et le stocker dans une variable nommée amp
        var whiteLevel = map(amp, 0, 1, 210, 255) // transformer 'amp' qui est comprise entre 0 et 1 en une nouvelle valeur entre 0 et 255
        // dessiner un carré blanc de la taille de notre fenêtre dont la teinte est contrôllé par whiteLevel qui dépend elle même du
        // niveau sonore de notre son en train de jouer.
        noStroke()
        fill(whiteLevel)
        rect(0, 0, width, height)
        pop()
    }

    playSound(kick1, 65); // 'a' == kick1
    if (kick1.isPlaying() == true) {
        push()
        var radius = map(kick1.currentTime(), 0, kick1.duration(), 50, width)
        fill(255, 220, 0)
        ellipse(width * 0.5, height * 0.5, radius, radius)
        pop()
    }

    playSound(stab1, 90); // 'z' == stab1
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

    playSound(drone1, 69); // 'e' == drone1
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

    playSound(drone2, 84) // 't' == drone2
    if (drone2.isPlaying() == true) {
        push()
        var waveform = drone2FFT.waveform();
        noFill();
        beginShape();
        stroke(150, 255, 225, 180); // waveform is mint
        strokeWeight(3);
        for (var i = 0; i < waveform.length; i++) {
            var x = map(i, 0, waveform.length, 0, width);
            var y = map(waveform[i], -.59, .59, 0, height);
            curveVertex(x, y);
           // ellipse(x, y, 10, 10)
        //    ellipse(x, y, 7, 7)
        }
        endShape();
        pop()
    }

    playSound(harp, 89) // 'y' == harp
    if (harp.isPlaying() == true) {
        push()
        colorMode(HSB, 360, 100, 100, 100)
        var lvl = harpAmp.getLevel() * 255;
        var nsegment = 96
        var teta = (map(harp.currentTime(), 0, harp.duration(), 0, nsegment + 10))
        strokeWeight(4)
        for (var i = 0; i < teta; i++) {
            var h = map(i, 0, nsegment, 0, 320)
            // fill(h, 40, 100)
            stroke(h, 45, 100, lvl)
            var angle = map(i, 0, nsegment, 0, TWO_PI);
            var x = width * 0.5 + height * 0.45 * cos(angle)
            var y = height * 0.5 + height * 0.45 * sin(angle)
            line(width * 0.5, height * 0.5, x, y)
        }
        pop()
    }

    playSound(stab3, 85) // 'u' == stab3
    if (stab3.isPlaying() == true) {
        var xpos = []
        var ypos = []
        var xtarget = []
        var ytarget = []
        for (var i = 0; i < 50; i++) {
            xpos.push(random(0, width))
            ypos.push(random(0, -height))
            xtarget.push(random(width))
            ytarget.push(random(height))
        }
        var t = map(stab3.currentTime(), 0, stab3.duration() / 1.5, 0, 1)
        var grey = map(stab3.currentTime(), stab3.duration() / 1.5, stab3.duration() , 255,  180)
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
        seed = random(9999)
    }

}


function windowResized() {

    resizeCanvas(windowWidth, windowHeight);

}
