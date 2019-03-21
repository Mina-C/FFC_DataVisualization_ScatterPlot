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
  
  console.log(json[16]);
  
  const h = 500;
  const w = 800;
  const padding = 50;
   
  const xScale = d3.scaleLinear()
        .domain([d3.min(json, (d)=>d['Year']) -1, d3.max(json, (d)=>d['Year'])+1])
        .range([padding, w - 15]);
  const yScale = d3.scaleTime()
        .domain([d3.max(json, (d) => d["Seconds"]), d3.min(json, (d) => d["Seconds"])])
        .range([h - padding, 15]);
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale).tickFormat((d) => {
    let min = Math.floor(d / 60);
    let sec = d%60;
    return sec == 60 ? (min+1) + ":00" : min + ":"+ (sec<10 ? "0"+ sec : sec);
  });
  
  const div = d3.select('body').append('div').attr('id','tooltip').style('opacity',0);
  
  const svg = d3.select('#graph').append('svg')
        .attr('height', h).attr('width', w);
  const dot = svg.selectAll('circle').data(json).enter().append('circle')
        .attr('cx',(d,i) => xScale(d['Year']))
        .attr('cy', (d,i) => yScale(d['Seconds']))
        .attr('r', '5px').attr('class', 'dot')
        .attr('data-xvalue', (d) => d.Year).attr('data-yvalue', (d) => d.Time);
  dot.attr('fill', (d,i) => d["Doping"]==""? "orange" : "blue").attr('fill-opacity', '.5').attr('stroke', 'black');
  dot.on('mouseover',(d) =>{
    div.transition().duration(200).style('opacity', .9);
    div.html(d['Name'] +" : "+ d['Nationality'] + "<br/>" + "Year : "+ d['Year'] + ", Time : " + d.Time + (d.Doping ? "<br/><br/>" + d.Doping : ""))
        .style('left', (d3.event.pageX + 15) + "px")
        .style('top', (d3.event.pageY - 28) + "px")
  })
  .on('mouseout', (d) =>{
    div.transition().duration(500).style('opacity',0)
  });
  
  svg.append('g')
      .attr("transform", "translate(0," +(h - padding)+ ")")
      .call(xAxis).attr('id','x-axis');
  svg.append('g')
      .attr("transform", "translate("+ padding +",0)")
      .call(yAxis).attr('id','y-axis'); 

}); 
