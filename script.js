const title = d3.select('#title').attr('id', 'title');

title.append('h1')
  .text('Doping in Professional Bicycle Racing');
title.append('h3').text('35 Fastest times up Alpe d\'Huez');

d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json').then(function(json){
  const h = 500;
  const w = 800;
  const padding = 50;
  
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
  const recordFormat = "%M:%S";  
  const parsedRecords = json.map((n) => {
    return d3.timeParse(recordFormat)(n['Time'])
  });
  console.log(parsedRecords[0]);
  //const yMax = new Date(d3.max())
  
  const xScale = d3.scaleLinear()
        .domain([d3.min(json, (d)=> d['Year']), d3.max(json, (d)=>d['Year'])])
        .range([padding, w - 10]);
  const yScale = d3.scaleTime()
        .domain(d3.extent(parsedRecords))
        .range([h - padding, 10]);
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale)
        .tickValues(parsedRecords)
        .tickFormat((d) => d3.timeFormat(recordFormat)(d)); 
  
  const svg = d3.select('#graph').append('svg')
        .attr('height', h).attr('width', w).style('background-color', 'pink');
  svg.selectAll('circle').data(json).enter().append('circle')
  
        .attr('cx',(d,i) => xScale(d['Year']))
        .attr('cy', parsedRecords)
        .attr('r', '5px');
  
  svg.append('g')
      .attr("transform", "translate(0," +(h - padding)+ ")")
      .call(xAxis);
  svg.append('g')
      .attr("transform", "translate("+ padding +",0)")
      .call(yAxis); 

}); 
