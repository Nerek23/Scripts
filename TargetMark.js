script.import("lib/RenderUtils.js");

var script = registerScript({
    name: 'TargetMark',
    version: '1.0',
    authors: ['Nerek/Virus']
});

script.registerModule({
    name: 'TargetMaker',
    category: 'Render',
    description: 'When the killaura hits a target, a square draw appears on its head.'
}, function (module) {

    var target = null;

    module.on('attack', function (event) {
        target = event.getTargetEntity();
    });

    function drawTarget() {
        enableGL2D();

        var width = 11;
        var height = 11;

        glColor(new Color(255, 0, 0, 128));
        GL11.glLineWidth(3);

        GL11.glBegin(GL11.GL_QUADS);
        GL11.glVertex2d(-width, -height);
        GL11.glVertex2d(-width, height);
        GL11.glVertex2d(width, height);
        GL11.glVertex2d(width, -height);
        GL11.glEnd();

        disableGL2D();
    }

    module.on('render3D', function (event) {
        if (target && isAttacking()) {
            var headPos = [target.posX, target.posY + target.getEyeHeight(), target.posZ];
            drawFaceToPlayer(headPos, drawTarget);
        } else {
            target = null; 
        }
    });

    var aura = moduleManager.getModule("KillAura");

    function isAttacking() {
        return (aura && aura.getState()); 
    }

});
