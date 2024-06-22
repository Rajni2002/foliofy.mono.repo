import { createHash } from "crypto";

/**
 * Generates a short unique hash from a given URL.
 * @param {string} url - The URL to hash.
 * @returns {string} - The short unique hash.
 */
export default function createShortHash(url: string): string {
    // Create a sha256 hash of the URL
    const hash = createHash('sha256').update(url).digest('hex');
    // Return a shorter part of the hash
    return hash.substring(0, 8); // You can adjust the length as needed
}