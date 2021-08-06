# 2019-temperature

**Live demo** https://ebuddj.github.io/2019-temperature/

## Temperature differences compared to the average per country and month from 1901 to 2020 (EBU)

Global warming is the long-term rise in the average temperature of the Earth's climate system. While there have been prehistoric periods of global warming, many observed changes since the mid-20th century have been unprecedented over decades to millennia.

This visualisation shows how the temperatures calculated by the CMIP Phase 5 model changes over time. Visualisation starts from year 1901 and ends to year 2020. Each line in the visualisation presents one country and each column presents a month. In the animation you can see the difference to the average temperature on that month in that country. The average is calculated per month and per country from years 1951–1980. Data comes from World Bank's Climate Knowledge Portal. Data can be used for non-commercial purposes.

The color scale goes from -3°C to +3°C. Larger anomalies are scaled to the nearest minimum or maximum on the scale meaning that if the anomality is for example -10°C it is visualised as it was -3°C. This is done so that the big local anomalies won't blur the big picture. In the interactive version one can see the exact values. The total average seen on the scale is the non-weighted avarage from all countries per year.  

In the interactive version you can select your country of preference. Members can make a screen caption video of their own country's data if desired.

Missing data for Armenia and Belize.

**Sources**
* [Worldbank](https://climateknowledgeportal.worldbank.org/download-data)
* [NASA](https://data.giss.nasa.gov/gistemp/)
* [Coupled Model Intercomparison Project](https://en.wikipedia.org/wiki/Coupled_Model_Intercomparison_Project)
* [Global warming](https://en.wikipedia.org/wiki/Global_warming)

**EBU links**
* [Social Newswire](https://www.evnsocialnewswire.ch/climate/climate-animation-shows-changes-in-temperature-per-country-from-1901-2016-animation/)
* [News Exchange](https://news-exchange.ebu.ch/item_detail/1db9a66f91368300da1d67928dfb1ede/2019_21060495), 2019-12-18
* [News Exchange](https://news-exchange.ebu.ch/item_detail/2ee6d07895acda9a9b3ca64b2d57a6e2/2021_10034934), 2021-08-06

**Used by**
* [DW/Germany](https://twitter.com/dwnews/status/1207232031492640769)
* [RTÉ/Ireland](https://www.instagram.com/p/B6NcV-wl3qq/)
* [Euronews/Italy on Instagram](https://www.instagram.com/p/B6OEoStjZ5P/)
* [Euronews/Italy on Online](https://it.euronews.com/2019/12/19/capire-il-riscaldamento-globale-a-colpo-d-occhio)
* [Euronews/France on Online](https://fr.euronews.com/2019/12/20/animation-39-secondes-pour-constater-le-rechauffement-climatique)

## How to use

If you are interested in using the interactive version please contact Teemo Tebest, tebest@ebu.ch

This visualization is part of the EBU News Exchange’s Data Journalism project. Other projects are available: https://news-exchange.ebu.ch/data-journalism

## Rights of usage

The material may be used only by [Eurovision active members and sub-licensees](https://www.ebu.ch/eurovision-news/members-and-sublicensees).

## How to build and develop

This is a Webpack + React project.

* `npm install`
* `npm start`

Project should start at: http://localhost:8080

For developing please refer to `package.json`