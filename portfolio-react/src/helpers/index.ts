
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const colors = ["red", "yellow", "green", "blue", "purple", "pink"]

export const HAVE_APPLAUDED = "HAVE_APPLAUDED_TO_";

export const getFormattedDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${monthNames[date.getMonth()]}-${date.getDate()}, ${date.getFullYear()}`;
}

export function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function sleep(ms: number) {
    await timeout(ms);
}

export const getRandomColor = () => {
    return colors[Math.floor(Math.random()*colors.length)];
}