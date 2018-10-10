// déclaration des variables dédiées aux sons
var kick1
var stab1

var drone1
var drone1FFT //cette variable va stocker un objet permettant d' effectuer une analyse audio sur le son 'drone1'

var stab2
var stab2Amp

var drone2
var drone2FFT



function preload() {

    kick1 = loadSound("../assets/11581__snapper4298__human-beatbox/183384__snapper4298__hit-hat-looper.wav")
    stab1 = loadSound("../assets/137__jovica__stab-pack-01/2345__jovica__stab-020-mastered-16-bit.wav")
    drone1 = loadSound("../assets/217490__jarredgibb__drone-002.wav")
    stab2 = loadSound("../assets/137__jovica__stab-pack-01/2330__jovica__stab-005-mastered-16-bit.wav")
    drone2 = loadSound("../assets/2223__andrew-duke__drone.wav")
}


function setup() {

    createCanvas(windowWidth, windowHeight);
    background(0);

    // on créee un objet de type FFT (fast fourier transform) pour analyser l'énergie des bandes de fréquence de notre son
    drone1FFT = new p5.FFT(0.8, 16) // premier paramètre est le smoothing, le second est le nombre de bandes de fréquences souhaité.
    drone1FFT.setInput(drone1) // on 'branche' cet analyseur à notre son drone1.

    // on créée un objet de type Amplitude pour analyse le niveau sonore de notre son (comme dans l'exemple02)
    stab2Amp = new p5.Amplitude()
    stab2Amp.setInput(stab2) // on 'branche' cet analyseur à notre son drone1.

    // on créee un objet de type FFT (fast fourier transform) pour obtenir une représentation sous forme de waveform.
    drone2FFT = new p5.FFT(0.8, 1024)
    drone2FFT.setInput(drone2) // on 'branche' cet analyseur à notre son drone2

}


function draw() {

    background(180)
    noStroke()

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
        stroke(150, 255, 225); // waveform is mint
        strokeWeight(10);
        for (var i = 0; i < waveform.length; i++) {
            var x = map(i, 0, waveform.length, 0, width);
            var y = map(waveform[i], -1, 1, 0, height);
            curveVertex(x, y);
        }
        endShape();


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
