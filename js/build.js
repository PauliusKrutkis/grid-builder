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

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

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
    removeProp: function removeProp(id, group) {
        var blockProps = this.getProps(id);
        delete blockProps[group];
        _Events.events.emit('save');
    }
};

/***/ },
/* 1 */
/***/ function(module, exports) {

"use strict";
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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Modal = __webpack_require__(5);

var _Modal2 = _interopRequireDefault(_Modal);

var _Props = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Helper = function () {
    function Helper() {
        _classCallCheck(this, Helper);
    }

    _createClass(Helper, null, [{
        key: 'guid',
        value: function guid() {
            return this.s4() + this.s4();
        }
    }, {
        key: 's4',
        value: function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
    }, {
        key: 'getBlock',
        value: function getBlock(id) {
            return $('div[data-gs-id="' + id + '"]');
        }
    }, {
        key: 'toggleRemoveShortcode',
        value: function toggleRemoveShortcode(id, show) {
            var button = this.getBlock(id).find('.remove-shortcode');

            if (show) return button.removeClass('hidden');else return button.addClass('hidden');
        }
    }]);

    return Helper;
}();

exports.default = Helper;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helper = __webpack_require__(2);

var _Helper2 = _interopRequireDefault(_Helper);

var _Grid = __webpack_require__(4);

var _Grid2 = _interopRequireDefault(_Grid);

var _Events = __webpack_require__(1);

var _Props = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Block = function () {
    function Block(x, y, width, height, autoPosition, id, grid, parent) {
        _classCallCheck(this, Block);

        this.id = id ? id : _Helper2.default.guid();

        var blockProps = _Props.props.getProps(this.id);
        var hasShortcode = blockProps ? blockProps.shortcode : false;

        var addBlockTemplate = '<a href="javascript:void(0);" data-gs-id="' + this.id + '" class="ico-file-add add-block"></a>';
        var editBlockTemplate = '<a href="javascript:void(0);" data-gs-id="' + this.id + '" class="ico-pen edit-block"></a>';
        var removeBlockTemplate = '<a href="javascript:void(0);" data-gs-id="' + this.id + '" class="ico-trashcan remove-block"></a>';
        var removeShorcodeTemplate = '\n            <a href="javascript:void(0);"\n                data-gs-id="' + this.id + '"\n                class="ico-window-delete remove-shortcode ' + (hasShortcode == '' ? 'hidden' : '') + '">\n            </a>\n            ';

        if (parent) {
            this.block = _Helper2.default.getBlock(parent);
            this.grid = this.getGrid();

            // disable nesting for more then 2 levels
            addBlockTemplate = '';
        } else {
            this.grid = grid;
        }

        var element = '\n            <div>\n                <div class="grid-stack-item-content">\n                    <div class="controls">\n                        ' + removeShorcodeTemplate + '\n                        ' + addBlockTemplate + '\n                        ' + editBlockTemplate + '\n                        ' + removeBlockTemplate + '\n                    </div>\n                </div>\n            </div>\n        ';

        this.grid.addWidget(element, x, y, width, height, autoPosition, null, null, null, null, this.id);
    }

    _createClass(Block, [{
        key: 'getGrid',
        value: function getGrid() {
            if (this.block.length) {
                if (this.block.find('.grid-stack').length) {
                    return new _Grid2.default(this.block.find('.grid-stack').selector).getInstance();
                } else {
                    var element = this.block.find('.grid-stack-item-content').append('<div class="grid-stack"></div>').find('.grid-stack').selector;
                    return new _Grid2.default(element).getInstance();
                }
            }
        }
    }]);

    return Block;
}();

exports.default = Block;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helper = __webpack_require__(2);

var _Helper2 = _interopRequireDefault(_Helper);

var _Block = __webpack_require__(3);

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
            var block = _Helper2.default.getBlock(id);
            var parentGrid = block.parent();

            if (!parentGrid.hasClass('grid-stack-nested')) return null;

            return parentGrid.parent().parent().data('gs-id');
        }
    }, {
        key: 'remove',
        value: function remove(id) {
            var block = _Helper2.default.getBlock(id);
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
    }]);

    return Grid;
}();

exports.default = Grid;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helper = __webpack_require__(2);

var _Helper2 = _interopRequireDefault(_Helper);

var _Events = __webpack_require__(1);

var _Props = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
            buttons: {
                // TODO localization
                "Save": function Save() {
                    return _this.save();
                },
                "Cancel": function Cancel() {
                    return _this.close();
                }
            }
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
            _Helper2.default.toggleRemoveShortcode(this.id, true);
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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _Events = __webpack_require__(1);

var _Props = __webpack_require__(0);

var _Block = __webpack_require__(3);

var _Block2 = _interopRequireDefault(_Block);

var _Grid = __webpack_require__(4);

var _Grid2 = _interopRequireDefault(_Grid);

var _Modal = __webpack_require__(5);

var _Modal2 = _interopRequireDefault(_Modal);

var _Helper = __webpack_require__(2);

var _Helper2 = _interopRequireDefault(_Helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$ = jQuery;

var grid = new _Grid2.default('.grid-stack-main', '.grid-data');
var modal = new _Modal2.default('.block-modal');

grid.load();
grid.getElement().on('change', function () {
    return grid.save();
});
_Events.events.on('save', function () {
    return grid.save();
});
_Events.events.on('saveProp', function (args) {
    return grid.saveProp(args);
});

// add block or a nested block
$('body').delegate('.add-block', 'click', function () {
    new _Block2.default(null, null, 6, 3, true, null, grid.getInstance(), $(this).data('gs-id'));
    $(this).blur();
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

    _Props.props.removeProp(id, 'shortcode');
    _Props.props.removeProp(id, 'shortcodeArgs');
    _Props.props.removeProp(id, 'content');
    _Helper2.default.toggleRemoveShortcode(id, false);
});

/***/ }
/******/ ]);