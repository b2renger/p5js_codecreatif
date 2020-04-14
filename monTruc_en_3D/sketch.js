let sound01
let sound02

let sound03
let sound03Analyser

function preload() {
    sound01 = loadSound("../assets/11581__snapper4298__human-beatbox/183492__snapper4298__uh-ha-uh-3.wav")

    sound02 = loadSound("../assets/130182__altemark__drone2.wav")
    sound02.amp(0.15)

    sound03 = loadSound("../assets/277369__myluckyfeet__drone-11.wav")
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    background(0);

    sound03Analyser = new p5.FFT(0.2, 256);
    sound03Analyser.setInput(sound03)

}


function draw() {
    background(180)
    // lights
    shininess(20);
    ambientLight(50);
    specularColor(255, 0, 0);
    pointLight(255, 255, 0, 0, height - 50, -100);
    specularColor(0, 255, 0);
    pointLight(0, 255, 0, 0, 50, -100);
    specularMaterial(255);

    // camera control
    orbitControl()

    playSound(69, sound03)
    if (sound03.isPlaying() == true) {
        push()
        let wave = sound03Analyser.waveform();
        // console.log(wave)
        let angleX = map(pow(sound03.currentTime() / sound03.duration(), 0.87),
            0, 1,
            0, PI*4)

        for (let i = 0; i < wave.length; i++) {
            //console.log( wave[i])
            let xpos = map(i,
                0, wave.length,
                -500, 500)
            let hauteur = map(wave[i],
                -0.11, 0.11,
                0, 100
            )

            push()
            lights()
            noStroke()
            fill(0, 255, 255)
            rotateY(angleX)
            translate(xpos, 0, 0)
           
            box(1, hauteur, 5)
            pop()


        }

        pop()

    }


    playSound(90, sound02)
    if (sound02.isPlaying() == true) {
        push()
        rotateX((frameCount * 0.015))
        rotateY((frameCount * 0.01))
        noFill()
        stroke(0, 255, 0)
        torus(1000, 500)
        rotateX(frameCount * 0.02)
        torus(850, 500)
        pop()
    }

    // dessins
    playSound(65, sound01)
    if (sound01.isPlaying() == true) {

        let cubeSize = map(pow(sound01.currentTime() / sound01.duration(), 0.75),
            0, 1,
            100, 250)

        let cubeSize2 = map(pow(sound01.currentTime() / sound01.duration(), 1.25),
            0, 1,
            100, 250)

        let angleX = map(pow(sound01.currentTime() / sound01.duration(), 0.5),
            0, 1,
            0, PI)

        let angleY = map(pow(sound01.currentTime() / sound01.duration(), 2),
            0, 1,
            0, PI / 2)

        push()
        lights()
        noStroke()
        fill(255)
        rotateX(angleY)
        rotateY(angleX)
        box(cubeSize)

        fill(255, 0, 0)
        rotateZ(PI / 4.)
        rotateX(PI / 4.)
        box(cubeSize2)
        pop()
    }

}

function playSound(keyID, sound) {
    if (keyIsDown(keyID) == true) {
        if (sound.isPlaying() == false) {
            sound.play()
        }
    }
}

function windowResized() {
    // on redimensionne notre zone de dessin (canvas), à la taille de la fenêtre du navigateur.
    resizeCanvas(windowWidth, windowHeight);
}