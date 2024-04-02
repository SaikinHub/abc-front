import Home from '../app/(root)/(home)';
import Dashboard from '../app/(root)/dashboard';
import Settings from '../app/(root)/settings';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import Subject from '../app/(root)/subject/[id]';
import Learn from '../app/(root)/learn/[id]';
import Layout from '../app/(root)/layout';
import EditSubject from '../app/(root)/subject/edit/[id]';
import SubjectList from '../app/(root)/subject/edit';
import EditCourse from '../app/(root)/learn/edit/[id]';
import CreateContent from '../app/(root)/create';
import { LoggedIn } from './LoggedIn';
import { Instructor } from './Instructor';
import Watch from '../app/(root)/watch/[id]';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '', element: <Home /> },
            {
                path: '/subject/all',
                element: (
                    <Instructor>
                        <SubjectList />
                    </Instructor>
                ),
            },
            {
                path: '/subject/:id',
                element: <Subject />,
            },
            {
                path: '/subject/edit/:id',
                element: (
                    <Instructor>
                        <EditSubject />
                    </Instructor>
                ),
            },
            { path: '/learn/:id', element: <Learn /> },
            { path: '/watch/:id', element: <Watch /> },
            {
                path: '/learn/edit/:id',
                element: (
                    <Instructor>
                        <EditCourse />
                    </Instructor>
                ),
            },
            {
                path: '/dashboard',
                element: (
                    <LoggedIn>
                        <Dashboard />
                    </LoggedIn>
                ),
            },
            {
                path: '/settings',
                element: (
                    <LoggedIn>
                        <Settings />
                    </LoggedIn>
                ),
            },
            {
                path: '/create',
                element: (
                    <Instructor>
                        <CreateContent />
                    </Instructor>
                ),
            },
            { path: '*', element: <Navigate to="/" /> },
        ],
    },
]);
