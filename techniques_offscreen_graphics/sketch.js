var pg // une variable pour créer un calque dans lequel on va pouvoir dessiner

// quelques variables pour créer une animation de balle qui rebondit sur les bords de la fenêtre mais dont la trace restera affichée.
var xpos = 0
var ypos = 0
var xdir = 5
var ydir = 5

var displayMessage = true

function setup() {
    createCanvas(windowWidth, windowHeight);
    pixelDensity(1)

    // créer le calque à la taill de la fenêtre
    pg = createGraphics(windowWidth, windowHeight)
    pg.pixelDensity(1)

    background(0);


}


function draw() {

    // animer le fond
    background(frameCount % 255, 255 - frameCount % 255, 0)

    // lorsque l'on appuie sur 'a'
    if (keyIsDown(65)) {

        // on créé l'animation en augmentant des variables de position à l'aide des variables de direction
        xpos += xdir
        ypos += ydir
        // si une de nos coordonnées s'apprête à sortir de la fenêtre on inverse sa direction
        if (xpos > width || xpos < 0) {
            xdir *= -1
        }
        if (ypos > height || ypos < 0) {
            ydir *= -1
        }
        // on dessine dans notre calque
        pg.noStroke()
        pg.fill(255)
        pg.ellipse(xpos, ypos, 20, 20)

        // on affiche notre calque à l'aide de la fonction 'image' de p5js
        image(pg, 0, 0, width, height)

    } else {
        // on reset notre animation  :
        // en réinitialisant le calque
        pg = createGraphics(windowWidth, windowHeight)
        pg.pixelDensity(1)
        // et en réinitialisant les positions
        xpos = random(width)
        ypos = random(height)
        xdir = random(1, 7)
        ydir = random(1, 7)
    }

    if (displayMessage) {
        fill(255)
        textAlign(CENTER, BOTTOM)
        textSize(36)
        text("Laisser appuyé sur 'a' pour dessiner dans un calque", width * 0.5, height)
    }

}

function keyPressed(){
    displayMessage = false
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
