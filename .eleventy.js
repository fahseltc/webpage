const fs = require("fs");
const NOT_FOUND_PATH = "_site/404.html";

module.exports = {
	// Output directory: _site
	// function(eleventyConfig) {
	// 	eleventyConfig.addPassthroughCopy("**/*.jpg");
	// },
	// function(eleventyConfig) {
	// 	eleventyConfig.addPassthroughCopy("css");
	// },
	// function(eleventyConfig) {
	// 	eleventyConfig.addPassthroughCopy("./img");
	// },

	function(eleventyConfig) {
		eleventyConfig.setBrowserSyncConfig({
			callbacks: {
				ready: function (err, bs) {
					bs.addMiddleware("*", (req, res) => {
						if (!fs.existsSync(NOT_FOUND_PATH)) {
							throw new Error(
								`Expected a \`${NOT_FOUND_PATH}\` file but could not find one. Did you create a 404.html template?`
							);
						}

						const content_404 = fs.readFileSync(NOT_FOUND_PATH);
						// Add 404 http status code in request header.
						res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
						// Provides the 404 content without redirect.
						res.write(content_404);
						res.end();
					});
				},
			},
		});
	},
};