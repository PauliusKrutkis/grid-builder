/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Events__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return props; });


var props = {
    storage: {},

    saveProp: function saveProp(args) {
        var blockProps = this.getProps(args.id);
        var params = blockProps ? blockProps : {};

        params[args.group] = args.value;
        this.storage[args.id] = params;
        __WEBPACK_IMPORTED_MODULE_0__Events__["a" /* events */].emit('save');
    },
    storeProps: function storeProps(id, props) {
        this.storage[id] = props;
    },
    getProps: function getProps(id) {
        return this.storage[id];
    },
    removeProp: function removeProp(group, id) {
        var blockProps = this.getProps(id);
        delete blockProps[group];
    }
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return events; });
var events = {
    events: {},
    on: function on(eventName, fn) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
    },
    off: function off(eventName, fn) {
        if (this.events[eventName]) {
            for (var i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][i] === fn) {
                    this.events[eventName].splice(i, 1);
                    break;
                }
            };
        }
    },
    emit: function emit(eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(function (fn) {
                fn(data);
            });
        }
    }
};

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Block__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Props__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var Grid = function () {
    function Grid(element, data) {
        _classCallCheck(this, Grid);

        this.options = {
            cellHeight: 40,
            verticalMargin: 10,
            float: true,
            animate: true,
            alwaysShowResizeHandle: true
        };

        this.element = $(element);
        this.data = $(data);
        this.grid = this.element.gridstack(this.options).data('gridstack');
        this.blocks = [];
    }

    _createClass(Grid, [{
        key: 'getInstance',
        value: function getInstance() {
            return this.grid;
        }
    }, {
        key: 'getElement',
        value: function getElement() {
            return this.element;
        }
    }, {
        key: 'getBlocks',
        value: function getBlocks(id) {
            return this.blocks;
        }
    }, {
        key: 'getBlock',
        value: function getBlock(id) {
            return $('div[data-gs-id="' + id + '"]');
        }
    }, {
        key: 'getBlockParentId',
        value: function getBlockParentId(id) {
            var block = this.getBlock(id);
            var parentGrid = block.parent();

            if (!parentGrid.hasClass('grid-stack-nested')) return null;

            return parentGrid.parent().parent().data('gs-id');
        }
    }, {
        key: 'addBlock',
        value: function addBlock(parent) {
            var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
            var width = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 6;
            var height = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 3;
            var autoPosition = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
            var id = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;

            var block = new __WEBPACK_IMPORTED_MODULE_0__Block__["a" /* default */](x, y, width, height, autoPosition, id, this.grid, parent);
            this.blocks.push(block);
        }
    }, {
        key: 'removeBlock',
        value: function removeBlock(id) {
            var block = this.getBlock(id);
            var instance = block.parent().gridstack(this.options).data('gridstack');
            instance.removeWidget(block);
        }
    }, {
        key: 'save',
        value: function save() {
            var _this = this;

            var items = '.grid-stack-item';

            var data = _.map($(items), function (el) {
                var $el = $(el);
                var node = $el.data('_gridstack_node');

                return {
                    x: node.x,
                    y: node.y,
                    width: node.width,
                    height: node.height,
                    id: node.id,
                    parent: _this.getBlockParentId(node.id),
                    props: __WEBPACK_IMPORTED_MODULE_1__Props__["a" /* props */].getProps(node.id)
                };
            });

            this.data.val(JSON.stringify(data, null, ''));
        }
    }, {
        key: 'load',
        value: function load() {
            var _this2 = this;

            if (this.data.val() == '' || this.grid == null) return;

            this.grid.removeAll();

            var data = JSON.parse(this.data.val());

            _.each(data, function (node) {
                __WEBPACK_IMPORTED_MODULE_1__Props__["a" /* props */].storeProps(node.id, node.props);
                _this2.addBlock(node.parent, node.x, node.y, node.width, node.height, false, node.id);
            });
        }
    }]);

    return Grid;
}();

/* harmony default export */ __webpack_exports__["a"] = (Grid);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_Events__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_Props__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_Grid__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_Modal__ = __webpack_require__(6);
$ = jQuery;






var grid = new __WEBPACK_IMPORTED_MODULE_2__modules_Grid__["a" /* default */]('.' + gb.playground.grid, 'input[name="' + gb.playground.data + '"]');
var modal = new __WEBPACK_IMPORTED_MODULE_3__modules_Modal__["a" /* default */]('.' + gb.playground.modal);

grid.load();
grid.getElement().on('change', function () {
    return grid.save();
});
__WEBPACK_IMPORTED_MODULE_0__modules_Events__["a" /* events */].on('save', function () {
    return grid.save();
});
__WEBPACK_IMPORTED_MODULE_0__modules_Events__["a" /* events */].on('shortcode-selected', function (id) {
    return toggleShortcode(id, true);
});
__WEBPACK_IMPORTED_MODULE_0__modules_Events__["a" /* events */].on('shortcode-removed', function (id) {
    return toggleShortcode(id, false);
});

