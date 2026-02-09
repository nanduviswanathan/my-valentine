import { Heart, Gift, User, Shield, Smile, Star, Coffee } from 'lucide-react'; // Placeholder icons, will update in components

export const VALENTINE_WEEK = [
    {
        date: '2026-02-07', // Using 2026 as per current date context
        id: 'rose-day',
        title: 'Rose Day',
        description: 'A rose for the one who makes my life beautiful.',
        theme: {
            primary: 'bg-rose-500',
            secondary: 'bg-rose-100',
            text: 'text-rose-900',
            gradient: 'from-rose-400 to-red-600'
        }
    },
    {
        date: '2026-02-08',
        id: 'propose-day',
        title: 'Propose Day',
        description: 'Detailed feelings expressed.',
        theme: {
            primary: 'bg-pink-500',
            secondary: 'bg-pink-100',
            text: 'text-pink-900',
            gradient: 'from-pink-400 to-purple-600'
        }
    },
    {
        date: '2026-02-09',
        id: 'chocolate-day',
        title: 'Chocolate Day',
        description: 'Sweeter than chocolate.',
        theme: {
            primary: 'bg-amber-800', // Brownish
            secondary: 'bg-amber-100',
            text: 'text-amber-900',
            gradient: 'from-amber-700 to-orange-900'
        }
    },
    {
        date: '2026-02-10',
        id: 'teddy-day',
        title: 'Teddy Day',
        description: 'Cuddles and warmth.',
        theme: {
            primary: 'bg-orange-300',
            secondary: 'bg-orange-50',
            text: 'text-orange-900',
            gradient: 'from-orange-200 to-amber-400'
        }
    },
    {
        date: '2026-02-11',
        id: 'promise-day',
        title: 'Promise Day',
        description: 'Promises to keep forever.',
        theme: {
            primary: 'bg-blue-500',
            secondary: 'bg-blue-100',
            text: 'text-blue-900',
            gradient: 'from-blue-400 to-indigo-600'
        }
    },
    {
        date: '2026-02-12',
        id: 'hug-day',
        title: 'Hug Day',
        description: 'A hug to heal everything.',
        theme: {
            primary: 'bg-teal-500',
            secondary: 'bg-teal-100',
            text: 'text-teal-900',
            gradient: 'from-teal-400 to-emerald-600'
        }
    },
    {
        date: '2026-02-13',
        id: 'kiss-day',
        title: 'Kiss Day',
        description: 'Sealed with a kiss.',
        theme: {
            primary: 'bg-fuchsia-500',
            secondary: 'bg-fuchsia-100',
            text: 'text-fuchsia-900',
            gradient: 'from-fuchsia-400 to-pink-600'
        }
    },
    {
        date: '2026-02-14',
        id: 'valentine-day',
        title: 'Valentine\'s Day',
        description: 'Be my Valentine?',
        theme: {
            primary: 'bg-red-600',
            secondary: 'bg-red-100',
            text: 'text-red-900',
            gradient: 'from-red-500 to-rose-700'
        }
    }
];

export const isBeforeValentineWeek = (date) => {
    return new Date(date) < new Date('2026-02-07');
};

export const isAfterValentineWeek = (date) => {
    return new Date(date) > new Date('2026-02-14');
};
