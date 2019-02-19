const title = d3.select('body').attr('id', 'title');

title.append('h1')
  .text('Doping in Professional Bicycle Racing');
title.append('h3').text('35 Fastest times up Alpe d\'Huez');

d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json').then(function(json){
  const h = 400;
  const w = 800;
  const padding = 50;
  
  
}); 
