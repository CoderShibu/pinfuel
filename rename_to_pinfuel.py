import os

src_dir = 'src'

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # 1. Rename InfuelPP to PINFUEL
    content = content.replace('InfuelPP', 'PINFUEL')
    content = content.replace('INFUELPP', 'PINFUEL')
    content = content.replace('infuelpp.com', 'pinfuel.com')
    content = content.replace('infuelpp', 'pinfuel')

    # 2. Fix HeroArt.tsx circles visibility
    if 'HeroArt.tsx' in filepath:
        content = content.replace('border-foreground/20', 'border-foreground/40')
        content = content.replace('border-accent/30', 'border-accent/60')

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, _, files in os.walk(src_dir):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts') or file.endswith('.css'):
            replace_in_file(os.path.join(root, file))

print("Done.")
