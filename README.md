# 2019-temperature

## Temperature differences compared to the average per country and month from 1901 to 2016 (EBU)

**Live demo** https://ebuddj.github.io/2019-temperature/

Global warming is the long-term rise in the average temperature of the Earth's climate system. While there have been prehistoric periods of global warming, many observed changes since the mid-20th century have been unprecedented over decades to millennia.

This visualisation shows how the temperatures calculated by the CMIP Phase 5 model changes over time. Visualisation starts from year 1901 and ends to year 2016. Each line in the visualisation presents one country and each column presents a month. In the animation you can see the difference to the average temperature on that month in that country. The average is calculated per month and per country from years 1981–2010. Data comes from World Bank's Climate Knowledge Portal. Data can be used for non-commercial purposes.

The color scale goes from -2°C to +2°C. Larger anomalies are scaled to the nearest minimum or maximum on the scale meaning that if the anomality is for example -10°C it is visualised as it was -2°C. This is done so that the big local anomalies won't blur the big picture. In the interactive version one can see the exact values. The total average seen on the scale and bottom left is the non-weighted avarage from all countries per year.  

In the interactive version you can select your country of preference. Members can make a screen caption video of their own country's data if desired.

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