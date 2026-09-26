export type Person = { id: string; name: string; role: string; initials: string; color: string };
export type Segment = { id: string; start: number; end: number; speaker: string; text: string; chapter: string };
export type Point = { text: string; time: number };
export type Summary = { purpose: string; takeaways: Point[]; topics: { title: string; points: Point[] }[]; nextSteps: Point[] };
export type ActionItem = { id: string; text: string; owner: string; time: number; done: boolean; dueDate?: string | null };
export type Highlight = { id: string; title: string; type: string; start: number; end: number; note: string };
export type Meeting = { id: string; title: string; company: string; date: string; duration: number; kind: 'internal' | 'external'; color: string; people: Person[]; transcript: Segment[]; summary: Summary; actions: ActionItem[]; highlights: Highlight[]; media: string; description: string; shareToken?: string };
export type Preferences = { calendar: 'Google' | 'Microsoft' | null; capture: string; autoShare: string; autoActions: boolean; notice: boolean; botName: string; defaultTemplate: string };
