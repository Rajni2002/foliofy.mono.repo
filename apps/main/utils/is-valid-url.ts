import { URLstringType } from "@/types/ui/link-preview";

export default function isValidURL(url: string): url is URLstringType {
    try {
        new URL(url);
        return /^https?:\/\/.+/i.test(url);
    } catch {
        return false;
    }
}
