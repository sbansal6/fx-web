String.prototype.format = function(placeholders) {
    if ($.isArray(placeholders)) {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ?
                args[number] :
                match;
        });
    } else { //Object
        var s = this;
        for (var propertyName in placeholders) {
            var re = new RegExp('{' + propertyName + '}', 'gm');
            s = s.replace(re, placeholders[propertyName]);
        }
        return s;
    }
};

function ajaxindicatorstart(text){
    if(jQuery('body').find('#resultLoading').attr('id') != 'resultLoading'){
        jQuery('body').append('<div id="resultLoading" style="display:none"><div><img src="images/ajax_loader_5.gif"><div>'+text+'</div></div><div class="bg"></div></div>');
    }

    jQuery('#resultLoading').css({
        'width':'100%',
        'height':'100%',
        'position':'fixed',
        'z-index':'10000000',
        'top':'0',
        'left':'0',
        'right':'0',
        'bottom':'0',
        'margin':'auto'
    });

    jQuery('#resultLoading .bg').css({
        'background':'#000000',
        'opacity':'0.7',
        'width':'100%',
        'height':'100%',
        'position':'absolute',
        'top':'0'
    });

    jQuery('#resultLoading>div:first').css({
        'width': '250px',
        'height':'75px',
        'text-align': 'center',
        'position': 'fixed',
        'top':'0',
        'left':'0',
        'right':'0',
        'bottom':'0',
        'margin':'auto',
        'font-size':'16px',
        'z-index':'10',
        'color':'#ffffff'

    });

    jQuery('#resultLoading .bg').height('100%');
    jQuery('#resultLoading').fadeIn(300);
    jQuery('body').css('cursor', 'wait');
};

function ajaxindicatorstop(){
    jQuery('#resultLoading .bg').height('100%');
    jQuery('#resultLoading').fadeOut(300);
    jQuery('body').css('cursor', 'default');
};

/**
 * Generates a GUID string.
 * @returns {String} The generated GUID.
 * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa
 * @author Slavik Meltser (slavik@meltser.info).
 * @link http://slavik.meltser.info/?p=142
 */
function guid() {
    function _p8(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
};

function toCamelCase(str){
    return str.split(' ').map(function(word){
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join('');
}

function clone(object, deepClone, clonePrototype) {
    var visited = [],
        set = [];
    return _clone(object);

    function _clone(object) {
        var clone;
        if (typeof object !== 'object' || object === null) { // because typeof null => 'object'
            // immutable primitive types (string, number, boolean, undefined), function or null
            clone = object;
        } else {
            var index = visited.indexOf(object);
            if (index === -1) {
                clone = _createInstance(object);
                visited.push(object);
                set.push(clone);
                _extend(clone, object);
            } else {
                clone = set[index];
            }
        }
        return clone;
    }

    function _createInstance(object) {
        // Prevent warning for primitive constructor use
        /* jshint -W053 */
        var className = Object.prototype.toString.call(object).slice(8, -1);
        switch (className) {
            // primitive wrapper types
            case 'Boolean':
                return new Boolean(!!object);
            case 'Number': // includes NaN
                return new Number(+object);
            case 'String':
                return new String('' + object);
            // special types
            case 'Function':
                // Wrap functions because they can have object properties
                // We loose function name here, but it is not a standard property
                var wrap = function cloneWrap() {
                    // We reuse original wrapped function to prevent nested wrappers
                    (object.__wrapped__ || object).apply(this, arguments);
                };
                Object.defineProperty(wrap, '__wrapped__', {
                    value: object,
                    writable: false,
                    enumerable: false,
                    configurable: false
                });
                return wrap;
            case 'Error':
                return object; // Can't clone these
            case 'Date':
                return new Date(+object);
            case 'RegExp':
                return new RegExp(object);
            // regular types
            case 'Array':
                return new Array(object.length);
            case 'Object':
                var prototype = Object.getPrototypeOf(object);
                if (clonePrototype && prototype !== Object.prototype) {
                    var ctorDescriptor = {
                        value: prototype.constructor,
                        writable: true,
                        enumerable: false,
                        configurable: true
                    };
                    prototype = _clone(prototype);
                    Object.defineProperty(prototype, 'constructor', ctorDescriptor);
                }
                return Object.create(prototype);
            default:
                throw new TypeError("Can't clone object, type \"%1\" is unsupported".replace('%1', className));
        }
    }

    function _extend(base, object) {
        if (base === object) return;
        var keys = Object.keys(object);
        // var keys = Object.getOwnPropertyNames(object);
        for (var i = 0, l = keys.length; i < l; i++) {
            var key = keys[i];
            var value = object[key];
            var descriptor = Object.getOwnPropertyDescriptor(object, key);
            descriptor.value = deepClone ? _clone(value) : value;
            Object.defineProperty(base, key, descriptor);
        }
    }
};