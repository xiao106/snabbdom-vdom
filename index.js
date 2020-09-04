/******/
(function(modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/
    var installedModules = {}; // The require function
    /******/
    /******/
    /******/
    function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/
        if (installedModules[moduleId]) {
            /******/
            return installedModules[moduleId].exports;
            /******/
        } // Create a new module (and put it into the cache)
        /******/
        /******/
        var module = (installedModules[moduleId] = {
            /******/
            i: moduleId,
            /******/
            l: false,
            /******/
            exports: {},
            /******/
        }); // Execute the module function
        /******/
        /******/
        /******/
        modules[moduleId].call(
            module.exports,
            module,
            module.exports,
            __webpack_require__
        ); // Flag the module as loaded
        /******/
        /******/
        /******/
        module.l = true; // Return the exports of the module
        /******/
        /******/
        /******/
        return module.exports;
        /******/
    } // expose the modules object (__webpack_modules__)
    /******/
    /******/
    /******/
    /******/
    __webpack_require__.m = modules; // expose the module cache
    /******/
    /******/
    /******/
    __webpack_require__.c = installedModules; // define getter function for harmony exports
    /******/
    /******/
    /******/
    __webpack_require__.d = function(exports, name, getter) {
        /******/
        if (!__webpack_require__.o(exports, name)) {
            /******/
            Object.defineProperty(exports, name, {
                /******/
                configurable: false,
                /******/
                enumerable: true,
                /******/
                get: getter,
                /******/
            });
            /******/
        }
        /******/
    }; // getDefaultExport function for compatibility with non-harmony modules
    /******/
    /******/
    /******/
    __webpack_require__.n = function(module) {
        /******/
        var getter =
            module && module.__esModule ?
            /******/
            function getDefault() {
                return module["default"];
            } :
            /******/
            function getModuleExports() {
                return module;
            };
        /******/
        __webpack_require__.d(getter, "a", getter);
        /******/
        return getter;
        /******/
    }; // Object.prototype.hasOwnProperty.call
    /******/
    /******/
    /******/
    __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    }; // __webpack_public_path__
    /******/
    /******/
    /******/
    __webpack_require__.p = ""; // Load entry module and return exports
    /******/
    /******/
    /******/
    return __webpack_require__((__webpack_require__.s = 0));
    /******/
})(
    /************************************************************************/
    /******/
    [
        /* 0 */
        /***/
        function(module, exports) {
            const patch = snabbdom.patch;
            const h = snabbdom.h;
            const box = document.querySelector(".box");
            const tab = document.querySelector(".tab");
            const data = {
                lists: [1, 2, 3]
            };

            //!渲染一个input
            function renderInput() {
                patch(tab, h('input', {
                    props: {
                        type: "text",
                        placeholder: "请输入内容",
                        onkeydown: e => {
                            addLists(e)
                        }
                    }
                }))
            };
            //!添加渲染项,为data.lists添加一项内容
            function addLists(e) {
                if (e.keyCode == 13) {
                    const box = getBox();
                    data.lists.push(e.target.value);
                    patch(box, renderLists(data.lists));
                    e.target.value = "";
                }
            };
            //!删除一项
            function delLists() {

            }


            renderInput();
            //!渲染列表vdom
            function renderLists(arr) {
                return h("ul", {
                    props: {
                        className: "box",
                    }
                }, arr.map((item, index) => {
                    return h("li", {
                        props: {
                            key: index
                        },
                    }, [
                        h("p", {}, item),
                        h("button", {
                            props: {
                                onclick: () => {},
                            }
                        }, "修改"),
                        h("button", {
                            props: {
                                onclick: () => {
                                    delLists(index);
                                },
                            }
                        }, "删除"),
                    ])
                }))
            }
            patch(box, renderLists(data.lists));
            //! 获取元素
            function getBox() {
                return document.querySelector(".box");
            }
            /***/
        },
        /******/
    ]
);