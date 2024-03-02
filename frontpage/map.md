---
tags: maincontent
title:  "Activity Map"
categories: main
order_number: 2
---

# Activity Map

<div class="leaflet-container" id="map" style="width: 600px; height: 400px;"></div>

<script>
	const map = L.map('map').setView([-27.41, 134.77], 3);

	const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);

	function mapIconColor(postDateStr) {
		const postDate = new Date(postDateStr);
		const currentDate = new Date();
		const oneYear = 365 * 24 * 60 * 60 * 1000; // milliseconds in one year
		const timeDiff = postDate - currentDate;
		const fadeRatio = Math.min(Math.abs(timeDiff) / oneYear, 1); // Ensure it doesn't exceed 1
		const whiteLevel = 80;
		const variableShiftLevel = 255 - whiteLevel;
		if (postDate > currentDate) {
			// Future date - blend from green to red
			let red = Math.floor(variableShiftLevel * fadeRatio) + whiteLevel;
			let green = Math.floor(variableShiftLevel * (1 - fadeRatio)) + whiteLevel;
			let blue = whiteLevel;
			return `rgba(${red}, ${green}, ${blue}, 1)`;
		} else {
			// Past date - blend from green to blue
			let blue = Math.floor(variableShiftLevel * fadeRatio) + whiteLevel;
			let green = Math.floor(variableShiftLevel * (1 - fadeRatio)) + whiteLevel;
			let red = whiteLevel;
			return `rgba(${red}, ${green}, ${blue}, 1)`;
		}
	}

	function divIconGenerateWithColour(mapIconColor) {
		// Based on Narendra Jadhav's solution https://stackoverflow.com/questions/57767359/how-to-load-an-svg-icon-in-leaflet
		const iconSettings = {
			mapIconUrl: '<svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 149 178"><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="M126 23l-6-6A69 69 0 0 0 74 1a69 69 0 0 0-51 22A70 70 0 0 0 1 74c0 21 7 38 22 52l43 47c6 6 11 6 16 0l48-51c12-13 18-29 18-48 0-20-8-37-22-51z"/><circle fill="#FFF" cx="74" cy="75" r="20"/></svg>',
			mapIconColor: mapIconColor
		};
		divIcon = L.divIcon({
			className: "leaflet-data-marker",
			html: L.Util.template(iconSettings.mapIconUrl, iconSettings),
			iconAnchor: [12, 32],
			iconSize: [25, 30],
			popupAnchor: [0, -28]
		});
		return divIcon;
	}

	var myFGMarker = new L.FeatureGroup();

{%- for post in collections.posts %}
	{%- if post.data.location %}
	{
		var marker = L.marker([{{post.data.location.latitude}}, {{post.data.location.longitude}}],
						{icon: divIconGenerateWithColour(mapIconColor('{{ post.data.date }}')),
						title: '{{ post.data.title }}'
						})
			.bindPopup(`
						<a style="font-weight:bold" href="{{ post.page.url | url }}">{{ post.data.title }}</a> 
						<br/> <i>{{ post.date | date_to_string }}</i>
						<br/> {{post.data.location.name}}
					{%- if post.data.location.description %}
						<br/> {{post.data.location.description}}
					{%- endif %}
					{%- if post.data.location.address %}
						<br/> <a target="_new" href="https://www.openstreetmap.org/?mlat={{post.data.location.latitude}}&mlon={{post.data.location.longitude}}">{{post.data.location.address}}</a> 
					{%- endif %}
						`);
		myFGMarker.addLayer(marker);
	}
	{%- endif %}
{%- endfor %}

	map.addLayer(myFGMarker);
	map.fitBounds(myFGMarker.getBounds(), {padding: [50, 50]});

</script>

## Legends

Each marker is color coded based on how near the date of the post is to the present time and date.
This would allow users to at a glance see what has happened, what is happening and what will happen in the future.

* Red - Future
* Green - Present
* Blue - Past