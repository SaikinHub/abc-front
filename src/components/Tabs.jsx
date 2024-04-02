const Tabs = ({ activeTab, setActiveTab }) => {
    const titles = [
        {
            name: 'A Class',
        },
        { name: 'B Class' },
    ];
    return (
        <ul className="tabs__list">
            {titles.map((item, i) => (
                <li
                    key={i}
                    className={`${activeTab === i ? 'active-tab' : ''}`}
                    onClick={() => setActiveTab(i)}
                >
                    {item.name}
                </li>
            ))}
        </ul>
    );
};

export default Tabs;
