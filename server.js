import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { WebSocket, WebSocketServer } from 'ws';
import { dirname } from 'path';

// Get current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create HTTP server
const server = http.createServer((req, res) => {
    // Disable caching
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    // Get the file path
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    // Get the file extension
    const extname = path.extname(filePath);

    // Set content type based on file extension
    const contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.csv': 'text/csv'
    }[extname] || 'application/octet-stream';

    // If it's an HTML file, inject the live reload script
    if (extname === '.html') {
        fs.readFile(filePath, 'utf8', (error, content) => {
            if (error) {
                if (error.code === 'ENOENT') {
                    res.writeHead(404);
                    res.end('File not found');
                } else {
                    res.writeHead(500);
                    res.end('Server error: ' + error.code);
                }
            } else {
                // Inject the reload script before </body>
                const reloadScript = `
                    <script>
                        const ws = new WebSocket('ws://localhost:8001');
                        ws.onmessage = function(event) {
                            if (event.data === 'reload') {
                                location.reload();
                            }
                        };
                    </script>
                </body>`;
                content = content.replace('</body>', reloadScript);
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content);
            }
        });
    } else {
        // For non-HTML files
        fs.readFile(filePath, (error, content) => {
            if (error) {
                if (error.code === 'ENOENT') {
                    res.writeHead(404);
                    res.end('File not found');
                } else {
                    res.writeHead(500);
                    res.end('Server error: ' + error.code);
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content);
            }
        });
    }
});

// Create WebSocket server
const wss = new WebSocketServer({ port: 8001 });
let connections = new Set();

wss.on('connection', (ws) => {
    connections.add(ws);
    ws.on('close', () => connections.delete(ws));
});

// Watch for file changes
fs.watch('.', { recursive: true }, (eventType, filename) => {
    if (filename && filename.endsWith('.css')) {
        // Notify all clients to reload
        connections.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send('reload');
            }
        });
    }
});

const PORT = 8000;
server.listen(PORT, '127.0.0.1', () => {
    console.log(`Server running at http://127.0.0.1:${PORT}/`);
}); 