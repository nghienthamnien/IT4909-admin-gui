import React from 'react';

export function setTitle(title) {
    React.useEffect(() => {
        const prevTitle = document.title;
        document.title = title;

        return () => {
            document.title = prevTitle;
        };
    }, []);
}
