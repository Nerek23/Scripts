//script.import("lib/RenderUtils.js");

var script = registerScript({
    name: 'TargetStrafe',
    version: '1.0',
    authors: ['Nerek/Virus']
});

script.registerModule({
    name: 'TargetStrafe',
    category: 'Movement',
    description: 'Automatically strafes around the target while attacking it.',
    settings: {
        distance: Setting.float({
            name: 'Distance',
            min: 0.5,
            max: 8,
            default: 3
        }),
        speed: Setting.float({
            name: 'Speed',
            min: 0.1,
            max: 1,
            default: 0.28
        }),
        autoJump: Setting.boolean({
            name: 'AutoJump',
            default: true
        })
        /*
        render: Setting.boolean({
            name: 'Circle',
            default: true
        })
        */
    }
}, function (module) {
    var target = null;
    var strafing = false;
    var direction = 1;
    var lastDist = 0;


    module.on('enable', function () {
        target = null;
        strafing = false;
        direction = 1;
        lastDist = 0;
    });

    module.on('disable', function () {
        target = null;
        strafing = false;
        direction = 1;
        lastDist = 0;
    });

    module.on('attack', function (event) {
        target = event.getTargetEntity();
    });

    module.on('render3D', function (event) {
       // Soon
    });


    module.on('update', function () {
        if (target === null || !target.isEntityAlive()) {
            target = null;
            strafing = false;
            return;
        }

        var dist = Math.sqrt(mc.thePlayer.getDistanceSqToEntity(target));
        var diffY = target.posY + target.getEyeHeight() - (mc.thePlayer.posY + mc.thePlayer.getEyeHeight());

        if (dist > module.settings.distance.get() || Math.abs(diffY) > 2) {
            target = null;
            strafing = false;
            return;
        }

        var speed = module.settings.speed.get();

        if (mc.gameSettings.keyBindForward.isKeyDown() && mc.thePlayer.moveForward > 0) {
            if (module.settings.autoJump.get() && mc.thePlayer.onGround) {
                mc.thePlayer.jump();
            }

            if (strafing) {
                var strafe = mc.thePlayer.moveStrafing;
                var forward = mc.thePlayer.moveForward;
                var yaw = mc.thePlayer.rotationYaw;

                if (forward > 0) {
                    yaw += (direction == 1 ? -45 : 45);
                } else if (forward < 0) {
                    yaw += (direction == 1 ? 45 : -45);
                }

                if (mc.gameSettings.keyBindLeft.isKeyDown() || mc.gameSettings.keyBindRight.isKeyDown()) {
                    strafe = mc.gameSettings.keyBindLeft.isKeyDown() ? -1 : 1;
                    yaw += (strafe == direction ? 45 : -45);
                    direction = strafe;
                }

                var xDir = Math.cos((yaw + 90) * Math.PI / 180);
                var zDir = Math.sin((yaw + 90) * Math.PI / 180);

                mc.thePlayer.motionX = xDir * speed;
                mc.thePlayer.motionZ = zDir * speed;
            } else {
                strafing = true;
            }
        } else {
            strafing = false;
        }
    });
});