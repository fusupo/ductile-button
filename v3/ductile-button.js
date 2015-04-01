function init(outText, overText) {

    var numSlices = 50;
    var font_size = 2;

    var durin = 0.5;
    var keyTimesIn = '0; 1';
    var keySplinesIn = '0.295 0.34 0.07 0.985';
    var durout = 0.5;
    var keyTimesOut = '0; 1';
    var keySplinesOut = '1 0.01 0.61 0.84';
    var delay = 0.005;

    var butt_too = document.getElementById("butt-too");
    var xmlns = "http://www.w3.org/2000/svg";

    var svgElm = document.createElementNS(xmlns, "svg");

    var defsElm = document.createElementNS(xmlns, "defs");

    var gElm = document.createElementNS(xmlns, "g");
    gElm.setAttribute("id", "snafu");

    var outRectElm = document.createElementNS(xmlns, "rect");
    outRectElm.setAttribute("class", "out-bg");

    var overRectElm = document.createElementNS(xmlns, "rect");
    overRectElm.setAttribute("class", "over-bg");

    var outTextElm = document.createElementNS(xmlns, "text");
    outTextElm.textContent = outText;
    outTextElm.setAttribute("style", "font-size:" + font_size + "em;");

    var overTextElm = document.createElementNS(xmlns, "text");
    overTextElm.textContent = overText;
    overTextElm.setAttribute("style", "font-size:" + font_size + "em;");

    var g2 = document.createElementNS(xmlns, "g");
    g2.setAttribute("id", "the-button");

    //

    butt_too.appendChild(svgElm);
    svgElm.appendChild(defsElm);
    svgElm.appendChild(g2);
    defsElm.appendChild(gElm);
    gElm.appendChild(outRectElm);
    gElm.appendChild(overRectElm);
    gElm.appendChild(outTextElm);
    gElm.appendChild(overTextElm);

    var bbox = outTextElm.getBBox();
    var w = Math.round(bbox.width);
    var h = bbox.height;
    var m_w = 20; // margin_width;
    var m_h = 20; // margin_height;
    var W = w + m_w;
    var H = h + m_h;
    var s_w = W / numSlices; // slice_width;

    svgElm.setAttribute("width", W + "px");
    svgElm.setAttribute("height", H + "px");

    outRectElm.setAttribute("width", W + "px");
    outRectElm.setAttribute("height", H + "px");
    outRectElm.setAttribute("style", "fill: #abc");

    overRectElm.setAttribute("width", W + "px");
    overRectElm.setAttribute("height", H + "px");
    overRectElm.setAttribute("y", H + "px");
    overRectElm.setAttribute("style", "fill: #333");

    outTextElm.setAttribute("x", (m_w / 2) + "px");
    outTextElm.setAttribute("y", h + (m_h / 4) + "px");

    overTextElm.setAttribute("x", (m_w / 2) + "px");
    overTextElm.setAttribute("y", (h + H + (m_h / 4)) + "px");

    for (var i = 0; i < numSlices; i++) {
        var vg = document.createElementNS(xmlns, "svg");
        vg.setAttribute("x", (i * s_w));
        vg.setAttribute("width", s_w);
        vg.setAttribute("height", H);
        vg.setAttribute("viewBox", (i * s_w) + " 0 " + s_w + " " + H);

        var useElm = document.createElementNS(xmlns, "use");
        useElm.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#snafu");
        useElm.setAttribute("x", 0);
        useElm.setAttribute("y", 0);

        var anim1 = document.createElementNS(xmlns, "animate");
        anim1.setAttribute("attributeName", "y");
        anim1.setAttribute("attributeType", "XML");
        anim1.setAttribute("values", "0;-" + H);
        anim1.setAttribute("begin", "hit-rect.mouseover+" + (i * delay) + "s");
        anim1.setAttribute("dur", durin + "s");
        anim1.setAttribute("keyTimes", keyTimesIn);
        anim1.setAttribute("keySplines", keySplinesIn);
        anim1.setAttribute("calcMode", "spline");
        anim1.setAttribute("fill", "freeze");

        var anim2 = document.createElementNS(xmlns, "animate");
        anim2.setAttribute("attributeName", "y");
        anim2.setAttribute("attributeType", "XML");
        anim2.setAttribute("values", "-" + H + ";0");
        anim2.setAttribute("begin", "hit-rect.mouseout+" + (i * delay) + "s");
        anim2.setAttribute("dur", durout + "s");
        anim2.setAttribute("keyTimes", keyTimesOut);
        anim2.setAttribute("keySplines", keySplinesOut);
        anim2.setAttribute("calcMode", "spline");
        anim2.setAttribute("fill", "freeze");

        useElm.appendChild(anim1);
        useElm.appendChild(anim2);
        vg.appendChild(useElm);
        g2.appendChild(vg);

        var anim3 = document.createElementNS(xmlns, "animate");
        anim3.setAttribute("attributeName", "fill");
        anim3.setAttribute("attributeType", "auto");
        anim3.setAttribute("from", "#333");
        anim3.setAttribute("to", "#abc");
        anim3.setAttribute("begin", "hit-rect.mouseover+" + (i * delay) + "s");
        anim3.setAttribute("dur", durin);
        anim3.setAttribute("keyTimes", keyTimesIn);
        anim3.setAttribute("keySplines", keySplinesIn);
        anim3.setAttribute("calcMode", "spline");
        anim3.setAttribute("fill", "freeze");

        var anim4 = document.createElementNS(xmlns, "animate");
        anim4.setAttribute("attributeName", "fill");
        anim4.setAttribute("attributeType", "auto");
        anim4.setAttribute("from", "#abc");
        anim4.setAttribute("to", "#333");
        anim4.setAttribute("begin", "hit-rect.mouseout+" + (i * delay) + "s");
        anim4.setAttribute("dur", durout + "s");
        anim4.setAttribute("keyTimes", keyTimesOut);
        anim4.setAttribute("keySplines", keySplinesOut);
        anim4.setAttribute("calcMode", "spline");
        anim4.setAttribute("fill", "freeze");

        var over_bg = document.getElementsByClassName("over-bg")[0];
        over_bg.appendChild(anim3);
        over_bg.appendChild(anim4);

        var anim5 = document.createElementNS(xmlns, "animate");
        anim5.setAttribute("attributeName", "fill");
        anim5.setAttribute("attributeType", "auto");
        anim5.setAttribute("from", "#abc");
        anim5.setAttribute("to", "#fff");
        anim5.setAttribute("begin", "hit-rect.mouseover+" + (i * delay) + "s");
        anim5.setAttribute("dur", durin);
        anim5.setAttribute("keyTimes", keyTimesIn);
        anim5.setAttribute("keySplines", keySplinesIn);
        anim5.setAttribute("calcMode", "spline");
        anim5.setAttribute("fill", "freeze");

        var anim6 = document.createElementNS(xmlns, "animate");
        anim6.setAttribute("attributeName", "fill");
        anim6.setAttribute("attributeType", "auto");
        anim6.setAttribute("from", "#fff");
        anim6.setAttribute("to", "#abc");
        anim6.setAttribute("begin", "hit-rect.mouseout+" + (i * delay) + "s");
        anim6.setAttribute("dur", durout + "s");
        anim6.setAttribute("keyTimes", keyTimesOut);
        anim6.setAttribute("keySplines", keySplinesOut);
        anim6.setAttribute("calcMode", "spline");
        anim6.setAttribute("fill", "freeze");

        var out_bg = document.getElementsByClassName("out-bg")[0];
        out_bg.appendChild(anim5);
        out_bg.appendChild(anim6);

    }

    var hitRect = document.createElementNS(xmlns, "rect");
    hitRect.setAttribute("width", W);
    hitRect.setAttribute("height", H);
    hitRect.setAttribute("x", 0);
    hitRect.setAttribute("color", "#999999");
    hitRect.setAttribute("opacity", "0.0");
    hitRect.setAttribute("id", "hit-rect");

    g2.appendChild(hitRect);


    document.getElementById('butt-too').style.width = W + 'px';
    document.getElementById('butt-too').style.height = H + 'px';
    document.getElementById('butt-too').style.color = '#ff0000';
}