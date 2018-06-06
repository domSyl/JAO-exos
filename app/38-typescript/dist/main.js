/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Point.ts":
/*!**********************!*\
  !*** ./src/Point.ts ***!
  \**********************/
/*! exports provided: Point */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Point\", function() { return Point; });\nvar Point = /** @class */ (function () {\r\n    function Point(x, y) {\r\n        this.x = x;\r\n        this.y = y;\r\n        var s = this.toString();\r\n        if (Point.cache.has(s)) {\r\n            return Point.cache.get(s);\r\n        }\r\n        else {\r\n            Point.cache.set(s, this);\r\n        }\r\n    }\r\n    Point.prototype.toString = function () {\r\n        return \"(\" + this.x + \",\" + this.y + \")\";\r\n    };\r\n    Point.cache = new Map();\r\n    return Point;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./src/Point.ts?");

/***/ }),

/***/ "./src/conway.ts":
/*!***********************!*\
  !*** ./src/conway.ts ***!
  \***********************/
/*! exports provided: Conway */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Conway\", function() { return Conway; });\n/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Point */ \"./src/Point.ts\");\n/* harmony import */ var _sleep__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sleep */ \"./src/sleep.ts\");\n\r\n\r\nvar Conway = /** @class */ (function () {\r\n    function Conway() {\r\n        this.previousPoints = new Set();\r\n        this.points = new Set();\r\n    }\r\n    Conway.prototype.save = function () {\r\n        var pointSet = new Set();\r\n        this.grid.cells.forEach(function (row, i) { return row.forEach(function (cell, j) {\r\n            if (cell.classList.contains('active')) {\r\n                var p = new _Point__WEBPACK_IMPORTED_MODULE_0__[\"Point\"](i, j);\r\n                pointSet.add(p);\r\n            }\r\n        }); });\r\n        this.previousPoints = new Set();\r\n        this.points = pointSet;\r\n        this.render();\r\n    };\r\n    Conway.prototype.run = function () {\r\n        var _this = this;\r\n        if (!this.grid.isRunning) {\r\n            return;\r\n        }\r\n        this.iterate().then(function () {\r\n            _this.run();\r\n        });\r\n    };\r\n    Conway.prototype.render = function () {\r\n        this.grid.remove(this.previousPoints);\r\n        this.grid.add(this.points);\r\n    };\r\n    Conway.prototype.iterate = function () {\r\n        var _this = this;\r\n        return Object(_sleep__WEBPACK_IMPORTED_MODULE_1__[\"sleep\"])(this.grid.time).then(function () {\r\n            if (!_this.grid.isRunning) {\r\n                return;\r\n            }\r\n            var newPoints = _this.compute();\r\n            _this.previousPoints = _this.points;\r\n            _this.points = newPoints;\r\n            _this.render();\r\n            if (_this.points.size === 0) {\r\n                _this.grid.gridEditor.toggle();\r\n            }\r\n        });\r\n    };\r\n    Conway.prototype.compute = function () {\r\n        var _this = this;\r\n        var result = new Set();\r\n        // this.grid.getCellList().forEach(p => {\r\n        this.getPointsToLookFor().forEach(function (p) {\r\n            var around = _this.getAround(p);\r\n            var n = around.reduce(function (acc, ap) {\r\n                var result = acc;\r\n                if (_this.isAlive(ap)) {\r\n                    result++;\r\n                }\r\n                return result;\r\n            }, 0);\r\n            if (n > 3 || n < 2) {\r\n                // the cell is not alive.\r\n            }\r\n            else if (n === 3) {\r\n                // the cell is alive\r\n                result.add(p);\r\n            }\r\n            else if (n === 2) {\r\n                if (_this.isAlive(p)) {\r\n                    // the cell STAYS alive.\r\n                    result.add(p);\r\n                }\r\n            }\r\n        });\r\n        return result;\r\n    };\r\n    Conway.prototype.getAround = function (p) {\r\n        return [\r\n            new _Point__WEBPACK_IMPORTED_MODULE_0__[\"Point\"](p.x - 1, p.y - 1),\r\n            new _Point__WEBPACK_IMPORTED_MODULE_0__[\"Point\"](p.x - 1, p.y),\r\n            new _Point__WEBPACK_IMPORTED_MODULE_0__[\"Point\"](p.x - 1, p.y + 1),\r\n            new _Point__WEBPACK_IMPORTED_MODULE_0__[\"Point\"](p.x, p.y - 1),\r\n            new _Point__WEBPACK_IMPORTED_MODULE_0__[\"Point\"](p.x, p.y + 1),\r\n            new _Point__WEBPACK_IMPORTED_MODULE_0__[\"Point\"](p.x + 1, p.y - 1),\r\n            new _Point__WEBPACK_IMPORTED_MODULE_0__[\"Point\"](p.x + 1, p.y),\r\n            new _Point__WEBPACK_IMPORTED_MODULE_0__[\"Point\"](p.x + 1, p.y + 1)\r\n        ];\r\n    };\r\n    Conway.prototype.getPointsToLookFor = function () {\r\n        var _this = this;\r\n        var result = new Set();\r\n        this.points.forEach(function (p) {\r\n            result.add(p);\r\n            _this.getAround(p).forEach(function (ap) { return result.add(ap); });\r\n        });\r\n        return result;\r\n    };\r\n    Conway.prototype.isAlive = function (ap) {\r\n        return this.points.has(ap);\r\n    };\r\n    return Conway;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./src/conway.ts?");