// add a block
$('body').delegate('.add-block', 'click', function () {
    var button = $(this);
    grid.addBlock(button.data('gs-id'));
    button.blur();
});

// remove the block
$('body').delegate('.remove-block', 'click', function () {
    grid.removeBlock($(this).data('gs-id'));
});

// prompt edit block modal
$('body').delegate('.edit-block', 'click', function () {
    modal.open($(this).data('gs-id'));
});

// select which shortcode to add to the block
$('body').delegate('.shortcode-tree button', 'click', function () {
    modal.addShortcode($(this));
});

// remove block shortcode
$('body').delegate('.remove-shortcode', 'click', function () {
    var id = $(this).data('gs-id');

    __WEBPACK_IMPORTED_MODULE_1__modules_Props__["a" /* props */].removeProp('shortcode', id);
    __WEBPACK_IMPORTED_MODULE_1__modules_Props__["a" /* props */].removeProp('shortcodeArgs', id);
    __WEBPACK_IMPORTED_MODULE_1__modules_Props__["a" /* props */].removeProp('shortcodeName', id);
    __WEBPACK_IMPORTED_MODULE_1__modules_Props__["a" /* props */].removeProp('content', id);

    __WEBPACK_IMPORTED_MODULE_0__modules_Events__["a" /* events */].emit('shortcode-removed', id);
    __WEBPACK_IMPORTED_MODULE_0__modules_Events__["a" /* events */].emit('save');
});

