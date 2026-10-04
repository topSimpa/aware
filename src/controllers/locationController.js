// location controller helps to access info on
// Users location

export default function getLocation() {
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
