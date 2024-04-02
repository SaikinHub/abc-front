const BannerMetric = ({ metric }) => {
    return (
        <>
            <div>{metric.number}</div>
            <p>{metric.title}</p>
        </>
    );
};

export default BannerMetric;
