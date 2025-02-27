

// import React from 'react'
// import { Button } from 'flowbite-react'

// export default function Header() {
//   return (
//     <div>
//      <Button className='rounded-none'>header button</Button>
//     </div>
//   )
// }




'use client';

import { Button, Navbar, TextInput } from 'flowbite-react';
import Link from 'next/link';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { dark, light } from '@clerk/themes'

// usePathname используется для /about /contacts и тд
// usePathname будет подкрашивать в навигации шапки кнопку на которую кликнули
import { usePathname } from 'next/navigation';

export default function Header() {

    const path = usePathname();
    const { theme, setTheme } = useTheme();


    return (
        <Navbar className='border-b-2'>

            <Link
                href='/'
                className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
            >
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                    Sahands
                </span>
                Blog
            </Link>

            <form>
                <TextInput
                    type='text'
                    placeholder='Search...'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline'
                />
            </form>

            <Button className='w-12 h-10 lg:hidden' color='gray' pill>
                <AiOutlineSearch />
            </Button>

            <div className='flex gap-2 md:order-2'>

                <Button
                    className='w-12 h-10 hidden sm:inline'
                    color='gray'
                    pill

                    //меняет цвет темы при переключении 
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                >
                    {/* меняет иконки при переключении солнце на луну */}
                    {theme === 'light' ? <FaSun /> : <FaMoon />}
                </Button>


                {/* <Link href='/sign-in'>
                    <Button gradientDuoTone='purpleToBlue' outline>
                        Sign In
                    </Button>
                </Link> */}


                <SignedIn>
                    <UserButton
                        appearance={{
                            baseTheme: theme === 'light' ? light : dark,
                        }}
                        userProfileUrl='/dashboard?tab=profile'
                    />
                </SignedIn>
                <SignedOut>
                    <Link href='/sign-in'>
                        <Button gradientDuoTone='purpleToBlue' outline>
                            Sign In
                        </Button>
                    </Link>
                </SignedOut>


                {/* <SignedIn>
                    <UserButton
                        appearance={{
                            baseTheme: theme === 'light' ? light : dark,
                        }}
                        userProfileUrl='/dashboard?tab=profile'
                    />
                </SignedIn>
                <SignedOut>

                    <Button gradientDuoTone='purpleToBlue' outline>
                        <SignInButton />
                    </Button>
                    {/* <SignUpButton /> 
                </SignedOut> */}





                <Navbar.Toggle />

            </div>

            <Navbar.Collapse>
                <Link href='/'>
                    <Navbar.Link active={path === '/'} as={'div'}>
                        Home
                    </Navbar.Link>
                </Link>
                <Link href='/about'>
                    <Navbar.Link active={path === '/about'} as={'div'}>
                        About
                    </Navbar.Link>
                </Link>
                <Link href='/projects'>
                    <Navbar.Link active={path === '/projects'} as={'div'}>
                        Projects
                    </Navbar.Link>
                </Link>
            </Navbar.Collapse>

        </Navbar>
    );
}

