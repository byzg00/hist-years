export type Period = {
    id: string;
    num: number;
    title: string;
    start: number;
    end: number;
    events: Record<number, string>;
}
