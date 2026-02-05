import React from 'react';
import { useState } from 'react';

export default function RadioPage() {

    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayRadio = async () => {
        try {
            // Chemăm ruta prin proxy-ul Vite
            const response = await fetch('/api/radio');
            const data = await response.json();

            setIsPlaying(data.isPlaying);

            
            if (!response.ok) {
                throw new Error(`Eroare server: ${response.status}`);
            }

        } catch (error) {
            console.error("Nu am putut contacta serverul:", error);
            alert("Eroare de conexiune. Verifică dacă serverul e pornit!");
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Welcome to the Radio Page</h1>
            <p>Apasă butonul pentru a trimite o cerere la server.</p>
            <button 
                onClick={handlePlayRadio}
                style={{ padding: '10px 20px', cursor: 'pointer' }}
            >
                {isPlaying ? 'Stop Radio' : 'Play Radio'}
            </button>
        </div>
    );
}