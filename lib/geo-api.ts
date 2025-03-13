export async function getGeo(ip: string) {
  if (ip && ip !== '::1') {
    try {
      const response = await fetch(`http://ip-api.com/json/${ip}`);
      const geo = await response.json();
      return geo;
    } catch (error) {
      console.error('Error fetching geo data:', error);
      return null;
    }
  }
}
