var kick1 // créer une variable pour stocker un premier son

var stab1 // créer une variable pour stocker un deuxième son

var drone1 // créer une variable pour stocker un troisième son
var drone1FFT

var stab2
var stab2Amp



function preload() {
    // on charge les deux sons à partir du dossier assets situé à la racine de notre répertoire de travail
    kick1 = loadSound("../assets/11581__snapper4298__human-beatbox/183384__snapper4298__hit-hat-looper.wav")
    stab1 = loadSound("../assets/137__jovica__stab-pack-01/2345__jovica__stab-020-mastered-16-bit.wav")
    drone1 = loadSound("../assets/217490__jarredgibb__drone-002.wav")
    stab2 = loadSound("../assets/137__jovica__stab-pack-01/2330__jovica__stab-005-mastered-16-bit.wav")
}


function setup() {

    createCanvas(windowWidth, windowHeight);
    background(0);

    drone1FFT = new p5.FFT(0.8, 16)
    drone1FFT.setInput(drone1)

    stab2Amp = new p5.Amplitude();
    stab2Amp.setInput(stab2)

}


function draw() {

    background(180);
    noStroke()

    playSound(stab2, 82)
    if (stab2.isPlaying() == true){
        push()
        var amp = stab2Amp.getLevel()
        var whiteLevel = map(amp, 0, 1, 210, 255)
        console.log(whiteLevel)
        noStroke()
        fill(whiteLevel)
        rect(0,0,width,height)
        pop()
    }

    playSound(kick1, 65);
    if (kick1.isPlaying() == true) {
        push()
        var radius = map(kick1.currentTime(), 0, kick1.duration(), 50, width)
        fill(255, 220, 0)
        ellipse(width * 0.5, height * 0.5, radius, radius)
        pop()
    }

    playSound(stab1, 90);
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

    playSound(drone1, 69);
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


}


function playSound(sound, keyId) {
    if (keyIsDown(keyId) == true && sound.isPlaying() == false) {
        sound.play();
    }
}


function windowResized() {

    resizeCanvas(windowWidth, windowHeight);

}
