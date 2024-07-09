import { mergeCN } from '@foliofy/utils';
import React, { useEffect, useState } from 'react';

const IframePlayer = ({ id }: { id: string }) => {
    const [load, setLoad] = useState(true);
    useEffect(() => {
        setLoad(true);
    }, [id])
    return (
        <div className={mergeCN("w-full min-h-22 bg-muted rounded-xl", load ? "animate-pulse" : "")}>
            <iframe className="mt-5 rounded-xl"
                onLoad={() => {
                    setLoad(false);
                }}
                src={`https://open.spotify.com/embed/track/${id}?utm_source=generator`} width="100%" height="152" allowFullScreen allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </div>

    );
};

export default IframePlayer;
