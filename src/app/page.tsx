'use client';

import bridgeSelfie1 from '../../public/bridgeselfie1.jpeg';
import happyring1 from '../../public/happyring1.jpeg';
import happyring2 from '../../public/happyring2.jpeg';
import Snowflakes from './Snowflakes';
import { twMerge } from 'tailwind-merge';
import NavBar from './(nav-bar)/NavBar';
import Image from 'next/image';
import Section, { section } from './(section)/Section';
import { NAV_ITEMS } from './(nav-bar)/navItems';
import MenuButton from './(nav-bar)/MenuButton';
import SideMenu from './(nav-bar)/SideMenu';
import Link from 'next/link';
import { Klee_One, Ruthie } from 'next/font/google';
import { AnimationResult, SpringValue, useSpring } from '@react-spring/web';
import ScrollToProvider from './ScrollToContext';
import { useNavItemOnClick } from './(nav-bar)/useNavItemOnClick';

const headerFont = Ruthie({ weight: '400', subsets: ['latin'] });
const subheaderFont = Klee_One({ weight: '600', subsets: ['latin'] });

const HEADER_HEIGHT = 60;

export default function Home() {
  const [, setY] = useSpring(
    () => ({
      y: 0,
      onChange({ value: { y } }: AnimationResult<SpringValue<{ y: number }>>) {
        window.scrollTo(0, y);
      },
    }),
    [],
  );

  const handleNavOnClick = useNavItemOnClick(setY);

  return (
    <ScrollToProvider setY={setY}>
      <main className='flex flex-col'>
        <MenuButton className='fixed left-1 top-2 self-start md:hidden tall:flex' />
        <SideMenu className='fixed bottom-0 left-0 top-0 z-10 md:hidden tall:block' />

        <Snowflakes className='fixed -z-10 h-[100vh] w-[100vw]' />
        {/* <SnowflakesSpring className='fixed z-20 h-[100vh] w-[100vw] bg-purple-500' /> */}
        <Section className='min-h-min' navItem={NAV_ITEMS.home}>
          <header className='flex h-[calc(50vh-2.5rem)] flex-col items-center'>
            <div className='flex flex-1 flex-col items-center justify-center'>
              <h1
                className={twMerge(
                  headerFont.className,
                  'text-[3.5rem]',
                  'sm:text-[6rem]',
                  'lg:text-[10rem]',
                )}
              >
                <span>Alex</span>{' '}
                <span
                  className={twMerge(
                    'text-[1.75rem]',
                    'sm:text-[3rem]',
                    'lg:text-[5rem]',
                  )}
                >
                  &
                </span>{' '}
                <span>Heather</span>
              </h1>

              <h2
                className={twMerge(
                  subheaderFont.className,
                  'flex flex-col',
                  'text-[0.8rem]',
                  'sm:text-[1.2rem]',
                  'lg:text-[2rem]',
                  'tall:text-[1.2rem]',
                )}
              >
                <span>February 18th, 2024</span>
                <span>Pier Sixty, Manhattan</span>
              </h2>
            </div>
          </header>
        </Section>

        <NavBar
          style={{ height: HEADER_HEIGHT }}
          className='sticky top-0 z-10 hidden md:flex tall:hidden'
        />

        <div className='flex h-[50vh] w-full gap-2 p-10 sm:gap-5 lg:gap-10'>
          <div className='relative flex-1'>
            <Image
              src={happyring1}
              alt='Heather smiling and showing off her engagement ring'
              className='object-contain'
              fill
            />
          </div>

          <div className='relative flex-1'>
            <Image
              src={bridgeSelfie1}
              alt='Heather and Alex smiling in front of a wooden covered bridge'
              className='object-contain'
              fill
            />
          </div>

          <div className='relative flex-1'>
            <Image
              src={happyring2}
              alt='Heather showing off her engagement ring again'
              className='object-contain'
              fill
            />
          </div>
        </div>

        <Section navItem={NAV_ITEMS.schedule}>
          <section.h2>Schedule</section.h2>
          <section.p>Sunday, February 18th, 2024</section.p>
          <section.p>{'Ceremony at 4pm'}</section.p>
          <section.p>{'Reception to follow'}</section.p>
          <section.p>{'Cocktail Attire'}</section.p>
          <section.p>{'Pier Sixty'}</section.p>
          <section.p>{'60 Chelsea Piers, New York, NY 10011'}</section.p>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.698364337545!2d-74.0107728!3d40.7466623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259c7dace3e8d%3A0xb21e63fb78aa793e!2sPier%20Sixty!5e0!3m2!1sen!2sus!4v1686501696537!5m2!1sen!2sus'
            width='vw100'
            height='450'
            style={{ border: 0 }}
            allowFullScreen={false}
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          />
        </Section>

        <Section navItem={NAV_ITEMS.travel}>
          <section.h2>Travel</section.h2>

          <section.p>
            Pier Sixty is at the end of Pier 60, the central pier at Chelsea
            Piers, between 19th & 20th Streets.
          </section.p>

          <section.h3>Parking</section.h3>

          <section.p>
            Parking is available directly in front of Pier Sixty. Take your
            second right into Pier 60. Chelsea Piers parking rates will apply.
          </section.p>

          <section.p>
            {'For details, visit '}
            <Link href='https://www.chelseapiers.com/also-at-the-piers/parking/'>
              https://www.chelseapiers.com/also-at-the-piers/parking/
            </Link>
          </section.p>

          <section.h3>Taxi & Rideshare</section.h3>

          <section.p>
            Taxis, Uber & Lyft can drop visitors at the front doors of Pier
            Sixty.
          </section.p>

          <section.p>
            Upon entering the Chelsea Piers complex, instruct your driver to
            turn right into Pier 60 and drive all the way to the back of the
            parking lot, to the glass front doors of the venue, for drop off and
            pick-up. Drivers may remain in the complex for up to 20 minutes
            without being charged for parking.
          </section.p>

          <section.h3>Walking</section.h3>

          <section.p>
            Pier Sixty is accessible to walkers via crosswalks at 20th Street.
            After crossing, turn off the Chelsea Piers cobblestone roadway into
            Pier 60, and walk to the back of the pier through the parking lot to
            find the front doors.
          </section.p>

          <section.h3>Bus</section.h3>

          <section.p>
            The M23 crosses 23rd Street and drops visitors within the Chelsea
            Piers complex on the North side.
          </section.p>

          <section.p>
            The M14D crosses 14th Street and drops visitors at the South side of
            Chelsea Piers on 18th Street and the West Side Highway.
          </section.p>

          <section.h3>Subway</section.h3>

          <div className='mb-2'>
            <section.p>
              Take the following subways to the 23rd street stop and follow
              walking instructions.
            </section.p>
            <section.ul className='ml-2'>
              <section.li>#6 – Park Avenue</section.li>
              <section.li>
                N (Weekends Only), R, W – Broadway/Fifth Avenue
              </section.li>
              <section.li>F, M, PATH – Sixth Avenue</section.li>
              <section.li>#1 – Seventh Avenue</section.li>
              <section.li>C, E – Eighth Avenue</section.li>
              <section.li>
                #7 Subway stops at 34th Street & Eleventh Avenue, a 10-15 minute
                walk south to Chelsea Piers
              </section.li>
            </section.ul>
          </div>

          <section.h3>Hotel Blocks</section.h3>

          <section.p>Coming soon...</section.p>
        </Section>

        <Section navItem={NAV_ITEMS.registry}>
          <section.h2>Registry</section.h2>
          <section.p>
            {'visit our registry here: '}
            <span>{'EXTERNAL REGISTRY LINK'}</span>
          </section.p>
        </Section>

        <Section navItem={NAV_ITEMS.qa}>
          <section.h2>{'Q&A'}</section.h2>

          <section.h3>Will I be receiving a formal invitation?</section.h3>

          <section.p>{"Yup, if you're cool enough."}</section.p>

          <section.h3>Can I bring a date?</section.h3>

          <section.p>
            If your invitation says so. If you want to bring a +1 but we did not
            indicate such on your invitation, please reach out to us at
            alexandheather20@gmail.com
          </section.p>

          <section.h3>Is the wedding indoors or outdoors?</section.h3>

          <section.p>
            Since we are expecting chilly weather in February, we plan on our
            wedding being entirely indoors. If temperatures permit, there will
            be an outdoor patio along the Hudson River for you to enjoy.
          </section.p>

          <section.h3>
            Are the ceremony and reception locations wheelchair accessible?
          </section.h3>

          <section.p>Yes!</section.p>

          <section.h3>
            If I am sure I cannot attend the wedding, what should I do?
          </section.h3>

          <section.p>
            Please let us know as soon as you do! We will still send you a
            formal invitation in case your plans change.
          </section.p>

          <section.h3>Will there be parking?</section.h3>

          <section.p>
            Please refer to the{' '}
            <Link
              className='underline'
              onClick={handleNavOnClick}
              href={NAV_ITEMS.travel.href}
            >
              Travel section
            </Link>
          </section.p>

          <section.h3>What is the dress code?</section.h3>

          <section.p>Cocktail attire</section.p>

          <section.h3>Are kids invited?</section.h3>

          <section.p>
            We hope you&apos;ll enjoy a kids-free night out with us. We love
            your kids though, we promise!
          </section.p>

          <section.h3>Will the food be kosher?</section.h3>

          <section.p>
            The food will not be hechshered kosher, but all food will be
            pescetarian and shellfish-free.
          </section.p>

          <section.p>
            There will be an option for a Glatt-Kosher meal. If you require one,
            please include a request on your RSVP!
          </section.p>

          <section.h3>
            I have a food allergy. Can I make a special request?
          </section.h3>

          <section.p>
            Please indicate any food allergies or preferences on your RSVP!
          </section.p>

          <section.p>
            <span>
              If you have any other questions or concerns, please contact
              Heather and Alex at
            </span>
            <span>alexandheather20@gmail.com</span>
          </section.p>
        </Section>
      </main>
    </ScrollToProvider>
  );
}
