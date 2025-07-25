#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawn, exec } = require('child_process');

// Configuration
const PORT = 3030;
const BASE_DIR = __dirname;
const WATCH_EXTENSIONS = ['.html', '.css', '.js'];
const EXCLUDE_PATHS = ['node_modules', '.git', 'dev-server.js', 'server.log'];

console.log('🚀 Starting Dylan & Katelyn\'s Law Study Tool Development Server');
console.log(`📂 Watching: ${BASE_DIR}`);
console.log(`🌐 Server: http://localhost:${PORT}`);
console.log('🔄 Hot reload enabled for .html, .css, .js files');
console.log('');

// File watcher
const watchedFiles = new Map();

function shouldWatch(filePath) {
    const ext = path.extname(filePath);
    const relativePath = path.relative(BASE_DIR, filePath);
    
    return WATCH_EXTENSIONS.includes(ext) && 
           !EXCLUDE_PATHS.some(exclude => relativePath.includes(exclude));
}

function watchFile(filePath) {
    if (watchedFiles.has(filePath)) return;
    
    try {
        const watcher = fs.watch(filePath, (eventType) => {
            if (eventType === 'change') {
                const fileName = path.basename(filePath);
                const timestamp = new Date().toLocaleTimeString();
                console.log(`🔄 [${timestamp}] File changed: ${fileName}`);
                
                // In a real hot reload setup, we'd inject WebSocket code
                // For now, just log the change
                console.log('   ↳ Refresh your browser to see changes');
            }
        });
        
        watchedFiles.set(filePath, watcher);
    } catch (error) {
        console.error(`❌ Could not watch ${filePath}:`, error.message);
    }
}

function watchDirectory(dirPath) {
    try {
        const items = fs.readdirSync(dirPath);
        
        items.forEach(item => {
            const fullPath = path.join(dirPath, item);
            
            try {
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory() && !EXCLUDE_PATHS.includes(item)) {
                    watchDirectory(fullPath);
                } else if (stat.isFile() && shouldWatch(fullPath)) {
                    watchFile(fullPath);
                }
            } catch (error) {
                // Skip files we can't access
            }
        });
    } catch (error) {
        console.error(`❌ Could not read directory ${dirPath}:`, error.message);
    }
}

// Start watching
watchDirectory(BASE_DIR);

console.log(`👁️  Watching ${watchedFiles.size} files for changes...`);
console.log('');
console.log('💡 Tips:');
console.log('   • Open http://localhost:3030 in your browser');
console.log('   • Edit any HTML, CSS, or JS file to see changes');
console.log('   • Press Ctrl+C to stop the server');
console.log('');

// Keep the process alive
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down development server...');
    
    // Close all file watchers
    watchedFiles.forEach(watcher => {
        try {
            watcher.close();
        } catch (error) {
            // Ignore errors when closing watchers
        }
    });
    
    // Kill the Python server
    exec(`lsof -ti:${PORT} | xargs kill -9`, (error) => {
        if (error) {
            console.log('Server may have already been stopped');
        } else {
            console.log('✅ Server stopped');
        }
        process.exit(0);
    });
});

// Keep process running
setInterval(() => {
    // Check if server is still running
    exec(`lsof -i :${PORT}`, (error, stdout) => {
        if (error || !stdout.includes('Python')) {
            console.log('❌ Server appears to have stopped. Restarting...');
            
            // Restart server
            const serverProcess = spawn('python3', ['-m', 'http.server', PORT.toString()], {
                cwd: BASE_DIR,
                detached: true,
                stdio: 'ignore'
            });
            
            serverProcess.unref();
            console.log('✅ Server restarted');
        }
    });
}, 5000); // Check every 5 seconds