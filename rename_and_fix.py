import os
import re

src_dir = 'src'

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # 1. Rename Socioverse to InfuelPP
    content = content.replace('Socioverse', 'InfuelPP')
    content = content.replace('SOCIOVERSE', 'INFUELPP')
    content = content.replace('socioverse.com', 'infuelpp.com')

    # 2. Fix services.tsx specific issues
    if 'services.tsx' in filepath:
        content = content.replace('bg-black', 'bg-background')
        content = content.replace('from-black', 'from-background')
        # Fix hardcoded oklch colors in services.tsx
        content = re.sub(r'\[oklch\(0\.78_0\.14_300/([0-9.]+)\)\]', r'accent/\1', content)
        content = content.replace('bg-[oklch(0.78_0.14_300)]', 'bg-accent')
        content = content.replace('text-[oklch(0.78_0.14_300)]', 'text-accent')
        content = content.replace('hover:border-[oklch(0.78_0.14_300/0.4)]', 'hover:border-accent/40')
        content = content.replace('border-[oklch(0.78_0.14_300/0.3)]', 'border-accent/30')

    # 3. Fix HeroArt.tsx circles visibility
    if 'HeroArt.tsx' in filepath:
        content = content.replace('border-border-strong', 'border-foreground/20')
        content = content.replace('border-accent/15', 'border-accent/30')
        # Improve globe gradient contrast
        content = content.replace('radial-gradient(circle at 30% 30%, #fff, var(--color-accent) 60%, var(--color-background))', 'radial-gradient(circle at 30% 30%, var(--color-background), var(--color-accent) 80%)')

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, _, files in os.walk(src_dir):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            replace_in_file(os.path.join(root, file))

print("Done.")
