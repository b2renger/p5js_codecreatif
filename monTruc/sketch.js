let sound01
let sound01Amp

let sound02

let sound03

function preload() {
    sound01 = loadSound("../assets/2223__andrew-duke__drone.wav")
    sound02 = loadSound("../assets/130182__altemark__drone2.wav")
    sound03 = loadSound("../assets/436128__cunningar0807__harp-glissando-up-edit.wav")
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    sound01Amp = new p5.Amplitude() 
}


function draw() {
    // on commence par effacer ce qui a été dessiné précédement en le recouvrant par un fond noir
    background(0);

    // animation 1
    playSound(65, sound01)
    if (sound01.isPlaying() == true){
        let diam = sound01Amp.getLevel()*500
        fill(255, 0, 225)
        ellipse(width * 0.5, height * 0.5, diam, diam);
    }
    // animation 2
    playSound(90, sound02)
    if (sound02.isPlaying() == true){
        rectMode(CENTER)
        translate(width*0.5, height*0.5)
        let angle = map(sound02.currentTime(), 0, sound02.duration(), 0, TWO_PI)
        rotate(angle)
        fill(255,0,0,50)
        rect(0,0, 200, 200)
    }

    playSound(69, sound03)
    if(sound03.isPlaying() == true){
        //fill(255,255,0, 50)
        //let angle = map(sound03.currentTime(), 0, sound03.duration(), 0 , TWO_PI)
        //arc(width*0.5, height*0.5, height*0.5, height*0.5, 0 , angle)
        let taille = map(sound03.currentTime(), 0, sound03.duration(), 0, height*3)
        fill(255)
        ellipse(width*0.66, height*0.5, taille, taille)

        let pos = map(sound03.currentTime(), 0, sound03.duration(), 0, height)
        fill(0)
        ellipse(width*0.33, pos, height*0.25, height*0.25)
    }

}

function playSound(keyID, sound){
    if(keyIsDown(keyID) == true){
        if(sound.isPlaying() == false){
            sound.play()
        }
    }
}

function windowResized() {
    // on redimensionne notre zone de dessin (canvas), à la taille de la fenêtre du navigateur.
    resizeCanvas(windowWidth, windowHeight);
}