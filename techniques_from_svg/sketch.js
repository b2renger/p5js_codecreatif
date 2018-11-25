var a; // un variable qui va stocker notre tracé animé

function setup() {
    createCanvas(windowWidth, windowHeight);
    pixelDensity(1)

    // on fournit les deux trableaux de coordonnées et la vitesse (1 étant le plus rapide)
    // les deux tableaux sont fournis dans le fichier 'drawing.js'
    a = new AnimateDrawing(xpos0, ypos0, 1)

    background(0);
}


function draw() {

    background(0)

    if (keyIsDown(65)) {
        // on appelle la fonction animateDrawing avec en premier paramètre une couleur et en second l'épaisseur
        a.animateDrawing(color(255, 0, 0), 5)

    } else {
        // on reset le dessin
        a.resetDrawing()
    }

}



function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
