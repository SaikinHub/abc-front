import { useState } from 'react';
import { mobileNavLinks } from '../../constants/constants';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    resetUser,
    setIsAuthenticated,
    setIsInstructor,
    setUser,
} from '../../lib/utils/globalState/userSlice';
import toast from 'react-hot-toast';

const NavContent = ({ setIsOpen }) => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { isInstructor } = useSelector((state) => state.user);

    const disconnect = () => {
        dispatch(resetUser());
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    };
    return (
        <>
            <ul className="mobile-menu">
                <button
                    className="mobile-menu__close-btn"
                    onClick={() => setIsOpen(false)}
                >
                    <img src="/assets/svg/close.svg" alt="close icon" />
                </button>
                {mobileNavLinks.map((item) => {
                    const isActive =
                        (pathname.includes(item.path) &&
                            item.path.length > 1) ||
                        pathname === item.path;
                    const hangleNavigate = () => {
                        if (item.path) {
                            navigate(item.path);
                        }
                        setIsOpen((prev) => !prev);
                    };

                    return (
                        <li
                            key={item.value}
                            onClick={() => hangleNavigate()}
                            className={`${isActive ? 'active-navLink' : ''}`}
                        >
                            <img src={item.icon} alt={item.value} />
                            <p>{item.title}</p>
                        </li>
                    );
                })}
                {isInstructor && (
                    <>
                        <li onClick={() => navigate('/create')}>Create</li>
                    </>
                )}
                <li onClick={() => disconnect()}>Log Out</li>
            </ul>
        </>
    );
};

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="mobile-menu__wrapper">
            <button onClick={() => setIsOpen(true)}>
                <img src="/assets/svg/burger.svg" alt="burger menu" />
            </button>

            {isOpen && (
                <>
                    <NavContent setIsOpen={setIsOpen} />
                </>
            )}
        </div>
    );
};

export default MobileNav;

const example = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Image
                    src="assets/icons/hamburger.svg"
                    width={36}
                    height={36}
                    alt="Menu"
                    className="invert-colors sm:hidden"
                />
            </SheetTrigger>
            <SheetContent
                side="left"
                className="background-light900_dark200 border-none"
            >
                <Link href="/" className="flex items-center gap-1 ">
                    <Image
                        src="/assets/images/site-logo.svg"
                        width={23}
                        height={23}
                        alt="DevFlow"
                    />
                    <p className="h2-bold text-dark100_light900 font-spaceGrotesk">
                        DevFor<span className="text-primary-500">Flow</span>
                    </p>
                </Link>
                <div>
                    <SheetClose asChild>
                        <NavContent />
                    </SheetClose>
                    <SignedOut>
                        <div className="flex flex-col gap-3">
                            <SheetClose asChild>
                                <Link href="/sign-in">
                                    <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                                        <span className="primary-text-gradient">
                                            Log in
                                        </span>
                                    </Button>
                                </Link>
                            </SheetClose>
                            <SheetClose asChild>
                                <Link href="/sign-up">
                                    //{' '}
                                    <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                                        // Sign up //{' '}
                                    </Button>
                                    //{' '}
                                </Link>
                                //{' '}
                            </SheetClose>
                            //{' '}
                        </div>
                        //{' '}
                    </SignedOut>
                    //{' '}
                </div>
                //{' '}
            </SheetContent>
            //{' '}
        </Sheet>
    );
};
