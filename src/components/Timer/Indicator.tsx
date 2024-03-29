const Indicator = ({ percentage }: { percentage: number }) => {
    return (
        <div className="h-1 w-full bg-slate-500">
            <div
                className="h-full bg-white"
                style={{
                    transformOrigin: 'left',
                    transform: `scaleX(${percentage})`,
                }}
            ></div>
        </div>
    );
};

export { Indicator };
