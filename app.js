// Creating function for Data plotting 
function getPlot(id) {
    // getting data from the json file 
    d3.json("Data/samples.json").then((data)=> {
        console.log(data)

        var wfreq = data.metadata.map(d => d.wfreq)
        console.log('Washing Freq: ${wfreq}')

        // filter sample values by id 
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        console.log(samples);
        
        //Getting the top 10 
        var samplevalues = (samples.sample_values.slice(0, 10)).reverse();
    
        // Get only the top 10 otu ids for the plot OTU and reversing it 
        var OTU_top = (samples.otu_ids.slice(0, 10)).reverse();

        // Get the OTU id's to the desired form for the plot
        var OTU_id = OTU_top.map(d => "OTU " + d)

        //var labels = otulabels.slice(0, 10);

        var trace = {
            x: samplevalues,
            y: OTU_id,
            //text: labels,
            marker: {
                color: 'rgb(142,124,195)'},
                type:"bar",
                orientation: "h",
            };

            var data = [trace];

            var layout = {
                title: "Top 10 OTU",
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
                }    
            };
            
            Plotly.newPlot("bar", data, layout);

            var trace1 = {
                x:samples.otu_ids,
                y: samples.sample_values,
                mode: "markers", 
                marker: {
                    size: samples.sample_values,
                    color: samples.otu_ids
                },
                text: samples.otu_labels 
            };

            var layout_b = {
                xaxis:{title: "OTU ID"},
                height: 600,
                width: 1000
            };

            var data1 = [trace1];

            Plotly.newPlot("bubble", data1, layout_b)

            var data_g = [
                {
                    domain: { x: [0, 1], y: [0, 1]}, 
                    value: parseFloat(wfreq),
                    title: { text: 'Weekly Washing Frequency'}, 
                    type: "indicator", 
                    mode: "gauge+number",
                    gauge: { axis: { range: [null, 9]},
                             steps: [
                                {range: [0, 2], color: "yellow"},
                                {range: [2, 4], color: "cyan"},
                                {range: [4, 6], color: "teal"},
                                {range: [6, 8], color: "lime"},
                                {range: [8, 9], color: "green"},
                            ]}
                }
            ]; 
            var layout_g = {
                widht: 700,
                height: 600,
                margin: { t: 20, b: 40, l: 100, r: 100 }
            };
           Plotly.newPlot("gauge", data_g, layout_g);
        });
    }

function getInfo(id){
    d3.json("Data/samples.json").then((data)=>{
        var metadata = data.metadata;

        var result = metadata.filter(meta => meta.id.toString() === id)[0];
        var demographicInfo = d3.select("#sample-metadata");
        demographicInfo.html("");
        
        Object.entries(result).forEach((key) => {
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
}

function optionChanged(id) {
    getPlot(id);
    getInfo(id);
}

function init() {
    var dropdown = d3.select("#selDataset");
    d3.json("Data/samples.json").then((data)=> {
        console.log(data)
        var sampleNames = data.names;


        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
        var firstSample = sampleNames[0];
        getPlot(firstSample);
        getInfo(firstSample);
    });
}

init();

