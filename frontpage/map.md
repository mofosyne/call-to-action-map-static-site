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


	// Function to calculate fade based on post date
	function getFadeRatioBasedOnTime(postDateStr) {
	const postDate = new Date(postDateStr);
	const currentDate = new Date();
	const oneYear = 365 * 24 * 60 * 60 * 1000; // milliseconds in one year
	const timeDiff = currentDate - postDate;
	const fadeRatio = Math.min(timeDiff / oneYear, 1); // Ensure it doesn't exceed 1
	return fadeRatio;
	}

	var  myFGMarker = new L.FeatureGroup();

{%- for post in collections.posts %}
	{%- if post.data.location %}
	{
		var marker = L.marker([{{post.data.location.latitude}}, {{post.data.location.longitude}}], 
						{opacity: 1.0-getFadeRatioBasedOnTime('{{ post.data.date }}')/2})
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

---