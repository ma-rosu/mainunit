import express from 'express';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
const _filename = fileURLToPath(import.meta.url);
import { dirname } from 'path';
const __dirname = dirname(_filename);

const app = express();
const PORT = 9999;
let radioProcess = null;

// Middleware pentru a putea citi JSON (dacă vei trimite date mai târziu)
app.use(express.static(path.join(__dirname, '../dist')));

app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

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