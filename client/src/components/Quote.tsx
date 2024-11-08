// Remove: import { useEffect, useState } from "react";
// Remove: import { useRandomQuote } from "../hooks";

interface Quote {
    quote: string;
    author: string;
    position: string;
}

const quotes: Quote[] = [
    {
        quote: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        position: "Co-Founder | Apple Inc."
    },
    {
        quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        author: "Winston Churchill",
        position: "Former Prime Minister | UK"
    },
    {
        quote: "It always seems impossible until it’s done.",
        author: "Nelson Mandela",
        position: "Former President | South Africa"
    },
    {
        quote: "In the middle of difficulty lies opportunity.",
        author: "Albert Einstein",
        position: "Theoretical Physicist"
    },
    {
        quote: "Don’t watch the clock; do what it does. Keep going.",
        author: "Sam Levenson",
        position: "American Humorist"
    }
];

export const Quote = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    return (
        <div className="bg-slate-200 h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div className="max-w-lg">
                    <div className="text-xl font-bold">
                        "{randomQuote.quote}"
                    </div>
                    <div className="max-w-md text-left text-base font-semibold mt-3">
                        {randomQuote.author}
                    </div>
                    <div className="max-w-md text-slate-700 text-left text-sm font-normal">
                        {randomQuote.position}
                    </div>
                </div>
            </div>
        </div>
    );
};
