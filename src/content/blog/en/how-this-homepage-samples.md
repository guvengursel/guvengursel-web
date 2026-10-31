---
title: 'How this homepage samples'
description: 'The console on this site is a real, tiny sampler — temperature and nucleus width decide what you see. Notes from building it without a single framework.'
pubDate: 2026-08-28
locale: en
tags: ['design', 'astro', 'ml']
---

The field of nodes and edges behind this text is not a video, a canvas, or a
JavaScript library. It is an SVG generated when the site is built, from a
seeded random number generator, by the same server-side code that renders
this paragraph. Change the seed and the network rewires itself. Nothing runs
in your browser to draw it.

The console underneath — `temp`, `top-p`, `sample`, `reseed`, `auto` — is
where it gets interesting, because those controls are not decoration. They
are a small, honest imitation of how a language model actually samples.

## The joint sampler

Temperature reshapes the distribution before anything else happens. Nucleus
width then truncates it. On this page the two knobs multiply into one
effective value — `eff = temp × top-p` — and every node and edge carries a
baked activation threshold: an element joins the visible nucleus when the
joint value passes it. Slide `temp` to zero and the field collapses to a
single greedy spine, the argmax chain — which is precisely what
zero-temperature decoding is: always the most likely token, never a
surprise.

One rule keeps the picture honest: an edge is only visible when both of its
endpoints are. Its threshold is the maximum of the two nodes it connects,
computed at build time. You will never see a connection flowing into a node
that is not there.

## Sampling, not looping

The poem changes only when you sample. Each press fires one forward pass —
a wave of magenta flashes crossing the network layer by layer, each edge
flashing at a delay that was precomputed at build time — and when the wave
arrives at the output layer, the next haiku fades in. There is no timer
rotating poems in the background. Autopilot drifts the two knobs on its
own, explore and exploit, but even it never touches the poem. That is
yours.

## The discipline that made it possible

No packages. No canvas, no animation loop at idle, no scroll-tied motion.
The console writes CSS custom properties; stylesheets do the rest. Numeric
readouts refresh four times a second, because sixty is unreadable. The
drift speed of the edges changes in coarse steps, because retargeting a
running CSS animation restarts it — a lesson this page learned the hard
way. Everything collapses instantly under `prefers-reduced-motion`, and
without JavaScript you simply see the full field and the first poem.

The result is a portfolio homepage that behaves like a small instrument.
It is not a simulation of anything, and it does not pretend to be one. It
is a metaphor with working parts — and the parts are cheap enough to run
on a phone.

*— draft; final wording belongs to the owner.*
