# How to Push an Existing Project to GitHub (Step-by-Step)

This document provides a **comprehensive, beginner-friendly, step-by-step guide** on how to push existing files and directories from a local computer to a GitHub repository using Git. This is intended for **documentation purposes**.

---

## 1. Prerequisites

Before starting, ensure the following requirements are met:

* A **GitHub account**
* An **existing GitHub repository** (empty or not)
* **Git installed** on your computer
* Your project files already exist locally

### 1.1 Verify Git Installation

Open **Command Prompt**, **PowerShell**, or **Git Bash**, then run:

```bash
git --version
```

If a version number appears, Git is installed correctly.

---

## 2. Open the Project Directory

Navigate to the folder containing your project files.

```bash
cd path/to/your/project-folder
```

Example:

```bash
cd "C:\Users\Username\Desktop\MyProject"
```

---

## 3. Initialize a Local Git Repository

Inside the project folder, initialize Git:

```bash
git init
```

This creates a hidden `.git` folder that tracks version history.

---

## 4. Check Repository Status

View the current state of files:

```bash
git status
```

Files not yet tracked will appear as **untracked files**.

---

## 5. Stage Files for Commit

Stage all files and directories:

```bash
git add .
```

To confirm staging:

```bash
git status
```

---

## 6. Commit the Files

Create the initial commit:

```bash
git commit -m "Initial commit"
```

A commit saves a snapshot of the project at this point.

---

## 7. Link Local Repository to GitHub

Add the GitHub repository as the remote origin:

```bash
git remote add origin https://github.com/thevinnnzzz/Vincent-s-Portfolio.git
```

Verify the remote:

```bash
git remote -v
```

---

## 8. Set the Main Branch

Ensure the branch name is `main`:

```bash
git branch -M main
```

---

## 9. Push the Project to GitHub

Upload the local repository to GitHub:

```bash
git push -u origin main
```

### Authentication

* **Username**: Your GitHub username
* **Password**: A **GitHub Personal Access Token (PAT)**

> GitHub no longer accepts account passwords for Git operations.

---

## 10. Generate a Personal Access Token (PAT)

If prompted for a password:

1. Go to **GitHub → Settings**
2. Select **Developer settings**
3. Open **Personal access tokens (classic)**
4. Click **Generate new token**
5. Enable scope:

   * `repo`
6. Copy the token and use it as your password

---

## 11. Verify Upload

Open your GitHub repository in a browser and confirm that all files and folders appear.

---

## 12. Common Issues and Solutions

### Git Not Recognized

```text
git is not recognized as an internal or external command
```

**Solution:** Install Git and ensure it is added to PATH.

---

### Remote Already Exists

```bash
git remote remove origin
git remote add origin https://github.com/thevinnnzzz/Vincent-s-Portfolio.git
```

---

### HTTP 408 / RPC Failed Error (Large Files)

Increase Git buffer size:

```bash
git config --global http.postBuffer 524288000
```

Then retry:

```bash
git push origin main
```

---

## 13. Best Practices

* Use `.gitignore` to exclude unnecessary files (e.g., `node_modules`, `.env`)
* Commit frequently with clear messages
* Avoid using `--force` unless absolutely necessary

---

## 14. Conclusion

Following this process ensures that existing project files are properly versioned and uploaded to GitHub. This workflow is suitable for initial uploads and ongoing project updates.

---

**End of Documentation**
