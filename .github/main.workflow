workflow "Build and deploy on push" {
  resolves = [
    "Deploy to GitHub Pages",
  ]
  on = "push"
}

action "yarn build" {
  uses = "Borales/actions-yarn@master"
  needs = ["yarn install"]
  args = "build"
  env = {
    CI_COMMIT_MESSAGE = ""
    CI_REPO_OWNER = "njzjz"
    CI_REPO_NAME = "qiaokun-web"
    CI = "github_actions"
  }
  secrets = ["BUNDLESIZE_GITHUB_TOKEN"]
}

action "Filters for GitHub Actions" {
  uses = "actions/bin/filter@3c0b4f0e63ea54ea5df2914b4fabf383368cd0da"
  args = "branch master"
  needs = ["yarn build"]
}

action "Deploy to GitHub Pages" {
  uses = "JamesIves/github-pages-deploy-action@master"
  needs = ["Filters for GitHub Actions"]
  env = {
    BRANCH = "gh-pages"
    FOLDER = "dist"
  }
  secrets = ["ACCESS_TOKEN"]
}

action "yarn install" {
  uses = "Borales/actions-yarn@master"
  args = "install"
}
