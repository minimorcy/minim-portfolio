# GitHub Personal Access Token (PAT) Creation Guide

Follow these steps to create a fine-grained GitHub PAT for the portfolio's GitHub API integration.

## Step-by-Step

1. **Navigate to GitHub token settings**
   Go to GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens → Click **Generate new token**.

2. **Name the token**
   Set the token name to `Portfolio Minim` so you can identify it later.

3. **Set expiration**
   Choose **90 days** (recommended) or set a custom expiration date. Fine-grained tokens always expire.

4. **Select repository access**
   Under **Repository access**, choose **All repositories** (or select specific repos if you prefer tighter scoping).

5. **Configure permissions**
   Under **Permissions → Repository permissions**, set **Contents** to **Read-only**. This is sufficient for fetching public repository metadata. No write permissions are needed.

6. **Generate and copy the token**
   Click **Generate token**. Copy the token immediately. It starts with `github_pat_`. You will not see it again.

7. **Set the token locally**
   In the project root, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Open `.env` and replace `your_github_pat_here` with the token you just copied.

8. **Set the token in CapRover**
   Go to CapRover Dashboard → your app → **Config** tab → **Environment Variables**. Add:
   ```
   GITHUB_TOKEN=<your_PAT>
   ```
   Save and redeploy.

9. **Verify the token**
   A valid token starts with `github_pat_` (fine-grained) or `ghp_` (classic). If your token does not match either prefix, it is not valid.

## Notes

- Fine-grained tokens are preferred over classic tokens for better security scoping.
- The `Contents: Read-only` permission is all that is needed for public repo data.
- Never commit `.env` or any file containing a real token to version control.
