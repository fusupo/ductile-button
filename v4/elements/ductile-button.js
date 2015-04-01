Polymer('ductile-button', {
    width: 0,
    height: 0,
    slices: [],
    sliceDelay: 0.005,
    numSlices: 2,
    textBBox: {x:0,
               y:0,
               width:0,
               height:0},
    publish: {
        fontSize: 2,
        outStr: 'I am foo!',
        overStr: 'over'
    },
    computed: {
        fullWidth: 'width + marginW',
        fullHeight: 'height + marginH',
        sliceWidth: 'fullWidth / numSlices',
        marginW: 'fontSize * 10',
        marginH: 'fontSize * 10'
    },
    // initialize the element's model
    ready: function() {
        var bbox = this.$.outText.getBBox();
        this.textBBox = {x: bbox.x,
                         y: bbox.y,
                         width: bbox.width,
                         height: bbox.height};
        this.width = Math.round(this.textBBox.width);
        this.height = Math.round(this.textBBox.height);

        this.numSlices = 2;//Math.round(this.fullWidth)/5;
        this.sliceDelay = 1/this.numSlices/6;
        
        this.slices = [];
        for(var i=0; i < this.numSlices; i++){
            console.log(i);
            this.slices.push({
                x: i * this.sliceWidth,
                y: 0,
                width: this.sliceWidth,
                height: this.fullHeight,
                delay: this.sliceDelay * i
            });            
        }

    }
});
