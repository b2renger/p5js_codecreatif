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

    analyzer = new p5.Amplitude();
    analyzer.setInput(song);

}

function draw() {
  // put drawing code here
    background(0)

    var rms = analyzer.getLevel();
    var ellipseSize = rms * 1000 + 500

    ellipse( width*0.5, height*0.5 , ellipseSize, ellipseSize)
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    background(0);
}