/***/ }),

/***/ "./src/grid-editor.ts":
/*!****************************!*\
  !*** ./src/grid-editor.ts ***!
  \****************************/
/*! exports provided: GridEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GridEditor\", function() { return GridEditor; });\nvar GridEditor = /** @class */ (function () {\r\n    function GridEditor(grid) {\r\n        this.grid = grid;\r\n    }\r\n    GridEditor.prototype.render = function () {\r\n        var _this = this;\r\n        var editor = document.createElement('div');\r\n        editor.classList.add('editor');\r\n        var options = this.grid.example.getMakeMethodNames()\r\n            .map(function (m) { return \"<option value=\\\"\" + m.substr('make'.length) + \"\\\">\" + m.substr('make'.length) + \"</option>\"; })\r\n            .join();\r\n        editor.innerHTML = \"\\n<button class=\\\"toggle\\\">Start</button>\\n<button class=\\\"clear\\\">Clear</button>\\n<button class=\\\"faster\\\">Faster (+)</button>\\n<button class=\\\"slower\\\">Slower (-)</button>\\n<button class=\\\"log\\\">Log</button>\\n<select class=\\\"setup\\\" onfocus=\\\"this.selectedIndex = -1;\\\">\\n        \" + options + \"\\n</select>\\n<input type=\\\"number\\\" step=\\\"10\\\" class=\\\"gridx\\\" max=\\\"200\\\" min=\\\"40\\\">\\n\";\r\n        this.grid.element.appendChild(editor);\r\n        this.grid.element.querySelector('.editor .toggle').addEventListener('click', this.toggle.bind(this));\r\n        this.grid.element.querySelector('.editor .clear').addEventListener('click', this.clear.bind(this));\r\n        this.grid.element.querySelector('.editor .faster').addEventListener('click', this.faster.bind(this));\r\n        this.grid.element.querySelector('.editor .slower').addEventListener('click', this.slower.bind(this));\r\n        this.grid.element.querySelector('.editor .log').addEventListener('click', this.grid.log.bind(this.grid));\r\n        var select = this.grid.element.querySelector('.editor .setup');\r\n        select.addEventListener('change', function (e) {\r\n            var value = e.target.value;\r\n            _this.setup(value);\r\n        });\r\n        var gridx = this.grid.element.querySelector('.editor .gridx');\r\n        gridx['value'] = this.grid.col;\r\n        gridx.addEventListener('input', function () {\r\n            console.log('input gridx');\r\n            _this.grid.col = gridx['value'];\r\n            _this.grid.render(document.querySelector('#root'));\r\n        });\r\n    };\r\n    GridEditor.prototype.toggle = function () {\r\n        var button = this.grid.element.querySelector('.editor .toggle');\r\n        this.grid.isRunning = !this.grid.isRunning;\r\n        if (this.grid.isRunning) {\r\n            this.grid.start();\r\n            button.innerHTML = 'Stop';\r\n        }\r\n        else {\r\n            button.innerHTML = 'Start';\r\n        }\r\n    };\r\n    GridEditor.prototype.clear = function () {\r\n        if (this.grid.isRunning) {\r\n            this.toggle();\r\n        }\r\n        this.grid.hardReset();\r\n    };\r\n    GridEditor.prototype.faster = function () {\r\n        this.grid.time /= 2;\r\n    };\r\n    GridEditor.prototype.slower = function () {\r\n        this.grid.time *= 2;\r\n    };\r\n    GridEditor.prototype.setup = function (str) {\r\n        this.grid.example.set(str);\r\n    };\r\n    return GridEditor;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./src/grid-editor.ts?");

/***/ }),

/***/ "./src/grid-example.ts":
/*!*****************************!*\
  !*** ./src/grid-example.ts ***!
  \*****************************/
/*! exports provided: GridExample */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GridExample\", function() { return GridExample; });\n/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Point */ \"./src/Point.ts\");\n\r\nvar GridExample = /** @class */ (function () {\r\n    function GridExample(grid) {\r\n        this.grid = grid;\r\n    }\r\n    GridExample.prototype.getMakeMethodNames = function () {\r\n        return Object.getOwnPropertyNames(GridExample.prototype).filter(function (m) { return m.startsWith('make'); });\r\n    };\r\n    GridExample.prototype.set = function (str) {\r\n        console.log('str', str);\r\n        this.grid.hardReset();\r\n        var methodNames = this.getMakeMethodNames().filter(function (m) { return m.substr('make'.length) === str; });\r\n        if (methodNames.length === 0) {\r\n            throw new Error('Make method not found.');\r\n        }\r\n        this[methodNames[0]]();\r\n        this.grid.add(this.points);\r\n    };\r\n    GridExample.prototype.buildSet = function (array) {\r\n        var c = this.grid.getCenter();\r\n        this.points = array.reduce(function (acc, p) {\r\n            acc.add(new _Point__WEBPACK_IMPORTED_MODULE_0__[\"Point\"](c.x - p[1], c.y + p[0]));\r\n            return acc;\r\n        }, new Set());\r\n    };\r\n    GridExample.prototype.makeEmpty = function () {\r\n        this.buildSet([]);\r\n    };\r\n    GridExample.prototype.makePentominoR = function () {\r\n        this.buildSet([[0, 0], [0, 1], [1, 0], [0, -1], [-1, -1]]);\r\n    };\r\n    GridExample.prototype.makeGlider = function () {\r\n        this.buildSet([[-1, -1], [0, -1], [1, -1], [1, 0], [0, 1]]);\r\n    };\r\n    GridExample.prototype.makeLWSS = function () {\r\n        this.buildSet([[-3, 3], [0, 3], [1, 2], [-3, 1], [1, 1], [-2, 0], [-1, 0], [0, 0], [1, 0]]);\r\n    };\r\n    GridExample.prototype.makeF = function () {\r\n        this.buildSet([[-2, 6], [-1, 6], [0, 6], [-2, 5], [-2, 4], [-1, 4], [-2, 3], [-2, 2], [-2, 1]]);\r\n    };\r\n    GridExample.prototype.makeHWSS = function () {\r\n        this.buildSet([[-5, -1], [-4, -1], [-7, -2], [-2, -2], [-1, -3], [-7, -4], [-1, -4], [-6, -5], [-5, -5], [-4, -5], [-3, -5], [-2, -5], [-1, -5]]);\r\n    };\r\n    GridExample.prototype.makeTagalong = function () {\r\n        this.buildSet([[-6, 7], [-5, 7], [-4, 7], [-3, 7], [-6, 6], [-2, 6], [8, 6], [-6, 5], [6, 5], [7, 5], [-5, 4], [-2, 4],\r\n            [1, 4], [2, 4], [8, 4], [9, 4], [10, 4], [0, 3], [1, 3], [2, 3], [9, 3], [10, 3], [11, 3], [-5, 2], [-2, 2],\r\n            [1, 2], [2, 2], [8, 2], [9, 2], [10, 2], [-6, 1], [6, 1], [7, 1], [-6, 0], [-2, 0], [8, 0], [-6, -1], [-5, -1], [-4, -1], [-3, -1]]);\r\n    };\r\n    GridExample.prototype.makeM = function () {\r\n        this.buildSet([[-8, 3], [0, 3], [-8, 2], [-7, 2], [-1, 2], [0, 2], [-8, 1], [-6, 1], [-2, 1], [0, 1], [-8, 0], [-5, 0], [-3, 0], [0, 0], [-8, -1], [-4, -1], [0, -1], [-8, -2], [0, -2], [-8, -3], [0, -3], [-8, -4], [0, -4], [-8, -5], [0, -5]]);\r\n    };\r\n    return GridExample;\r\n}());\r\n\r\n;\r\n\n\n//# sourceURL=webpack:///./src/grid-example.ts?");

/***/ }),

