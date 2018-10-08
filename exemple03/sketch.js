

var kick1 // créer une variable pour stocker un premier son
var stab1 // créer une variable pour stocker un second son

function preload() {
    // on charge les deux sons à partir du dossier assets situé à la racine de notre répertoire de travail
    kick1 = loadSound("../assets/11581__snapper4298__human-beatbox/183384__snapper4298__hit-hat-looper.wav")
    stab1 = loadSound("../assets/137__jovica__stab-pack-01/2345__jovica__stab-020-mastered-16-bit.wav")
}


function setup() {

    createCanvas(windowWidth, windowHeight);
    background(0);

}


function draw() {

    background(0);

    /*
    Nous allons utiliser deux méthodes pour déclencher un son :
        - la première pour le son de kick qui sera un peu verbeuse, c'est à dire que nous allons taper toutes les instruction
        - pour le second son nous allons crééer une fonction (du code générique) que l'on va pouvoir appeler pour chaque son que nous utiliserons.
    Cette seconde méthode nous permettra de n'écrire qu'une seule ligne de code pour chaque son par opposition à trois pour la première méthode.
    */

    // Méthode 1
    if (keyIsDown(65) == true) { // si la touche possédant le code 65 est pressée
        if (kick1.isPlaying() == false) { // si le son que nous voulons jouer n'est pas déjà en train de jouer
            kick1.play(); // on joue le son
        }
    }

    // Méthode 2 : on appelle la méthode 'playSound' définie ci-dessous
    playSound(stab1, 90);


}

function playSound(sound, keyId) {
    if (keyIsDown(keyId) == true && sound.isPlaying() == false) {
        sound.play();
    }
}


function windowResized() {

    resizeCanvas(windowWidth, windowHeight);

}
