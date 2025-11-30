/*
    Vein Miner + Tree Capitator ModPE script for MCPE 0.14.x
    Requires BlockLauncher to load.
    Created by maaamahAhh
    GitHub: https://github.com/maaamahAhh/Vein-miner-and-Tree-capitator-For-MCPE0.14.x
*/


var AXE_IDS    = [258, 271, 275, 279, 286];
var WOOD_IDS   = [17, 162];
var PICKAXE_IDS= [270, 257, 274, 278, 285];
var STONE_IDS  = [1, 7, 87];

function isInArray(arr, val){
    for(var i=0;i<arr.length;i++) if(arr[i]===val) return true;
    return false;
}

function getForwardVector(entity){
    var yaw = Entity.getYaw(entity);
    var r = yaw / 180 * Math.PI;
    var dx = -Math.sin(r);
    var dz = Math.cos(r);
    return {dx:dx, dz:dz};
}

function getRightVector(entity){
    var yaw = Entity.getYaw(entity);
    var r = (yaw+90) / 180 * Math.PI;
    var dx = -Math.sin(r);
    var dz = Math.cos(r);
    return {dx:dx, dz:dz};
}

function destroyAndDropWood(x, y, z){
    var tile = Level.getTile(x, y, z);
    if(isInArray(WOOD_IDS, tile)){
        Level.destroyBlock(x, y, z, true);
    }
}

function destroyAndDropStone(x, y, z){
    var tile = Level.getTile(x, y, z);
    if(!isInArray(STONE_IDS, tile)) return;

    if(tile === 1){
        Level.destroyBlock(x, y, z, false);
        Level.dropItem(x+0.5, y+0.5, z+0.5, 0, 4, 1, 0);
    } else {
        Level.destroyBlock(x, y, z, true);
    }
}

function destroyBlock(x, y, z, side){
    var id = Player.getCarriedItem();
    var tile = Level.getTile(x, y, z);

    var isTarget = false;
    if(isInArray(AXE_IDS, id) && isInArray(WOOD_IDS, tile)) isTarget = true;
    else if(isInArray(PICKAXE_IDS, id) && isInArray(STONE_IDS, tile)) isTarget = true;
    if(!isTarget) return;

    var player = Player.getEntity();
    var fVec = getForwardVector(player);
    var rVec = getRightVector(player);
    var fx, fz, fy;

    if(isInArray(AXE_IDS, id)){
        for(var fd=1; fd<=4; fd++){
            for(var lr=-4; lr<=4; lr++){
                fx = Math.floor(Entity.getX(player) + fVec.dx*fd + rVec.dx*lr);
                fz = Math.floor(Entity.getZ(player) + fVec.dz*fd + rVec.dz*lr);
                fy = Math.floor(Entity.getY(player));
                for(var uy=0; uy<6; uy++) destroyAndDropWood(fx, fy+uy, fz);
                for(var dy=1; dy<=6; dy++) destroyAndDropWood(fx, fy-dy, fz);
            }
        }
    } else if(isInArray(PICKAXE_IDS, id)){
        for(var fd=1; fd<=4; fd++){
            for(var lr=-4; lr<=4; lr++){
                fx = Math.floor(Entity.getX(player) + fVec.dx*fd + rVec.dx*lr);
                fz = Math.floor(Entity.getZ(player) + fVec.dz*fd + rVec.dz*lr);
                fy = Math.floor(Entity.getY(player));
                for(var uy=0; uy<4; uy++) destroyAndDropStone(fx, fy+uy, fz);
                for(var dy=1; dy<=4; dy++) destroyAndDropStone(fx, fy-dy, fz);
            }
        }
    }
}
