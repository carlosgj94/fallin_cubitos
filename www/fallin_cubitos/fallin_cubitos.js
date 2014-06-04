//set main namespace
goog.provide('fallin_cubitos');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Label');
goog.require('goog.math');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.Polygon');
goog.require('lime.scheduleManager');

var colors = ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#f1c40f', '#e67e22', '#e74c3c', '#f39c12', '#d35400', '#c0392b'];
var num_cubos = 0;
var cubitos = [];
var muertes = [];
// entrypoint
fallin_cubitos.start = function () {

    var director = new lime.Director(document.body, 868, 1280);
    director.makeMobileWebAppCapable();
    director.setDisplayFPS(false);
    var scene = new lime.Scene();
    var background_game = new lime.Sprite().setSize(868, 1110).setPosition(0, 0).setAnchorPoint(0, 0).setFill('#3498db');
    scene.appendChild(background_game);
    var diagonal = new lime.Polygon().setPosition(0, 560).setAnchorPoint(0, 0).setFill("#fff").addPoints(-40, 140, 0, 0, 1280, -500, 80, 80);
    scene.appendChild(diagonal);
    var final = new lime.Sprite().setSize(1000, 130).setPosition(0, 1180).setAnchorPoint(0, 0).setFill('rgba(0,0,0,1)');
    scene.appendChild(final);
    //create_cubos(num_cubos);

    var cubos_count = new lime.Label().setText("Cubitos:       " + num_cubos).setFontFamily('Arial').setFontColor('#fff').setFontSize(40).setPosition(170, 150);
    scene.appendChild(cubos_count);
    var time =350;
    var muerto = true;
    var cubo;
    var i;
    var j;
    var cube_movement;
    lime.scheduleManager.scheduleWithDelay(function () {
        for (i in window.cubitos) {
            if (window.cubitos[i].getPosition().y >= 1265) {
                if (window.cubitos[i].getFill().str == "#fff" && window.num_cubos >= 1) {
                    for (j in window.cubitos) {
                        window.cubitos[i].setHidden(true);
                        delete window.cubitos[i];
                        window.cubitos.splice(i, 1);
                    }
                    director.setPaused(true);
                    alert("Has hecho: " + num_cubos);
                    window.location='main.html';
                    window.num_cubos = 0;
                    cubos_count.setText("Cubitos:            " + window.num_cubos);
                    
                    
                
                } else {
                    window.cubitos[i].setHidden(true);
                    window.cubitos.splice(i, 1);
                   // console.log(window.cubitos.length);
                }
            }
        }

        create_cubos(num_cubos);
    }, muerto, time);


    function create_cubos(num_cubos) {
        muerto = true;
        muertes.push(muerto);

        x = goog.math.uniformRandom(20, 700);
        
        cubo = new lime.Sprite().setSize(175, 305).setPosition(x, -309).setAnchorPoint(0, 0).setFill('#fff');
        window.cubitos.push(cubo);
        scene.appendChild(cubo);
        //Movimiento
        cube_movement = new lime.animation.MoveTo(x, 1290).setDuration(1.3);
        cubo.runAction(cube_movement);

        goog.events.listen(cubo, ['mousedown', 'touchstart'], function (e) {
            muerto = false;
            this.setFill('#000');
            window.num_cubos++;
            cubos_count.setText("Cubitos:         " + window.num_cubos);
            color_num = goog.math.randomInt(14);
            background_game.setFill(colors[color_num]);
        });
    }



    // set current scene active
    director.replaceScene(scene);

}



//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('fallin_cubitos.start', fallin_cubitos.start);