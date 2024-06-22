export default function truncateUrl(url: string) {
  // Remove 'https://' if it exists
  if (url.startsWith("https://")) {
    url = url.slice(8);
  }

  // Remove 'http://' if it exists
  if (url.startsWith("http://")) {
    url = url.slice(7);
  }

  // Remove 'www.' if it exists
  if (url.startsWith("www.")) {
    url = url.slice(4);
  }

  return url;
}
