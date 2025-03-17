'use strict';

function calculateSolarDeclination(dayOfYear) {
    return 23.44 * Math.sin((2 * Math.PI / 365) * (dayOfYear - 81));
}

function calculateHourAngle(longitude, currentTime) {
    const localTime = currentTime.getHours() + (currentTime.getMinutes() / 60) + (currentTime.getSeconds() / 3600);
    const solarTime = (localTime - (longitude / 15)) * 15;
    return solarTime;
}

function calculateSolarAltitude(latitude, longitude, currentTime) {
    const dayOfYear = Math.floor((currentTime - new Date(currentTime.getFullYear(), 0, 0)) / 86400000);
    const declination = calculateSolarDeclination(dayOfYear);
    const hourAngle = calculateHourAngle(longitude, currentTime);

    const latitudeRad = latitude * (Math.PI / 180);
    const declinationRad = declination * (Math.PI / 180);
    const hourAngleRad = hourAngle * (Math.PI / 180);

    const altitude = Math.asin(
        Math.sin(latitudeRad) * Math.sin(declinationRad) +
        Math.cos(latitudeRad) * Math.cos(declinationRad) * Math.cos(hourAngleRad)
    );

    return altitude * (180 / Math.PI);
}

function selectWallpaper(latitude, longitude) {
    const currentTime = new Date();
    const solarAltitude = calculateSolarAltitude(latitude, longitude, currentTime);

    if (solarAltitude <= 0) {
        return 'night.png';
    } else if (solarAltitude < 30) {
        return 'sunrise.png';
    } else if (solarAltitude < 60) {
        return 'morning.png';
    } else {
        return 'noon.png';
    }
}

function main() {
    const args = process.argv.slice(2);
    if (args.length !== 2) {
        console.error('Usage: node WallpaperSelector.js <latitude> <longitude>');
        process.exit(1);
    }

    const latitude = parseFloat(args[0]);
    const longitude = parseFloat(args[1]);

    if (isNaN(latitude) || isNaN(longitude)) {
        console.error('Invalid latitude or longitude. Please provide valid numerical values.');
        process.exit(1);
    }

    const wallpaper = selectWallpaper(latitude, longitude);
    console.log(wallpaper);
}

if (require.main === module) {
    main();
}
