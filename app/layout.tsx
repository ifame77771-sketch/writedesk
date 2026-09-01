import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'WriteDesk', description: 'A Word-inspired online document editor' };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
