# Background video

Put your finished video here and name it exactly:

    office-bg.mp4

The page plays it automatically (muted, looping) behind the dashboard. If the file is
missing, the page quietly falls back to the built-in wallpaper, so nothing breaks.

## Recommended export

- 16:9, 10 to 15 seconds, seamless loop, 24 fps
- H.264 MP4, no audio track
- Keep the left third of the frame calm. The page adds a soft fade there so titles stay readable.
- 4K is fine for presentations, but a 1080p copy loads much faster in a web app.
  To make a light web version (needs ffmpeg):

      ffmpeg -i source-4k.mp4 -an -vf scale=1920:-2 -c:v libx264 -crf 24 -preset slow -movflags +faststart office-bg.mp4

## Prompt for an AI video generator (Veo, Runway, Sora, Kling, etc.)

Realistic, premium 4K corporate office background video for an Office Assets Record and
Inventory Management system. Modern blue and white corporate theme, clean glass walls,
natural daylight, elegant navy-blue accents, white desks, organized desktop computers,
laptops, monitors, printers, office chairs and neatly arranged equipment.

Motion: slow cinematic camera movement, subtle parallax, gentle reflections on glass,
minimal background activity. A professional employee discreetly scans an equipment
barcode and checks office inventory.

Composition: widescreen 16:9, uncluttered, soft lighting, balanced contrast, plenty of
clean negative space on the left for dashboard titles. 10 to 15 seconds, seamless loop,
24 fps.

Avoid: visible company logos, readable random text, flashy transitions, excessive
movement, distorted equipment, busy backgrounds.

Tip: most generators cannot make a perfect loop. Generate the clip, then in any editor
(CapCut, DaVinci Resolve) cross-fade the last second into the first second, or play it
forward then reversed.
