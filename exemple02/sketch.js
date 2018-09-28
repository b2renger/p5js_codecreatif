var song;
var analyzer;

function preload() {
  song = loadSound('assets/386927__gumballworld__music-box.mp3');
}

function setup() {
  // put setup code here
    createCanvas(windowWidth, windowHeight);
    background(0);

    song.loop();

    analyzer = new p5.Amplitude(0.15);
    analyzer.setInput(song);
    analyzer.toggleNormalize(); // s'assurer que notre analyseur renvoie une valeur comprise entre 0 et 1

}

function draw() {
  // put drawing code here
    background(0)

    var rms = analyzer.getLevel();
    var ellipseSize = map(rms, 0, 1, 50,  800); // rms est compris entre 0 et 1 et nous voulons une valeur comprise entre 5O et 800 pour controller la taille
    var ellipseAlpha = map(rms, 0, 1, 50, 255);// rms est compris entre 0 et 1 et nous voulons une valeur comprise entre 5O et 800 pour controller la transparence

    fill(255)
    ellipse( width*0.25, height*0.5 , ellipseSize, ellipseSize)

    fill(255, 100, 100, ellipseAlpha);
     ellipse( width*0.75, height*0.5 , 250, 250)
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    background(0);
}
