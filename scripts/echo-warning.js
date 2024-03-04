// Get the arguments passed to the script
const args = process.argv.slice(2); // Exclude first two arguments (node path and script path)

// Function to echo colorful and bold text
function echoBoldRed(message) {
    console.log('\x1b[1m\x1b[31m%s\x1b[0m', message);
}

// Echo the message
echoBoldRed(`🛑Running docs without changing the Directory to 'apps/${args[0]}'🛑`);
