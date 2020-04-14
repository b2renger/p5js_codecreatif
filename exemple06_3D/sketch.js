let kick1

let drone1

let drone2
let drone2Analyzer

let harp
let harpAnalyzer
let ico

var displayMessage = true


function preload() {

    kick1 = loadSound("../assets/11581__snapper4298__human-beatbox/183384__snapper4298__hit-hat-looper.wav")

    drone1 = loadSound("../assets/130182__altemark__drone2.wav")

    drone2= loadSound("../assets/11581__snapper4298__human-beatbox/183382__snapper4298__dew-clicks-hats-looper.wav")

    harp = loadSound("../assets/436128__cunningar0807__harp-glissando-up-edit.wav")
    ico = loadModel("ico.obj", true)

}


function setup() {

    createCanvas(windowWidth, windowHeight, WEBGL);
    background(0);

    drone2Analyzer = new p5.FFT(0.2, 128);
    drone2Analyzer.setInput(drone2)

    harpAnalyzer = new p5.FFT(0.2, 1024);
    harpAnalyzer.setInput(harp)

    drone1.amp(0.25)
    drone2.amp(2)
}


function draw() {

    background(180)
    noStroke()


    shininess(20);
    ambientLight(50);
    specularColor(255, 0, 0);
    pointLight(255, 0, 0, 0, -50, 50);
    specularColor(0, 255, 0);
    pointLight(0, 255, 0, 0, 50, 50);
    specularMaterial(255);

    orbitControl();



    playSound(kick1, 81)
    if (kick1.isPlaying()) {
        //console.log("ok")
        let angleX = map(kick1.currentTime(), 0, kick1.duration(), 0, PI / 2)
        let angleY = map(pow(kick1.currentTime() / kick1.duration(), 3), 0, 1, 0, PI / 2)
        push()

        lights()
        fill(0,0,255 )
        rotateX(angleX)
        rotateY(angleY)
        box(200)
        pop()
    }

    playSound(drone1, 83)
    if (drone1.isPlaying()) {

        let angleX = map(drone1.currentTime(), 0, drone1.duration(), 0, PI / 2)
        let angleY = map(pow(drone1.currentTime() / drone1.duration(), 3), 0, 1, 0, PI / 2)

        push()
        rotateX(angleX)
        rotateY(angleY)
        noFill()
        stroke(0)
        torus(1000, 600)
        rotateZ(angleY)
        rotateX(PI/4)
        torus(700, 500)
        pop()
    }

    playSound(drone2, 68)
    if (drone2.isPlaying()) {
        push()
        //let spectrum = drone2Analyzer.analyze(32, "dB");
        let spectrum = drone2Analyzer.waveform()
        let angleX = map(drone2.currentTime(), 0, drone2.duration(), 0, -TWO_PI * 2)
        rotateY(angleX)
        for (let i = 0; i < spectrum.length; i++) {
            let x = map(i, 0, spectrum.length, -400, 400);
            let h = +map(spectrum[i], 0, 1, 00, 100);
            push()
            translate(x, 0, 0)
            box(400 / spectrum.length / 2, h, 25)
            pop()
        }
        pop()
    }

    

    playSound(harp, 70)
    if (harp.isPlaying()) {

        let verts = ico.vertices;
        let spectrum = harpAnalyzer.analyze(256, "db")
        push()
        rotateX(frameCount * 0.01);
        rotateY(frameCount * 0.025);
        for (let i = 0; i < spectrum.length; i++) {
            if (i < verts.length) {
                let v = verts[i]
                push()
                translate(v.x, v.y, v.z)
                normalMaterial();
                let s = map(spectrum[i], -140, 0, 1, 50);
                box( s)
                pop()
            }
        }
        pop()
    }

    if (displayMessage) {
        fill(255)
        textAlign(CENTER, BOTTOM)
        textSize(36)
        text("Appuer sur 'q', 's', 'd', ou 'f' pour déclencher la lecture d'un son", width * 0.5, height)
    }

}


function playSound(sound, keyId) {
    if (keyIsDown(keyId) == true && sound.isPlaying() == false) {
        sound.play();
    }

}

function keyPressed(){
    displayMessage = false
}


function windowResized() {

    resizeCanvas(windowWidth, windowHeight);

}