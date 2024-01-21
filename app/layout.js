import SessionWrapper from '@/components/auth/SessionWrapper'
import { ChakraProvider } from '@chakra-ui/react'
import { Poppins } from 'next/font/google'
import Navbar from '../components/navigation/Navbar'
import Footer from '../components/navigation/Footer'
import './globals.css'


const inter = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata = {
  title: 'SH MARUF - Portfolio Website',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className={inter.className}>
        <SessionWrapper>
          <ChakraProvider>
            <Navbar />
            {children}
            <Footer />
          </ChakraProvider>
        </SessionWrapper>
      </body>
    </html>
  )
}
