import React from 'react';

const NotFound = () => {
    const containerStyle = {
        textAlign: 'center',
        marginTop: '100px',
    };

    return (
        <div style={containerStyle}>
            <h1>404 - Page non trouvée</h1>
            <p>La page que vous recherchez n'existe pas.</p>
        </div>
    );
};

export default NotFound;

