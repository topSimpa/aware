// locationConjtroller.js:
// location controller helps to access info on
// Users location using geolocator and

function getLocation() {
  return new Promise((resolve, reject) => {
    const success = (position) => {
      resolve({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };

    const failure = (error) => {
      reject(error);
    };

    navigator.geolocation.getCurrentPosition(success, failure);
  });
}

async function getCity(location) {
  const url = "https://nominatim.openstreetmap.org/reverse?&format=json";
  const response = await fetch(
    `${url}&lat=${location.latitude}&lon=${location.longitude}`,
  );
  if (response.ok) {
    const place = await response.json();
    return Promise.resolve(place.address.city);
  } else {
    return Promise.reject("Error occurred please try again");
  }
}

export { getLocation, getCity };
