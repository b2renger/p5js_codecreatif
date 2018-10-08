# p5js_codecreatif

Code for a creative coding class with designers.

Le but de ce cours est de recréer un page web inspirée de [patatap](https://patatap.com/).


P5js est un projet issu de processing qui est un langage de programmation basé sur java orienté vers la création graphique et interactive. P5js a pour but de transposer l'esprit de processing au web et donc au langage javascript. C'est un framework simple d'accès pour les débutants avec une bonne documentation et une communauté active. 

P5js propose l'intégration dans un canvas html5 d'un maximum de fonction pour le dessin et d'animation, des possibilités d'interaction à travers différentes interfaces homme machine (clavier, souris, webcam, micro ...), ou encore avec les composants d'une page web et un support partiel mais en développement de webgl.

Vous pouvez consulter [la référence de p5js](https://p5js.org/reference/) qui va décrire avec des exemples l'ensemble des fonction de p5js, mais n'hésitez pas à aussi consulter [les exemples](https://p5js.org/examples/) - qui peuvent par contre s'avérer être un peu plus compliqués à comprendre.

De nombreuses bibliothèques viennent offrir de nouvelles possibilité, mais  p5js peut naturellement s'interfacer avec n'importe quelle bibliothèques js.

Le plus simple est probablement de [télécharger](http://p5js.org/download/) et d'ajouter la bibliothèque js ou d'utiliser les liens cdn dans votre fichier index.html.

Pour rappel CDN signifie Content Delivery Network et permet de lier son code à des bibliothèques qui sont déjà hébergées en ligne.

Généralement un bon éditeur de texte suffit. Parfois il pourra être utile d'utiliser un serveur local pour servir certaines pages demandant accès à des fonctions ou fichiers spécifiques (généralement des pages utilisant des images ou des sons sous formes de fichier doivent être ouvertes avec un serveur local). Il y a des nombreuses possibilités pour cela et beaucoup de documentation en ligne : personnellement j'utilise 'sinatra' un serveur en ruby, simplehttpserver pour python peut-être une alternative, ou d'autres encore via nodejs voire même des logiciels comme mamp.

Une solution intéressante peut-être [Brackets](http://brackets.io/)
Cet éditeur de texte est fait pour le développement web, il dispose d'une bonne ergonomie, il permet d'ouvrir des dossiers entiers et de naviguer à l'intérieur tout en éditant des fichiers, un serveur web est intégré (il suffit de cliquer sur le petit éclair en haut à droite pour ouvrir le le fichier édité dans une page web).

P5js recense un bon nombre de bibliothèques compatibles et revendiquant le même esprit : http://p5js.org/libraries/
Nous allons principalement utiliser la bibliothèque dédiée au son : [référence de p5.sound](https://p5js.org/reference/#/libraries/p5.sound).
Mais il peut aussi être utilisé avec n'impote quelles autres bibliothèques js.

## CONTENU

* [ÉTAPE 0 : Se familiariser avec p5js](https://github.com/b2renger/p5js_codecreatif#%C3%89tape-0--se-familiariser-avec-p5js)<br>
* [ÉTAPE 1 : Charger et jouer un son](https://github.com/b2renger/p5js_codecreatif#%C3%89tape-1--charger-et-jouer-un-son)<br>
* [ÉTAPE 2 : Analyser le volume du son et animer notre cercle](https://github.com/b2renger/p5js_codecreatif#%C3%89tape-2--analyser-le-volume-du-son-et-animer-notre-cercle)<br>
* [ÉTAPE 3 : Insérer plusieurs sons et déclencher leur lecture à l'aide de touches du clavier](https://github.com/b2renger/p5js_codecreatif#%C3%89tape-2--analyser-le-volume-du-son-et-animer-notre-cercle)<br>


## ÉTAPE 0 : se familiariser avec p5js 

Un programme p5js est destiné à être utilisé dans une page web. Généralement en dispose d'un fichier *index.html* qui nous permet de définir notre page web et les fichiers ressources (liens vers les bibliothèques) et d'un fichier *sketch.js* qui va être notre programme écrit en javascript.

### HTML et JS

Le fichier *sketch.js* est lié au fichier *index.html* par une déclaration dans ce dernier.

```HTML
<script language="javascript" type="text/javascript" src="sketch.js"></script>

```
Lorsqu'on ouvre le fichier *index.html* celui-ci executera alors le fichier *sketch.js* dans la page web.

Dans le cas de nos exemples nous trouverons les bibliothèques javascripts dans un dossier **/bibliothèques** dédié : on y trouve *p5.js*, *p5.dom.js*, *p5.sound.js*.

Le fichier *index.html* ressemblera donc à ceci si on utilise toutes les bibliothèques et que notre dossier **p5** contenant tous les fichiers téléchargés depuis le site web de processing, est au même niveau que notre dossier contenant notre fichier **html**. Ce fichier **html** nous sert en fait à préciser au navigateur où se trouvent les bibliothèques nécessaires à l'éxecution de notre programme (le fichier **js**).

```HTML
<html>
<head>
  <meta charset="UTF-8">
  <script language="javascript" type="text/javascript" src="../p5/p5.js"></script>
  <script language="javascript" type="text/javascript" src="../p5/addons/p5.dom.js"></script>
  <script language="javascript" type="text/javascript" src="../p5/addons/p5.sound.js"></script>
  <script language="javascript" type="text/javascript" src="sketch.js"></script>
  <style> body {padding: 0; margin: 0;} </style>
</head>
<body>
</body>
</html>
```

Notre fichier *sketch.js* est notre code écrit en javascript. Par défaut : il contient deux fonctions nécessaires à l'éxecution des fonctions de l'api p5js (Application Programming Interface)

```javascript
/* la fonction setup est exécutée une seule fois au début :
au chargement de la page, elle est délimitée par deux accolades
*/
function setup() {

}
/* la fonction draw est exécutée en boucle, une fois le setup terminé.
Chaque éxectution de la fonction draw va correspondre au dessin d'une image ou frame
*/
function draw() {
  
}

```

La fonction **setup()** est executée une fois à chaque chargement de la page, elle est utile pour initialiser des valeurs ou créer des éléments de page web - comme un canvas pour dessiner :

```javascript
function setup() {
    // créer un objet de type HTML5 canvas aux dimensions de la fenêtre de notre navigateur
	createCanvas(windowWidth,windowHeight) 
}
```

**windowWidth** et **windowHeight** sont des **variables** disponnible dans processing pour renseigner le programme sur la taille de la fenêtre du navigateur de l'utilisateur.

Une **variable** est quant à elle un espace mémoire dans le navigateur accessible par notre programme. En javascript nous devrons créer et manipuler des variables régulièrement, mais p5js dispose de certaines variables déjà nommées pour connaitre l'état du navigateur ou la position de la souris ou même encore les touches pressées par l'utilisateur.

La fonction **draw()** est elle une boucle infinie : le code entre les deux accolades est éxecuté en boucle par votre navigateur aussi vite que possible. Cela tranche avec le principe évenementiel du javascript, mais ici nous allons faire des applications interactives avec de l'animation.

Une autre chose qui peut-être importante est la notion de réactivité à la fenêtre dans laquelle on dessine. Par exemple un utilisateur pourrait vouloir redimensionner la fenêtre de son navigateur pendant l'éxectution de votre page web. Pour cela il existe une fonction qui va permettre de redimensionner le canvas dans lequel on dessine à la nouvelle taille de la fenêtre du navigateur.

```javascript
function windowResized() {
    // redimensionner dynamiquement notre canvas aux dimensions de la fenêtre de notre navigateur
	resizeCanvas(windowWidth,windowHeight) 
}
```
Voici des liens vers les pages de références concernant ces principales fonctions :

https://p5js.org/reference/#/p5/createCanvas

https://p5js.org/reference/#/p5/resizeCanvas

### Dessiner en javascript avec l'api processing

Le code de dessin va généralement s'écrire dans la fonction **draw()**. Par exemple pour dessiner un cercle nous alllons appeler la fonction **ellipse()** dont voici la page de référence :

https://p5js.org/reference/#/p5/ellipse

Entre parenthèse nous devons rentrer des **paramètres** qui sont séparés par des virgules. Certains paramètres sont optionnels, s'ils ne sont pas renseignés ils auront des valeurs par défaut.

Dans un souci de rendre notre code réactif aux changement de la taille de notre fenêtre, nous allons exprimer les coordonées de l'endroit auquel nous allons dessiner notre ellipse en pourcentage de la largeur et de la hauteur de notre zone de dessin.

```javascript
    // on dessine une ellipse au milieu, d'une taille de 50 pixels
    ellipse( width*0.5, height*0.5 , 50, 50,1);
    /* on utilise width, qui stocke la largeur de notre zone de dessin et height qui stocke sa hauteur.
    on utilise un multiplicateur en pourcentage pour signifier  que l'ellipse sera au milieu de cette zone.
    */
```

Vous pourrez changer la couleur de **remplissage** de votre ellipse en utilisant ces fonctions :

https://p5js.org/reference/#/p5/fill

https://p5js.org/reference/#/p5/noFill

et changer la couleur et l'aspect du **contour** en vous référant à ces fonctions :

https://p5js.org/reference/#/p5/stroke

https://p5js.org/reference/#/p5/noStroke

https://p5js.org/reference/#/p5/strokeWeight

https://p5js.org/reference/#/p5/strokeCap

https://p5js.org/reference/#/p5/strokeJoin

Il est bien sûr possible de dessiner d'autres formes géométriques. Vous pouvez vous référer à la catégorie **Shape** de la page de référence.

**L'exemple01** reprend ces différents éléments et les formalisent dans un programme fonctionnel permettant de dessiner un cercle au centre de notre fenêtre, ce cercle reste au centre de la fenêtre même si l'utilisateur redimensionne sa fenêtre.

[^home](https://github.com/b2renger/p5js_codecreatif#contenu)<br>

## ÉTAPE 1 : charger et jouer un son

Vous pourrez trouver des sons en license libre [Creative Commons](https://creativecommons.org/) sur le site [freesound](https://freesound.org/). Il vous suffit de créer un compte (gratuit), puis de chercher ...

A l'utilisation il vous suffira de mentionner l'auteur du son pour être en règle.

Pour pouvoir charger et jouer un son nous allons nous référer à la page dédié à l'objet **SoundFile** de la bibliothèque son de p5js :

https://p5js.org/reference/#/p5.SoundFile

Cet objet une fois créée, grâce à la méthode **loadSound()**, permet de faire tout un tas de choses avec ce fichier audio par exemple le jouer avec la méthode **.play()** mais aussi de le jouer en boucle **.loop()**, de régler son volume **.setVolume()** etc.

Il est important de comprendre que la méthode **loadSound()** retourne un **objet** que l'on peut ensuite manipuler, cet objet va être stocké dans une **variable** - définie avec le mot clé *var* et qui va porter un nom de nôtre choix.

```javascript
var song;
```
Ce code permet de créer une variable qui s'appelera *song*. Pour l'instant cette variable ne contient rien, ce n'est rien de plus qu'une étiquette avec un nom marqué dessus.

Nous allons lui attribuer une valeur en appelant la fonction **loadSound()** :
```javascript
song = loadSound('assets/386927__gumballworld__music-box.mp3');
```
après cette ligne notre variable sera un objet **Soundfile** portant le nom *song*, il permettra de manipuler le fichier *.mp3* nommé *386927\__\_gumballworld\__\_music-box.mp3* stocké dans un dossier nommé **assets** situé au même niveau que nos fichier html et js.

Une fois que notre objet est créée nous pouvons le lire en boucle en appelant la méthode **.loop()** :
```javascript
song.loop();
```
Si nous le faisons dans le **setup()** : au chargement de la page notre son commencera à se lire en boucle. Voici donc le code complet permettant de lire un son en boucle au chargement de la page. Comprenez bien cette fois que la méthode **.loop()** s'applique sur un objet de type **SoundFile**, c'est d'ailleurs à cela que sert le **"."** : il s'agit d'un accesseur; il permet de rentrer dans un objet et d'accéder à ses propriétés, ses méthodes. Vous ne pouvez donc utiliser la méthode **.loop()** que si elle est précisée dans la documentation de l'objet.

```javascript
var song;
// la fonction preload permet de charger des éléments (son, images, vidéos etc.) avant le démarrage du programme
function preload() {
  song = loadSound('assets/386927__gumballworld__music-box.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    song.loop();
}

function draw() {
    background(0);
    ellipse( width*0.5, height*0.5 , 50, 50);
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    background(0);
}
```
[^home](https://github.com/b2renger/p5js_codecreatif#contenu)<br>

## ÉTAPE 2 : Analyser le volume du son et animer notre cercle 

Nous allons maintenant nous intéresser à la manière dont nous allons pouvoir calculer le niveau sonore de notre fichier audio en train de lireet faire réagir notre cercle à celui-ci.

Nous allons pour cela utiliser un objet de type **Amplitude** dont la documentation est disponible à cette page :

https://p5js.org/reference/#/p5.Amplitude

Pour créer cet objet, nous allons d'abord créer une **variable** qui se situera avant le **setup()**
```javascript
var analyzer;
```
Ce code permet de créer une variable qui s'appelera *analyzer*. Pour l'instant cette variable ne contient rien, ce n'est rien de plus qu'une étiquette avec un nom marqué dessus - ce nom peut-être celui que vous souhaitez.

Dans le **setup()** nous allons maintenant que cette variable sera un analyseur audio en appellant le **constructeur** de l'objet **Amplitude**
```javascript
analyzer = new p5.Amplitude();
```
après cette ligne notre variable "analyzer" sera donc reconnue par notre code comme étant un objet de type **Amplitude** nous pouvons donc maintenant appelé dessus les méthodes décrites dans la documentation en utilisant le **"."** comme accesseur.

La première chose que nous devons faire est de connecter cet analyseur de volume à notre objet qui va jouer notre fichier audio, afin que le flux audio qui sorte de notre objet **SoundFile** entre dans notre objet **Amplitude** pour être analysé. Cela se fait avec la méthode **.setInput()**
```javascript
analyzer.setInput(song);
analyzer.toggleNormalize(); // s'assurer que notre analyseur renvoie une valeur comprise entre 0 et 1
```
Cette ligne de code se place dans le **setup()** car cette action ne doit s'effectuer qu'une seule fois.

A partir de maintenant nous allons animer notre cercle. Pour cela le code que nous allons écrire se placera dans le **draw()**. 
La première chose que nous allons faire et de récupérer le niveau sonore du son en train de jouer et le stocker dans une nouvelle variable en appelant la méthode **.getLevel()** de l'objet **Amplitude**.
```javascript
var rms = analyzer.getLevel();
```
Ici nous créeons une variable et lui attribuons une valeur en une seule et même ligne. Etant donné que **.getLeve()** nous retourne une valeur comprise entre 0 et 1, *rms* contiendra à chaque frame un nombre à virgule compris entre 0 et 1 correspondant au niveau sonore émis par l'objet **SoundFile** à cette frame.

Cette variable *rms* est crééee à l'intérieur du **draw()** et n'existe donc que dans ce **bloc de code**, c'est à dire entre les deux accolades délimitant la fonction **draw()**.

Nous allons maintenant pouvoir transformer cette variable par des opérations mathématiques à l'aide de la fonction **map()** dont voici la page de documentation : 

https://p5js.org/reference/#/p5/map

Cette fonction permet de transformer une valeur se trouvant dans un intervalle définit pour lui faire correspondre une valeur dans un nouvel intervalle.
Ici nous allons créer deux variables une pour controller la taille de notre ellipse : *ellipseSize* et une pour controller la transparence de notre ellipse : * ellipseAlpha*. 

```javascript
var ellipseSize = map(rms, 0, 1, 50 800); // rms est compris entre 0 et 1 et nous voulons une valeur comprise entre 5O et 800 pour controller la taille
var ellipseAlpha = map(rms, 0, 1, 0, 255);// rms est compris entre 0 et 1 et nous voulons une valeur comprise entre 5O et 800 pour controller la transparence
```
Maitenant que nous avons calculé deux valeurs utiles et dans des intervalles de valeurs appropriés, il ne nous reste plus qu'à les utiliser.

 ```javascript
    fill(255);
    ellipse( width*0.25, height*0.5 , ellipseSize, ellipseSize);
    
    fill(255, 100, 100, ellipseAlpha);
    ellipse( width*0.75, height*0.5 , 250, 250);
```
**L'exemple02** reprend ces différents éléments et les formalisent dans un programme fonctionnel permettant de dessiner un cercle au centre de notre fenêtre, ce cercle reste au centre de la fenêtre même si l'utilisateur redimensionne sa fenêtre.

[^home](https://github.com/b2renger/p5js_codecreatif#contenu)<br>

## ÉTAPE 3 : Insérer plusieurs sons et déclencher leur lecture à l'aide de touches du clavier

La première chose à faire va être de créer un dossier "assets" à la racine de notre répértoire de travail, dans ce dossier nous allons ranger tous les fichiers nécessaires au bon fonctionnement de notre programme. 

A l'étape précédente nous avions créée ce dossier à l'intérieur de notre exemple (à côté des fichiers "sketch.js" et "index.html"), ici les fichiers que nous allons importer seront utiles à tous les exemples suivants, il est donc préférable de le placer à côté du dossier "/p5" contenant nos bibliothèques.

A des fins de démonstrations j'ai choisi d'utiliser un pack nommé [Human Beatbox créée sur freesound.org par l'utilisateur Snapper 4298](https://freesound.org/people/Snapper4298/packs/11581/), il s'agit de sons percusifs et relativement courts qui seront parfaitement adaptés à nos besoins. J'ai aussi téléchargé un pack de [Stabs créée joviva](https://freesound.org/people/Jovica/packs/137/) et quelques sons d'ambiances que l'on appelle communément "drones". J'ai aussi choisi quelques sons dits de "drone" que j'ai copié directement dans le dossier assets.

Nous allons commencer par charger différents sons dans nôtre page : tout se passe comme à l'étape précédente.

```javascript
var kick1 // créer une variable pour stocker un premier son
var stab1 // créer une variable pour stocker un deuxième son
var drone1 // créer une variable pour stocker un troisième son

function preload() {
    // on charge les deux sons à partir du dossier assets situé à la racine de notre répertoire de travail
    kick1 = loadSound("../assets/11581__snapper4298__human-beatbox/183384__snapper4298__hit-hat-looper.wav")
    stab1 = loadSound("../assets/137__jovica__stab-pack-01/2345__jovica__stab-020-mastered-16-bit.wav")
    drone1 = loadSound("../assets/217490__jarredgibb__drone-002.wav")
}

```

Maintenant nous allons nous ateller à déclencher un son lorsque l'on appuie sur une touche de clavier : la fonction **keyIsDown()** est faite pour cela et sa documentation est disponible à cette page : 

https://p5js.org/reference/#/p5/keyIsDown

Vous remarquerez qu'il faut  connaitre le code clavier de chaque touche et donc consulter cette page : http://keycode.info/

Le code clavier pour la touche 'a' est 90, et la fonction keyIsDown() prendra une **valeur booléenne** - c'est à dire **vrai** ou **faux** en fonction de si on appuie sur la touche concernée.

Si vous écrivez le code ci-dessous dans la fonction **draw()** et que vous ouvrez la console de votre navigateur, vous verrez affiché **true** si vous appuyez sur 'a' et **false** si vous n'appuyez pas sur 'a'.

```javascript
console.log(keyIsDown(90)) // console.log() permet d'afficher des choses dans la console de votre navigateur    
```

Il faut que nous soyons capable de dire à notre page web quelque chose comme : "si on appuie sur la touche 'a' on doit jouer le son chargé dans la variable 'kick1'". Pour cela il existe dans tous les langages un mot-clé qui est **if(){}**. La syntaxe est la suivante : si la condition spécifiée entre parenthèse est vraie alors on éxecute le code entre accolades.

Il n'existe pas de page de documentation de la structure **if** sur le site de p5js, mais vous pouvez vous référer à la page présente dans la documentation de processing (version java) : 

https://processing.org/reference/if.html


```javascript
if (keyIsDown(90) == true){ // si on appuie sur la touche 'a'
    kick1.play(); // on enclenche la lecture du son kick1
}
```
Tout cela est très bien, mais malheureusement et cela même si le code fonctionne comme prévu, le son grésille énormément, cela est du au fait que le **draw()** s'éxécute très vite et lorsque vous appuyez sur une touche votre doigt reste sur la touche le temps de l'éxecution de plusieurs itération du **draw()**, le son est donc déclenché plusieurs fois et cela sature vos haut-parleurs. 

Il faut donc s'assurer que le son n'est pas déjà en train de jouer lorsqu'on enclenche sa lecture. Heureusement il existe pour les objets de type SoundFile une méthode **isPlaying()** qui nous renvoie encore une fois une **variable booléenne** : **vrai** si le son est déjà en train de jouer et **faux** sinon.

Voici la page de documentation de cette méthode : https://p5js.org/reference/#/p5.SoundFile/isPlaying

On peut alors "encapsuler" des **if** - mais attention aux parenthèses et accolades !

```javascript
if (keyIsDown(90) == true){ // si on appuie sur la touche 'a'
    if(kick1.isPlaying() == false){ // si le son kick1 n'est pas déjà en train de jouer
        kick1.play(); // on enclenche la lecture du son kick1
    }
}
```

Ou alors on peut utiliser des opérateurs logiques (encore une fois on trouvera leur documentation sur le site de processing - mais ce sont les mêmes dans tous les langages de programmation) :

- le ET logique : https://processing.org/reference/logicalAND.html
- le OU logique : https://processing.org/reference/logicalOR.html
- la NON logique : https://processing.org/reference/logicalNOT.html

On peut donc aussi écrire le code ci-dessus de cette manière :

```javascript
//si on appuie sur la touche 'a' ET si le son kick1 n'est pas déjà en train de jouer
if (keyIsDown(90) == true && kick1.isPlaying() != true){
    kick1.play(); // on enclenche la lecture du son kick1
}
```
Cette fois-ci nous avons atteint notre objectif.

Mais cette méthode nous contraint à écrire un peu trop de lignes de code pour jouer un son. Nous allons donc écrire une **fonction** qui nous permettra de généraliser la manière dont nous voulons lire un son. Une fois cette fonction définie nous n'aurons plus qu'à l'appeler avec des paramètres sur mesure pour lire tel ou tel son en appuyant sur telle ou telle touche.

Le code ci-dessous permet de définir une fonction en javascript. On la place en dehors de toute autre fonction déjà prédéfinie par p5js, c'est à dire en dehors de preload, setup, draw ou windowResized; cela nous assure de pouvoir l'appeler de n'importe quel endroit de notre code, même si typiquement nous l'appelerons dans le draw.

Cette fonction pourra être appelée avec plusieurs arguments : les arguments sont les valeurs que l'on passe en paramètre c'est à dire entre les parenthèses. Cette fonction est donc générique : elle définit un comportement globale que l'on pourra appliquer à plusieurs couples de son / identifiant de touche clavier. Au moment où on appelera cette fonction dans le draw() les variables "sound" et "keyId" seront remplacées par celles fournies entre parenthèse.

Voici donc la définition de la fonction :

```javascript
function playSound(sound, keyId) { // playSound est définie comme pouvant prendre deux paramètres : un son et un nombre 
    // on vérifie si on appuie sur la touche portant le numéro keyId, et on vérifie que le son n'est pas déjà en train de jouer
    if (keyIsDown(keyId) == true && sound.isPlaying() == false) {
        sound.play(); // si c'est le cas on enclenche la lecture du son.
    }
}
```

Si maintenant on souhaite l'appeler, on le fera dans le draw() et il faudra fournir entre parenthèses un objet SoundFilet et un nombre (l'identifiant clavier de la touche qui doit permettre de jouer le son).

```javascript
//si on appuie sur la touche 'z' qui porte l'identifiant 90, le son stab1 se jouera.
playSound(stab1, 90);
// on appelle une seconde fois la méthode 'playSound' mais cette fois avec le son 'drone1' et l'identifiant clavier 60
// et donc si on appuie sur 'e' le son drone1 se jouera.
playSound(drone1, 69);
```
Il faut bien sur que les variables "stab1" et "drone1" aient été définies au préalable et les avoir assignées à des sons dans la fonction **preload()**.

Le code permettant de faire tout cela est récapitulé dans le dossier "exemple03".








