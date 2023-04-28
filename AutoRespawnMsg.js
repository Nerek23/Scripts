
var script = registerScript({
    name: 'AutoRespawnMsg',
    version: '1.0',
    authors: ['Nerek/Virus']
});

script.registerModule({
    name: 'AutoRespawnMsg',
    category: 'Misc',
    description: 'AutoRespawnMsg is a Minecraft script that automatically respawns the player and sends a message when they die.',
    
}, function (module) {
    var alreadySent = false;
    module.on("update", function (event) {
        if (mc.thePlayer.getHealth() <= 0 && !alreadySent) { 
            mc.thePlayer.sendChatMessage("I am dead."); 
            alreadySent = true;
        }
    });
    
    


});
