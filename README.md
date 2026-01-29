# call-to-action-map-static-site

proof of concept of a call to action map

```
npm ci
npm run build
npm run start
npm run serve
```

https://github.com/mofosyne/call-to-action-map-static-site

This is a demonstrator of using a static site generator to read thought a list of post and map out each post in a leafletjs map.

This could be used as a way to communicate to potential volunteers where the closest action locations they can participate in etc...

There are more developed options out there, but this is here to provide a lower technical friction option of communicating such information via using github and github pages.

Pull Requests to improve this template will be appreciated.

## How does this work?

This is a screenshot of the map's output as of 2nd of march 2024 with the example posts in this repository.
Note that each marker is given a specific color that range between red, green and blue.
These color ranges expresses the difference between a future, present and past activity.

![](/images/example_map.png)

When you over or click on any of these markers you get a quick summary of the location information. Clicking on the link within it would take you to either the openstreetmap map or the event information page.