function toggleShortcode(id, selected) {
    var block = grid.getBlock(id);
    var name = block.find('.shortcode-name').first();
    var button = block.find('.remove-shortcode').first();
    var blockProps = __WEBPACK_IMPORTED_MODULE_1__modules_Props__["a" /* props */].getProps(id);

    if (selected) {
        button.removeClass('hidden');
        name.text(blockProps.shortcodeName);
    } else {
        button.addClass('hidden');
        name.empty();
    }
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Grid__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Props__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var Block = function () {
    function Block(x, y, width, height, autoPosition, id, grid, parent) {
        _classCallCheck(this, Block);

        this.id = id ? id : this.getGuid();
        this.parent = parent;

        if (parent) {
            this.block = this.getBlock(parent);
            this.grid = this.getGrid();
        } else {
            this.grid = grid;
        }

        this.grid.addWidget(this.getElement(), x, y, width, height, autoPosition, null, null, null, null, this.id);
    }

    _createClass(Block, [{
        key: 'getElement',
        value: function getElement() {
            return '\n            <div>\n                <div class="grid-stack-item-content">\n                    <div class="controls">' + this.getBlockControls() + '</div>\n                </div>\n            </div>\n        ';
        }
    }, {
        key: 'getBlockControls',
        value: function getBlockControls() {
            var blockProps = __WEBPACK_IMPORTED_MODULE_1__Props__["a" /* props */].getProps(this.id);
            var shortcodeName = false;

            if (blockProps) {
                shortcodeName = blockProps.shortcodeName == null ? false : blockProps.shortcodeName;
            }

            var nesting = '';

            // check config if nesting is enabled
            // disable nesting for more then 2 levels
            if (gb.playground.nesting && !this.parent) {
                nesting = '<a href="javascript:void(0);"\n                data-gs-id="' + this.id + '"\n                title="' + gb.strings.nested + '"\n                class="ico-file-add add-block">\n            </a>';
            }

            return '\n            <span class="shortcode-name">' + (shortcodeName ? shortcodeName : '') + '</span>\n\n            ' + nesting + '\n\n            <a href="javascript:void(0);"\n                data-gs-id="' + this.id + '"\n                title="' + gb.strings.removesc + '"\n                class="ico-window-delete remove-shortcode ' + (!shortcodeName ? 'hidden' : '') + '">\n            </a>\n\n            <a href="javascript:void(0);"\n                data-gs-id="' + this.id + '"\n                title="' + gb.strings.editb + '"\n                class="ico-pen edit-block">\n            </a>\n\n            <a href="javascript:void(0);"\n                data-gs-id="' + this.id + '"\n                title="' + gb.strings.deleteb + '"\n                class="ico-trashcan remove-block">\n            </a>\n        ';
        }
    }, {
        key: 'getGrid',
        value: function getGrid() {
            if (this.block.find('.grid-stack').length) {

                return new __WEBPACK_IMPORTED_MODULE_0__Grid__["a" /* default */](this.block.find('.grid-stack').selector).getInstance();
            } else {

                var element = this.block.find('.grid-stack-item-content').append('<div class="grid-stack"></div>').find('.grid-stack').selector;

                return new __WEBPACK_IMPORTED_MODULE_0__Grid__["a" /* default */](element).getInstance();
            }
        }
    }, {
        key: 'getSelector',
        value: function getSelector() {
            return this.selector;
        }
    }, {
        key: 'getBlock',
        value: function getBlock(id) {
            return $('div[data-gs-id="' + id + '"]');
        }
    }, {
        key: 'getGuid',
        value: function getGuid() {
            var randomStr = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

            return randomStr + randomStr;
        }
    }]);

    return Block;
}();

/* harmony default export */ __webpack_exports__["a"] = (Block);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Events__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Props__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var Modal = function () {
    function Modal(element) {
        var _this = this;

        _classCallCheck(this, Modal);

        this.element = $(element);
        this.tree = this.element.find('.shortcode-tree');
        this.fields = this.element.find('.fields');
        this.argument = '.argument';
        this.shortcode = null;
        this.options = {
            minWidth: 600,
            minHeight: 600,
            closeOnEscape: true,
            dialogClass: "block-modal-window",
            buttons: [{
                text: gb.strings.save,
                click: function click() {
                    return _this.save();
                }
            }, {
                text: gb.strings.cancel,
                click: function click() {
                    return _this.close();
                }
            }]
        };
    }

    _createClass(Modal, [{
        key: 'save',
        value: function save() {
            this.close();

            var shortcodeFields = this.fields.find(this.argument);
            var shortcode = this.shortcode;
            var shortcodeArgs = {};

            $.each(shortcodeFields, function () {
                var field = $(this);
                var name = field.attr('name');
                var value = field.val() ? field.val() : null;

                if (value != '') shortcodeArgs[name] = value;
            });

            if (this.fields.find('#' + gb.playground.mce).length) {
                var blockContentArgs = {
                    id: this.id,
                    group: 'content',
                    value: tinymce.editors[gb.playground.mce].getContent()
                };

                __WEBPACK_IMPORTED_MODULE_1__Props__["a" /* props */].saveProp(blockContentArgs);
            }

            // save shortcode args

            var blockShortcodeArgs = {
                id: this.id,
                group: 'shortcodeArgs',
                value: shortcodeArgs
            };

            __WEBPACK_IMPORTED_MODULE_1__Props__["a" /* props */].saveProp(blockShortcodeArgs);
        }
    }, {
        key: 'open',
        value: function open(id) {
            this.element.dialog(this.options);
            this.id = id;

            var blockProps = __WEBPACK_IMPORTED_MODULE_1__Props__["a" /* props */].getProps(this.id);
            var shortcode = blockProps ? blockProps.shortcode : false;

            if (shortcode) {
                // if id has props - empty the fields, call edit on that shortcode
                this.empty();
                this.edit(shortcode, blockProps.shortcodeArgs, blockProps.content);
            } else {
                // if it doesnt - empty the fields and show the tree.
                this.empty();
                this.showTree();
            }
        }

        // called when clicked on one of the tree items (shortcodes)

    }, {
        key: 'addShortcode',
        value: function addShortcode(shortcode) {
            var base = {
                id: this.id,
                group: 'shortcode',
                value: shortcode.data('shortcode')
            };

            var name = {
                id: this.id,
                group: 'shortcodeName',
                value: shortcode.data('shortcode-name')
            };

            __WEBPACK_IMPORTED_MODULE_1__Props__["a" /* props */].saveProp(base);
            __WEBPACK_IMPORTED_MODULE_1__Props__["a" /* props */].saveProp(name);
            __WEBPACK_IMPORTED_MODULE_0__Events__["a" /* events */].emit('shortcode-selected', this.id);
            this.edit(shortcode.data('shortcode'));
        }
    }, {
        key: 'edit',
        value: function edit(shortcode, args, content) {
            var _this2 = this;

            this.shortcode = shortcode;
            this.hideTree();
            $.get({
                url: gb.ajax_url,
                data: {
                    action: 'get_shortcode',
                    type: shortcode,
                    args: args,
                    content: content
                },
                success: function success(response) {
                    return _this2.fields.append(response);
                }
            });
        }
    }, {
        key: 'close',
        value: function close() {
            this.element.dialog('close');
        }
    }, {
        key: 'empty',
        value: function empty() {
            this.fields.empty();
        }
    }, {
        key: 'hideTree',
        value: function hideTree() {
            this.tree.hide();
            this.element.parent().addClass('buttons-active');
        }
    }, {
        key: 'showTree',
        value: function showTree() {
            this.tree.show();
            this.element.parent().removeClass('buttons-active');
        }
    }]);

    return Modal;
}();

/* harmony default export */ __webpack_exports__["a"] = (Modal);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
module.exports = __webpack_require__(4);


/***/ })
/******/ ]);