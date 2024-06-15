process.stdout.write('Welcome to Holberton School, what is your name?\n');

// Check if stdin is connected to a terminal (CLI)
if (process.stdin.isTTY) {
    // Display closing message only when interacting via CLI
    process.on('beforeExit', () => {
        console.log('This important software is now closing');
    });
}

process.stdin.on('data', (data) => {
    const name = data.toString().trim();
    console.log(`Your name is: ${name}`);
    process.exit();
});
