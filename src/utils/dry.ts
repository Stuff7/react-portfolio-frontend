// Simple alias for querySelector
export const $ = document.querySelector.bind(document);

export function $onready(fn: EventListener) {
  /* Adding listener to when page is loaded.

  @param {EventListener} fn - Function to run when
  the page is finished loading */
  document.addEventListener("DOMContentLoaded", fn);
}

export function getQueryString(params: {[key: string]: string}) {
  /* Building query string from object

  @param {object} params - Query params
  
  @returns {string} Query string or empty string if
  the object is empty */
  if(emptyObj(params)) return "";
  
  const query = [];
  
  for(const param in params)
    params[param] && query.push(`${param}=${encodeURIComponent(params[param])}`);

  const queryString = query.join("&");

  return queryString? `?${queryString}` : queryString;
}

export function emptyObj(obj: Unknown<unknown>) {
  /* Testing for an empty object

  @param {object} obj - Object to test
  
  @returns {boolean} Whether object is empty or not */
  for (const x in obj) return false;
  return true;
}

export function random(limit?: number) {
  /* Getting random whole number between 1 and limit.

  @param {number} limit - Max random number
  
  @returns {number} Whole number between 1 and limit
  or decimal between 0 and 1 if limit is undefined */
  const n = Math.random();
  return limit === undefined? n : Math.ceil(n*limit);
}

export async function fetchJSON(url: string, options?: RequestInit) {
  /* Fetching and parsing JSON content.

  @param {string} url - URL to fetch content from
  @param {RequestInit} options - Fetching options

  @returns {Promise} - Promise with the json response from server */
  return await fetch(url, options).then(response=> response.json());
}

export async function updJSON(method: string, url: string, body: unknown, headers?: Headers) {
  /* Creating a generic update JSON Request.

  @param {string} method - HTTP Method to use
  @param {string} url - URL to send the request to
  @param {Unknown} body - Data to be posted in JSON format
  @param {Headers} headers - Additional headers for the request

  @returns {Promise} - Promise with the response from the server */
  return await fetchJSON(url, {
    body: JSON.stringify(body),
    method: method,
    headers: Object.assign({
      "Content-Type": "application/json",
      "X-CSRFToken": cookie("csrftoken"),
    }, headers),
  });
}

export async function patchJSON(url: string, body: unknown, headers?: Headers) {
  /* Creating a generic PATCH JSON Request. */
  return await updJSON("PATCH", url, body, headers);
}

export async function postJSON(url: string, body: unknown, headers?: Headers) {
  /* Creating a generic POST JSON Request. */
  return await updJSON("POST", url, body, headers);
}

export default function cookie(name: string) {
  /* Obtaining an specific cookie from the page.

  @param {string} name - Name of the Cookie

  @returns {string|undefined} The cookie's value, if any */
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop()!.split(";").shift();
}

export function getter<T>(obj: Unknown<T>) {
  /* Creating a function to handle undefined keys in objects

  @param {Unknown} obj - The object to be indexed in the function

  @returns {function} */
  return function(key: string, fallback: T) {
    /* Getting key from object or a fallback value
    if the key is undefined.

    @param {string} key - Key to search for
    @param {T} fallback - Default value to return
    when key is undefined

    @returns {T} The value or a fallback value if
    the key is undefined */
    return key in obj? obj[key] : fallback;
  }
}

export function padZeroes(n: number, count: number) {
  /* Padding zeroes to the left of a number

  @param {number} n - Number to pad zeroes to
  @param {number} count - The amount of zeroes to add

  @returns {string} The number n with the padded zeroes
  to the left */
  return n.toString().padStart(count, "0");
}

export function capitalize(str: string) {
  /* Capitalizing a string

  @param {string} str - String to capitalize

  @returns {string} The string with the first
  character capitalized */
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function stripHTML(html: string) {
  /* Safely stripping html from raw string

  @param {string} html: String containing html

  @returns {string} An HTML free string */
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

export function longLocaleDate(date: Date, locale: string) {
  /* Long formatting for date according to locale.
  i.e: "Saturday, May 02, 2020, 9:11:41 PM Central Daylight Time"

  @param {Date} date - Date to format
  @param {string} locale - Language for the date format

  @returns {string} Long formatted date in the language
  specified by locale */
  return date.toLocaleString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "long",
  });
}

export function formatDate(date: Date, locale: string) {
  /* Formatting date.

  @param {Date} date - Date to format
  @param {string} locale - Display language

  @returns {string} Formatted date, only day and time if
  is a close date or a long format if is far away */
  const shortFormat = {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
    hour12: false,
  };
  
  return date.toLocaleString(locale,
    isWithinAWeek(date)
    ? shortFormat
    : {
      ...shortFormat,
      weekday: undefined,
      year: "numeric",
      month: "short",
      day: "2-digit",
    }
  );
}

export function isWithinAWeek(date: Date) {
  /* Checking if date is within a week.

  @param {Date} date - Date to check

  @returns {boolean} Whether the date is within
  a week or not */
  const Week = 6048e5;
  return Math.abs(Date.now() - date.getTime()) <= Week;
}

export function closestDate(a: Date, b: Date) {
  /* Determining which of 2 dates is closest to today. 

  @param {Date} a - First date to compare
  @param {Date} b - Second date to compare

  @returns {number} Positive if date "a" is closer
                    Negative if date "b" is closer
                    Zero if both dates are equally close */
  const now = Date.now();
  return Math.abs(b.getTime() - now) - Math.abs(a.getTime() - now);
}

interface Unknown<T> {
  [key: string]: T;
}
