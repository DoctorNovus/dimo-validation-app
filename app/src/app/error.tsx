// 

'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
    error,
}: {
    error: Error & { digest?: string };
}) {
    const webhookUri = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK;

    useEffect(() => {
        // Optionally log the error to an error reporting service
        fetch(webhookUri, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                embeds: [
                    {
                        title: "Test",
                        fields: [
                            {
                                name: "Name",
                                value: error.name
                            },
                            {
                                name: "Message",
                                value: error.message
                            },
                            {
                                name: "Stack Trace",
                                value: error.stack?.toString().split("\n")[1]
                            }
                        ],
                        color: 0xFF0000
                    }
                ]
            })
        })
    }, [webhookUri, error]);

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="flex flex-col gap-4 items-center">
                <span className="text-2xl">Something went wrong!</span>
                <Link href="/dashboard" className="px-3 py-1 bg-red-500 text-white rounded-lg text-lg">Go Home</Link>
            </div>
        </div>
    );
}