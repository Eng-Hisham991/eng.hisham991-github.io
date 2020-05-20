
d3.json("samples.json").then((data)=> {
console.log(data);
var sample = Object.values(data.samples);
var metaData = Object.values(data.metadata);
console.log(metaData);

// Sort the data by otu_ids
var sortedByOtus = sample.sort((a, b) => (b.otu_ids) - (a.otu_ids));

// Slice the top 10 from the data
var slicedData = sortedByOtus.slice(0,10);
var slicedMeta = metaData.slice(0,9);
// console.log(slicedMeta);

// Create an array for each of sampleValues, otuIds & otuLabels
var sampleValues = slicedData.map(row => row.sample_values);
var otuIds = slicedData.map(row => row.otu_ids);
var otuLabels = slicedData.map(row => row.otu_labels);
// var metaD = slicedMeta.map(row => row.)

// Debug
// ;
// console.log(otuIds[0]);
// console.log(otuLabels[0]);

// The top 10 lists
var sampValues1 = sampleValues[0].slice(0,10).reverse();
var otuIds1 = otuIds[0].slice(0,10).reverse();
var otuLabels1 = otuLabels[0].slice(0,10).reverse();
console.log(otuIds1);
console.log(sampleValues[1].slice(0,10).reverse());

function init(){
    // Horizontal bar chart
    var data = [{
        x: sampValues1,
        y:  [`OTU ${otuIds1[0]}`, `OTU ${otuIds1[1]}`, `OTU ${otuIds1[2]}`, `OTU ${otuIds1[3]}`, `OTU ${otuIds1[4]}`, `OTU ${otuIds1[5]}`, `OTU ${otuIds1[6]}`, `OTU ${otuIds1[7]}`, `OTU ${otuIds1[8]}`, `OTU ${otuIds1[9]}`],
        type: "bar",
        text: otuLabels1,
        marker: {color : 'rgb(38, 95, 158)'},
        orientation: 'h',
    }];
    // var data = [trace1];

    var layout = {
        title : 'Sample Values vs. OTU ID',
        height: 600,
        width: 400
        };
    Plotly.newPlot("bar", data, layout);

    // Bubble chart
    // sampValues1 = sampleValues[1].slice(0,10).reverse();
    // otuIds1 = otuIds1[1].slice(0,10).reverse();
    // otuLabelS1 = otuLabels1[1].slice(0,10).reverse();
    var data1 = [{
        x : otuIds1,
        y : sampValues1,
        text: otuLabels1,
        mode : 'markers',
        marker : {
            color : otuIds1,  
            colorscale: [[0, 'rgb(166,206,227)'], [0.25, 'rgb(31,120,180)'], [0.45, 'rgb(207, 254, 67)'], [0.65, 'rgb(51,160,44)'], 
                         [0.85, 'rgb(251,154,153)'], [0.9, 'rgb(81, 255, 77)'], [1, 'rgb(159,210,255)']],
            size : sampValues1, 
            sizeref: 0.038, sizemode: "area",
            hoverinfo:"x+y"
        }
    }];
    var layout1 = {
      xaxis :{ title: "OTU ID"}, hovermode:'closest'
    };
    Plotly.newPlot("bubble",data1, layout1);

    // MetaData
    var k = Object.keys(slicedMeta[0]);
    var val =Object.values(slicedMeta[0]);
    console.log(val);
    console.log(slicedMeta[0]);
    var list = d3.select("#sample-metadata");
    list.html("");
    list.append("artilce").text(`${k[0]}: ${val[0]}`);
    list.append("article").text(`${k[1]}: ${val[1]}`);
    list.append("article").text(`${k[2]}: ${val[2]}`);
    list.append("article").text(`${k[3]}: ${val[3]}`);
    list.append("article").text(`${k[4]}: ${val[4]}`);
    list.append("article").text(`${k[5]}: ${val[5]}`);
    list.append("article").text(`${k[6]}: ${val[6]}`);
    
} 


// Call optionChanged() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", optionChanged);

// This function is called when the dropdown menu item is selected
function optionChanged(){
    var dropdownMenu = d3.select('#selDataset');

    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");

  // Initialize x and y arrays
    var x = [];
    var y = [];
    layout = {
        title : 'Sample Values vs. OTU ID'
            };
    layout1 = {
        xaxis :{ title: "OTU ID"}  
        };


    if (dataset === "OTUID0"){
        var sampValues0 = sampleValues[0].slice(0,10).reverse();
        var otuIds0 = otuIds[0].slice(0,10).reverse();
        var otuLabels0 = otuLabels[0].slice(0,10).reverse();
        x =  sampValues0;
        y =  [`OTU ${otuIds0[0]}`, `OTU ${otuIds0[1]}`, `OTU ${otuIds0[2]}`, `OTU ${otuIds0[3]}`, `OTU ${otuIds0[4]}`, `OTU ${otuIds0[5]}`, `OTU ${otuIds0[6]}`, `OTU ${otuIds0[7]}`, `OTU ${otuIds0[8]}`, `OTU ${otuIds0[9]}`];
        var dataUpdate = [{
            x : x,
            y : y,
            type: "bar",
            text: otuLabels0,
            marker: {color : 'rgb(38, 95, 158)'},
            orientation: 'h'
            }];
            console.log(sampValues0);
            console.log(otuIds0);

        var bubData = [{
            xx : otuIds0,
            yy: sampValues0,
            text: otuLabels0,
            mode : 'markers',
        marker : {
            color : otuIds1,  
            colorscale: [[0, 'rgb(166,206,227)'], [0.25, 'rgb(31,120,180)'], [0.45, 'rgb(207, 254, 67)'], [0.65, 'rgb(51,160,44)'], 
                         [0.85, 'rgb(251,154,153)'], [0.9, 'rgb(81, 255, 77)'], [1, 'rgb(159,210,255)']],
            size : sampValues1, 
            sizeref: 0.038, sizemode: "area",
            hoverinfo:"x+y"
            }
        }];
        // MetaData
        var k = Object.keys(slicedMeta[0]);
        var val =Object.values(slicedMeta[0]);
        var list = d3.select("#sample-metadata");
        list.html("");
        list.append("artilce").text(`${k[0]}: ${val[0]}`);
        list.append("article").text(`${k[1]}: ${val[1]}`);
        list.append("article").text(`${k[2]}: ${val[2]}`);
        list.append("article").text(`${k[3]}: ${val[3]}`);
        list.append("article").text(`${k[4]}: ${val[4]}`);
        list.append("article").text(`${k[5]}: ${val[5]}`);
        list.append("article").text(`${k[6]}: ${val[6]}`);
        }
    if (dataset === "OTUID1"){ 
        var sampValues1 = sampleValues[1].slice(0,10).reverse();
        var otuIDs1 = otuIds[1].slice(0,10).reverse();
        var otuLabelS1 = otuLabels[1].slice(0,10).reverse();
        x =  sampValues1,
        y =  [`OTU ${otuIDs1[0]}`, `OTU ${otuIDs1[1]}`, `OTU ${otuIDs1[2]}`, `OTU ${otuIDs1[3]}`, `OTU ${otuIDs1[4]}`, `OTU ${otuIDs1[5]}`, `OTU ${otuIDs1[6]}`, `OTU ${otuIDs1[7]}`, `OTU ${otuIDs1[8]}`, `OTU ${otuIDs1[9]}`];
        dataUpdate = [{
            x : x,
            y: y,
            type: "bar",
            text: otuLabelS1,
            marker: {color : 'rgb(38, 95, 158)'},
            orientation: 'h'
        }];
        var xx = otuIds[1].slice(0,10).reverse();
        var yy = sampleValues[1].slice(0,10).reverse();
        var text = otuLabels[1].slice(0,10).reverse();
        bubData = [{
            xx : xx,
            yy : yy,
            text: text,
            mode : 'markers',
            mode : 'markers',
            marker : {
            color : otuIds1,  
            colorscale: [[0, 'rgb(166,206,227)'], [0.25, 'rgb(31,120,180)'], [0.45, 'rgb(207, 254, 67)'], [0.65, 'rgb(51,160,44)'], 
                         [0.85, 'rgb(251,154,153)'], [0.9, 'rgb(81, 255, 77)'], [1, 'rgb(159,210,255)']],
            size : sampValues1, 
            sizeref: 0.038, sizemode: "area",
            hoverinfo:"x+y"            }
        }];
        Plotly.react("bubble", bubData, layout1);

        k = Object.keys(slicedMeta[1]);
        val =Object.values(slicedMeta[1]);
        list = d3.select("#sample-metadata");
        list.html("");
        list.append("artilce").text(`${k[0]}: ${val[0]}`);
        list.append("article").text(`${k[1]}: ${val[1]}`);
        list.append("article").text(`${k[2]}: ${val[2]}`);
        list.append("article").text(`${k[3]}: ${val[3]}`);
        list.append("article").text(`${k[4]}: ${val[4]}`);
        list.append("article").text(`${k[5]}: ${val[5]}`);
        list.append("article").text(`${k[6]}: ${val[6]}`);
        }
    if (dataset === "OTUID2"){
        var sampValues2 = sampleValues[2].slice(0,10).reverse();
        var otuIds2 = otuIds[2].slice(0,10).reverse();
        var otuLabels2 = otuLabels[2].slice(0,10).reverse();
        x =  sampValues2;
        y =  [`OTU ${otuIds2[0]}`, `OTU ${otuIds2[1]}`, `OTU ${otuIds2[2]}`, `OTU ${otuIds2[3]}`, `OTU ${otuIds2[4]}`, `OTU ${otuIds2[5]}`, `OTU ${otuIds2[6]}`, `OTU ${otuIds2[7]}`, `OTU ${otuIds2[8]}`, `OTU ${otuIds2[9]}`];
        dataUpdate = [{
            x : x,
            y: y,
            type: "bar",
            text: otuLabels2,
            marker: {color : 'rgb(38, 95, 158)'},
            orientation: 'h'
        }];
        console.log(sampValues2);
        console.log(otuIds2);

        var xx = otuIds[2].slice(0,10).reverse();
        var yy = sampleValues[2].slice(0,10).reverse();
        var text = otuLabels[2].slice(0,10).reverse();
        bubData = [{
            xx : xx,
            yy : yy,
            text: text,
            mode : 'markers',
            mode : 'markers',
            marker : {
            color : otuIds1,  
            colorscale: [[0, 'rgb(166,206,227)'], [0.25, 'rgb(31,120,180)'], [0.45, 'rgb(207, 254, 67)'], [0.65, 'rgb(51,160,44)'], 
                         [0.85, 'rgb(251,154,153)'], [0.9, 'rgb(81, 255, 77)'], [1, 'rgb(159,210,255)']],
            size : sampValues1, 
            sizeref: 0.038, sizemode: "area",
            hoverinfo:"x+y"
            }
            }];
        k = Object.keys(slicedMeta[2]);
        val =Object.values(slicedMeta[2]);
        if (k === '942'){
            list = d3.select("#sample-metadata");
            list.html("");
            list.append("artilce").text(`${k[0]}: ${val[0]}`);
            list.append("article").text(`${k[1]}: ${val[1]}`);
            list.append("article").text(`${k[2]}: ${val[2]}`);
            list.append("article").text(`${k[3]}: ${val[3]}`);
            list.append("article").text(`${k[4]}: ${val[4]}`);
            list.append("article").text(`${k[5]}: ${val[5]}`);
            list.append("article").text(`${k[6]}: ${val[6]}`);
        }
        else {
            list = d3.select("#sample-metadata");
            list.html("");
            list.append("artilce").text('No data for id 942');
        }
    }
    if (dataset === "OTUID3"){
        var sampValues3 = sampleValues[3].slice(0,10).reverse();
        var otuIds3 = otuIds[3].slice(0,10).reverse();
        var otuLabels3 = otuLabels[3].slice(0,10).reverse();
        x =  sampValues3;
        y =  [`OTU ${otuIds3[0]}`, `OTU ${otuIds3[1]}`, `OTU ${otuIds3[2]}`, `OTU ${otuIds3[3]}`, `OTU ${otuIds3[4]}`, `OTU ${otuIds3[5]}`, `OTU ${otuIds3[6]}`, `OTU ${otuIds3[7]}`, `OTU ${otuIds3[8]}`, `OTU ${otuIds3[9]}`];
        dataUpdate = [{
            x : x,
            y: y,
            type: "bar",
            text: otuLabels3,
            marker: {color : 'rgb(38, 95, 158)'},
            orientation: 'h'
        }];
            console.log(sampValues3);
            console.log(otuIds3);
        var xx = otuIds[3].slice(0,10).reverse();
        var yy = sampleValues[3].slice(0,10).reverse();
        var text = otuLabels[3].slice(0,10).reverse();    
        bubData = [{
            x : xx,
            y : yy,
            text: text,
            mode : 'markers',
            mode : 'markers',
            marker : {
                color : otuIds1,  
                colorscale: [[0, 'rgb(166,206,227)'], [0.25, 'rgb(31,120,180)'], [0.45, 'rgb(207, 254, 67)'], [0.65, 'rgb(51,160,44)'], 
                             [0.85, 'rgb(251,154,153)'], [0.9, 'rgb(81, 255, 77)'], [1, 'rgb(159,210,255)']],
                size : sampValues1, 
                sizeref: 0.038, sizemode: "area",
                hoverinfo:"x+y"
            }
        }];
        k = Object.keys(slicedMeta[2]);
        val =Object.values(slicedMeta[2]);
        list = d3.select("#sample-metadata");
        list.html("");
        list.append("artilce").text(`${k[0]}: ${val[0]}`);
        list.append("article").text(`${k[1]}: ${val[1]}`);
        list.append("article").text(`${k[2]}: ${val[2]}`);
        list.append("article").text(`${k[3]}: ${val[3]}`);
        list.append("article").text(`${k[4]}: ${val[4]}`);
        list.append("article").text(`${k[5]}: ${val[5]}`);
        list.append("article").text(`${k[6]}: ${val[6]}`);
    }
    if (dataset === "OTUID4"){
        var sampValues4 = sampleValues[4].slice(0,10).reverse();
        var otuIds4 = otuIds[4].slice(0,10).reverse();
        var otuLabels4 = otuLabels[4].slice(0,10).reverse();
        x =  sampValues4;
        y =  [`OTU ${otuIds4[0]}`, `OTU ${otuIds4[1]}`, `OTU ${otuIds4[2]}`, `OTU ${otuIds4[3]}`, `OTU ${otuIds4[4]}`, `OTU ${otuIds4[5]}`, `OTU ${otuIds4[6]}`, `OTU ${otuIds4[7]}`, `OTU ${otuIds4[8]}`, `OTU ${otuIds4[9]}`];
        dataUpdate = [{
            x : x,
            y: y,
            type: "bar",
            text: otuLabels4,
            marker: {color : 'rgb(38, 95, 158)'},
            orientation: 'h'
        }];
            console.log(sampValues4);
            console.log(otuIds4);
        var xx = otuIds[4].slice(0,10).reverse();
        var yy = sampleValues[4].slice(0,10).reverse();
        var text = otuLabels[4].slice(0,10).reverse();
        bubData = [{
            x : xx,
            y : yy,
            text: text,
            mode : 'markers',
            mode : 'markers',
            marker : {
            color : otuIds1,  
            colorscale: [[0, 'rgb(166,206,227)'], [0.25, 'rgb(31,120,180)'], [0.45, 'rgb(207, 254, 67)'], [0.65, 'rgb(51,160,44)'], 
                         [0.85, 'rgb(251,154,153)'], [0.9, 'rgb(81, 255, 77)'], [1, 'rgb(159,210,255)']],
            size : sampValues1, 
            sizeref: 0.038, sizemode: "area",
            hoverinfo:"x+y"
              }
        }];
        k = Object.keys(slicedMeta[3]);
        val =Object.values(slicedMeta[3]);
        list = d3.select("#sample-metadata");
        list.html("");
        list.append("artilce").text(`${k[0]}: ${val[0]}`);
        list.append("article").text(`${k[1]}: ${val[1]}`);
        list.append("article").text(`${k[2]}: ${val[2]}`);
        list.append("article").text(`${k[3]}: ${val[3]}`);
        list.append("article").text(`${k[4]}: ${val[4]}`);
        list.append("article").text(`${k[5]}: ${val[5]}`);
        list.append("article").text(`${k[6]}: ${val[6]}`);
    }
    if (dataset === "OTUID5"){
        var sampValues5 = sampleValues[5].slice(0,10).reverse();
        var otuIds5 = otuIds[5].slice(0,10).reverse();
        var otuLabels5 = otuLabels[5].slice(0,10).reverse();
        x =  sampValues5;
        y =  [`OTU ${otuIds5[0]}`, `OTU ${otuIds5[1]}`, `OTU ${otuIds5[2]}`, `OTU ${otuIds5[3]}`, `OTU ${otuIds5[4]}`, `OTU ${otuIds5[5]}`, `OTU ${otuIds5[6]}`, `OTU ${otuIds5[7]}`, `OTU ${otuIds5[8]}`, `OTU ${otuIds5[9]}`];
        dataUpdate = [{
            x : x,
            y: y,
            type: "bar",
            text: otuLabels5,
            marker: {color : 'rgb(38, 95, 158)'},
            orientation: 'h'
        }];
            console.log(sampValues5);
            console.log(otuIds5);

        var xx = otuIds[5].slice(0,10).reverse();
        var yy = sampleValues[5].slice(0,10).reverse();
        var text = otuLabels[5].slice(0,10).reverse();
        bubData = [{
            x : xx,
            y : yy,
            text: text,
            mode : 'markers',
            mode : 'markers',
            marker : {
            color : otuIds1,  
            colorscale: [[0, 'rgb(166,206,227)'], [0.25, 'rgb(31,120,180)'], [0.45, 'rgb(207, 254, 67)'], [0.65, 'rgb(51,160,44)'], 
                         [0.85, 'rgb(251,154,153)'], [0.9, 'rgb(81, 255, 77)'], [1, 'rgb(159,210,255)']],
            size : sampValues1, 
            sizeref: 0.038, sizemode: "area",
            hoverinfo:"x+y"
            }
        }];
        k = Object.keys(slicedMeta[4]);
        val =Object.values(slicedMeta[4]);
        list = d3.select("#sample-metadata");
        list.html("");
        list.append("artilce").text(`${k[0]}: ${val[0]}`);
        list.append("article").text(`${k[1]}: ${val[1]}`);
        list.append("article").text(`${k[2]}: ${val[2]}`);
        list.append("article").text(`${k[3]}: ${val[3]}`);
        list.append("article").text(`${k[4]}: ${val[4]}`);
        list.append("article").text(`${k[5]}: ${val[5]}`);
        list.append("article").text(`${k[6]}: ${val[6]}`);
    }
    if (dataset === "OTUID6"){
        var sampValues6 = sampleValues[6].slice(0,10).reverse();
        var otuIds6 = otuIds[6].slice(0,10).reverse();
        var otuLabels6 = otuLabels[6].slice(0,10).reverse();
        x =  sampValues6;
        y =  [`OTU ${otuIds6[0]}`, `OTU ${otuIds6[1]}`, `OTU ${otuIds6[2]}`, `OTU ${otuIds6[3]}`, `OTU ${otuIds6[4]}`, `OTU ${otuIds6[5]}`, `OTU ${otuIds6[6]}`, `OTU ${otuIds6[7]}`, `OTU ${otuIds6[8]}`, `OTU ${otuIds6[9]}`];
        dataUpdate = [{
            x : x,
            y: y,
            type: "bar",
            text: otuLabels6,
            marker: {color : 'rgb(38, 95, 158)'},
            orientation: 'h'
        }];
            console.log(sampValues6);
            console.log(otuIds6);

        var xx = otuIds[6].slice(0,10).reverse();
        var yy = sampleValues[6].slice(0,10).reverse();
        var text = otuLabels[6].slice(0,10).reverse();
        bubData = [{
            x : xx,
            y : yy,
            text: text,
            mode : 'markers',
            mode : 'markers',
            marker : {
            color : otuIds1,  
            colorscale: [[0, 'rgb(166,206,227)'], [0.25, 'rgb(31,120,180)'], [0.45, 'rgb(207, 254, 67)'], [0.65, 'rgb(51,160,44)'], 
                         [0.85, 'rgb(251,154,153)'], [0.9, 'rgb(81, 255, 77)'], [1, 'rgb(159,210,255)']],
            size : sampValues1, 
            sizeref: 0.038, sizemode: "area",
            hoverinfo:"x+y"
            }
        }];
        k = Object.keys(slicedMeta[5]);
        val =Object.values(slicedMeta[5]);
        list = d3.select("#sample-metadata");
        list.html("");
        list.append("artilce").text(`${k[0]}: ${val[0]}`);
        list.append("article").text(`${k[1]}: ${val[1]}`);
        list.append("article").text(`${k[2]}: ${val[2]}`);
        list.append("article").text(`${k[3]}: ${val[3]}`);
        list.append("article").text(`${k[4]}: ${val[4]}`);
        list.append("article").text(`${k[5]}: ${val[5]}`);
        list.append("article").text(`${k[6]}: ${val[6]}`);
    }
    if (dataset === "OTUID7"){
        var sampValues7 = sampleValues[7].slice(0,10).reverse();
        var otuIds7 = otuIds[7].slice(0,10).reverse();
        var otuLabels7 = otuLabels[7].slice(0,10).reverse();
        x =  sampValues7;
        y =  [`OTU ${otuIds7[0]}`, `OTU ${otuIds7[1]}`, `OTU ${otuIds7[2]}`, `OTU ${otuIds7[3]}`, `OTU ${otuIds7[4]}`, `OTU ${otuIds7[5]}`, `OTU ${otuIds7[6]}`, `OTU ${otuIds7[7]}`, `OTU ${otuIds7[8]}`, `OTU ${otuIds7[9]}`];
        dataUpdate = [{
            x : x,
            y: y,
            type: "bar",
            text: otuLabels7,
            marker: {color : 'rgb(38, 95, 158)'},
            orientation: 'h'
        }];
            console.log(sampValues7);
            console.log(otuIds7);

        var xx = otuIds[7].slice(0,10).reverse();
        var yy = sampleValues[7].slice(0,10).reverse();
        var text = otuLabels[7].slice(0,10).reverse();
        bubData = [{
            x : xx,
            y : yy,
            text: text,
            mode : 'markers',
            mode : 'markers',
            marker : {
            color : otuIds1,  
            colorscale: [[0, 'rgb(166,206,227)'], [0.25, 'rgb(31,120,180)'], [0.45, 'rgb(207, 254, 67)'], [0.65, 'rgb(51,160,44)'], 
                         [0.85, 'rgb(251,154,153)'], [0.9, 'rgb(81, 255, 77)'], [1, 'rgb(159,210,255)']],
            size : sampValues1, 
            sizeref: 0.038, sizemode: "area",
            hoverinfo:"x+y"
            }
        }];
        k = Object.keys(slicedMeta[6]);
        val =Object.values(slicedMeta[6]);
        list = d3.select("#sample-metadata");
        list.html("");
        list.append("artilce").text(`${k[0]}: ${val[0]}`);
        list.append("article").text(`${k[1]}: ${val[1]}`);
        list.append("article").text(`${k[2]}: ${val[2]}`);
        list.append("article").text(`${k[3]}: ${val[3]}`);
        list.append("article").text(`${k[4]}: ${val[4]}`);
        list.append("article").text(`${k[5]}: ${val[5]}`);
        list.append("article").text(`${k[6]}: ${val[6]}`);
    }
    if (dataset === "OTUID8"){
        var sampValues8 = sampleValues[8].slice(0,10).reverse();
        var otuIds8 = otuIds[8].slice(0,10).reverse();
        var otuLabels8 = otuLabels[8].slice(0,10).reverse();
        x =  sampValues8;
        y =  [`OTU ${otuIds8[0]}`, `OTU ${otuIds8[1]}`, `OTU ${otuIds8[2]}`, `OTU ${otuIds8[3]}`, `OTU ${otuIds8[4]}`, `OTU ${otuIds8[5]}`, `OTU ${otuIds8[6]}`, `OTU ${otuIds8[7]}`, `OTU ${otuIds8[8]}`, `OTU ${otuIds8[9]}`];
        dataUpdate = [{
            x : x,
            y: y,
            type: "bar",
            text: otuLabels8,
            marker: {color : 'rgb(38, 95, 158)'},
            orientation: 'h'
        }];

        var xx = otuIds[8].slice(0,10).reverse();
        var yy = sampleValues[8].slice(0,10).reverse();
        var text = otuLabels[8].slice(0,10).reverse();
        bubData = [{
            x : xx,
            y : yy,
            text: text,
            mode : 'markers',
            mode : 'markers',
            marker : {
            color : otuIds1,  
            colorscale: [[0, 'rgb(166,206,227)'], [0.25, 'rgb(31,120,180)'], [0.45, 'rgb(207, 254, 67)'], [0.65, 'rgb(51,160,44)'], 
                         [0.85, 'rgb(251,154,153)'], [0.9, 'rgb(81, 255, 77)'], [1, 'rgb(159,210,255)']],
            size : sampValues1, 
            sizeref: 0.038, sizemode: "area",
            hoverinfo:"x+y"
            }
        }];
        k = Object.keys(slicedMeta[7]);
        val =Object.values(slicedMeta[7]);
        list = d3.select("#sample-metadata");
        list.html("");
        list.append("artilce").text(`${k[0]}: ${val[0]}`);
        list.append("article").text(`${k[1]}: ${val[1]}`);
        list.append("article").text(`${k[2]}: ${val[2]}`);
        list.append("article").text(`${k[3]}: ${val[3]}`);
        list.append("article").text(`${k[4]}: ${val[4]}`);
        list.append("article").text(`${k[5]}: ${val[5]}`);
        list.append("article").text(`${k[6]}: ${val[6]}`);
    }
    if (dataset === "OTUID9"){
        var sampValues9 = sampleValues[9].slice(0,10).reverse();
        var otuIds9 = otuIds[9].slice(0,10).reverse();
        var otuLabels9 = otuLabels[9].slice(0,10).reverse();
        x =  sampValues9;
        y =  [`OTU ${otuIds9[0]}`, `OTU ${otuIds9[1]}`, `OTU ${otuIds9[2]}`, `OTU ${otuIds9[3]}`, `OTU ${otuIds9[4]}`, `OTU ${otuIds9[5]}`, `OTU ${otuIds9[6]}`, `OTU ${otuIds9[7]}`, `OTU ${otuIds9[8]}`, `OTU ${otuIds9[9]}`];
        dataUpdate = [{
            x : x,
            y: y,
            type: "bar",
            text: otuLabels9,
            marker: {color : 'rgb(38, 95, 158)'},
            orientation: 'h'
        }];

        var xx = otuIds[9].slice(0,10).reverse();
        var yy = sampleValues[9].slice(0,10).reverse();
        var text = otuLabels[9].slice(0,10).reverse();
        bubData = [{
            x : xx,
            y : yy,
            text: text,
            mode : 'markers',
            marker : {
                color : xx,
                colorscale: [[0, 'rgb(166,206,227)'], [0.25, 'rgb(31,120,180)'], [0.45, 'rgb(178,223,138)'], [0.65, 'rgb(51,160,44)'], 
                             [0.85, 'rgb(251,154,153)'], [0.9, 'rgb(81, 255, 77)'],[1, 'rgb(159,210,255)']],
                size : (yy) * 0.5,
                sizeref: 0.038, sizemode: "area",
                hoverinfo:"x+y"
            }
        }];
        k = Object.keys(slicedMeta[8]);
        val =Object.values(slicedMeta[8]);
        list = d3.select("#sample-metadata");
        list.html("");
        list.append("artilce").text(`${k[0]}: ${val[0]}`);
        list.append("article").text(`${k[1]}: ${val[1]}`);
        list.append("article").text(`${k[2]}: ${val[2]}`);
        list.append("article").text(`${k[3]}: ${val[3]}`);
        list.append("article").text(`${k[4]}: ${val[4]}`);
        list.append("article").text(`${k[5]}: ${val[5]}`);
        list.append("article").text(`${k[6]}: ${val[6]}`);
    }
    Plotly.animate("bar", {
        data : dataUpdate,
        layout: layout},
        { transition: {duration:0},
        frame : {duration :0, redraw :false}
    }); 
    Plotly.restyle("bubble", bubData, bubData);
    //     layout: layout1},
    //     { transition: {duration:0},
    //     frame : {duration :0, redraw :false}
    // }); 
    }
init();
});


