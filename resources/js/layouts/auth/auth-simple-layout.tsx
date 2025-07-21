import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div
            className="flex min-h-svh flex-col items-center justify-center gap-2 bg-background p-6 md:p-10"
            style={{
                backgroundImage: `url('/bg5.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="fixed overflow-hidden inset-0 bg-gray-950/50" />
            <div className="w-full max-w-sm">
                <div className="relative bg-gray-900 gap-7 px-8 py-3 rounded-lg shadow-xl">
                    <div className="flex flex-col items-center gap-2">
                        <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                            <div className="mb-1 flex h-24 w-24 items-center justify-center rounded-md">
                                <img
                                    src="/logo-clear.png"
                                    alt="Logo"
                                    className="h-full w-full object-contain rounded-md"
                                />
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-1 text-center mb-6">
                            <h1 className="text-xl font-bold font-nunito text-white">{title}</h1>
                            <p className="text-center text-sm text-gray-400">{description}</p>
                        </div>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}
