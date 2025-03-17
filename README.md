# wallpaper-selector-be
It is a simple Node.js project implemented using JavaScript.
The aim of this project is selecting a desktop wallpaper from a given set of images and this selected wallpaper should approximately represent the location of the sun at the time of execution.

# To run the application use:
node app.js <latitude> <longitude>

# Examples:
1. Input: node app.js 31.9544 35.9106
   Output: morning.png

2. Input: node app.js -37.8136 144.9631
   Output: sunrise.png

3. Input: node app.js -51.63092 -69.2247
   Output: night.png
