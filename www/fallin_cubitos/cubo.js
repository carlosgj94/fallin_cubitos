goog.provide('fallin_cubitos.Cubo');

goog.require('goog.math');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.Polygon');

fallin_cubitos.Cubo = function(){
    //call the parent constructor
    goog.base(this);
    x = goog.math.uniformRandom(20, 700);
    this.setSize(150, 305).setPosition(x, -90).setAnchorPoint(0, 0).setFill('#fff');
    this.muerto=true;
}

goog.inherits(fallin_cubitos.Cubo, lime.Sprite);