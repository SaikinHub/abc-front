const Metric = ({ number, title, date }) => {
    return (
        <div className="metric">
            <div className="metric__number">
                {number && title && (
                    <p>
                        <span>{number}</span> {title}
                    </p>
                )}
                {date && (
                    <p>
                        <span>{date}</span>
                    </p>
                )}
            </div>
        </div>
    );
};

export default Metric;
