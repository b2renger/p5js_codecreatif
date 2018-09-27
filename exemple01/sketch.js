/* la fonction setup est exécutée une seule fois au début :
au chargement de la page, elle est délimitée par deux accolades
*/
function setup() {
    // Créer un élement HTML canvas qui couvre toute la page du navigateur
    createCanvas(windowWidth, windowHeight);
    // Dessiner un fond noir
    background(0);

}

/* la fonction draw est exécutée en boucle, une fois le setup terminé.
Chaque éxectution de la fonction draw va correspondre au dessin d'une image ou frame
*/
function draw() {
    // on commence par effacer ce qui a été dessiné précédement en le recouvrant par un fond noir
    background(0);
    // on dessine une ellipse au milieu, d'une taille de 50 pixels
    ellipse( width*0.5, height*0.5 , 50, 50);
    /* on utilise width, qui stocke la largeur de notre zone de dessin et height qui stocke sa hauteur.
    on utilise un multiplicateur en pourcentage pour signifier  que l'ellipse sera au milieu de cette zone.
    */
}

/* la fonction windowResized() est exécutée lorsque l'utilisateur redimensionne sa fenêtre*/
function windowResized(){
    // on redimensionne notre zone de dessin (canvas), à la taille de la fenêtre du navigateur.
    resizeCanvas(windowWidth, windowHeight);

}
