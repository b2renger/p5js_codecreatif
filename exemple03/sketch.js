

var kick1 // créer une variable pour stocker un premier son
var stab1 // créer une variable pour stocker un deuxième son
var drone1 // créer une variable pour stocker un troisième son

function preload() {
    // on charge les deux sons à partir du dossier assets situé à la racine de notre répertoire de travail
    kick1 = loadSound("../assets/11581__snapper4298__human-beatbox/183384__snapper4298__hit-hat-looper.wav")
    stab1 = loadSound("../assets/137__jovica__stab-pack-01/2345__jovica__stab-020-mastered-16-bit.wav")
    drone1 = loadSound("../assets/217490__jarredgibb__drone-002.wav")
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

    // Méthode 2 : on appelle la méthode 'playSound' définie ci-dessous, avec le son stab1 et l'identifiant clavier 90
    // en conséquence si on appuie sur la touche 'z', le son stab1 se jouera.
    // on peut trouver les codes clavier pour chaque touche sur ce lien : http://keycode.info/
    playSound(stab1, 90);
    // on appelle une seconde fois la méthode 'playSound' mais cette fois avec le son 'drone1' et l'identifiant clavier 60
    // si on appuie sur 'e' le son drone1 se jouera.
    playSound(drone1, 69);


    fill(255)
    textAlign(CENTER, BOTTOM)
    textSize(36)
    text("Appuer sur 'a', 'z' ou 'e' pour déclencher la lecture d'un son", width*0.5, height)
}

/*
Le code ci-dessous permet de définir une fonction en javascript.
Cette fonction pourra être appelée avec plusieurs arguments : les arguments sont les valeurs que l'on passe en paramètre c'est à dire entre les parenthèses. Cette fonction est donc générique : elle définit un comportement globale que l'on pourra appliquer à plusieurs couples de son / identifiant de touche clavier. Au moment où on appelera cette fonction dans le draw() les variables "sound" et "keyId" seront remplacées par celles fournies entre parenthèse.
*/
function playSound(sound, keyId) { // playSound est définie comme pouvant prendre deux paramètres : un son et un nombre
    // on vérifie si on appuie sur la touche portant le numéro keyId, et on vérifie que le son n'est pas déjà en train de jouer
    if (keyIsDown(keyId) == true && sound.isPlaying() == false) {
        sound.play(); // si c'est le cas on enclenche la lecture du son.
    }
}


function windowResized() {

    resizeCanvas(windowWidth, windowHeight);

}
