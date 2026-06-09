# Taguu 🎋 — Birthday Surprise Sketchbook

An elegant, interactive birthday surprise website designed with a **"Warm Forest & Sketchbook"** theme. This project features custom animations, mini-games, and progressive disclosure chapters built specifically to celebrate a special birthday.

---

## 🎨 Theme & Aesthetic

- **Color Palette**: Sophisticated warm ivory backgrounds (`#fdfcf9`), soft mossy/emerald greens (`#4f772d`), gold accents (`#d4af37`), and gentle celebratory pastel tones.
- **Typography**: Elegant serif titles combined with fluid, personal handwriting style scripts.
- **Motifs**: Hand-drawn pandas, bamboo, vintage sketchbooks, washi tapes, and polaroid photos.
- **Iconography**: Balanced, outline-based social and media icons with a consistent `strokeWidth` of `2` for a premium, unified aesthetic.

---

## 📚 Interactive Journey Structure

1. **Passcode Gate**: Enter the secret passcode to unlock the experience.
   * **Default Passcode**: `11061998` (configured in `src/config.ts`).
   * *Features instant, gesture-locked background music activation on correct entry.*
2. **Chapter 1: Friendship Trivia**: A series of fun questions about shared memories to unlock the next chapter.
3. **Chapter 2: Memory Matcher**: A 3D memory matching card game showcasing cute panda icons.
4. **Chapter 3: Memories**: A polaroid gallery of beautiful photos with custom, hand-crafted captions and an overlay slideshow lightbox.
5. **Chapter 4: For You**: A beautifully designed vintage letter inside a sealed envelope with a custom animated wax seal.
6. **Chapter 5: Baby Prediction**: An interactive gift box that unwraps to reveal a baby gender prediction voting game.
7. **Chapter 6: Make a Wish**: A final birthday wish card featuring an interactive birthday cake where the user can blow out the candles.

---

## 🛠 Features & Technologies

- **Next.js 16 (App Router)**: Configured for performance, built on TypeScript.
- **Framer Motion**: Powering smooth page transitions, floating panda interactions, 3D card flips, and wax seal openings.
- **Canvas Confetti**: For celebratory bursts upon completing chapters and blowing out the candles.
- **Lucide React**: For sharp, modern utility icons.
- **Synchronous Autoplay Engine**: Bypasses browser autoplay restrictions by initializing the background audio on page load and triggering playback synchronously during the user-interaction event loop tick of entering the correct passcode.
- **Dynamic Panda Favicon**: Dynamically generated SVG/PNG icon using Next.js `ImageResponse` metadata API.

---

## ⚙️ Configuration (`src/config.ts`)

You can fully customize the content, questions, quotes, and photos by modifying `src/config.ts`:

```typescript
export const CONFIG: ConfigType = {
  friendName: "Priya Harshana",
  birthDatePasscode: "11061998", // Passcode required to unlock (DDMMYYYY)
  musicUrl: "/bgm.mp3",          // Background music path
  triviaQuestions: [...],        // Custom questions, answers, and correct replies
  galleryPhotos: [...],          // 16 polaroids with custom captions
  personalMessages: [...],       // Love notes and message cards
  quotes: [...],                 // Quotes for the header and envelope
  babyPrediction: { ... }        // Custom options for the prediction game
};
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the surprise sketchbook.

### 3. Production Build
To create an optimized production build and verify type safety:
```bash
npx tsc --noEmit
npm run build
```
