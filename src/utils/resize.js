export const eleResize = {
    _handleResize(e) {
        let ele = e.target || e.srcElement
        let trigger = ele.__resizeTrigger__
        if (trigger) {
            let handlers = trigger.__z_resizeListeners
            if (handlers) {
                let size = handlers.length
                for (let i = 0; i < size; i++) {
                    let h = handlers[i]
                    let handler = h.handler
                    let context = h.context
                    handler.apply(context, [e])
                }
            }
        }
    },
    _removeHandler(ele, handler, context) {
        let handlers = ele.__z_resizeListeners
        if (handlers) {
            let size = handlers.length
            for (let i = 0; i < size; i++) {
                let h = handlers[i]
                if (h.handler === handler && h.context === context) {
                    handlers.splice(i, 1)
                    return
                }
            }
        }
    },
    _createResizeTrigger(ele) {
        let obj = document.createElement('object')
        obj.setAttribute(
            'style',
            'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden;opacity: 0; pointer-events: none; z-index: -1;'
        )
        obj.onload = eleResize._handleObjectLoad
        obj.type = 'text/html'
        ele.appendChild(obj)
        obj.data = 'about:blank'
        return obj
    },
    _handleObjectLoad() {
        this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__
        this.contentDocument.defaultView.addEventListener(
            'resize',
            eleResize._handleResize
        )
    }
}
if (document.attachEvent) { // ie9-10
    eleResize.on = function(ele, handler, context) {
        let handlers = ele.__z_resizeListeners
        if (!handlers) {
            handlers = []
            ele.__z_resizeListeners = handlers
            ele.__resizeTrigger__ = ele
            ele.attachEvent('onresize', eleResize._handleResize)
        }
        handlers.push({
            handler,
            context
        })
    }
    eleResize.off = function(ele, handler, context) {
        let handlers = ele.__z_resizeListeners
        if (handlers) {
            eleResize._removeHandler(ele, handler, context)
            if (handlers.length === 0) {
                ele.detachEvent('onresize', eleResize._handleResize)
                delete ele.__z_resizeListeners
            }
        }
    }
} else {
    eleResize.on = function(ele, handler, context) {
        let handlers = ele.__z_resizeListeners
        if (!handlers) {
            handlers = []
            ele.__z_resizeListeners = handlers

            if (getComputedStyle(ele, null).position === 'static') {
                ele.style.position = 'relative'
            }
            let obj = eleResize._createResizeTrigger(ele)
            ele.__resizeTrigger__ = obj
            obj.__resizeElement__ = ele
        }
        handlers.push({
            handler,
            context
        })
    }
    eleResize.off = function(ele, handler, context) {
        let handlers = ele.__z_resizeListeners
        if (handlers) {
            eleResize._removeHandler(ele, handler, context)
            if (handlers.length === 0) {
                let trigger = ele.__resizeTrigger__
                if (trigger) {
                    trigger.contentDocument.defaultView.removeEventListener(
                        'resize',
                        eleResize._handleResize
                    )
                    ele.removeChild(trigger)
                    delete ele.__resizeTrigger__
                }
                delete ele.__z_resizeListeners
            }
        }
    }
}
