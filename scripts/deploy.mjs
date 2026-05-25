/**
 * Deploy dist/ to the gh-pages branch using the gh CLI token
 * so it always authenticates as vinayakkothari regardless of
 * which macOS Keychain credential is active.
 */
import { execSync } from 'child_process'
import { mkdtempSync, cpSync, rmSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'

const run = (cmd, opts = {}) =>
  execSync(cmd, { stdio: 'inherit', ...opts })

// Get token from gh CLI (must be logged in as vinayakkothari)
const token = execSync('gh auth token').toString().trim()
const remote = `https://vinayakkothari:${token}@github.com/vinayakkothari/azmabro.git`

// Create a temp worktree on gh-pages branch
const tmp = mkdtempSync(join(tmpdir(), 'az-deploy-'))
run(`git worktree add ${tmp} gh-pages`)

try {
  // Sync dist → worktree (overwrite, keep .git)
  cpSync('dist', tmp, { recursive: true })

  run('git add -A',                              { cwd: tmp })
  run('git diff --cached --quiet || git commit -m "Deploy $(date +%Y-%m-%d)"', { cwd: tmp, shell: true })
  run(`git push ${remote} HEAD:gh-pages`,        { cwd: tmp })
  console.log('\n✅  Deployed to https://vinayakkothari.github.io/azmabro/\n')
} finally {
  run(`git worktree remove ${tmp} --force`)
  rmSync(tmp, { recursive: true, force: true })
}
