/* Copyright (c) 2006-2011 by OpenLayers Contributors (see authors.txt for
 * full list of contributors). Published under the Clear BSD license.
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */


/**
 * @requires OpenLayers/Layer/Grid.js
 * @requires OpenLayers/Tile/Image.js
 */

/**
 * Class: OpenLayers.Layer.JGSIv3
 * The class is to access "Denshi kokudo v2/v3" tiles provided by "Geospatial Information Authority of Japan (GSI)".
 * NOTE - The tiles are not square, so we have to use very tricky logics. be careful to modify/upgrade the Grid base class.
 *
 * Inherits from:
 *  - <OpenLayers.Layer.Grid>
 *
 */
OpenLayers.Layer.JGSIv3 = OpenLayers.Class(
                                  OpenLayers.Layer.Grid, {

    /**
     * Constant: MIN_ZOOM_LEVEL
     * {Integer} 0
     */
    MIN_ZOOM_LEVEL: 6,

    /**
     * Constant: MAX_ZOOM_LEVEL
     * {Integer} 21
     */
    MAX_ZOOM_LEVEL: 18,

    SCALE_DATA: [
        {
            level: 30720,                                                 // 縮尺名( 画像のサイズ 単位 100m )
            scale: 10000000,                                              // 縮尺
            scaleRange: { lower:9000000, upper:30000000 },
            displayLevel : 10000,
            resolution: { x:0.02844444444444444, y:0.02140979689366786 }, // 度/ピクセル
            lt: { x:102.4, y:68.26666666666666 },                         // 範囲の左上
            rb: { x:179.2, y:8.53333333333333 },                          // 範囲の右下
            url: "raster/30720/new",
            suffix :'-img.png',
            currentAlt: "JAPAN_ALL"
        },
        {
            level: 15360,
            scale: 5000000,
            scaleRange: { lower:5000000, upper:9000000 },
            displayLevel : 10000,
            resolution: { x:0.014222222222222223, y:0.011329940252268201 },
            lt: { x:110.93333333333333, y:59.73333333333333 },
            rb: { x:166.4, y:8.53333333333333 },
            url: "raster/15360/new",
            suffix :'-img.png',
            currentAlt: "JAPAN_ALL"
        },
        {
            level: 7680,
            scale: 2400000,
            scaleRange: { lower:2400000, upper:5000000 },
            displayLevel : 3000,
            resolution: { x:0.007111111111111111, y:0.005757121439280361 },
            lt: { x:115.2, y:53.33333333333333 },
            rb: { x:160, y:14.93333333333333 },
            url: "raster/7680/new",
            suffix :'-img.png',
            currentAlt: "JAPAN_ALL"
        },
        {
            level: 3840,
            scale: 1200000,
            scaleRange: { lower:1200000, upper:2400000 },
            displayLevel : 3000,
            resolution: { x:0.00345945945945946, y:0.002930134603058328 },
            lt: { x:118.4, y:49.06666666666666 },
            rb: { x:156.8, y:17.06666666666666 },
            url: "3840bafd/new",
            suffix :'-img.png',
            currentAlt: "bafd"
        },
        {
            level: 1920,
            scale: 600000,
            scaleRange: { lower:600000, upper:1200000 },
            displayLevel : 3000,
            resolution: { x:0.001777777777777778, y:0.0014555615120944818 },
            lt: { x:120, y:48.53333333333333 },
            rb: { x:150.4, y:18.66666666666666 },
            url: "1920bafd/new",
            suffix :'-img.png',
            currentAlt: "bafd"
        },
        {
            level: 960,
            scale: 300000,
            scaleRange: { lower:300000, upper:600000 },
            displayLevel : 200,
            resolution: { x:0.0008815426997245183, y:0.0007325233315724598 },
            lt: { x:120.266666666666666, y:47.73333333333333 },
            rb: { x:152.266666666666666, y:20 },
            url: "960bafd/new",
            suffix :'-img.png',
            currentAlt: "bafd"
        },
        {
            level: 480,
            scale: 150000,
            scaleRange: { lower:150000, upper:300000 },
            displayLevel : 200,
            resolution: { x:0.00044444444444444425, y:0.0003651559667991687 },
            lt: { x:120.666666666666666, y:47.466666666666666 },
            rb: { x:150.133333333333333, y:20 },
            url: "480bafd/new",
            suffix :'-img.png',
            currentAlt: "bafd"
        },
        {
            level: 240,
            scale: 75000,
            scaleRange: { lower:75000, upper:150000 },
            displayLevel : 200,
            resolution: { x:0.0002222222222222222, y:0.00018266812441229002 },
            lt: { x:121, y:47.066666666666666 },
            rb: { x:150.066666666666666, y:20 },
            url: "240bafd/new",
            suffix :'-img.png',
            currentAlt: "bafd"
        },
        {
            level: 120,
            scale: 36000,
            scaleRange: { lower:36000, upper:75000 },
            displayLevel : 50,
            resolution: { x:0.0001111111111111111, y:0.00009013505258105335 },
            lt: { x:122, y:46.033333333333333 },
            rb: { x:149.033333333333333, y:24 },
            url: "120bafd/new",
            suffix :'-img.png',
            currentAlt: "bafd"
        },
        {
            level: 60,
            scale: 18000,
            scaleRange: { lower:18000, upper:36000 },
            displayLevel : 25,
            resolution: { x:0.00005555555555555556, y:0.000045938749511900786 },
            lt: { x:122, y:45.999999999999999 },
            rb: { x:153.999999999999999, y:20 },
            url: "60nti/new",
            suffix :'-img.png',
            currentAlt: "NTI"
        },
        {
            level: 30,
            scale: 9000,
            scaleRange: { lower:9000, upper:18000 },
            displayLevel : 25,
            resolution: { x:0.00002777777777777778, y:0.00002296176777351219 },
            lt: { x:122, y:45.999999999999999 },
            rb: { x:153.999999999999999, y:20 },
            url: "30nti/new",
            suffix :'-img.png',
            currentAlt: "NTI"
        },
        {
            level: 15,
            scale: 4500,
            scaleRange: { lower:4500, upper:9000 },
            displayLevel : 25,
            resolution: { x:0.00001388888888888889, y:0.000011479028697571744 },
            lt: { x:122, y:45.999999999999999 },
            rb: { x:153.999999999999999, y:20 },
            url: "15nti/new",
            suffix :'-img.png',
            currentAlt: "NTI"
        },
        {
            level: 7.5,
            scale: 2500,
            scaleRange: { lower:1000, upper:4500 },
            displayLevel : 0.5,
            resolution: { x:0.000006944444444444445, y:0.000005739060798285698 },
            lt: { x:122, y:45.999999999999999 },
            rb: { x:153.999999999999999, y:20 },
            url: "7.5fgd/new",
            suffix :'-img.png',
            currentAlt: "FGD_L"
        }  /* ,
        {
            level: 3,
            scale: 1000,
            scaleRange: { lower:100, upper:1000 },
            displayLevel : 0.5,
            resolution: { x:0.000002777777777777778, y:0.0000022955091982377905 },
            lt: { x:122, y:45.999999999999999 },
            rb: { x:153.999999999999999, y:20 },
            url: "",
            suffix :'-img.png',
            currentAlt: null
        } */
    ],

    /**
     * APIProperty: sphericalMercator
     * {Boolean} Should the map act as a mercator-projected map? This will
     *     cause all interactions with the map to be in the actual map
     *     projection, which allows support for vector drawing, overlaying
     *     other maps, etc.
     */
    sphericalMercator: false,

    /**
     * Constant: RESOLUTIONS
     * {Array(Float)} Hardcode these resolutions so that they are more closely
     *                tied with the standard wms projection
     */

    RESOLUTIONS: [
        1.40625,
        0.703125,
        0.3515625,
        0.17578125,
        0.087890625,
        0.0439453125,
        0.02197265625,
        0.010986328125,
        0.0054931640625,
        0.00274658203125,
        0.001373291015625,
        0.0006866455078125,
        0.00034332275390625,
        0.000171661376953125,
        0.0000858306884765625,
        0.00004291534423828125,
        0.00002145767211914062,
        0.00001072883605957031,
        0.00000536441802978515,
        0.00000268220901489257,
        0.0000013411045074462891,
        0.00000067055225372314453
    ],


    /**
     * APIProperty: serviceVersion
     * {String} Service version for tile requests.  Default is "1.0.0".
     */
    serviceVersion: "1.0.0",

    /**
     * APIProperty: layername
     * {String} The identifier for the <TileMap> as advertised by the service.
     *     For example, if the service advertises a <TileMap> with
     *    'href="http://tms.osgeo.org/1.0.0/vmap0"', the <layername> property
     *     would be set to "vmap0".
     */
    layername: null,

    /**
     * APIProperty: type
     * {String} The format extension corresponding to the requested tile image
     *     type.  This is advertised in a <TileFormat> element as the
     *     "extension" attribute.  For example, if the service advertises a
     *     <TileMap> with <TileFormat width="256" height="256" mime-type="image/jpeg" extension="jpg" />,
     *     the <type> property would be set to "jpg".
     */
    type: null,

    /**
     * APIProperty: isBaseLayer
     * {Boolean} Make this layer a base layer.  Default is true.  Set false to
     *     use the layer as an overlay.
     */
    isBaseLayer: true,

    /**
     * APIProperty: tileOrigin
     * {<OpenLayers.LonLat>} Optional origin for aligning the grid of tiles.
     *     If provided, requests for tiles at all resolutions will be aligned
     *     with this location (no tiles shall overlap this location).  If
     *     not provided, the grid of tiles will be aligned with the bottom-left
     *     corner of the map's <maxExtent>.  Default is ``null``.
     *
     * Example:
     * (code)
     *     var layer = OpenLayers.Layer.JGSIv3(
     *         "My Layer",
     *         "http://tilecache.osgeo.org/wms-c/Basic.py/",
     *         {
     *             layername: "basic",
     *             type: "png",
     *             // set if different than the bottom left of map.maxExtent
     *             tileOrigin: new OpenLayers.LonLat(-180, -90)
     *         }
     *     );
     * (end)
     */
    tileOrigin: null,

    /**
     * APIProperty: serverResolutions
     * {Array} A list of all resolutions available on the server.  Only set this
     *     property if the map resolutions differs from the server.
     */
    serverResolutions: null,

    /**
     * APIProperty: zoomOffset
     * {Number} If your cache has more zoom levels than you want to provide
     *     access to with this layer, supply a zoomOffset.  This zoom offset
     *     is added to the current map zoom level to determine the level
     *     for a requested tile.  For example, if you supply a zoomOffset
     *     of 3, when the map is at the zoom 0, tiles will be requested from
     *     level 3 of your cache.  Default is 0 (assumes cache level and map
     *     zoom are equivalent).  Using <zoomOffset> is an alternative to
     *     setting <serverResolutions> if you only want to expose a subset
     *     of the server resolutions.
     */
    zoomOffset: 0,

    baseURL: "http://cyberjapandata.gsi.go.jp/data/",
    iconURL: "http://cyberjapan.jp/images/icon01.gif",

    /**
     * Constructor: OpenLayers.Layer.TMS
     *
     * Parameters:
     * name - {String} Title to be displayed in a <OpenLayers.Control.LayerSwitcher>
     * url - {String} Service endpoint (without the version number).  E.g.
     *     "http://tms.osgeo.org/".
     * options - {Object} Additional properties to be set on the layer.  The
     *     <layername> and <type> properties must be set here.
     */
    initialize: function(options) {
        options = OpenLayers.Util.applyDefaults(options, {
            useNativeResolutions: false
        });

        // singleTile mode must be OFF!!
        this.singleTile = false;

        var name = options.name || "電子国土基本図";// + (options.type || this.type);

        var newArgs = [name, null, {}, options];

        OpenLayers.Layer.Grid.prototype.initialize.apply(this, newArgs);

        this._epsg4326 = new OpenLayers.Projection("EPSG:4326");

        //
        //   Create JGSI Logo
        //
        var px = new OpenLayers.Pixel(5,30);
        var sz= new OpenLayers.Size(32,32);

        var poweredBy_div = OpenLayers.Util.createDiv(OpenLayers.Util.createUniqueID("OpenLayers.Control.JGSI_"),
            px,         // px : The element left and top position
            sz,         // sz : The element width and height The element width and height
            this.iconURL,
            "absolute", // position: The style.position value. eg: absolute, relative etc
            "2px",      // border
            "hidden",   // overflow
            1.0         // opacity
            );

        this.poweredBy =  poweredBy_div;

        this.poweredBy.style.zIndex = "1100";
        this.poweredBy.style.left = "10px";
        this.poweredBy.style.top = "";
        this.poweredBy.style.bottom = "10px";
        this.poweredBy.style.className = "olLayerJGSI_PoweredBy";

//      var parent = this.map.viewPortDiv;
//      parent.appendChild(poweredBy_div);

        this.events.register( 'visibilitychanged', this, function() {
            if (this.visibility === false) {
                this.poweredBy.style.display = "none";
            } else {
                this.poweredBy.style.display = "";
            }
        });

        if(this.visibility === false ) this.poweredBy.style.display = "none";

        // overwrite it
        this._moveGriddedTiles = OpenLayers.Function.bind(
            this.moveGriddedTiles, this
        );
    },

    /**
     * APIMethod:destroy
     */
    destroy: function() {
        // for now, nothing special to do here.
        OpenLayers.Layer.Grid.prototype.destroy.apply(this, arguments);
    },


    /**
     * APIMethod: clone
     * Create a complete copy of this layer.
     *
     * Parameters:
     * obj - {Object} Should only be provided by subclasses that call this
     *     method.
     *
     * Returns:
     * {<OpenLayers.Layer.TMS>} An exact clone of this <OpenLayers.Layer.TMS>
     */
    clone: function (obj) {
        if (obj == null) {
            obj = new OpenLayers.Layer.JGSIv3(this.getOptions());
        }

        //get all additions from superclasses
        obj = OpenLayers.Layer.Grid.prototype.clone.apply(this, [obj]);

        // copy/set any non-init, non-simple values here

        return obj;
    },

    getScaleInfo: function() {
		var scale = this.map.getScale();
		var maxLength = this.SCALE_DATA.length;

	//	OpenLayers.Console.log("scale; %s", scale);

		for (var i = 0; i < maxLength; i++) {
			//var tmp = 6250000 / Math.pow(2, i);
			var tmp = 7000000 / Math.pow(2, i);
	//		OpenLayers.Console.log("tmp; %s", tmp);
			if (scale >= tmp) {
				return this.SCALE_DATA[i];
			}
		}
		return this.SCALE_DATA[maxLength - 1];
    },

    assignTile: function(tile, tileX, tileY, viewport) {
        viewport = viewport || this.map.getExtent();

        var tileBounds = this.getTileBoundsByXY(tileX, tileY);
        var resolution = this.getServerResolution();

        var tileSize = this.getImageSize(tileBounds);

        if (tileSize.w < 10 || tileSize.h < 10 || isNaN(tileSize.h) || isNaN(tileSize.w)) {
			//OpenLayers.Console.open();
			//OpenLayers.Console.log("tileSize is invalid: (%s, %s) for tileXY(%s, %s)", tileSize.w, tileSize.h, tileX, tileY);
            return null;
        }

        var layerContainerDivLeft = parseInt(this.map.layerContainerDiv.style.left);
        var layerContainerDivTop = parseInt(this.map.layerContainerDiv.style.top);

        var x = (tileBounds.left - viewport.left) / resolution;
        x -= layerContainerDivLeft;
        // NB: opposite direction.
        var y = (viewport.top - tileBounds.top) / resolution;
        y -= layerContainerDivTop;

        var px = new OpenLayers.Pixel(x, y);

        if (tile) {
            tile.size = tileSize; // XXX: force update tile size
            tile.moveTo(tileBounds, px, false);
        } else {
            tile = new OpenLayers.Tile.Image(this, px, tileBounds, null,
                                                     tileSize, this.tileOptions);
        }

        return tile;
    },

    /**
     * Method: shiftRow
     * Shifty grid work
     *
     * Parameters:
     * prepend - {Boolean} if true, prepend to beginning.
     *                          if false, then append to end
     */
    shiftRow:function(prepend, dont_rotate) {
        var grid = this.grid;
        var modelRow = grid[(prepend) ? 0 : (this.grid.length - 1)];

        var row;
        if (dont_rotate) {
            row = [];
        } else {
            row = (prepend) ? grid.pop() : grid.shift();
        }

        for (var i=0, len=modelRow.length; i<len; i++) {
            var modelTile = modelRow[i];
            var tileIndex = this.getTileIndexByLonLat(modelTile.bounds.getCenterLonLat());

            var tile = row[i] || null;
            tile = this.assignTile(tile, tileIndex.x, tileIndex.y + (prepend ? 1 : -1));
			if (!tile) {
				//OpenLayers.Console.log("error on shiftRow");
				return ;
			}
            tile.draw();

            if (!row[i]) {
                row.push(tile);
            }
        }

        if (prepend) {
            grid.unshift(row);
        } else {
            grid.push(row);
        }
    },

    /**
     * Method: shiftColumn
     * Shift grid work in the other dimension
     *
     * Parameters:
     * prepend - {Boolean} if true, prepend to beginning.
     *                          if false, then append to end
     */
    shiftColumn: function(prepend, dont_rotate) {
        for (var i=0, len=this.grid.length; i<len; i++) {
            var row = this.grid[i];
            var modelTile = row[(prepend) ? 0 : (row.length - 1)];
            var tileIndex = this.getTileIndexByLonLat(modelTile.bounds.getCenterLonLat());

            var tile = null;
            if (!dont_rotate) {
                tile = prepend ? this.grid[i].pop() : this.grid[i].shift();
            }

            tile = this.assignTile(tile, tileIndex.x + (prepend ? -1 : 1), tileIndex.y);
			if (!tile) {
				//OpenLayers.Console.log("error on shiftColumn");
				return ;
			}
            tile.draw();

            if (prepend) {
                row.unshift(tile);
            } else {
                row.push(tile);
            }
        }
    },

    moveGriddedTiles: function() {
        var shifted = true;
        var buffer = this.buffer || 0;
        var mapBounds = this.map.getExtent();
        if (mapBounds == null) return ;

        // exclude buffer tiles
        var ltTileIndex = this.getTileIndexByLonLat(new OpenLayers.LonLat(mapBounds.left, mapBounds.top));
        var rbTileIndex = this.getTileIndexByLonLat(new OpenLayers.LonLat(mapBounds.right, mapBounds.bottom));
        if (!ltTileIndex || !rbTileIndex) return ;
		if (ltTileIndex.x < 0 || ltTileIndex.y < 0) return ; // XXX: hmm... it's buggy...
        ltTileIndex.x -= this.buffer;
        ltTileIndex.y += this.buffer;
        rbTileIndex.x += this.buffer;
        rbTileIndex.y -= this.buffer;

        var minRows = ltTileIndex.y - rbTileIndex.y + 1;
        var minCols = rbTileIndex.x - ltTileIndex.x + 1;

        var numRows = this.grid.length;
        var numCols = this.grid[numRows - buffer - 1].length;

        // XXX: avoid timing bug for this.grid. it may have some race condition.
        var ltTile = null, rbTile = null, tileBounds = null;
        try {
            ltTile = this.grid[buffer][buffer].bounds;
            rbTile = this.grid[numRows - buffer - 1][numCols - buffer - 1].bounds;
            tileBounds = new OpenLayers.Bounds(ltTile.left, rbTile.bottom, rbTile.right, ltTile.top);
        } catch (e) {
            OpenLayers.Console.log("  Exception: %s", e);
            OpenLayers.Console.log("    mapBounds : (%s)", mapBounds);
            OpenLayers.Console.log("    tileBounds: (%s)", tileBounds);
            OpenLayers.Console.log("    buffer; %s", buffer);
            OpenLayers.Console.log("    minRows; %s, minCols; %s", minRows, minCols);
            OpenLayers.Console.log("    numRows; %s, numCols; %s", numRows, numCols);
            OpenLayers.Console.log("    this.grid[0].length; %s", this.grid[0].length);
            OpenLayers.Console.log("    this.grid[%s].length; %s", numRows - buffer - 1, this.grid[numRows - buffer - 1].length);
        }

        if (ltTile && rbTile && tileBounds) {
            if (tileBounds.left > mapBounds.left) {
                this.shiftColumn(true, minCols > numCols);
            } else if (tileBounds.right < mapBounds.right) {
                this.shiftColumn(false, minCols > numCols);
            } else if (tileBounds.top < mapBounds.top) {
                this.shiftRow(true, minRows > numRows);
            } else if (tileBounds.bottom > mapBounds.bottom) {
                this.shiftRow(false, minRows > numRows);
            } else {
                shifted = false;
            }
        }
        if (shifted) {
            // we may have other row or columns to shift, schedule it
            // with a setTimeout, to give the user a chance to sneak
            // in moveTo's
            this.timerId = window.setTimeout(this._moveGriddedTiles, 0);
        }
    },

    getTileBoundsByXY: function(tileIndexX, tileIndexY) {
        var scaleInfo = this.getScaleInfo();
        if (!scaleInfo) return null;

        var tileOriginLon = tileIndexX * scaleInfo.level / 3600.0;
        var tileOriginLat = tileIndexY * scaleInfo.level / 3600.0;

        var tileLonLength = scaleInfo.level / 3600.0;
        var tileLatLength = scaleInfo.level / 3600.0;

        return (new OpenLayers.Bounds(
            tileOriginLon,
            tileOriginLat,
            tileOriginLon + tileLonLength,
            tileOriginLat + tileLatLength
        )).transform(this._epsg4326, this.map.projection);
    },

    getTileIndexByLonLat: function(lonlat) {
        var scaleInfo = this.getScaleInfo();
        if (!scaleInfo) return null;

        // Tile indices are derived from normal lat lon.
        lonlat = lonlat.clone().transform(this.map.projection, this._epsg4326);

        var tileIndexX = Math.floor(lonlat.lon * 3600 / scaleInfo.level);
        var tileIndexY = Math.floor(lonlat.lat * 3600 / scaleInfo.level);

        return {x: tileIndexX, y: tileIndexY};
    },

    calculateGridLayout: function(bounds, origin, resolution) {
        // this function is not available on this class.
        return null;
    },

    addTile: function(tileInfo) {
        // this function is not available on this class.
        return null;
    },


    initGriddedTiles: function(mapBounds) {
		//OpenLayers.Console.log("JGSIv3 :: initGriddedTiles");
		//OpenLayers.Console.log("  bounds; %s", mapBounds);
        var ltTileIndex = this.getTileIndexByLonLat(new OpenLayers.LonLat(mapBounds.left, mapBounds.top));
        var rbTileIndex = this.getTileIndexByLonLat(new OpenLayers.LonLat(mapBounds.right, mapBounds.bottom));
        if (!ltTileIndex || !rbTileIndex) return null;
		if (ltTileIndex.x < 0 || ltTileIndex.y < 0) {
			//OpenLayers.Console.open();
			//OpenLayers.Console.dir(this.map.getExtent());
			return null; // XXX: hmm... it's buggy...
		}
        ltTileIndex.x -= this.buffer;
        ltTileIndex.y += this.buffer;
        rbTileIndex.x += this.buffer;
        rbTileIndex.y -= this.buffer;

        var numRows = ltTileIndex.y - rbTileIndex.y + 1;
        var numCols = rbTileIndex.x - ltTileIndex.x + 1;

        var layerContainerDivLeft = parseInt(this.map.layerContainerDiv.style.left);
        var layerContainerDivTop = parseInt(this.map.layerContainerDiv.style.top);

        // tile size may be differ
//      this.clearGrid();

        var rowidx = 0;
        var colidx = 0;
        var tileData = [], center = this.map.getCenter();
        for (rowidx = 0; rowidx < numRows; rowidx++) {
            var row = this.grid[rowidx];
            if (!row) {
                row = [];
                this.grid.push(row);
            }

            for (colidx = 0; colidx < numCols; colidx++) {
                var tile = row[colidx];
                if (!tile) {
                    tile = this.assignTile(null, ltTileIndex.x + colidx, ltTileIndex.y - rowidx, mapBounds);
					if (!tile) return ;
                    this.addTileMonitoringHooks(tile);
                    row.push(tile);
                } else {
                    tile = this.assignTile(tile, ltTileIndex.x + colidx, ltTileIndex.y - rowidx, mapBounds);
					if (!tile) return ;
                }
                var tileCenter = tile.bounds.getCenterLonLat();
                tileData.push({
                    tile: tile,
                    distance: Math.pow(tileCenter.lon - center.lon, 2) +
                        Math.pow(tileCenter.lat - center.lat, 2)
                });
            }
        }

        this.origin = this.grid[0][0].position;

        //shave off exceess rows and colums
        this.removeExcessTiles(rowidx, colidx);

        // store the resolution of the grid
        this.gridResolution = this.getServerResolution();

        //now actually draw the tiles
        tileData.sort(function(a, b) {
			return a.distance - b.distance;
        });

        for (var i=0, ii=tileData.length; i<ii; ++i) {
            tileData[i].tile.draw();
        }
    },

    /**
     * Method: getURL
     *
     * Parameters:
     * bounds - {<OpenLayers.Bounds>}
     *
     * Returns:
     * {String} A string with the layer's url and parameters and also the
     *          passed-in bounds and appropriate tile size specified as
     *          parameters
     */
    getURL: function (bounds) {
        // ------  Get URL of 基盤地図情報  -----------
        function getZeroPatString(value, len) {
            var svalue = value.toString();
            var slen = svalue.length;
            var i;
            var patLength = len - slen;

            for (i = 0; i<patLength; i++) {
                svalue = '0' + svalue;
            }
            return svalue;
        }

        function makeImageFileName(l, t, suffix) {
            var ls = getZeroPatString(l, 8);
            var ts = getZeroPatString(t, 8);

            if (ls.charAt(0) == '0') {
                ls = ls.substr(1, 7);
            }

            if (ts.charAt(0) == '0') {
                ts = ts.substr(1, 7);
            }

            return '/' +  ls + '/' + ls + '-' + ts + suffix;
        }

        var scaleInfo = this.getScaleInfo();
        if (!scaleInfo) return null;

        var LB = new OpenLayers.LonLat(bounds.left, bounds.bottom);
        LB = LB.transform(this.map.projection, this._epsg4326);

        var x = Math.round(LB.lon*360000);
        var y = Math.round(LB.lat*360000);

        var path =makeImageFileName(x, y, scaleInfo.suffix);

        var url = this.baseURL + scaleInfo.url + path;

        return url;
    },

    getImageSize: function(tileBounds) {
        var resolution = this.getServerResolution();
        //OpenLayers.Console.log("tileBounds; %s, resolution; %s", tileBounds, resolution);
        //OpenLayers.Console.log("right - left; %s", (tileBounds.right - tileBounds.left));

        return new OpenLayers.Size(
            // ceil to fill up the tile chip.
            Math.ceil((tileBounds.right - tileBounds.left) / resolution),
            Math.ceil((tileBounds.top - tileBounds.bottom) / resolution)
        );
    },

    /**
     * Method: setMap
     * When the layer is added to a map, then we can fetch our origin
     *    (if we don't have one.)
     *
     * Parameters:
     * map - {<OpenLayers.Map>}
     */
    setMap: function(map) {
        // 30720/3600 / 300
        var maxResolution = .02844444444444444444;
        if (this.sphericalMercator || map.projection.equals(new OpenLayers.Projection("EPSG:900913"))) {
            OpenLayers.Console.log("The base map using 900913 projection");
            OpenLayers.Util.extend(this, {
                maxExtent: new OpenLayers.Bounds(
                    -128 * 156543.03390625,
                    -128 * 156543.03390625,
                    128 * 156543.03390625,
                    128 * 156543.03390625
                ),
                maxResolution: 156543.03390625,
                units: "m",
                projection: "EPSG:900913"
            });

            // RESOLUTIONS、units 及び projectionの再定義
            OpenLayers.Util.extend(this, OpenLayers.Layer.SphericalMercator);
            this.initMercatorParameters();

            // 40075016.68000000/360 * 30720/3600 / 300
            maxResolution = 3166.42107101234567901234;
        }
        if (this.useNativeResolutions) {
            // override the mercator resolutions
            for(var zoom=this.MIN_ZOOM_LEVEL; zoom<=this.MAX_ZOOM_LEVEL; ++zoom) {
                this.RESOLUTIONS[zoom] = maxResolution / Math.pow(2, zoom - this.MIN_ZOOM_LEVEL);
            }
        }

        OpenLayers.Layer.prototype.setMap.apply(this, arguments);
        OpenLayers.Layer.FixedZoomLevels.prototype.initResolutions.apply(this);

        OpenLayers.Layer.Grid.prototype.setMap.apply(this, arguments);
        if (!this.tileOrigin) {
            this.tileOrigin = new OpenLayers.LonLat(this.map.maxExtent.left,
                                                this.map.maxExtent.bottom);
        }
        this.map.viewPortDiv.appendChild(this.poweredBy);
    },

    /**
     * Method: removeExcessTiles
     * When the size of the map or the buffer changes, we may need to
     *     remove some excess rows and columns.
     *
     * Parameters:
     * rows - {Integer} Maximum number of rows we want our grid to have.
     * columns - {Integer} Maximum number of columns we want our grid to have.
     */
    removeExcessTiles: function(rows, columns) {

        // remove extra rows
        while (this.grid.length > rows) {
            var row = this.grid.pop();
            for (var i=0, l=row.length; i<l; i++) {
                var tile = row[i];
                this.removeTileMonitoringHooks(tile);
                tile.destroy();
            }
        }

        // remove extra columns
        for (var i=0, l=this.grid.length; i<l; i++) {
            while (this.grid[i].length > columns) {
                var row = this.grid[i];
                var tile = row.pop();
                this.removeTileMonitoringHooks(tile);
                tile.destroy();
            }
        }
    },

    getServerResolution: function() {
        if (OpenLayers.Layer.Grid.prototype.getServerResolution) {
            return OpenLayers.Layer.Grid.prototype.getServerResolution.apply(this, arguments);
        }
        return this.map.getResolution();
    },

    CLASS_NAME: "OpenLayers.Layer.JGSIv3"
});
