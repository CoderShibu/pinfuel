const fs = require('fs');

const file = 'src/routes/contact.tsx';
let content = fs.readFileSync(file, 'utf8');

// The issue is like: className="foo bar" className="text-accent"
// We want to merge them into: className="foo bar text-accent"
// We can use a regex that matches `className="([^"]+)"\s+className="([^"]+)"` and replaces it with `className="$1 $2"`.
// We need to run it in a loop until there are no more duplicates on the same line/element.

let previousContent = '';
while (content !== previousContent) {
    previousContent = content;
    content = content.replace(/className="([^"]+)"\s+className="([^"]+)"/g, 'className="$1 $2"');
}

fs.writeFileSync(file, content);
console.log("Merged classNames");
