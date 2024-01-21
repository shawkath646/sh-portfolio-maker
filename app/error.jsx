'use client'
import { useSearchParams } from 'next/navigation'


export default function Page() {

    const searchParams = useSearchParams()
 
    const message = searchParams.get('message')

    return (
        <main className="pt-48">
            <p className='text-xl text-red-500 text-center'>{message}</p>
        </main>
    );
}