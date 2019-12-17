# 2019-temperature

**Live demo** https://ebuddj.github.io/2019-temperature/

Global warming is the long-term rise in the average temperature of the Earth's climate system. While there have been prehistoric periods of global warming, many observed changes since the mid-20th century have been unprecedented over decades to millennia.

This visualisation shows how the temperatures calculated by the CMIP Phase 5 model changes over time. Visualisation starts from year 1901 and ends to year 2016. Each line in the visualisation presents one country and each column presents a month. In the animation you can see the difference to the average temperature on that month in that country. The average is calculated from years 1981–2010. 

The color scale goes from -2°C to +2°C. Larger anomalities are scales to the nearest maximum or minimum on the scale. This means that if the anomality is -10°C it is visualised as it was -2°C. This is done so that the big local anomalities won't blur the big picture. In the interactive version one can see the exact values.

In the interactive version you can select your country of preference.

## Project title

**Sources**
* [Worldbank](https://climateknowledgeportal.worldbank.org/download-data)
* [Coupled Model Intercomparison Project](https://en.wikipedia.org/wiki/Coupled_Model_Intercomparison_Project)
* [Global warming](https://en.wikipedia.org/wiki/Global_warming)

## How to use

If you are interested in using the interactive version please contact Teemo Tebest, tebest@ebu.ch

This visualization is part of the EBU News Exchange’s Data Journalism project. Other projects are available: https://news-exchange.ebu.ch/data-journalism

## Rights of usage

The material may be used only by Eurovision active members and sub-licensees.

## How to build and develop

This is a Webpack + React project.

* `npm install`
* `npm start`

Project should start at: http://localhost:8080

For developing please refer to `package.json`