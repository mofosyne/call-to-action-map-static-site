const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  // This is required for JSON Feed https://github.com/11ty/eleventy-plugin-rss/blob/master/sample/feed-json.11ty.js
  eleventyConfig.addJavaScriptFunction("absoluteUrl", pluginRss.absoluteUrl);
  eleventyConfig.addJavaScriptFunction("htmlToAbsoluteUrls", pluginRss.convertHtmlToAbsoluteUrls);
  eleventyConfig.addJavaScriptFunction("dateToRfc3339", pluginRss.dateToRfc3339);

  eleventyConfig.addFilter("date_to_string", (dateString) => {
    dateObj = new Date(dateString);
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('LLLL d, yyyy');
  });

  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("files");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  
  eleventyConfig.addPassthroughCopy("projects/**/*.{jpg,png,svg,gif,pdf,zip}");
  eleventyConfig.addPassthroughCopy("projects/**/assets");

  eleventyConfig.setFrontMatterParsingOptions({ excerpt: true});

  return {
    dir: {

      // If your site lives in a different subdirectory (particularly useful with GitHub pages), use pathPrefix to specify this. 
      // It’s used by the url filter and inserted at the beginning of all absolute url href links. 
      // It does not affect your file structure. Leading or trailing slashes are all normalized away, so don’t worry about it.
      pathPrefix: "/call-to-action-map-static-site",

      // ⚠️ These values are both relative to your input directory.
      // ref: https://www.11ty.dev/docs/config/#directory-for-layouts-(optional)
      //includes: "_includes",
      layouts: "_layouts",
    }
  };
};