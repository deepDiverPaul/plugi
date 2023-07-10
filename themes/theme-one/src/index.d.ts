export {};

declare global {
    interface Window {
        plugi: Record<string, unknown>;
    }
}
