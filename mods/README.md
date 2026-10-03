# Claude Code mods for this repo

Five small mods, built from the video *"Claude Code Mods Are Game Changers. Set Up These 5 NOW."*
(Nate Herk, 2 Oct 2026). They are **my own implementations of what the video describes**, fitted to this
repo's workflow. They are not his code, which he shares through his community.

A mod is a Claude Code plugin whose code runs *inside* Claude Code. It can draw a band above the
prompt or a pane, watch tool calls and turns, and add `/commands`. Docs:
[overview](https://code.claude.com/docs/en/plugins/mods/overview),
[create a mod](https://code.claude.com/docs/en/plugins/mods/create),
[reference](https://code.claude.com/docs/en/plugins/mods/reference).

## The five mods

| Mod | What it adds | Video chapter | Fitted to this repo |
|---|---|---|---|
| [`next-steps`](next-steps) | After each turn, a row of suggested next prompts above the prompt box. Pick one to fill the box (it never sends). | 0:35 | Knows the taxonomy loop: if `taxonomy.yaml` changed, it offers the next missing step of validate → changelog → reconcile → build. |
| [`cache-keeper`](cache-keeper) | A band with context size, 5-hour and weekly limits, an API-rate cost estimate and a prompt-cache countdown. A warning shows shortly before the cache expires. Buttons: **Handoff** and **Clear + continue**. | 2:53 | The buttons write and read `reports/handoff.md`. |
| [`recording-mode`](recording-mode) | `/recording on` hides emails, keys, home paths and terms you list *on screen*. Claude still sees and uses the real text. | 5:30 | Add your own terms in its settings. |
| [`goal-meter`](goal-meter) | While a `/goal` runs: the goal, elapsed time, task progress and the current task. **Tasks** (key `g`) opens a pane that also lists goals running in your other chats. | 7:23 | none needed |
| [`collision-guard`](collision-guard) | Before Edit, Write or NotebookEdit: if another *open* chat changed the same file in the last 30 minutes, it asks: Proceed, Use a worktree, or Cancel (or type another instruction). | 9:11 | Worth having for `taxonomy.yaml`, which every iteration edits. |

The video also covers building mods by describing them in plain English (1:55). That is how these were
made: Claude Code has a built-in `plugin-authoring` skill, so "make a mod that shows my git branch above the
prompt" is a complete request. A good first prompt, from the video: *"Look through my session logs and
identify the tasks I do often, the instructions I repeat, and the friction in my workflow. Suggest five useful
Claude Code mods based on those patterns, and explain what each would do."*

## Use them

You need Claude Code 2.1.287 or later, run in a **terminal or the Code tab of the Desktop app**. Mods are on by
default. From a clone of this repo, load whichever you want for a session (repeat the flag):

```bash
claude \
  --plugin-dir mods/next-steps \
  --plugin-dir mods/cache-keeper \
  --plugin-dir mods/recording-mode \
  --plugin-dir mods/goal-meter \
  --plugin-dir mods/collision-guard
```

Run `/plugin` and look for a line like `5 mods active`. Edits to a mod's files reload it while the session runs.

**Where they draw.** Only the terminal and the Desktop app draw bands and panes. In a cloud session, the VS Code
chat panel and `claude -p`, the hooks still run but nothing is drawn. Each mod therefore has a text command that
works everywhere: `/next`, `/cache`, `/recording`, `/goals`, `/collisions`.

**Collision Guard needs every chat to load it.** It can only see chats that also run the mod. If you run
several chats at once, start them all with `--plugin-dir mods/collision-guard`.

## Settings

Each mod's settings appear in `/config`, and can be set under `pluginConfigs` in your settings.

| Mod | Setting | Default | Note |
|---|---|---|---|
| `cache-keeper` | `cacheMinutes` | 60 | **Check this.** Claude Code does not tell mods how long your prompt cache lasts: use 5 for the standard cache, 60 for the one-hour cache. |
| | `warnMinutes` | 5 | When to show the expiry notice. |
| | `handoffPrompt`, `continuePrompt` | about `reports/handoff.md` | What the two buttons send. |
| `recording-mode` | `hideTerms` | none | Names, clients, prices. Matched anywhere, ignoring case. |
| | `maskMoney`, `maskHomePath`, `startOn` | off, on, off | |
| `next-steps` | `useModel` | on | One small model call (`haiku`) after each turn, on your usage. Off keeps only the built-in loop steps. |
| | `model`, `maxSuggestions`, `projectHint` | `haiku`, 3 | `projectHint` tells the model about this repo. |
| `collision-guard` | `windowMinutes` | 30 | |
| `goal-meter` | `otherChatHours` | 12 | |

## What they touch

A mod runs with your permissions and is not sandboxed. Read one before loading it with
`claude plugin validate mods/<name>`, which lists the events it hooks and every call it makes.

- `collision-guard` and `goal-meter` each keep one small file per chat under `~/.claude/` (in
  `collision-guard-data/` and `goal-meter-data/`) so chats can see each other. Each chat writes only its own file
  and clears its entry when the chat ends.
- `next-steps` makes one model call per turn unless `useModel` is off. It skips the call where nothing can
  draw (cloud, `claude -p`). Its suggestions only ever fill the prompt box.
- `cache-keeper`'s **Clear + continue** button runs `/clear`. **Handoff** sends a prompt as if you typed it.
- `recording-mode` changes only what is drawn. It never edits files, messages or tool calls.

## What was checked, and what was not

For every mod: `claude plugin validate`, a `tsc` type-check against this build's API types, and
`claude plugin test` (92 tests in all, covering the logic and the trees each mod draws on every surface it draws on). Each mod also loaded in a real headless `claude -p` run and answered its command.
Collision Guard was also run end to end: two real overlapping chats, where the second chat's first edit was
refused with the mod's message, and its retry went through.

Not checked, because this was built in a cloud session that cannot draw mods:

- **How anything looks** in a real terminal or the Desktop app: colours, wrapping, the hotkeys.
- The interactive Collision Guard dialog (it was exercised with a stand-in for your answer, and the headless
  path for real).
- **Clear + continue** and **Handoff** in a live chat. The test confirms `/clear` is run first and the prompt is
  sent after it.
- Recording Mode's coverage of every view. Check the ctrl+o transcript, and any other window, before you record.

Assumptions to know about:

- `goal-meter` assumes `/goal <condition>` sets a goal and `/goal clear` clears it. It reads task progress from
  the task and todo tools, and calls a goal done when every task is complete. It cannot see the goal checker's own
  verdict, so use `/goal clear` for a goal that finishes with tasks still open.
- `cache-keeper` counts down from the end of your last turn, and shows "cache live" while a turn runs.
- The video's transcript could not be fetched. The descriptions above come from its chapters and description, the
  creator's own write-up of the same mods, and the official docs.

## Check them again

```bash
make mods-check          # validate + test every mod
claude plugin validate mods/collision-guard
(cd mods/collision-guard && claude plugin test)
```

Claude Code writes `tsconfig.json` and a `.claude-plugin/types/` folder next to a mod each time it loads it.
Both are git-ignored. Open the `mods/<name>` folder in an editor after one load to get type checking.

## Keep or share a mod you make in a session

A mod Claude writes in a session lives in `~/.claude/dev-mods/<session-id>/` and is deleted after
`cleanupPeriodDays`. Copy it out (into `mods/`, as here) to keep it. To install one for a team, list it in a
[marketplace](https://code.claude.com/docs/en/plugins/publish) rather than loading it with `--plugin-dir`.
