const fs = require("fs");
const files = [
  "src/components/site/CursorGlow.tsx",
  "src/components/site/DigitalAnalyzer.tsx",
  "src/components/site/HeroArt.tsx",
  "src/components/site/HeroVisualization.tsx",
  "src/components/site/Nav.tsx",
  "src/components/site/PageHeader.tsx",
  "src/components/site/ParticleBackground.tsx",
  "src/components/site/SystemModule.tsx",
  "src/routes/analyzer.tsx",
  "src/routes/contact.tsx",
  "src/routes/index.tsx",
];

files.forEach((file) => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, "utf8");

    // Fix the broken `oklch(0.78 0.14 300 / )` strings because PowerShell interpolated $1 away.
    // They used to have different opacities. I'll just use a generic 0.15 for border colors, 0.5 for subtle things.
    content = content.replace(/oklch\(0\.78 0\.14 300 \/ \)/g, "oklch(0.78 0.14 300 / 0.15)");

    // Fix native selects to use Radix UI Select in contact.tsx
    if (file.includes("contact.tsx")) {
      if (!content.includes("import { Select")) {
        content = content.replace(
          'import { MagneticButton } from "@/components/site/MagneticButton";',
          'import { MagneticButton } from "@/components/site/MagneticButton";\nimport { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";',
        );
      }

      content = content.replace(
        /<select required className="w-full bg-transparent border-b py-3 font-mono text-lg focus:outline-none appearance-none" style={{ borderColor: "oklch\(0\.78 0\.14 300 \/ 0\.15\)", color: "#fff" }}>\s*<option value="" disabled style={{ background: "#000" }}>Select range...<\/option>\s*<option value="5k-10k" style={{ background: "#000" }}>\$5k – \$10k \/ month<\/option>\s*<option value="10k-25k" style={{ background: "#000" }}>\$10k – \$25k \/ month<\/option>\s*<option value="25k-50k" style={{ background: "#000" }}>\$25k – \$50k \/ month<\/option>\s*<option value="50k\+" style={{ background: "#000" }}>\$50k\+ \/ month<\/option>\s*<\/select>/g,
        `<Select required>
                    <SelectTrigger 
                      className="w-full bg-transparent border-b border-t-0 border-x-0 rounded-none py-3 h-auto font-mono text-lg focus:outline-none focus:ring-0 shadow-none px-0"
                      style={{ borderColor: "oklch(0.78 0.14 300 / 0.15)", color: "#fff" }}
                    >
                      <SelectValue placeholder="Select range..." />
                    </SelectTrigger>
                    <SelectContent className="font-mono text-sm border" style={{ borderColor: "oklch(0.78 0.14 300 / 0.15)", background: "oklch(0.04 0.01 300)" }}>
                      <SelectItem value="5k-10k">$5k – $10k / month</SelectItem>
                      <SelectItem value="10k-25k">$10k – $25k / month</SelectItem>
                      <SelectItem value="25k-50k">$25k – $50k / month</SelectItem>
                      <SelectItem value="50k+">$50k+ / month</SelectItem>
                    </SelectContent>
                  </Select>`,
      );

      content = content.replace(
        /<select required className="w-full bg-transparent border-b py-3 font-mono text-lg focus:outline-none appearance-none" style={{ borderColor: "oklch\(0\.78 0\.14 300 \/ 0\.15\)", color: "#fff" }}>\s*<option value="" disabled style={{ background: "#000" }}>Select urgency...<\/option>\s*<option value="low" style={{ background: "#000" }}>Low — Exploring options<\/option>\s*<option value="medium" style={{ background: "#000" }}>Medium — Ready in 1–2 months<\/option>\s*<option value="high" style={{ background: "#000" }}>High — Need immediate execution<\/option>\s*<\/select>/g,
        `<Select required>
                    <SelectTrigger 
                      className="w-full bg-transparent border-b border-t-0 border-x-0 rounded-none py-3 h-auto font-mono text-lg focus:outline-none focus:ring-0 shadow-none px-0"
                      style={{ borderColor: "oklch(0.78 0.14 300 / 0.15)", color: "#fff" }}
                    >
                      <SelectValue placeholder="Select urgency..." />
                    </SelectTrigger>
                    <SelectContent className="font-mono text-sm border" style={{ borderColor: "oklch(0.78 0.14 300 / 0.15)", background: "oklch(0.04 0.01 300)" }}>
                      <SelectItem value="low">Low — Exploring options</SelectItem>
                      <SelectItem value="medium">Medium — Ready in 1–2 months</SelectItem>
                      <SelectItem value="high">High — Need immediate execution</SelectItem>
                    </SelectContent>
                  </Select>`,
      );
    }

    // Fix native selects to use Radix UI Select in analyzer.tsx
    if (file.includes("analyzer.tsx")) {
      if (!content.includes("import { Select")) {
        content = content.replace(
          'import { ScanningScreen, DigitalAnalyzerResults } from "@/components/site/DigitalAnalyzer";',
          'import { ScanningScreen, DigitalAnalyzerResults } from "@/components/site/DigitalAnalyzer";\nimport { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";',
        );
      }

      content = content.replace(
        /<select\s*required\s*className="w-full bg-transparent border-b py-3 font-mono text-lg focus:outline-none appearance-none"\s*style={{ borderColor: "oklch\(0\.78 0\.14 300 \/ 0\.15\)", color: "#fff" }}\s*>\s*<option value="" disabled style={{ background: "#000" }}>Select size...<\/option>\s*<option value="0-10k" style={{ background: "#000" }}>0 - 10,000<\/option>\s*<option value="10k-100k" style={{ background: "#000" }}>10,000 - 100,000<\/option>\s*<option value="100k-500k" style={{ background: "#000" }}>100,000 - 500,000<\/option>\s*<option value="500k\+" style={{ background: "#000" }}>500,000\+<\/option>\s*<\/select>/g,
        `<Select required>
                  <SelectTrigger 
                    className="w-full bg-transparent border-b border-t-0 border-x-0 rounded-none py-3 h-auto font-mono text-lg focus:outline-none focus:ring-0 shadow-none px-0"
                    style={{ borderColor: "oklch(0.78 0.14 300 / 0.15)", color: "#fff" }}
                  >
                    <SelectValue placeholder="Select size..." />
                  </SelectTrigger>
                  <SelectContent className="font-mono text-sm border" style={{ borderColor: "oklch(0.78 0.14 300 / 0.15)", background: "oklch(0.04 0.01 300)" }}>
                    <SelectItem value="0-10k">0 - 10,000</SelectItem>
                    <SelectItem value="10k-100k">10,000 - 100,000</SelectItem>
                    <SelectItem value="100k-500k">100,000 - 500,000</SelectItem>
                    <SelectItem value="500k+">500,000+</SelectItem>
                  </SelectContent>
                </Select>`,
      );
    }

    fs.writeFileSync(file, content);
  }
});
