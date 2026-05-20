@AGENTS.md

# KAP Website Build System

## INITIAL PROJECT SETUP (MANDATORY)

When beginning a new project or when requested to scaffold architecture:

FIRST create and/or verify the following directory structure before implementation:

project-root/
┣ CLAUDE.md
┣ package.json
┣ app/
┃ ┣ layout.tsx
┃ ┣ page.tsx
┃ ┗ globals.css
┣ public/
┣ components/
┃ ┣ layout/
┃ ┣ sections/
┃ ┣ shared/
┃ ┗ ui/
┗ lib/
  ┣ animations.ts
  ┣ content.ts
  ┣ utils.ts
  ┗ constants.ts

Note: This project uses Next.js 16's root-level `app/` (no `src/` directory).
The `@/*` path alias resolves from the project root.

---

## SETUP RULES
- If folders do not exist, create them
- If files do not exist, scaffold them
- Do NOT begin UI implementation until structure is verified
- Confirm architecture before building pages
- If structure already exists, verify compliance and correct deviations
- `lib/animations.ts` should contain reusable animation presets
- `lib/content.ts` should contain structured site content when appropriate
- `lib/utils.ts` should contain helper functions
- `lib/constants.ts` should contain shared constants/config

---

## CLAUDE STARTUP BEHAVIOR
When entering a fresh project:
1. Review project structure
2. Scaffold missing directories/files
3. Confirm structure
4. Propose design system
5. Confirm page strategy
6. Then implementation

---

## BUILD ORDER (MANDATORY)
1. Verify architecture
2. Scaffold missing structure
3. Propose design system
4. Confirm page strategy
5. Build layout
6. Build sections
7. Add animation
8. Optimize responsive behavior
9. Refactor

---

## DECISION SAFETY RULE
- If uncertain where a file belongs, ask before creating it
- If a requested implementation conflicts with architecture, explain conflict first
- Do not invent alternative structures unless explicitly approved

---

## STRUCTURE RULES
- `app/` contains Next.js routes, layouts, and global styles (App Router)
- `components/` contains all reusable UI components
- `components/layout/` for Navbar, Footer, page shells
- `components/sections/` for Hero, Features, CTA, Testimonials
- `components/ui/` for buttons, cards, badges, reusable UI primitives
- `components/shared/` for shared cross-section elements
- `lib/` contains utilities, animations, constants, and structured content
- Avoid placing reusable components directly inside `app/` unless they are route-scoped
- Avoid duplicate component logic
- Keep business content separated from UI when possible

---

## FILE CREATION RULES
When creating new files:
- First determine the correct folder based on purpose
- Prefer reusable modular design
- Do NOT create unnecessary folders
- Do NOT place animation logic inline if reusable
- Use `lib/animations.ts` for shared animation presets
- Use `lib/content.ts` for page text/content constants when appropriate

---

## NAMING CONVENTIONS
- Components: PascalCase (Hero.tsx, Navbar.tsx)
- Utility files: camelCase or lowercase (utils.ts, animations.ts)
- Page files: Next.js conventions (page.tsx, layout.tsx)
- Keep naming descriptive and scalable

---

## PAGE BUILD RULES
Homepage:
- `app/page.tsx`

Global layout:
- `app/layout.tsx`

Examples:
- Hero → `components/sections/Hero.tsx`
- Navbar → `components/layout/Navbar.tsx`
- CTA → `components/sections/CTA.tsx`

---

## CORE STACK
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Motion (motion/react)
- UI UX Pro Max
- 21st.dev hero inspiration

---

## DESIGN SYSTEM PLANNING FORMAT
Before implementation, first propose:
1. Color palette
2. Typography system
3. Spacing system
4. Section structure
5. Animation strategy
6. Component strategy

---

## DESIGN STANDARDS
- Premium modern design
- Mobile-first responsive layout
- Clean visual hierarchy
- Strong CTA placement
- Clear spacing system
- Accessible contrast
- Professional business aesthetic
- Avoid clutter
- Avoid generic templates
- Prioritize conversion and clarity

---

## REQUIRED PAGE STRUCTURE
1. Navbar
2. Hero
3. Services / Features
4. Problem / Solution
5. Social Proof
6. CTA
7. Footer

---

## HERO RULES
- Inspired by 21st.dev
- Strong headline
- Clear subheadline
- Primary + Secondary CTA
- Motion entrance animations
- Premium whitespace
- Immediate business value

---

## COMPONENT RULES
- Reusable modular components
- Use `/components` structure
- Use `/lib/animations.ts`
- Use `/lib/content.ts`
- Separate content from layout
- Follow DRY principles

---

## SECTION DESIGN CONSISTENCY
- Maintain consistent vertical spacing between sections
- Reuse heading hierarchy across sections
- Keep CTA styling consistent site-wide
- Use shared section containers where possible

---

## ANIMATION RULES
- Motion fade-up
- Stagger children
- Hover states
- Smooth transitions
- Restrained premium feel
- No excessive animation
- Optimize for performance

---

## PERFORMANCE RULES
- Prioritize fast load speed
- Avoid unnecessary dependencies
- Prefer server components unless client-side interactivity is required
- Use "use client" only when necessary
- Optimize animation for performance

---

## ACCESSIBILITY RULES
- Use semantic HTML
- Ensure accessible contrast
- Include alt text where appropriate
- Maintain keyboard navigability
- Prioritize readability

---

## DEVELOPMENT PROCESS
1. Propose design system first
2. Build structure
3. Implement sections
4. Add animations
5. Mobile optimize
6. Refactor
7. Deploy

---

## CLAUDE INSTRUCTIONS
Always:
- Think like a senior UI/UX engineer
- Prioritize conversion and clarity
- Keep code production-ready
- Build reusable systems
- Refactor when possible
- Never skip architecture or planning

---

## FINAL EXECUTION RULE
Claude should behave as:

Architect → Scaffolder → UI/UX Strategist → Builder → Refactor Engineer

Never skip architecture, planning, or structural verification before implementation.