import BrowseCard from '../../../components/cards/BrowseCard';
import { getAllSubjects } from '../../../lib/actions/subject.actions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSubjects } from '../../../lib/utils/globalState/subjectsSlice';

const Home = () => {
    const { subjectsArr } = useSelector((state) => state.subjects);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!subjectsArr.length > 0) {
            const storedSubjects = sessionStorage.getItem('subjectsArr');
            if (storedSubjects) {
                dispatch(setSubjects(JSON.parse(storedSubjects)));
            } else {
                const fetch = async () => {
                    const result = await getAllSubjects();
                    dispatch(setSubjects(result.subjects));
                    sessionStorage.setItem(
                        'subjectsArr',
                        JSON.stringify(result.subjects)
                    );
                };
                fetch();
            }
        }
    }, []);

    return (
        <section>
            {subjectsArr ? (
                <ul className="browse-card__list">
                    {subjectsArr.map((item) => (
                        <BrowseCard key={item.name} media={item} />
                    ))}
                </ul>
            ) : (
                <h1>No subject yet !</h1>
            )}
        </section>
    );
};

export default Home;
