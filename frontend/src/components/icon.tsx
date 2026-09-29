export type IconName =
  | "home"
  | "funnel"
  | "chat"
  | "settings"
  | "assistant"
  | "network"
  | "send"
  | "reply"
  | "percent"
  | "muted"
  | "clock"
  | "calendar"
  | "plus"
  | "chevron"
  | "more"
  | "search"
  | "close"
  | "arrow"
  | "document"
  | "check"
  | "checkCircle"
  | "xCircle"
  | "user"
  | "filter"
  | "phone"
  | "paperclip"
  | "smile"
  | "whatsapp"
  | "mail"
  | "lock"
  | "eye"
  | "eyeOff"
  | "logout";

const iconPaths: Record<IconName, string[]> = {
  home: ["M3 10.8 12 3l9 7.8v9.3a1 1 0 0 1-1 1h-5.5v-6h-5v6H4a1 1 0 0 1-1-1z"],
  funnel: ["M3 5h18l-7 8v5l-4 3v-8z"],
  chat: ["M20 11.5a7.5 7.5 0 0 1-7.5 7.5H5l-2 2v-6.5A7.5 7.5 0 1 1 20 11.5Z", "M8 11h.01M12 11h.01M16 11h.01"],
  settings: ["M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z", "m19.4 15 .1.1a1.8 1.8 0 0 1-2.5 2.5l-.1-.1a1.8 1.8 0 0 0-3 .9v.2a1.8 1.8 0 0 1-3.6 0v-.2a1.8 1.8 0 0 0-3-.9l-.1.1a1.8 1.8 0 0 1-2.5-2.5l.1-.1a1.8 1.8 0 0 0-.9-3h-.2a1.8 1.8 0 0 1 0-3.6h.2a1.8 1.8 0 0 0 .9-3l-.1-.1a1.8 1.8 0 0 1 2.5-2.5l.1.1a1.8 1.8 0 0 0 3-.9v-.2a1.8 1.8 0 0 1 3.6 0v.2a1.8 1.8 0 0 0 3 .9l.1-.1a1.8 1.8 0 0 1 2.5 2.5l-.1.1a1.8 1.8 0 0 0 .9 3h.2a1.8 1.8 0 0 1 0 3.6h-.2a1.8 1.8 0 0 0-.9 3Z"],
  assistant: ["M12 3v3M8 6h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3Z", "M9 12h.01M15 12h.01M9 16h6", "M3 11v4M21 11v4"],
  network: ["M12 8V4M6 20v-4M18 20v-4", "M12 4a2 2 0 1 0 0 .01M6 16a2 2 0 1 0 0 .01M18 16a2 2 0 1 0 0 .01", "M6 13v-1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1"],
  send: ["m22 2-7 20-4-9-9-4 20-7Z", "M22 2 11 13"],
  reply: ["M9 14 4 9l5-5M4 9h9a7 7 0 0 1 7 7v2"],
  percent: ["M19 5 5 19", "M7 7h.01M17 17h.01", "M9 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM19 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"],
  muted: ["M4 4l16 16", "M10 10v4l5 3V8l-2.2 1.3", "M7 9H5v6h4l2 1.2", "M19 9a5 5 0 0 1 0 6"],
  clock: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z", "M12 6v6l4 2"],
  calendar: ["M7 3v4M17 3v4M4 9h16", "M5 5h14a1 1 0 0 1 1 1v13H4V6a1 1 0 0 1 1-1Z"],
  plus: ["M12 5v14M5 12h14"],
  chevron: ["m8 10 4 4 4-4"],
  more: ["M5 12h.01M12 12h.01M19 12h.01"],
  search: ["M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z", "m21 21-4.35-4.35"],
  close: ["m18 6-12 12M6 6l12 12"],
  arrow: ["M5 12h14", "m13 6 6 6-6 6"],
  document: ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", "M14 2v6h6", "M8 13h8M8 17h8"],
  check: ["m5 12 4 4L19 6"],
  checkCircle: ["M22 11.1V12a10 10 0 1 1-5.9-9.1", "m9 11 3 3L22 4"],
  xCircle: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z", "m15 9-6 6m0-6 6 6"],
  user: ["M20 21a8 8 0 0 0-16 0", "M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"],
  filter: ["M4 5h16l-6.5 7.2V19l-3 1v-7.8z"],
  phone: ["M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 2.8a2 2 0 0 1-.6 1.9L7.7 9.7a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 1.9-.6l2.8.5a2 2 0 0 1 1.7 2.6Z"],
  paperclip: ["m21.4 11.1-8.5 8.5a5.2 5.2 0 0 1-7.4-7.4l9.2-9.2a3.5 3.5 0 0 1 4.9 4.9L10.4 17a1.7 1.7 0 0 1-2.5-2.5l8.5-8.5"],
  smile: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z", "M8 14s1.5 2 4 2 4-2 4-2", "M9 9h.01M15 9h.01"],
  whatsapp: ["M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.7A8.5 8.5 0 1 1 20.5 11.5Z", "M8 8c.4 3 2.5 5 5.5 6l1.1-1.2 2 1c-.3 1.4-1.5 2-2.8 1.8-3.7-.7-6.7-3.7-7.4-7.3C6.2 7 7 5.8 8.3 5.7l1 2z"],
  mail: ["M4 5h16v14H4z", "m4 7 8 6 8-6"],
  lock: ["M6 10h12v11H6z", "M8 10V7a4 4 0 1 1 8 0v3"],
  eye: ["M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z", "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"],
  eyeOff: ["m3 3 18 18", "M10.6 10.6a2 2 0 0 0 2.8 2.8", "M9.9 5.2A10.8 10.8 0 0 1 12 5c6.4 0 10 7 10 7a15.7 15.7 0 0 1-3 3.8", "M6.2 6.2C3.5 8 2 12 2 12s3.6 7 10 7c1.1 0 2.1-.2 3-.5"],
  logout: ["M10 17l5-5-5-5", "M15 12H3", "M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7"],
};

export function Icon({ name, size = 17 }: { name: IconName; size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {iconPaths[name].map((path, index) => <path d={path} key={index} />)}
    </svg>
  );
}
