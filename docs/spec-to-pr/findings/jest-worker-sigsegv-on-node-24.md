# Finding: jest worker dies with SIGSEGV during `npm run test:report`

**Source:** `jest@29.7.0` / `jest-worker@29.7.0` / `jest-environment-jsdom@29.7.0`
(bundling `jsdom@20.0.3`), running on Node `v24.18.0`. Symptom surfaces as
`A jest worker process (pid=…) was terminated by another process: signal=SIGSEGV,
exitCode=null` at `jest-worker/build/workers/ChildProcessWorker.js:370`.

**Root cause:** the worker child process is killed by the OS, not by a failing
assertion — no test body runs to completion and no expectation fails. The suite it
lands on varies between runs (one run reported
`lib/components/Button/social/__tests__/social-button.test.tsx`, which passes on
its own: 8/8 tests, 7/7 snapshots), and a full re-run of the same working tree
completed 84/84 suites and 482/482 tests green. Jest 29's `jsdom@20` environment
predates Node 24 and is not supported on it; the native crash comes from that
combination inside the worker, not from any component under test.

**Fix at the source:** run CI/local tests on a Node version this toolchain
supports (Node 20 LTS), and/or upgrade the test stack to a release built against
current Node — `jest`/`jest-environment-jsdom` >= 30, which ships `jsdom@26`.

**Why our code must not change:** the crash is in the test runner's worker
process, so masking it here (forcing `maxWorkers=1`, dropping `--collectCoverage`,
or skipping the suite it happens to land on) would hide a broken toolchain instead
of fixing it — and no product code is implicated.

## Not introduced by the ActionSheet header change

Verified by stashing the change and running `npm run test:report` on clean `HEAD`:

| tree                | result                                            |
| ------------------- | ------------------------------------------------- |
| clean `HEAD`        | 84/84 suites, 480/480 tests pass                  |
| with the change     | 84/84 suites, 482/482 tests pass (+2 new tests)   |

The `Warning: An update to ForwardRef(Calendar) inside a test was not wrapped in
act(...)` console output that accompanied the crash report is also present on
clean `HEAD`, alongside the same warnings for `ForwardRef` and `Input`. It is
pre-existing `react-calendar` / `DatePicker` test noise, unrelated to
`ActionSheet.Header`, and left untouched.
