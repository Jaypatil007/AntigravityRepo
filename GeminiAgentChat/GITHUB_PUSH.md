# How to Push to GitHub

Follow these steps to push your project to GitHub.

## 1. Initialize Git
Open your terminal in the project root (`GeminiAgentChat`) and run:

```bash
git init
```

## 2. Create .gitignore
Create a `.gitignore` file to exclude unnecessary files:

```bash
echo "node_modules/" > .gitignore
echo "__pycache__/" >> .gitignore
echo ".env" >> .gitignore
echo ".DS_Store" >> .gitignore
echo "dist/" >> .gitignore
```

## 3. Stage and Commit Files

```bash
git add .
git commit -m "Initial commit: Gemini Agent Chat with React and Python"
```

## 4. Add Remote Repository
Go to GitHub, create a new repository, and copy the URL. Then run:

```bash
git remote add origin <YOUR_GITHUB_REPO_URL>
```

## 5. Push to GitHub

```bash
git push -u origin main
```
