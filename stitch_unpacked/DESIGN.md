# Design System Document

## 1. Creative North Star: "The Celestial Observer"
This design system is built upon the concept of **The Celestial Observer**. It rejects the cluttered, "gadget-heavy" tropes of sci-fi interfaces in favor of a sophisticated, high-fidelity aerospace control aesthetic. The goal is to create a sense of vast, quiet depth—like looking through a high-end telescope—where data is not just displayed, but "illuminated" against the void.

By utilizing intentional asymmetry and high-contrast typographic scales, we move away from generic dashboard grids. The layout should feel like a technical manuscript from the future: authoritative, precise, and deeply atmospheric.

---

## 2. Color & Atmospheric Depth
Our palette is rooted in the deep spectrum of the cosmos. We utilize a "Dark-Mode First" philosophy where the background is not just black, but a layered atmospheric blue.

### Surface Hierarchy & Nesting
To achieve a premium feel, we follow the **Tonal Layering Principle**. Hierarchy is established by shifting between surface containers rather than drawing lines.
- **Base Layer:** `surface` (#0c1225) for the primary application canvas.
- **Sectioning:** Use `surface_container_low` (#151b2e) for large organizational blocks.
- **High Focus:** Use `surface_container_highest` (#2e3449) for active widgets or critical data panels.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections. Boundaries must be defined solely through background color shifts. If a `surface_container` sits on the `background`, the contrast between #191f32 and #0c1225 provides all the structural definition required.

### Signature Textures & Glass
- **The Glassmorphism Rule:** Floating overlays, such as command palettes or detailed telemetry pop-overs, must use `surface_bright` (#33384d) at 60% opacity with a `backdrop-blur` of 20px. 
- **Luminescent Gradients:** For primary actions and critical warnings, use a linear gradient from `primary` (#71d6d6) to `primary_container` (#329f9f) at a 135-degree angle. This mimics the glow of a CRT phosphor or a modern LED data stream.

---

## 3. Typography: Technical Authority
We pair the geometric precision of **Space Grotesk** with the clean, readable utility of **Inter** to create a "Technical Editorial" style.

- **Display & Headlines (Space Grotesk):** Used for "Hero" data points—solar wind speeds, radiation levels, and orbital coordinates. The exaggerated scale of `display-lg` (3.5rem) against `body-sm` (0.75rem) creates a sophisticated, asymmetrical tension.
- **Functional UI (Inter):** Used for titles, labels, and long-form data logs. It provides the grounding needed for high-density information environments.
- **Case Styling:** Use `uppercase` with `0.1rem` letter-spacing for all `label-sm` and `label-md` tokens to reinforce the "aerospace instrumentation" feel.

---

## 4. Elevation & Depth
In this design system, shadows are light, and borders are ghosts.

- **Ambient Shadows:** Standard drop shadows are prohibited. When an element must "float" (e.g., a critical alert modal), use a shadow tinted with `secondary` (#b8c4ff) at 5% opacity, with a blur radius of 40px. This simulates the ambient glow of the screen reflecting off a surface.
- **The "Ghost Border" Fallback:** If a container lacks sufficient contrast against its neighbor, use a "Ghost Border": the `outline_variant` (#3d4949) at **15% opacity**. Never use a 100% opaque border.
- **Tonal Stacking:** Always stack "dark to light." An inner card should always be a higher tier (brighter) than the section it sits within (e.g., a `surface_container_high` card inside a `surface_container` section).

---

## 5. Component Guidelines

### Buttons (Propulsion Controls)
- **Primary:** Gradient fill (`primary` to `primary_container`). No border. `Space Grotesk` Medium, uppercase.
- **Secondary:** Ghost style. No background fill. `Ghost Border` (15% opacity `outline_variant`). On hover, fill with `surface_container_highest`.
- **Corner Radius:** Use `DEFAULT` (0.25rem) for a sharp, technical "instrument" feel. Avoid large rounded corners (`xl` or `full`) unless for circular status pips.

### Data Cards & Lists
- **The Divider Ban:** Never use horizontal rules (`<hr>`). Use `Spacing 6` (1.3rem) or a background shift to `surface_container_lowest` to isolate list items.
- **Telemetry Chips:** Use `secondary_container` (#364583) with `on_secondary_container` text. These should be strictly rectangular or `sm` rounded.

### Aerospace Input Fields
- **State:** Resting state uses `surface_container_highest` as a solid fill. 
- **Focus:** Transition the background to `surface_bright` and add a 1px `primary` (#71d6d6) glow only at the bottom edge of the input.
- **Error:** Background shifts to a subtle `error_container` (#93000a) wash at 20% opacity.

### Specialized Component: The "Data Stream"
For space weather logs, use a monospaced-leaning variant of `label-sm`. Align numerical data to the right to allow for quick scanning of decimal points, mimicking flight controller readouts.

---

## 6. Do's and Don'ts

### Do
- **Use Negative Space:** Use `Spacing 16` (3.5rem) and `20` (4.5rem) to separate major data clusters. The "void" is a design element.
- **Intentional Asymmetry:** Align a large `display-lg` metric to the far left, balanced by a small, dense `label-sm` technical block on the far right.
- **Color Coding:** Reserve `error` (#ffb4ab) exclusively for X-class flares or hardware failure. Use `primary` (#71d6d6) for nominal data streams.

### Don't
- **Don't use "Card Shadows":** Use background color shifts. Shadows should be reserved for elements that physically move over the interface (modals, tooltips).
- **Don't use Pure White:** Use `on_surface` (#dce1fc) for text. It is a soft, blue-tinted white that reduces eye strain in dark environments.
- **Don't Over-round:** Avoid `lg`, `xl`, or `full` corner radius for structural components. Keep it `DEFAULT` (0.25rem) to maintain a professional, high-tech edge.