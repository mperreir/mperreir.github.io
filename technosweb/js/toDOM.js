/* eslint-env browser, es6 */
/*
 * Nicolas Normand 2017
 */

'use strict';

const toDOM = {
    onInsert: Symbol(),
    id: Symbol(),
};

(function () {
    const here = () =>
        (document.currentScript || {parentElement: null}).parentElement ||
        Array.from(document.querySelectorAll('script')).pop().parentElement;

    /*
     * possible values for options:
     * - an object specifying
     * - a DOM node `node` (equivalent to `{where: node}`)
     */
    function JSONMLToDOM(jsonml, options = {where: here()}) {
        // Insertion point provided as a string: query selector
        if (typeof options === 'string') {
            options = {where: document.querySelector(options)};
        }
        if (typeof options.appendChild === 'function') {
            options = {where: options};
        }
        // No insertion point provided
        if (!options.where && !options.afterend && !options.beforebegin) {
            options = Object.assign({where: here()}, options);
        }
        if (options.replace && typeof options.replace === 'string') {
            options = Object.assign({replace: document.querySelector(options.replace)}, options);
        }
        const filter = options.filter || (e => e);

        return aux(jsonml, options);

        function aux(jsonml, options) {
            let name, classes, attr = {};
            jsonml = filter(jsonml);
            let e;
            if (jsonml === undefined || jsonml === null) {
                return;
            }
            else if (jsonml === false) {
                return null;
            }
            else if (jsonml instanceof Node) {
                e = jsonml;
            }
            else if (typeof jsonml.toJSONML === 'function') {
                jsonml = jsonml.toJSONML(options);
                if (jsonml.length === 0) {
                    return;
                }
                /*if (typeof jsonml[0] !== 'string') {
                    return aux(tableToJSONML(jsonml, filter), options);
                }*/
                ({name, classes, attr, jsonml} = collectAttributes(jsonml, filter));
                e = document.createElementNS(attr.xmlns || (options.where || options.replace || options.beforebegin).namespaceURI, name);
                if (classes.length) {
                    attr.class = classes.join(' ');
                }
                Object.entries(attr).forEach(([k, v]) => {
                    if (['beginElement', 'onanimationend', 'onanimationstart', 'onbegin', 'onchange', 'onclick', 'ondblclick', 'ondrag', 'ondragstart', 'onend', 'onended', 'oninput', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onrepeat', 'onscroll', 'ontransitionend', 'onwheel'].includes(k) && typeof v === 'function') {
                        e[k] = v;
                    }
                    else {
                        const [prefix, localName] = k.split(':');
                        if (localName) {
                            if (prefix === 'xmlns') {
                                e.setAttributeNS('http://www.w3.org/2000/xmlns/', k, v);
                            }
                            else {
                                e.setAttributeNS(document.createNSResolver(options.where).lookupNamespaceURI(prefix), localName, v);
                            }
                        }
                        else if (typeof v !== 'symbol') {
                            e.setAttribute(k, v);
                        }
                    }
                });
                // Append children nodes
                jsonml.forEach(x => aux(x, {where: e}));
            }
            /*else if (typeof jsonml === 'string' && jsonml.indexOf('\n') >= 0) {
                jsonml.split('\n').forEach(s => aux(['p', s], where));
                return where;
            }*/
            else {
                e = document.createTextNode(jsonml);
            }
            if (options.replace) {
                options.replace.parentElement.replaceChild(e, options.replace);
            }
            else if (options.beforebegin) {
                options.beforebegin.parentElement.insertBefore(e, options.beforebegin);
                //options.beforebegin.insertAdjacentElement('beforebegin', e);
            }
            else if (options.afterend) {
                options.afterend.insertAdjacentElement('afterend', e);
            }
            else {
                options.where.appendChild(e);
            }
            if (attr[toDOM.onInsert]) {
                attr[toDOM.onInsert](e);
            }
            if (typeof e.beginElement === 'function') {
                setTimeout(() => {
                    e.beginElement(e);
                });
            }
            return e;
        }
    }

    function collectAttributes(jsonml, filter) {
        // Collect element name, id and classes from selector-like name
        // @see https://drafts.csswg.org/selectors-3/#lex
        const [, name, c1, id, c2] = /([\w-]+)((?:[.][-\w]+)*)(?:[#](\w+))?((?:[.][-\w]+)*)$/.exec(jsonml[0]);
        jsonml = jsonml.slice(1);
        if (id) {
            jsonml = [{id}, ...jsonml];
        }
        if (c1 || c2) {
            jsonml = [{
                classList: (c1 + c2).split('.'),
            }, ...jsonml];
        }
        // Collect attributes
        const at = {};
        let cl = [];
        //const filter = x => x === 0 ? 0 : (x || {});
        for (
            let attr = filter(jsonml[0]);
            jsonml.length > 0 && typeof attr === 'object' && attr !== null && typeof attr.toJSONML !== 'function' && !(attr instanceof Node) && !Array.isArray(attr);
            jsonml = jsonml.slice(1), attr = filter(jsonml[0])
        ) {
            cl = [...cl, attr.class, ...(attr.classList || [])].filter(Boolean).filter(c => typeof c !== 'symbol');
            Object.assign(at, attr);
        }
        delete at.class;
        delete at.className;
        delete at.classList;
        return {attr: at, jsonml, name, classes: cl};
    }
    /*function tableToJSONML(t, options = {}) {
        const filter = options.filter || (e => e);
        return ['table', ...t.map(r =>
            Array.isArray(r) ?
                ['tr', ...[...r.map(filter)].map(
                    c => ['td', typeof c === 'object' && c !== null && typeof c.toJSONML === 'function' ? c.toJSONML() : c]
                    //c => ['td', Array.isArray(c) && Array.isArray(c[0]) ? c.toJSONML() : c]
                    //c => ['td', Array.isArray(c) && Array.isArray(c[0]) ? tableToJSONML(c) : c]
                )]
                :
                r
        )];
    }
    function tableToJSONML(t, options = {}) {
        const filter = options.filter || (e => e);
        return ['table', ...t.map(
            r => Array.isArray(r) ?
                r.map(filter).reduce(
                    ({tr, e = tr}, c) =>
                        // 3 cases:
                        // c is an object with a toJSONML function => use the function to get a JSONML representation
                        // c is an object without a toJSONML function => use c as a set of attributes
                        // otherwise use c as a value or element
                        typeof c === 'object' && c !== null && typeof c.toJSONML !== 'function' ?
                            {tr, e: (e.push(c), e)}
                            :
                            typeof c === 'object' && c !== null && typeof c.toJSONML === 'function' ?
                                {tr, e: c.toJSONML()}
                                :
                                {tr, e: tr.push(['td', c])}
                    ,
                    {tr: ['tr']}
                ).tr
                :
                r
        )];
    }*/
    function tableToJSONML(t) {
        return ['table', ...t.map(r => {
            if (Array.isArray(r)) {
                const tr = ['tr'];
                let e = tr;
                for (const c of r) {
                    if (typeof c === 'object' && c !== null && typeof c.toJSONML !== 'function') {
                        e.splice(-1, 0, c);
                    }
                    else if (typeof c === 'object' && c !== null && typeof c.toJSONML === 'function') {
                        e = ['td', c.toJSONML()];
                        tr.push(e);
                    }
                    else {
                        e = ['td', c];
                        tr.push(e);
                    }
                }
                return tr;
            }
            else {
                return r;
            }
        })];
    }
    Object.defineProperty(String.prototype, 'toDOM', {
        enumerable: false,
        value: function (where) {
            return JSONMLToDOM(this, where);
        },
    });
    Object.defineProperty(Array.prototype, 'toJSONML', {
        enumerable: false,
        writable: true,
        value: function toJSONML(...args) {
            if (typeof this[0] === 'string') {
                // If the first element is a string, it is a tagname and 'this' is jsonml data
                return this;
            }
            else {
                // Otherwise 'this' is a table and its first element is
                // - an array : the first row of the table
                // - an object : a set of attributes
                return tableToJSONML(this, ...args);
            }
        },
    });
    Object.defineProperty(Array.prototype, 'toDOM', {
        enumerable: false,
        value: function toDOM(...args) {
            return JSONMLToDOM(this.toJSONML(), ...args);
        },
    });
}());
