const hammerPlayground = document.getElementById('hammer');
const hammerOptions = {};

// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(document.body, hammerOptions);

// let the pan gesture support all directions.
// this will block the vertical scrolling on a touch-device while on the element
mc.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });

// listen to events...
mc.on("panleft panright", function(ev) {
    console.log(ev);
    rotateEarth(ev.velocityX);    
});

mc.on("pandown tap", function(ev) {
    console.log('pan ended');
    rotateEarth(0);
});

mc.on("tap", function(ev) {
    console.log('örf has been touched');
});
