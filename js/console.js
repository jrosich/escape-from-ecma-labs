(function(root) {
    'use strict';


    var extendedConsole = {

        directionsEl: null,

        clearDirections: function(){
            this.directionsEl.innerHTML = '';
        },
        directionsSelectActionTarget: function(action){
            var verb = this.wrapStr(action, RL.Util.COLORS.blue);
            this.directionsEl.innerHTML = this.wrapStr('(ENTER to select, movement keys for prev/next target, esc or other to cancel)', RL.Util.COLORS.blue_alt);
        },

        logWait: function(entity){
            entity = this.wrap(entity);
            this.log(entity + ' wait for a moment');
        },
        logHeal: function(target, amount){
            target = this.wrap(target);
            var healed = this.wrapStr('Healed', RL.Util.COLORS.teal);
            amount = this.wrapStr(amount + ' hp', RL.Util.COLORS.green);
            this.log(target + ' ' + healed + ' ' + amount);
        },
        strItemUse: function(target, item){
            target = this.wrap(target);
            item = this.wrapItem(item);
            return target + ' used a ' + item;
        },
        logItemUse: function(target, item){
            this.log(this.strItemUse(target, item));
        },
        logItemUseHeal: function(target, item){
            var msg = this.strItemUse(target, item);
            var healing = this.wrapStr('healing', 'teal');
            var hp = this.wrapStr(item.healAmount + 'HP', RL.Util.COLORS.green);
            this.log(msg + ' ' + healing + ' ' + hp);
        },
        logAttack: function(source, weapon, target){

            var weaponName = this.wrapStr(weapon.name);
            var weaponDamage = this.wrapStr(weapon.damage, RL.Util.COLORS.red_alt);
            var sourceName = this.wrap(source);
            var targetName = this.wrap(target);

            var msg = '' + sourceName + ' hit ' + targetName + ' with ' + weaponName + ' dealing ' + weaponDamage + ' damage';
            if(target.dead){
                if(target instanceof RL.Furniture){
                    msg += this.wrapStr(' Destroying It', RL.Util.COLORS.red_alt);
                } else {
                    msg += this.wrapStr(' Killing It', RL.Util.COLORS.red_alt);
                }
            }
            this.log(msg);
        },
        logTileInspect: function(tile, list){
            var msg = '';
            if(list.length){
                var _this = this;
                list = list.map(function(item){
                    var result = _this.wrap(item);
                    if(item.behavior){
                        result += _this.wrapStr(' (' + item.behavior + ')', RL.Util.COLORS.orange_alt);
                    }
                    return result;
                });
                msg += this.wrap(this.game.player) + ' see: ' + list.join(' and ') + ' on ' + this.wrap(tile);
            } else {
                msg = this.wrap(this.game.player) + ' see: ' + this.wrap(tile);
            }
            this.log(msg);
        },
        logPickUp: function(entity, item){
            entity = this.wrap(entity);
            item = this.wrapItem(item);
            this.log(entity + ' picked up a ' + item);
        },
        logCanNotUseHealing: function(entity, item){
            entity = this.wrap(entity);
            item = this.wrap(item);
            this.game.console.log(entity + ' can not use healing item when at full health.');
        },
        logCanNotPickupWeapon: function(entity, currentWeapon, item){
            var currentItem = this.wrap(currentWeapon);
            entity = this.wrap(entity);
            item = this.wrap(item);
            this.game.console.log(entity + ' see a ' + item + ' but it is not as good as your ' + currentItem);
        },
        logGrab: function(entity, furniture){
            var entityName = this.wrap(entity);
            var furnitureName = this.wrap(furniture);
            this.log(entityName + ' grab ' + furnitureName);
        },
        logGrabLetGo: function(entity, furniture){
            var entityName = this.wrap(entity);
            var furnitureName = this.wrap(furniture);
            this.log(entityName + ' let go of ' + furnitureName);
        },
        logDied: function(entity){
            var entityName = this.wrap(entity);
            this.log(entityName + ' ' + this.wrapStr('died.', RL.Util.COLORS.red_alt));
        },
        logExit: function(entity){
            var entityName = this.wrap(entity);
            this.log(entityName + ' made it to the Exit. Level complete.');
        },
        logClose: function(entity, furniture){
            var entityName = this.wrap(entity);
            var furnitureName = this.wrap(furniture);
            this.log(entityName + ' close the ' + furnitureName);
        },

        logOpen: function(entity, furniture){
            var entityName = this.wrap(entity);
            var furnitureName = this.wrap(furniture);
            this.log(entityName + ' open the ' + furnitureName);
        },

        logNothingTo: function(verb){
            verb = this.wrapStr(verb, RL.Util.COLORS.blue);
            this.log(this.wrapStr('Nothing', RL.Util.COLORS.orange_alt) + ' to ' + verb);
        },

        logChooseDirection: function(verb){
            verb = this.wrapStr(verb, RL.Util.COLORS.blue);
            this.log(verb + ' where? '+ this.wrapStr('(choose direction)', RL.Util.COLORS.blue_alt));
        },

        logSelectActionTarget: function(action, target){
            var verb = this.wrapStr(action, RL.Util.COLORS.blue);
            var targetName = this.wrap(target);
            this.log(verb + ' ' + targetName + '?');
        },
        logMultipleActionTargetsFound: function(action){
            var verb = this.wrapStr(action, RL.Util.COLORS.blue);
            var directions = this.wrapStr('(ENTER to select, movement keys for prev/next target)', RL.Util.COLORS.blue_alt);
            this.log('Multiple ' + verb + ' targets found ' + directions);
        },

        wrap: function(obj){
            return this.wrapStr(obj.name, obj.consoleColor);
        },
        wrapItem: function(item){
            var name = item.name;
            if(item.statDesc){
                name += ' ' + item.statDesc;
            }
            return this.wrapStr(name, item.consoleColor);
        },
        wrapStr: function(str, color){
            var style = '';
            if(typeof color === 'string'){
                style = ' style="color:' + color + '"';
            }
            return '<strong' + style + '>' + str + '</strong>';
        }

    };
    RL.Util.merge(root.RL.Console.prototype, extendedConsole);

}(this));