/***/ "./src/grid.ts":
/*!*********************!*\
  !*** ./src/grid.ts ***!
  \*********************/
/*! exports provided: Grid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Grid\", function() { return Grid; });\n/* harmony import */ var _grid_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./grid-editor */ \"./src/grid-editor.ts\");\n/* harmony import */ var _grid_example__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./grid-example */ \"./src/grid-example.ts\");\n/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Point */ \"./src/Point.ts\");\n\r\n\r\n\r\nvar Grid = /** @class */ (function () {\r\n    function Grid(row, col, cellSize) {\r\n        if (cellSize === void 0) { cellSize = 30; }\r\n        this.row = row;\r\n        this.col = col;\r\n        this.cellSize = cellSize;\r\n        this.time = 20;\r\n        this.ruler = undefined;\r\n        this.isRunning = false;\r\n        this.gridEditor = undefined;\r\n        this.example = undefined;\r\n        this.gridEditor = new _grid_editor__WEBPACK_IMPORTED_MODULE_0__[\"GridEditor\"](this);\r\n        this.example = new _grid_example__WEBPACK_IMPORTED_MODULE_1__[\"GridExample\"](this);\r\n    }\r\n    Grid.prototype.render = function (element) {\r\n        console.log('render', element);\r\n        this.element = element;\r\n        var html = '';\r\n        for (var i = 0; i < this.row; i++) {\r\n            var row = '';\r\n            for (var j = 0; j < this.col; j++) {\r\n                row += \"<div style=\\\"width: \" + this.cellSize + \"px; height: \" + this.cellSize + \"px;\\\" class=\\\"cell\\\"></div>\";\r\n            }\r\n            html += \"<div class=\\\"row\\\">\" + row + \"</div>\";\r\n        }\r\n        var editor = \"<div class=\\\"editor\\\">\\n    <button class=\\\"pencil\\\">Pencil</button>\\n    <button class=\\\"eraser\\\">Eraser</button>\\n    <button class=\\\"save\\\">Save</button>\\n</div>\";\r\n        element.innerHTML = \"<div class=\\\"table\\\">\" + html + \"</div>\";\r\n        this.initCells();\r\n        this.gridEditor.render();\r\n    };\r\n    Grid.prototype.initCells = function () {\r\n        var _this = this;\r\n        this.cells = [];\r\n        Array.from(this.element.querySelectorAll('.row')).forEach(function (r) {\r\n            var row = [];\r\n            Array.from(r.querySelectorAll('.cell')).forEach(function (c) {\r\n                row.push(c);\r\n            });\r\n            _this.cells.push(row);\r\n        });\r\n        this.cells.forEach(function (row) { return row.forEach(function (c) { return c.addEventListener('click', function () {\r\n            if (c.classList.contains('active')) {\r\n                c.classList.remove('active');\r\n            }\r\n            else {\r\n                c.classList.add('active');\r\n            }\r\n        }); }); });\r\n    };\r\n    Grid.prototype.getCell = function (x, y) {\r\n        try {\r\n            return this.cells[x][y];\r\n        }\r\n        catch (e) {\r\n            return undefined;\r\n        }\r\n    };\r\n    Grid.prototype.set = function (x, y) {\r\n        var cell = this.getCell(x, y);\r\n        if (cell === undefined) {\r\n            return;\r\n        }\r\n        cell.classList.add('active');\r\n    };\r\n    Grid.prototype.unset = function (x, y) {\r\n        var cell = this.getCell(x, y);\r\n        if (cell === undefined) {\r\n            return;\r\n        }\r\n        cell.classList.remove('active');\r\n    };\r\n    Grid.prototype.add = function (points) {\r\n        var _this = this;\r\n        points.forEach(function (p) {\r\n            _this.set(p.x, p.y);\r\n        });\r\n    };\r\n    Grid.prototype.remove = function (points) {\r\n        var _this = this;\r\n        points.forEach(function (p) {\r\n            _this.unset(p.x, p.y);\r\n        });\r\n    };\r\n    Grid.prototype.hardReset = function () {\r\n        this.cells.forEach(function (r) { return r.forEach(function (c) { return c.classList.remove('active'); }); });\r\n    };\r\n    Grid.prototype.start = function () {\r\n        if (!this.ruler) {\r\n            console.log('no ruler');\r\n        }\r\n        this.ruler.save();\r\n        this.ruler.run();\r\n    };\r\n    Grid.prototype.setRuler = function (ruler) {\r\n        this.ruler = ruler;\r\n        ruler.grid = this;\r\n    };\r\n    Grid.prototype.getCenter = function () {\r\n        return new _Point__WEBPACK_IMPORTED_MODULE_2__[\"Point\"](Math.floor(this.row / 2), Math.floor(this.col / 2));\r\n    };\r\n    Grid.prototype.log = function () {\r\n        var c = this.getCenter();\r\n        var array = [];\r\n        this.cells.forEach(function (row, i) { return row.forEach(function (cell, j) {\r\n            if (cell.classList.contains('active')) {\r\n                array.push([j - c.y, c.x - i]);\r\n            }\r\n        }); });\r\n        var string = '[' + array.map(function (p) { return '[' + p.join(',') + ']'; }).join(',') + ']';\r\n        console.log('log', string);\r\n    };\r\n    return Grid;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./src/grid.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./grid */ \"./src/grid.ts\");\n/* harmony import */ var _conway__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./conway */ \"./src/conway.ts\");\n\r\n\r\nvar grid = new _grid__WEBPACK_IMPORTED_MODULE_0__[\"Grid\"](40, 40, 10);\r\ngrid.render(document.querySelector('#root'));\r\nvar conway = new _conway__WEBPACK_IMPORTED_MODULE_1__[\"Conway\"]();\r\ngrid.setRuler(conway);\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/sleep.ts":
/*!**********************!*\
  !*** ./src/sleep.ts ***!
  \**********************/
/*! exports provided: sleep */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sleep\", function() { return sleep; });\nvar sleep = function (time) {\r\n    return new Promise(function (resolve) {\r\n        setTimeout(function () {\r\n            resolve();\r\n        }, time);\r\n    });\r\n};\r\n\n\n//# sourceURL=webpack:///./src/sleep.ts?");

/***/ })

/******/ });