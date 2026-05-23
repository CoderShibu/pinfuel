import os

file = 'src/routes/contact.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace hardcoded colors with tailwind classes
content = content.replace('style={{ color: "oklch(0.78 0.14 300)" }}', 'className="text-accent"')
content = content.replace('style={{ background: "oklch(0.78 0.14 300)" }}', 'className="bg-accent"')
content = content.replace('style={{ background: "oklch(0.78 0.14 300 / 0.15)" }}', 'className="bg-accent/15"')
content = content.replace('style={{ borderColor: "oklch(0.78 0.14 300 / 0.15)" }}', 'className="border-accent/15"')
content = content.replace('style={{ borderColor: "oklch(0.78 0.14 300)" }}', 'className="border-accent"')

content = content.replace('style={{ background: "oklch(0 0 0)" }}', 'className="bg-background"')
content = content.replace('color: "#fff"', 'color: "var(--color-foreground)"')
content = content.replace('background: "#000"', 'background: "var(--color-background)"')
content = content.replace('color: "#000"', 'color: "var(--color-background)"')

content = content.replace(
    'className="text-[9px] font-mono uppercase tracking-widest block mb-2 transition-colors" style={{ color: focused ? "oklch(0.78 0.14 300)" : "oklch(0.78 0.14 300)" }}',
    'className={`text-[9px] font-mono uppercase tracking-widest block mb-2 transition-colors ${focused ? "text-accent" : "text-accent/70"}`}'
)

content = content.replace(
    'className="w-full bg-transparent border-b px-0 py-3 font-mono text-lg focus:outline-none transition-colors placeholder-subtle"\n        style={{ borderColor: focused ? "oklch(0.78 0.14 300)" : "oklch(0.78 0.14 300 / 0.15)", color: "#fff" }}',
    'className={`w-full bg-transparent border-b px-0 py-3 font-mono text-lg focus:outline-none transition-colors placeholder-subtle ${focused ? "border-accent" : "border-accent/15"} text-foreground`}'
)

content = content.replace(
    'style={{ borderColor: "oklch(0.78 0.14 300 / 0.15)", color: "oklch(0.78 0.14 300)" }}',
    'className="border-accent/15 text-accent"'
)

content = content.replace(
    'style={{ background: "oklch(0.78 0.14 300)", boxShadow: "0 0 20px oklch(0.78 0.14 300 / 0.15)" }}',
    'className="bg-accent shadow-[0_0_20px_var(--color-accent)]"'
)

content = content.replace('text-black font-bold', 'text-accent-foreground font-bold')
content = content.replace('text-black transition-all', 'text-accent-foreground transition-all')

new_layout_head = """    <div className="min-h-screen relative flex flex-col lg:flex-row pt-24 pb-16 px-4 md:px-12 overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-15" style={{ background: "radial-gradient(ellipse at bottom, var(--color-accent), transparent 55%)" }} />

      {/* LEFT COLUMN: Founders & Info */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center z-10 mb-16 lg:mb-0 lg:pr-12">
        <div className="max-w-md mx-auto lg:mx-0">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-balance"
          >
            Initialize Connection.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mb-12 text-lg leading-relaxed"
          >
            Bypass the gatekeepers. Directly interface with the core architects of the Socioverse system to engineer your digital dominance.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xs font-mono uppercase tracking-widest text-subtle mb-6 border-b border-border pb-2">The Architects</h3>
            <div className="space-y-4">
              <div className="flex gap-5 items-center p-5 rounded-2xl border border-border bg-surface-2/50 backdrop-blur-sm hover:border-accent/30 transition-colors">
                <div className="w-14 h-14 shrink-0 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-mono font-bold text-lg">F1</div>
                <div>
                  <div className="font-bold text-lg">Founder 1</div>
                  <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-2">CEO & Lead Strategist</div>
                  <div className="flex gap-4">
                    <a href="#" className="text-[11px] font-mono text-accent hover:underline uppercase tracking-widest">LinkedIn</a>
                    <a href="mailto:founder1@socioverse.com" className="text-[11px] font-mono text-accent hover:underline uppercase tracking-widest">Email</a>
                  </div>
                </div>
              </div>

              <div className="flex gap-5 items-center p-5 rounded-2xl border border-border bg-surface-2/50 backdrop-blur-sm hover:border-accent/30 transition-colors">
                <div className="w-14 h-14 shrink-0 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-mono font-bold text-lg">F2</div>
                <div>
                  <div className="font-bold text-lg">Founder 2</div>
                  <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-2">CTO & Growth Engineer</div>
                  <div className="flex gap-4">
                    <a href="#" className="text-[11px] font-mono text-accent hover:underline uppercase tracking-widest">LinkedIn</a>
                    <a href="mailto:founder2@socioverse.com" className="text-[11px] font-mono text-accent hover:underline uppercase tracking-widest">Email</a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* RIGHT COLUMN: Interactive Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center z-10 relative">
        <div className="w-full max-w-lg relative glass-panel p-8 md:p-12 rounded-3xl">"""

new_layout_tail = """        </div>
      </div>
    </div>"""

# Replace the layout
# We want to replace from `<div className="min-h-screen text-white relative...` down to `<AnimatePresence mode="wait">`
# And then replace the closing divs.

old_start = """    <div
      className="min-h-screen text-white relative flex flex-col justify-center items-center pt-24 pb-16 px-4 overflow-hidden"
      className="bg-background"
    >
      {/* BG elements */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom, oklch(0.78 0.14 300 / 0.15), transparent 55%)" }}
      />

      <div className="w-full max-w-lg relative z-10">"""

# wait, since I did `.replace('style={{ background: "oklch(0 0 0)" }}', 'className="bg-background"')`
# the old string is modified.

old_start_search = """    <div
      className="min-h-screen text-white relative flex flex-col justify-center items-center pt-24 pb-16 px-4 overflow-hidden"
      className="bg-background"
    >
      {/* BG elements */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom, oklch(0.78 0.14 300 / 0.15), transparent 55%)" }}
      />

      <div className="w-full max-w-lg relative z-10">"""

# Let's just use string slicing
start_idx = content.find('    <div\n      className="min-h-screen text-white relative')
animate_idx = content.find('{/* Step indicator */}')

if start_idx != -1 and animate_idx != -1:
    before = content[:start_idx]
    after = content[animate_idx:]
    
    # We also need to fix the end of the file. It ends with:
    #         </AnimatePresence>
    #       </div>
    #     </div>
    #   );
    # }
    
    after = after.replace('      </div>\n    </div>\n  );\n}', new_layout_tail + '\n  );\n}')
    content = before + new_layout_head + "\n          " + after

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)

print("Success")
