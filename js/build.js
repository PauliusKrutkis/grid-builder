/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.props = undefined;

var _Events = __webpack_require__(1);

var props = exports.props = {
    storage: {},

    saveProp: function saveProp(args) {
        var blockProps = this.getProps(args.id);
        var params = blockProps ? blockProps : {};

        params[args.group] = args.value;
        this.storage[args.id] = params;
        _Events.events.emit('save');
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var events = exports.events = {
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Grid = __webpack_require__(3);

var _Grid2 = _interopRequireDefault(_Grid);

var _Props = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
            var blockProps = _Props.props.getProps(this.id);
            var hasShortcode = false;

            if (blockProps) {
                hasShortcode = blockProps.shortcode == null ? false : true;
            }

            var nesting = '';

            // check config if nesting is enabled
            // disable nesting for more then 2 levels
            if (wp.playground.nesting && !this.parent) {
                nesting = '<a href="javascript:void(0);"\n                data-gs-id="' + this.id + '"\n                title="' + wp.strings.nested + '"\n                class="ico-file-add add-block">\n            </a>';
            }

            return '\n            ' + nesting + '\n\n            <a href="javascript:void(0);"\n                data-gs-id="' + this.id + '"\n                title="' + wp.strings.removesc + '"\n                class="ico-window-delete remove-shortcode ' + (!hasShortcode ? 'hidden' : '') + '">\n            </a>\n\n            <a href="javascript:void(0);"\n                data-gs-id="' + this.id + '"\n                title="' + wp.strings.editb + '"\n                class="ico-pen edit-block">\n            </a>\n\n            <a href="javascript:void(0);"\n                data-gs-id="' + this.id + '"\n                title="' + wp.strings.deleteb + '"\n                class="ico-trashcan remove-block">\n            </a>\n        ';
        }
    }, {
        key: 'getGrid',
        value: function getGrid() {
            if (this.block.find('.grid-stack').length) {

                return new _Grid2.default(this.block.find('.grid-stack').selector).getInstance();
            } else {

                var element = this.block.find('.grid-stack-item-content').append('<div class="grid-stack"></div>').find('.grid-stack').selector;

                return new _Grid2.default(element).getInstance();
            }
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

exports.default = Block;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Block = __webpack_require__(2);

var _Block2 = _interopRequireDefault(_Block);

var _Props = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Grid = function () {
    function Grid(element, data) {
        _classCallCheck(this, Grid);

        this.options = {
            cellHeight: 80,
            verticalMargin: 10,
            float: true,
            animate: true,
            alwaysShowResizeHandle: true
        };

        this.element = $(element);
        this.data = $(data);
        this.grid = this.element.gridstack(this.options).data('gridstack');
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
        key: 'getBlockParentId',
        value: function getBlockParentId(id) {
            var block = this.getBlock(id);
            var parentGrid = block.parent();

            if (!parentGrid.hasClass('grid-stack-nested')) return null;

            return parentGrid.parent().parent().data('gs-id');
        }
    }, {
        key: 'remove',
        value: function remove(id) {
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
                    props: _Props.props.getProps(node.id)
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
                _Props.props.storeProps(node.id, node.props);
                new _Block2.default(node.x, node.y, node.width, node.height, false, node.id, _this2.grid, node.parent);
            });
        }
    }, {
        key: 'getBlock',
        value: function getBlock(id) {
            return $('div[data-gs-id="' + id + '"]');
        }
    }]);

    return Grid;
}();

exports.default = Grid;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Events = __webpack_require__(1);

var _Props = __webpack_require__(0);

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
                text: wp.strings.save,
                click: function click() {
                    return _this.save();
                }
            }, {
                text: wp.strings.cancel,
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
                var vm = $(this);
                var name = vm.attr('name');
                var value = vm.val() ? vm.val() : null;

                if (value != '') shortcodeArgs[name] = value;
            });

            // save wysiwyg content

            if (this.fields.find('#' + wp.editor_id).length) {
                var blockContentArgs = {
                    id: this.id,
                    group: 'content',
                    value: tinymce.editors[wp.editor_id].getContent()
                };

                _Props.props.saveProp(blockContentArgs);
            }

            // save shortcode args

            var blockShortcodeArgs = {
                id: this.id,
                group: 'shortcodeArgs',
                value: shortcodeArgs
            };

            _Props.props.saveProp(blockShortcodeArgs);
        }
    }, {
        key: 'open',
        value: function open(id) {
            this.element.dialog(this.options);
            this.id = id;

            var blockProps = _Props.props.getProps(this.id);
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
            var args = {
                id: this.id,
                group: 'shortcode',
                value: shortcode
            };

            _Props.props.saveProp(args);
            _Events.events.emit('shortcode-selected', this.id);
            this.edit(shortcode);
        }
    }, {
        key: 'edit',
        value: function edit(shortcode, args, content) {
            var _this2 = this;

            this.shortcode = shortcode;
            this.hideTree();
            $.get({
                url: wp.ajax_url,
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

exports.default = Modal;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Events = __webpack_require__(1);

var _Props = __webpack_require__(0);

var _Block = __webpack_require__(2);

var _Block2 = _interopRequireDefault(_Block);

var _Grid = __webpack_require__(3);

var _Grid2 = _interopRequireDefault(_Grid);

var _Modal = __webpack_require__(4);

var _Modal2 = _interopRequireDefault(_Modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$ = jQuery;

var grid = new _Grid2.default('.' + wp.playground.grid, 'input[name="' + wp.playground.data + '"]');
var modal = new _Modal2.default('.' + wp.playground.modal);

grid.load();
grid.getElement().on('change', function () {
    return grid.save();
});
_Events.events.on('save', function () {
    return grid.save();
});
_Events.events.on('shortcode-selected', function (id) {
    return toggleRemoveShortcode(id, true);
});
_Events.events.on('shortcode-removed', function (id) {
    return toggleRemoveShortcode(id, false);
});

$('body').delegate('.add-block', 'click', function () {
    var vm = $(this);

    new _Block2.default(null, null, 6, 3, true, null, grid.getInstance(), vm.data('gs-id'));
    vm.blur();
});

// remove the block
$('body').delegate('.remove-block', 'click', function () {
    grid.remove($(this).data('gs-id'));
});

// Prompt edit block modal
$('body').delegate('.edit-block', 'click', function () {
    modal.open($(this).data('gs-id'));
});

// Select which shortcode to add to the block
$('body').delegate('.shortcode-tree button', 'click', function () {
    modal.addShortcode($(this).data('shortcode'));
});

$('body').delegate('.remove-shortcode', 'click', function () {
    var id = $(this).data('gs-id');

    _Props.props.removeProp('shortcode', id);
    _Props.props.removeProp('shortcodeArgs', id);
    _Props.props.removeProp('content', id);
    _Events.events.emit('shortcode-removed', id);
    _Events.events.emit('save');
});

function toggleRemoveShortcode(id, show) {
    var button = $('.remove-shortcode[data-gs-id="' + id + '"]');

    if (show) button.removeClass('hidden');else button.addClass('hidden');
}

/***/ })
/******/ ]);