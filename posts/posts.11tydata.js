module.exports = {
  // Display dates in UTC (so they don't risk being off by one day)
  timezoneOffset: 0,
  layout: "post", // If you're using a specific layout for posts
  tags: ["posts"],
  eleventyComputed: {
    permalink: data => `/blog/${data.page.date.getFullYear()}/${String(data.page.date.getMonth() + 1).padStart(2, '0')}/${String(data.page.date.getDate()).padStart(2, '0')}/${data.page.fileSlug}/index.html`
  }
};
