(function(root) {
    'use strict';

    var overlay = function(c1, c2){
        var out = c1.slice();
        for (var i = 0; i < 3; i++) {
            var a = c1[i],
                b = c2[i];
            if(b < 128){
                out[i] = Math.round(2 * a * b / 255);
            } else {
                out[i] = Math.round(255 - 2 * (255 - a) * (255 - b) / 255);
            }
        }
        return out;
    };

    var getTileDrawData = RL.Tile.prototype.getTileDrawData;

    var extendedTile = {

        blood: 0,
        maxBlood: 0.7,

        charBloodIntensity: 1.4,
        bgBloodIntensity: 0.5,
        _cachedBlood: null,
        _cachedTileData: null,
        getTileDrawData: function(){
            if(this.blood > this.maxBlood){
                this.blood = this.maxBlood;
            }
            if(this.blood === this._cachedBlood){
                return {
                    char: this._cachedTileData.char,
                    color: this._cachedTileData.color,
                    bgColor: this._cachedTileData.bgColor
                };
            }
            var tileData = getTileDrawData.call(this);

            var color = tileData.color;
            var bgColor = tileData.bgColor;
            var char = tileData.char;

            if(this.blood > 0){
                var intensity = Math.floor(this.blood * 200);
                var blood;
                if(color){
                    blood = [Math.floor(intensity * this.charBloodIntensity), 0, 0];
                    color = ROT.Color.fromString(color);
                    color = ROT.Color.add(color, blood);
                    color = ROT.Color.toRGB(color);
                }

                if(bgColor){
                    blood = [Math.floor(intensity * this.bgBloodIntensity), 0, 0];
                    bgColor = ROT.Color.fromString(bgColor);
                    bgColor = ROT.Color.add(bgColor, blood);
                    bgColor = ROT.Color.interpolate(bgColor, blood, 0.1);
                    bgColor = ROT.Color.toRGB(bgColor);
                }
            }

            tileData.char = char;
            tileData.color = color;
            tileData.bgColor = bgColor;

            this._cachedBlood = this.blood;
            this._cachedTileData = {
                char: tileData.char,
                color: tileData.color,
                bgColor: tileData.bgColor
            };
            return tileData;
        },
        getConsoleName: function(){
            return {
                name: this.name,
                color: this.consoleColor
            };
        },
    };

    RL.Util.merge(RL.Tile.prototype, extendedTile);

    var tileTypes = {
        wall_alt: {
            name: 'Wall Alt',
            char: 'X',
            color: RL.Util.COLORS.red,
            consoleColor: RL.Util.COLORS.red_alt,
            charStrokeColor: '#000',
            charStrokeWidth: 2,
            passable: false,
            blocksLos: false,
        },
        door_placeholder: {
            name: 'Door Placeholder',
            char: 'D',
            color: 'orange',
            bgColor: 'red',
            passable: true,
        },
        door_floor_placeholder: {
            name: 'Door Floor Placeholder',
            char: '.',
            color: 'orange',
            bgColor: 'red',
            passable: true,
        },
        room_placeholder: {
            name: 'Room Placeholder',
            char: '-',
            color: 'orange',
            passable: true,
        },
        room_placeholder_origin: {
            name: 'Room Placeholder Origin',
            char: 'R',
            passable: true,
        },
        exit: {
            name: 'Exit',
            char: 'X',
            color: RL.Util.COLORS.red,
            consoleColor: RL.Util.COLORS.red_alt,
            charStrokeColor: '#000',
            charStrokeWidth: 2,
            passable: true,
            blocksLos: false,
            onEntityEnter: function(entity){
                if(entity === this.game.player){
                    this.game.console.logExit(entity);
                    this.game.gameOver = true;
                }
            }
        }
    };

    for(var type in tileTypes){
        var objProto = tileTypes[type];
        RL.Tile.addType(type, objProto);
    }


}(this));
