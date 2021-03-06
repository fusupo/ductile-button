var xtof = xtof || {};

(function(r) {

    xtof.ductile = xtof.ductile || {};

    //via quirksmode: http://www.quirksmode.org/dom/getstyles.html
    var getStyle = function(el, styleProp) {
        var x = el;
        if (x.currentStyle)
            var y = x.currentStyle[styleProp];
        else if (window.getComputedStyle)
            var y = document.defaultView.getComputedStyle(x, null).getPropertyValue(styleProp);
        return y;
    };

    var init = function(outText, overText, elm) {

        var baseID = outText.replace(/[ \.]/g, '');

        var numSlices = 50;
        var font_size = getStyle(elm, "font-size");
        var durin = 0.5;
        var keyTimesIn = '0; 1';
        var keySplinesIn = '0.295 0.34 0.07 0.985';
        var durout = 0.5;
        var keyTimesOut = '0; 1';
        var keySplinesOut = '1 0.01 0.61 0.84';
        var delay = durin / (1.618 * numSlices);

        var xmlns = "http://www.w3.org/2000/svg";

        var svgElm = document.createElementNS(xmlns, "svg");

        var defsElm = document.createElementNS(xmlns, "defs");

        var useID = baseID;
        var gElm = document.createElementNS(xmlns, "g");
        gElm.setAttribute("id", useID);

        var outRectElm = document.createElementNS(xmlns, "rect");
        outRectElm.setAttribute("class", "out-bg");

        var overRectElm = document.createElementNS(xmlns, "rect");
        overRectElm.setAttribute("class", "over-bg");

        var outTextElm = document.createElementNS(xmlns, "text");
        outTextElm.textContent = outText;
        outTextElm.setAttribute("style", "font-size:" + font_size);

        var overTextElm = document.createElementNS(xmlns, "text");
        overTextElm.textContent = overText;
        overTextElm.setAttribute("style", "font-size:" + font_size);

        var g2 = document.createElementNS(xmlns, "g");
        g2.setAttribute("id", "the-button");

        //
        
        var createAnimateTransform = function(type, from, to, begin, dur, keyTimes, keySplines){
            var anim = document.createElementNS(xmlns, "animateTransform");
            anim.setAttribute("attributeName", "transform");
            anim.setAttribute("type", type);
            anim.setAttribute("from", from);
            anim.setAttribute("to", to);
            anim.setAttribute("begin", begin);
            anim.setAttribute("dur", dur);
            anim.setAttribute("keyTimes", keyTimes);
            anim.setAttribute("keySplines", keySplines);
            anim.setAttribute("calcMode", "spline");
            anim.setAttribute("fill", "freeze");
            return anim;
        };

        var createAnimate = function(type, from, to, begin, dur, keyTimes, keySplines){
            var anim = document.createElementNS(xmlns, "animate");
            anim.setAttribute("attributeName", type);
            anim.setAttribute("attributeType", "auto");
            anim.setAttribute("from", from);
            anim.setAttribute("to", to);
            anim.setAttribute("begin", begin);
            anim.setAttribute("dur", dur);
            anim.setAttribute("keyTimes", keyTimes);
            anim.setAttribute("keySplines", keySplines);
            anim.setAttribute("calcMode", "spline");
            anim.setAttribute("fill", "freeze");
            return anim;
        };
        
        //

        elm.appendChild(svgElm);

        svgElm.appendChild(defsElm);
        svgElm.appendChild(g2);
        defsElm.appendChild(gElm);
        gElm.appendChild(outRectElm);
        gElm.appendChild(overRectElm);
        gElm.appendChild(outTextElm);
        gElm.appendChild(overTextElm);

        var bbox = outTextElm.getBBox();
        var w = Math.round(bbox.width) - 4;
        var h = bbox.height;
        var m_w = 5; //20; // margin_width;
        var m_h = 5; //20; // margin_height;
        var W = w + m_w;
        var H = h + m_h;
        var s_w = W / numSlices; // slice_width;

        var bgColorOut = "#fff";
        var bgColorOver = "#1bc";

        svgElm.setAttribute("width", W + "px");
        svgElm.setAttribute("height", H + "px");
        svgElm.style.position = "relative";
        svgElm.style.top = "4px";

        outRectElm.setAttribute("width", W + "px");
        outRectElm.setAttribute("height", H + "px");
        outRectElm.setAttribute("style", "fill: " + bgColorOut);

        overRectElm.setAttribute("width", W + "px");
        overRectElm.setAttribute("height", H + "px");
        overRectElm.setAttribute("y", H + "px");
        overRectElm.setAttribute("style", "fill: #333");

        outTextElm.setAttribute("x", ((m_w / 2) - 2) + "px");
        outTextElm.setAttribute("y", h + (m_h / 4) + "px");

        overTextElm.setAttribute("x", ((m_w / 2) - 2) + "px");
        overTextElm.setAttribute("y", (h + H + (m_h / 4)) + "px");

        for (var i = 0; i < numSlices; i++) {
            var vg = document.createElementNS(xmlns, "svg");
            vg.setAttribute("x", (i * s_w));
            vg.setAttribute("width", s_w);
            vg.setAttribute("height", H);
            vg.setAttribute("viewBox", (i * s_w) + " 0 " + s_w + " " + H);

            var useElm = document.createElementNS(xmlns, "use");
            useElm.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#" + useID);
            useElm.setAttribute("x", 0);
            useElm.setAttribute("y", 0);

            var anim1 = createAnimateTransform( "translate",
                                                "0 0",
                                                "0 -" + H,
                                                "hit-" + baseID + ".mouseover+" + (i * delay) + "s",
                                                durin + "s",
                                                keyTimesIn,
                                                keySplinesIn );

            // var anim1b = document.createElementNS(xmlns, "animateTransform");
            // anim1b.setAttribute("attributeName", "transform");
            // anim1b.setAttribute("type", "scale");
            // anim1b.setAttribute("from", "1 0");
            // anim1b.setAttribute("to", "1 1");
            // anim1b.setAttribute("begin", "hit-" + baseID + ".mouseover+" + (i * delay) + "s");
            // anim1b.setAttribute("dur", durin + "s");
            // anim1b.setAttribute("keyTimes", keyTimesIn);
            // anim1b.setAttribute("keySplines", keySplinesIn);
            // anim1b.setAttribute("calcMode", "spline");
            // anim1b.setAttribute("fill", "freeze");

            var anim2 = createAnimateTransform( "translate",
                                                "0 -" + H,
                                                "0 0",
                                                "hit-" + baseID + ".mouseout+" + (i * delay) + "s",
                                                durout + "s",
                                                keyTimesOut,
                                                keySplinesOut );

            // var anim2b = document.createElementNS(xmlns, "animateTransform");
            // anim2b.setAttribute("attributeName", "transform");
            // anim2b.setAttribute("type", "scale");
            // anim2b.setAttribute("from", "1 1");
            // anim2b.setAttribute("to", "1 0");
            // anim2b.setAttribute("begin", "hit-" + baseID + ".mouseout+" + (i * delay) + "s");
            // anim2b.setAttribute("dur", durout + "s");
            // anim2b.setAttribute("keyTimes", keyTimesOut);
            // anim2b.setAttribute("keySplines", keySplinesOut);
            // anim2b.setAttribute("calcMode", "spline");
            // anim2b.setAttribute("fill", "freeze");

            useElm.appendChild(anim1);
            useElm.appendChild(anim2);
            vg.appendChild(useElm);
            g2.appendChild(vg);

            var anim3 = createAnimate("fill",
                                      "#333",
                                      bgColorOver,
                                      "hit-" + baseID + ".mouseover+" + (i * delay) + "s",
                                      durin + "s",
                                      keyTimesIn,
                                      keySplinesIn);

            var anim4 = createAnimate("fill",
                                      bgColorOver,
                                      "#333",
                                      "hit-" + baseID + ".mouseout+" + (i * delay) + "s",
                                      durout + "s",
                                      keyTimesOut,
                                      keySplinesOut);


            overRectElm.appendChild(anim3);
            overRectElm.appendChild(anim4);

            var anim5 = createAnimate("fill",
                                      bgColorOut,
                                      "#fff",
                                      "hit-" + baseID + ".mouseover+" + (i * delay) + "s",
                                      durin + "s",
                                      keyTimesIn,
                                      keySplinesIn);

            var anim6 = createAnimate("fill",
                                      "#fff",
                                      bgColorOut,
                                      "hit-" + baseID + ".mouseout+" + (i * delay) + "s",
                                      durout + "s",
                                      keyTimesOut,
                                      keySplinesOut);

            outRectElm.appendChild(anim5);
            outRectElm.appendChild(anim6);
        }

        var hitRect = document.createElementNS(xmlns, "rect");
        hitRect.setAttribute("width", W);
        hitRect.setAttribute("height", H);
        hitRect.setAttribute("x", 0);
        hitRect.setAttribute("color", "#999999");
        hitRect.setAttribute("opacity", "0.0");
        hitRect.setAttribute("id", "hit-" + baseID);

        g2.appendChild(hitRect);

        return svgElm;
    };

    xtof.ductile.replaceLinks = function(parentElement) {
        
        var elm;
        if (parentElement !== undefined) {
            elm = document.getElementById(parentElement);
        } else {
            elm = document;
        }

        var linkElms = elm.getElementsByTagName("a");
        for (var i = 0; i < linkElms.length; i++) {
            var linkElm = linkElms[i];
            var targtxt = linkElm.text;
            linkElm.text = "";
            init(targtxt, targtxt, linkElm);
        };
        
    };

}(this));
