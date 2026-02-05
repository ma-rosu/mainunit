import express from 'express';
import { spawn } from 'child_process';

const app = express();
const PORT = 9999;
let radioProcess = null;

// Middleware pentru a putea citi JSON (dacă vei trimite date mai târziu)
app.use(express.json());

// Ruta trebuie să înceapă cu /api ca să se pupe cu proxy-ul din Vite
app.get('/api/radio', (req, res) => 
{
    if (radioProcess)
    {
        // În interiorul if (radioProcess)
radioProcess.kill('SIGKILL');
        radioProcess = null; 
        return res.json({isPlaying: false, message: "Am oprit radioul." });
    }

    // radioProcess = spawn('ffplay', ['-nodisp', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3']); // FOR WINDOWS
    radioProcess = spawn('mpv', ['--no-video', 'https://myradioonline.ro/radio-romania-resita']);
    radioProcess.on('exit', () => {
        radioProcess = null;
    });

    return res.json({isPlaying: true, message: "Radioul a pornit!"});
});

app.listen(PORT, () => {
    console.log(`Backend-ul rulează la http://localhost:${PORT}`);
});