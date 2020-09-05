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
            const search = document.querySelector(".search");
            const data = {
                lists: ['1', '2', '3'],
                flag: false,
                changeVal: ''
            };

            //!渲染一个添加input
            function renderInput() {
                patch(tab, h("div", {}, [
                    h('input', {
                        props: {
                            type: "text",
                            placeholder: "请输入内容",
                            onkeydown: e => {
                                addLists(e)
                            }
                        }
                    }),
                    h("button", {
                        props: {
                            onclick: e => {
                                clickaddLists(e)
                            }
                        }
                    }, "添加")
                ]))
            };
            renderInput();
            //!渲染一个查询input
            function searchInput() {
                patch(search, h("div", {
                    props: {
                        className: "search"
                    }
                }, [
                    h('input', {
                        props: {
                            type: "text",
                            placeholder: "请输入内容",
                        }
                    }),
                    h("button", {
                        props: {
                            onclick: e => {
                                searchLists(e)
                            }
                        }
                    }, "查询")
                ]))
            };

            //!渲染一个修改的input
            function changeInput(change) {
                patch(change, h("div", {
                    props: {
                        className: "change"
                    },
                    style: {
                        display: data.flag ? 'block' : 'none'
                    }
                }, [
                    h("input", {
                        props: {
                            type: "text",
                            value: data.changeVal
                        }
                    }),
                    h("button", {
                        props: {
                            onclick: () => {
                                flagHide();
                            },
                        }
                    }, "取消"),
                    h("button", {
                        props: {
                            onclick: (e) => {
                                changeLists(e)
                            },
                        }
                    }, "确定"),

                ]))
            }
            searchInput();
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
                                onclick: (e) => {
                                    flagShow(e)
                                },
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


            //!keydow事件添加渲染项,为data.lists添加一项内容
            function addLists(e) {
                if (e.keyCode == 13) {
                    const box = getBox();
                    data.lists.push(e.target.value);
                    patch(box, renderLists(data.lists));
                    e.target.value = "";
                }
            };
            //!鼠标点击添加渲染项,为data.lists添加一项内容
            function clickaddLists(e) {
                const box = getBox();
                data.lists.push(e.target.previousElementSibling.value);
                patch(box, renderLists(data.lists));
                e.target.previousElementSibling.value = "";

            };
            //!删除一项
            function delLists(index) {
                const box = getBox();
                data.lists.splice(index, 1);
                patch(box, renderLists(data.lists));
            }
            //!查询某一项
            function searchLists(e) {
                const box = getBox();
                const result = data.lists.filter(item => {
                    return item == e.target.previousElementSibling.value
                });
                patch(box, renderLists(result));
                e.target.previousElementSibling.value = "";
            }
            //修改某一项
            function changeLists(e) {
                const box = getBox();
                let val = e.target.previousElementSibling.previousElementSibling.value;
                let index = data.lists.indexOf(data.changeVal);
                data.lists.splice(index, 1, val)
                patch(box, renderLists(data.lists));
                e.target.previousElementSibling.previousElementSibling.value = '';
            }
            //修改列表的显示--隐藏
            function flagShow(e) {
                data.flag = true;
                data.changeVal = e.target.previousElementSibling.innerHTML;
                const change = document.querySelector(".change");
                changeInput(change);

            }

            function flagHide() {
                data.flag = false;
                const change = document.querySelector(".change");
                changeInput(change);
            }


            //! 获取元素
            function getBox() {
                return document.querySelector(".box");
            }
            /***/
        },
        /******/
    ]
);