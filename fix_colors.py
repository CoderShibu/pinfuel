import re
import os

file_path = 'src/routes/contact.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace hardcoded oklch colors with CSS variables
# 1. Full opacity
content = re.sub(r'oklch\(\s*0\.78\s+0\.14\s+300\s*\)', 'var(--color-accent)', content)
# 2. With opacity 0.15
content = re.sub(r'oklch\(\s*0\.78\s+0\.14\s+300\s*/\s*0\.15\s*\)', 'oklch(from var(--color-accent) l c h / 0.15)', content)
# 3. background: "oklch(0.04 0.01 300)"
content = re.sub(r'oklch\(\s*0\.04\s+0\.01\s+300\s*\)', 'var(--color-background)', content)

# Also fix the text-subtle and foreground issues
content = content.replace('text-subtle hover:text-foreground', 'text-muted-foreground hover:text-foreground')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Colors fixed in contact.tsx")
