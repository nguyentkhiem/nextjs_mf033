import OpenSeadragon from "openseadragon";

!(function (e) {
  "function" == typeof define && define.amd ? define(e) : e();
})(function () {
  "use strict";
  !(function (e) {
    if (!e.version || e.version.major < 2)
      throw new Error(
        "This version of Magnifier requires OpenSeadragon version 2.0.0+"
      );
    function i(e, i) {
      (e.style.webkitTransform = "rotate(" + i + "deg)"),
        (e.style.mozTransform = "rotate(" + i + "deg)"),
        (e.style.msTransform = "rotate(" + i + "deg)"),
        (e.style.oTransform = "rotate(" + i + "deg)"),
        (e.style.transform = "rotate(" + i + "deg)");
    }
    function t(i, t) {
      var n = new e.TiledImage({
        viewer: i,
        source: t.source,
        viewport: i.viewport,
        drawer: i.drawer,
        tileCache: t._tileCache,
        imageLoader: t._imageLoader,
        clip: t._clip,
        placeholderFillStyle: t.placeholderFillStyle,
        opacity: t.opacity,
        springStiffness: i.springStiffness,
        animationTime: i.animationTime,
        minZoomImageRatio: i.minZoomImageRatio,
        wrapHorizontal: i.wrapHorizontal,
        wrapVertical: i.wrapVertical,
        immediateRender: i.immediateRender,
        blendTime: i.blendTime,
        alwaysBlend: i.alwaysBlend,
        minPixelRatio: i.minPixelRatio,
        smoothTileEdgesMinZoom: i.smoothTileEdgesMinZoom,
        crossOriginPolicy: i.crossOriginPolicy,
        debugMode: i.debugMode,
      });
      return (
        (n._originalForNavigator = t),
        i._matchBounds(n, t, !0),
        t.addHandler("bounds-change", function () {
          i._matchBounds(n, t);
        }),
        n
      );
    }
    function n(e) {
      this.viewport &&
        (this.panHorizontal || (e.delta.x = 0),
        this.panVertical || (e.delta.y = 0),
        this.viewport.panBy(
          this.viewer.viewport.deltaPointsFromPixels(e.delta)
        ));
    }
    function o(e) {
      var i = this.viewport.getBounds(!0),
        t = this.viewer.viewport.pixelFromPoint(i.getTopLeft(), !0),
        n = this.viewer.viewport
          .pixelFromPoint(i.getBottomRight(), !0)
          .minus(this.totalBorderWidths),
        o = Math.abs(t.x - n.x),
        r = Math.abs(t.y - n.y),
        s = e.delta.x / o + e.delta.y / r,
        a = this.viewport.getZoom() * (1 - s);
      a > this.minZoomImageRatio &&
        a < this.viewport.getMaxZoom() &&
        this.viewport.zoomTo(a, void 0, !0);
    }
    function r(e) {
      var i = e.keyCode || e.charCode;
      String.fromCharCode(i) === this.keyboardShortcut &&
        this.toggleVisibility();
    }
    function s(e) {
      e.style.display = "none" === e.style.display ? "block" : "none";
    }
    (e.Viewer.prototype.magnifier = function (i) {
      return (
        (this.magnifierInstance && !i) ||
          (((i = i || {}).viewer = this),
          (this.magnifierInstance = new e.Magnifier(i))),
        this.magnifierInstance
      );
    }),
      (e.Magnifier = function (s) {
        var a,
          l,
          h,
          d,
          g = s.viewer,
          m = this;
        if (
          (s.id
            ? ((this.element = document.getElementById(s.id)),
              (s.controlOptions = e.extend(
                !0,
                {
                  anchor: e.ControlAnchor.NONE,
                  attachToViewer: !1,
                  autoFade: !1,
                },
                s.controlOptions || {}
              )))
            : ((s.id = "magnifier-" + e.now()),
              (this.element = e.makeNeutralElement("div")),
              (s.controlOptions = e.extend(
                !0,
                {
                  anchor: e.ControlAnchor.BOTTOM_RIGHT,
                  attachToViewer: !0,
                  autoFade: !1,
                },
                s.controlOptions || {}
              )),
              s.position &&
                ("BOTTOM_RIGHT" === s.position
                  ? (s.controlOptions.anchor = e.ControlAnchor.BOTTOM_RIGHT)
                  : "BOTTOM_LEFT" === s.position
                  ? (s.controlOptions.anchor = e.ControlAnchor.BOTTOM_LEFT)
                  : "TOP_RIGHT" === s.position
                  ? (s.controlOptions.anchor = e.ControlAnchor.TOP_RIGHT)
                  : "TOP_LEFT" === s.position
                  ? (s.controlOptions.anchor = e.ControlAnchor.TOP_LEFT)
                  : "ABSOLUTE" === s.position &&
                    ((s.controlOptions.anchor = e.ControlAnchor.ABSOLUTE),
                    (s.controlOptions.top = s.top),
                    (s.controlOptions.left = s.left),
                    (s.controlOptions.height = s.height),
                    (s.controlOptions.width = s.width)))),
          (this.element.id = s.id),
          (this.element.className += " magnifier"),
          (s = e.extend(
            !0,
            {
              sizeRatio: 0.2,
              magnifierRotate: !0,
              viewerWidth: null,
              viewerHeight: null,
              minPixelRatio: g.minPixelRatio,
              defaultZoomLevel: 2 * g.viewport.getZoom(),
              minZoomLevel: 1,
              keyboardShortcut: "m",
              navImages: {
                magnifier: {
                  REST: "selection_rest.png",
                  GROUP: "selection_grouphover.png",
                  HOVER: "selection_hover.png",
                  DOWN: "selection_pressed.png",
                },
              },
            },
            s,
            {
              element: this.element,
              tabIndex: -1,
              showNavigator: !1,
              showNavigationControl: !1,
              showSequenceControl: !1,
              magnifier: null,
              immediateRender: !0,
              blendTime: 0,
              animationTime: 0,
              autoResize: s.autoResize,
              minZoomImageRatio: 1,
            }
          )),
          e.setElementTouchActionNone(this.element),
          (this.borderWidth = 2),
          (this.viewerWidth = s.viewerWidth),
          (this.viewerHeight = s.viewerHeight),
          (this.fudge = new e.Point(1, 1)),
          (this.totalBorderWidths = new e.Point(
            2 * this.borderWidth,
            2 * this.borderWidth
          ).minus(this.fudge)),
          s.showMagnifierControl,
          s.magnifierButton)
        ) {
          var p = s.prefixUrl || "",
            c = g.buttons && g.buttons.buttons ? g.buttons.buttons[0] : null,
            u = c ? c.onFocus : null,
            w = c ? c.onBlur : null;
          g.magnifierButton = new e.Button({
            element: s.magnifierButton ? e.getElement(s.magnifierButton) : null,
            clickTimeThreshold: g.clickTimeThreshold,
            clickDistThreshold: g.clickDistThreshold,
            tooltip:
              e.getString("Tooltips.SelectionToggle") || "Toggle selection",
            srcRest: p + s.navImages.magnifier.REST,
            srcGroup: p + s.navImages.magnifier.GROUP,
            srcHover: p + s.navImages.magnifier.HOVER,
            srcDown: p + s.navImages.magnifier.DOWN,
            onRelease: this.toggleVisibility.bind(this),
            onFocus: u,
            onBlur: w,
          });
        }
        s.controlOptions.anchor !== e.ControlAnchor.NONE &&
          ((h = this.element.style),
          (d = this.borderWidth),
          (h.margin = "0px"),
          (h.border = d + "px solid #555"),
          (h.padding = "0px"),
          (h.background = "#000"),
          (h.overflow = "hidden"),
          (h.minWidth = "50px"),
          (h.minHeight = "50px")),
          (this.magnifierResizeHandle = e.makeNeutralElement("div")),
          (this.magnifierResizeHandle.id =
            this.element.id + "-magnifier-resize"),
          (this.magnifierResizeHandle.className = "magnifier-resize"),
          (this.magnifierResizeHandle.style.position = "absolute"),
          (this.magnifierResizeHandle.style.top = "-1px"),
          (this.magnifierResizeHandle.style.left = "-1px"),
          (this.magnifierResizeHandle.style.width = "10%"),
          (this.magnifierResizeHandle.style.height = "10%"),
          (this.magnifierResizeHandle.style.maxWidth = "50px"),
          (this.magnifierResizeHandle.style.maxHeight = "50px"),
          (this.magnifierResizeHandle.style.cursor = "nw-resize"),
          (this.magnifierResizeHandle.style.zIndex = "4"),
          (this.magnifierResizeHandle.style.background = "rgba(0, 0, 0, .1)"),
          new e.MouseTracker({
            element: this.element,
            dragHandler: e.delegate(this, function (i) {
              const t = e.getElementSize(this.viewer.element);
              let n = parseInt(this.element.style.width, 10) - i.delta.x;
              (n = Math.min(n, 0.75 * t.x)),
                (n = Math.max(n, parseInt(this.element.style.minWidth, 10))),
                (this.element.style.width = n + "px");
              let o = parseInt(this.element.style.height, 10) - i.delta.y;
              (o = Math.min(o, 0.75 * t.y)),
                (o = Math.max(o, parseInt(this.element.style.minHeight, 10))),
                (this.element.style.height = o + "px");
            }),
          }),
          this.element.appendChild(this.magnifierResizeHandle),
          (this.displayRegion = e.makeNeutralElement("div")),
          (this.displayRegion.id = this.element.id + "-displayregion"),
          (this.displayRegion.className = "displayregion"),
          (function (e, i) {
            (e.position = "absolute"),
              (e.border = i + "px solid #900"),
              (e.margin = "0px"),
              (e.padding = "0px");
          })(this.displayRegion.style, this.borderWidth),
          (this.regionMoveHangle = e.makeNeutralElement("div")),
          (this.regionMoveHangle.id = this.element.id + "-displayregion-move"),
          (this.regionMoveHangle.className = "displayregion-move"),
          (this.regionMoveHangle.style.width = "10%"),
          (this.regionMoveHangle.style.height = "10%"),
          (this.regionMoveHangle.style.maxWidth = "50px"),
          (this.regionMoveHangle.style.maxHeight = "50px"),
          (this.regionMoveHangle.style.cursor = "move"),
          (this.regionMoveHangle.style.background = "rgba(0, 0, 0, .1)"),
          new e.MouseTracker({
            element: this.regionMoveHangle,
            dragHandler: e.delegate(this, n),
          }),
          (this.regionResizeHangle = e.makeNeutralElement("div")),
          (this.regionResizeHangle.id =
            this.element.id + "-displayregion-move"),
          (this.regionResizeHangle.className = "displayregion-move"),
          (this.regionResizeHangle.style.position = "absolute"),
          (this.regionResizeHangle.style.bottom = "-1px"),
          (this.regionResizeHangle.style.right = "-1px"),
          (this.regionResizeHangle.style.width = "10%"),
          (this.regionResizeHangle.style.height = "10%"),
          (this.regionResizeHangle.style.maxWidth = "50px"),
          (this.regionResizeHangle.style.maxHeight = "50px"),
          (this.regionResizeHangle.style.cursor = "se-resize"),
          (this.regionResizeHangle.style.background = "rgba(0, 0, 0, .1)"),
          new e.MouseTracker({
            element: this.regionResizeHangle,
            dragHandler: e.delegate(this, o),
          }),
          (this.displayRegionContainer = e.makeNeutralElement("div")),
          (this.displayRegionContainer.id =
            this.element.id + "-displayregioncontainer"),
          (this.displayRegionContainer.className = "displayregioncontainer"),
          (this.displayRegionContainer.style.width = "0"),
          (this.displayRegionContainer.style.height = "0"),
          g.addControl(this.element, s.controlOptions),
          (this._resizeWithViewer =
            s.controlOptions.anchor !== e.ControlAnchor.ABSOLUTE &&
            s.controlOptions.anchor !== e.ControlAnchor.NONE),
          this._resizeWithViewer &&
            (s.width && s.height
              ? ((this.element.style.height =
                  "number" == typeof s.height ? s.height + "px" : s.height),
                (this.element.style.width =
                  "number" == typeof s.width ? s.width + "px" : s.width))
              : ((a = e.getElementSize(g.element)),
                (this.element.style.height =
                  Math.round(a.y * s.sizeRatio) + "px"),
                (this.element.style.width =
                  Math.round(a.x * s.sizeRatio) + "px"),
                (this.oldViewerSize = a)),
            (l = e.getElementSize(this.element)),
            (this.elementArea = l.x * l.y)),
          (this.oldContainerSize = new e.Point(0, 0)),
          e.Viewer.apply(this, [s]),
          this.displayRegion.appendChild(this.regionMoveHangle),
          this.displayRegion.appendChild(this.regionResizeHangle),
          this.displayRegionContainer.appendChild(this.displayRegion),
          g.canvas.appendChild(this.displayRegionContainer),
          this.keyboardShortcut &&
            e.addEvent(
              this.viewer.container,
              "keypress",
              e.delegate(this, r),
              !1
            ),
          s.magnifierRotate &&
            g.addHandler("rotate", function (e) {
              var t = g.viewport.pixelFromPoint(g.viewport.getCenter(), !0);
              (m.displayRegionContainer.style.transformOrigin =
                t.x + "px " + t.y + "px"),
                i(m.displayRegionContainer, e.degrees),
                i(m.displayRegion, -e.degrees),
                m.viewport.setRotation(e.degrees);
            }),
          this.addHandler("reset-size", function () {
            m.viewport && m.viewport.goHome(!0);
          }),
          this.addHandler("update-level", function () {
            g.viewport && m.update(g.viewport);
          }),
          g.addHandler("update-level", function () {
            g.viewport && m.update(g.viewport);
          }),
          g.addHandler("close", function () {
            m.close();
          }),
          g.addHandler("full-page", function () {
            g.viewport && m.update(g.viewport);
          }),
          g.addHandler("full-screen", function () {
            g.viewport && m.update(g.viewport);
          }),
          g.world.addHandler("update-viewport", function () {
            g.viewport && m.update(g.viewport);
          }),
          g.world.addHandler("item-index-change", function (e) {
            var i = m.world.getItemAt(e.previousIndex);
            m.world.setItemIndex(i, e.newIndex);
          }),
          g.world.addHandler("remove-item", function (e) {
            var i = e.item,
              t = m._getMatchingItem(i);
            t && m.world.removeItem(t);
          }),
          (this.storedBounds = null),
          (function (e, i) {
            for (var n, o = 0; o < i.world.getItemCount(); o++)
              (n = i.world.getItemAt(o)), e.world.addItem(t(e, n));
            i.world.addHandler("add-item", function (n) {
              e.world.addItem(t(e, n.item), {
                index: i.world.getIndexOfItem(n.item),
              }),
                e.storedBounds && e.viewport.fitBounds(e.storedBounds, !0);
            });
          })(this, g),
          this.update(g.viewport);
      }),
      e.extend(e.Magnifier.prototype, e.Viewer.prototype, {
        updateSize: function () {
          if (this.viewport) {
            var i = new e.Point(
              0 === this.container.clientWidth ? 1 : this.container.clientWidth,
              0 === this.container.clientHeight
                ? 1
                : this.container.clientHeight
            );
            i.equals(this.oldContainerSize) ||
              (this.viewport.resize(i, !0),
              this.viewport.goHome(!0),
              (this.oldContainerSize = i),
              this.drawer.clear(),
              this.world.draw());
          }
        },
        update: function (i) {
          var t,
            n,
            o = e.getElementSize(this.viewer.element);
          this._resizeWithViewer &&
            o.x &&
            o.y &&
            !o.equals(this.oldViewerSize) &&
            ((this.oldViewerSize = o),
            this.maintainSizeRatio || !this.elementArea
              ? ((t = o.x * this.sizeRatio), (n = o.y * this.sizeRatio))
              : ((t = Math.sqrt(this.elementArea * (o.x / o.y))),
                (n = this.elementArea / t)),
            this.viewerWidth &&
              this.viewerHeight &&
              ((t = this.viewerWidth), (n = this.viewerHeight)),
            (this.element.style.width = Math.round(t) + "px"),
            (this.element.style.height = Math.round(n) + "px"),
            this.elementArea || (this.elementArea = t * n),
            this.updateSize());
          if (i && this.viewport) {
            var r = this.viewport.getBounds(!0),
              s = i.pixelFromPoint(r.getTopLeft(), !0),
              a = i
                .pixelFromPoint(r.getBottomRight(), !0)
                .minus(this.totalBorderWidths),
              l = this.displayRegion.style;
            (l.display = this.world.getItemCount() ? "block" : "none"),
              (l.top = Math.round(s.y) + "px"),
              (l.left = Math.round(s.x) + "px");
            var h = Math.abs(s.x - a.x),
              d = Math.abs(s.y - a.y);
            (l.width = Math.round(Math.max(h, 0)) + "px"),
              (l.height = Math.round(Math.max(d, 0)) + "px"),
              (this.storedBounds = r);
          }
        },
        addTiledImage: function (i) {
          var t = this,
            n = i.originalTiledImage;
          delete i.original;
          var o = e.extend({}, i, {
            success: function (e) {
              var i = e.item;
              (i._originalForNavigator = n),
                t._matchBounds(i, n, !0),
                n.addHandler("bounds-change", function () {
                  t._matchBounds(i, n);
                });
            },
          });
          return e.Viewer.prototype.addTiledImage.apply(this, [o]);
        },
        toggleVisibility: function () {
          return s(this.element), s(this.displayRegionContainer), this;
        },
        _getMatchingItem: function (e) {
          for (var i, t = this.world.getItemCount(), n = 0; n < t; n++)
            if ((i = this.world.getItemAt(n))._originalForNavigator === e)
              return i;
          return null;
        },
        _matchBounds: function (e, i, t) {
          var n = i.getBounds();
          e.setPosition(n.getTopLeft(), t), e.setWidth(n.width, t);
        },
      });
  })(OpenSeadragon);
});
//# sourceMappingURL=openseadragonmagnifier.js.map
