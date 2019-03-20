const title = d3.select('#title').attr('id', 'title');

title.append('h1').text('Doping in Professional Bicycle Racing');
title.append('h3').text('35 Fastest times up Alpe d\'Huez');

d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json').then(function(json){

  /* console.log(json[0]); 
  Object {
  Doping: "Alleged drug use during 1995 due to high hematocrit levels",
  Name: "Marco Pantani",
  Nationality: "ITA",
  Place: 1,
  Seconds: 2210,
  Time: "36:50",
  URL: "https://en.wikipedia.org/wiki/Marco_Pantani#Alleged_drug_use",
  Year: 1995
  } 
  console.log(json[0]['Time']); // "36:50"
  */
  
  const h = 500;
  const w = 800;
  const padding = 50;
  
  const recordFormat = "%M:%S";  
  const parsedRecords = json.map((n) => {
    return d3.timeParse(recordFormat)(n['Time'])
  });

  
  const xScale = d3.scaleLinear()
        .domain([d3.min(json, (d)=>d['Year']) -1, d3.max(json, (d)=>d['Year'])+1])
        .range([padding, w - 10]);
  const yScale = d3.scaleTime()
        .domain([d3.max(json, (d) => d["Seconds"]), d3.min(json, (d) => d["Seconds"])])
        .range([h - padding, 10]);
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale).tickFormat((d) => {
    let min = Math.floor(d / 60);
    let sec = d%60;
    return sec == 60 ? (min+1) + ":00" : min + ":"+ (sec<10 ? "0"+ sec : sec);
  });
  
  const svg = d3.select('#graph').append('svg')
        .attr('height', h).attr('width', w).style('background-color', 'pink');
  const dot = svg.selectAll('circle').data(json).enter().append('circle')
        .attr('cx',(d,i) => xScale(d['Year']))
        .attr('cy', (d,i) => yScale(d['Seconds']))
        .attr('r', '5px').attr('class', 'dot');
  
  svg.append('g')
      .attr("transform", "translate(0," +(h - padding)+ ")")
      .call(xAxis).attr('id','x-axis');
  svg.append('g')
      .attr("transform", "translate("+ padding +",0)")
      .call(yAxis).attr('id','y-axis'); 

}); 
