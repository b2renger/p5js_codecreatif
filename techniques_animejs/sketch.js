// https://github.com/juliangarnier/
// https://github.com/juliangarnier/anime#easing-functions
// https://github.com/juliangarnier/anime#animation-parameters (loop, direction)

/* La bibliothèque anime nous permet de créer des animations de 'easing' relativement simplement, en utilisant des objets javascripts contenant des propriétés. Anime va prendre ces propriétés et les transformer pour nous en utilisant des courbes d'animation prédéfinies, en permettant de préciser la durée de l'animation et des propriétés diverses (comme le fait qu'une animation se joue en boucle par exemple)*/

// créer un premier objet pour la premier animation
// on va manipuler un cercle et plus précisément son rayon on créé donc un objet avec un seul paramètres
var anim1 = {
    w: 0
}

// notre deuxième animation va mainpuler les coordonnées des 3 formes géométriques
var anim2 = {
    x1: -50,
    y1: -50,
    x2: -50,
    y2: -50,
    x3: -50,
    y3: -50
}

// notre troisième animation va contrôler la position en abscisses d'un rectangle, ainsi que sa rotation
var anim3 = {
    x: 0,
    rot: 0
}

// notre quatrième animation va contrôler la position en ordonnées d'un rectangle, ainsi que sa hauteur
var anim4 = {
    y: 0,
    h: 0
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
}


function draw() {

    background(0)

    // si on appuie sur 'a', on lance la première animation
    if (keyIsDown(65)) {
        // on ré-initialise notre objet
        anim1 = {
            w: 0
        }
        // on crée notre animation avec les paramètres souhaités comme définit dans la doc de anime.js
        var animation1 = anime({
            targets: anim1,
            w: height * 0.4,
            easing: 'cubicBezier(.91, -0.54, .29, 1.56)',
            direction: 'alternate',
            loop: true,
            duration: 1000
        });
    }
    // on dessine notre ellipse ...
    push()
    noFill()
    fill(255)
    // ... en utilisant la propriété 'w' stocké dans l'objet 'anim1'
    ellipse(width * 0.5, height * 0.5, anim1.w, anim1.w)
    pop()


    if (keyIsDown(90)) {

        anim2 = {
            x1: -50,
            y1: -50,
            x2: -50,
            y2: -50,
            x3: -50,
            y3: -50
        }

        var timelineParameters = anime.timeline({
                easing: 'easeInOutElastic',
                direction: 'alternate',
                loop: false
            }).add({
                targets: anim2,
                x1: [{
                    value: width * 0.80
                }, {
                    value: width * 0.160
                }, {
                    value: width * 0.250
                }, {
                    value: -50
                }],
                y1: [{
                    value: height * 0.30
                }, {
                    value: height * 0.60
                }, {
                    value: height * 0.60
                }, {
                    value: -50
                }],
                duration: 3000
            })
            .add({
                targets: anim2,
                x2: [{
                    value: width * 0.80
                }, {
                    value: width * 0.160
                }, {
                    value: width * 0.250
                }, {
                    value: -50
                }],
                y2: [{
                    value: height * 0.30
                }, {
                    value: height * 0.90
                }, {
                    value: height * 0.60
                }, {
                    value: -50
                }],
                duration: 3000
            }, '-=1500')
            .add({
                targets: anim2,
                x3: [{
                    value: width * 0.80
                }, {
                    value: width * 0.250
                }, {
                    value: -50
                }],
                y3: [{
                    value: height * 0.60
                }, {
                    value: height * 0.30
                }, {
                    value: height * 0.30
                }, {
                    value: -50
                }],
                duration: 3000
            }, 400);
    }

    push()
    noStroke()
    fill(255, 0, 0)
    ellipse(anim2.x1, anim2.y1, 50, 50)
    fill(0, 255, 0)
    ellipse(anim2.x2, anim2.y2, 50, 50)
    fill(0, 0, 255)
    ellipse(anim2.x3, anim2.y3, 50, 50)
    pop()


    if (keyIsDown(69)) {

        anim3 = {
            x: 0,
            rot: 0
        }

        var animationMyObject = anime({
            targets: anim3,
            x: width,
            rot: TWO_PI,
            easing: 'easeOutExpo',
            direction: 'alternate',
            loop: true,
            duration: 5000
        });
    }

    push()
    noStroke()
    rectMode(CENTER)
    fill(255, 255, 0)
    translate(anim3.x, height * 0.5)
    rotate(anim3.rot)
    rect(0, 0, 80, 160)
    pop()


    if (keyIsDown(82)) {

        anim4 = {
            y: 0,
            h: 0
        }

        var animationMyObject = anime({
            targets: anim4,
            y: [
                {
                    value: height,
                    duration: 1000,
                    delay: 500,
                    elasticity: 0
                    },
                {
                    value: 0,
                    duration: 1000,
                    delay: 500,
                    elasticity: 0
                    }
                ],
            h: [
                {
                    value: [175, 50],
                    duration: 500
                    },
                {
                    value: 200,
                    duration: 50,
                    delay: 1000,
                    easing: 'easeOutExpo'
                    },
                {
                    value: 100,
                    duration: 450
                    },
                {
                    value: 175,
                    duration: 50,
                    delay: 1000,
                    easing: 'easeOutExpo'
                    },
                {
                    value: 10,
                    duration: 450
                    }
                ]
        })
    }

    push()
    noStroke()
    rectMode(CENTER)
    fill(0, 255, 255)
    rect(width * 0.5, anim4.y, 50, anim4.h)
    pop()



}



function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
